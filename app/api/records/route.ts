import { auth, clerkClient } from "@clerk/nextjs/server";
import { Octokit } from "octokit";

export async function GET(req: Request) {
  const url = new URL(req.url);

  const domain = url.searchParams.get("domain");
  if (!domain) {
    return new Response(JSON.stringify({ error: "No domain provided." }), {
      status: 400,
    });
  }

  const { userId } = auth();
  if (!userId) {
    return new Response(JSON.stringify({ error: "Not authenticated." }), {
      status: 401,
    });
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
    const file: any = await kit.rest.repos.getContent({
      owner: "is-a-dev",
      repo: "register",
      path: `domains/${domain}.json`,
    });

    const file_data = JSON.parse(atob(file.data.content));
    const records = file_data.record
    console.log(records)
    return new Response(JSON.stringify(records), {
        status: 200,
    });
  } catch (error: any) {
    if (error.status === 404) {
      return new Response(JSON.stringify({ error: "Domain not found." }), {
        status: 404,
      });
    }
    console.error(error);
    return new Response(JSON.stringify({ error: "An error occurred." }), {
      status: 500,
    });
  }
}
