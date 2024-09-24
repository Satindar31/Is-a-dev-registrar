import { auth, clerkClient } from "@clerk/nextjs/server";
import { Octokit } from "octokit";

export async function POST(req: Request) {
  const { file_data, subdomain }: { file_data: any; subdomain: string } =
    await req.json();

   const data = JSON.parse(file_data);

  const { userId } = auth();
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }
  const clerkRes = await clerkClient().users.getUserOauthAccessToken(
    userId,
    "oauth_github"
  );
  const token = clerkRes.data[0].token;

  try {
    const kit = new Octokit({
      auth: token,
    });

    try {
      await kit.rest.repos.createOrUpdateFileContents({
        owner: data.owner.username,
        path: `domains/${subdomain}.json`,
        repo: "register",
        message: "Add domain",
        content: Buffer.from(JSON.stringify(data)).toString("base64"),
        branch: "main",
      });

      try {
        const pull = await kit.rest.pulls.create({
          base: "main",
          head: `${data.owner.username}:main`,
          owner: "is-a-dev",
          repo: "register",
          title: `Add ${subdomain}.is-a.dev (automated)`,
          body: `Automated PR to add ${subdomain}.is-a.dev`,
          head_repo: `${data.owner.username}/register`,
          maintainer_can_modify: true,
        });
        return new Response(JSON.stringify({URL: pull.data.html_url}), { status: 200 });
      } catch (e) {
        const error = e as Error;
    console.log(error);
    return new Response(error.message, { status: 500 });
      }
    } catch (e) {
        const error = e as Error;
        console.log(error);
      return new Response(error.message, { status: 500 });
    }
  } catch (e) {
    const error = e as Error;
    console.log(error);
    return new Response(error.message, { status: 500 });
  }
}
