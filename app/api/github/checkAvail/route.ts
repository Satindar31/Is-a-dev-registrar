import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import { Octokit } from "octokit";

export async function GET(req: NextRequest) {
  const url = new URL(req.url)

  let domain = url.searchParams.get("domain")
  if (!domain) {
    return new Response("No domain provided", { status: 418 });
  }
  domain = domain.toLowerCase()

  const { userId } = auth();
  

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const clerkRes = await clerkClient().users.getUserOauthAccessToken(
      userId,
      "oauth_github"
    );
    const token: string = clerkRes.data[0].token;

    try {
      const kit = new Octokit({
        auth: token,
      });

      await kit.rest.repos.getContent({
        owner: "is-a-dev",
        repo: "register",
        path: `domains/${domain}.json`,
      });      

      return new Response("Domain is not available", { status: 400 });
    } catch (e) {
      if (e instanceof Error && (e as any).status === 404) {
        return new Response("Domain is available", { status: 200 });
      }
      console.error(e);
      return new Response("Internal Server Error(github)", { status: 500 });
    }
  } catch (e) {
    console.error(e);
    return new Response("Internal Server Error(clerk)", { status: 500 });
  }
}
