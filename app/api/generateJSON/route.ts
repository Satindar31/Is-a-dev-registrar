import { currentUser } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  const body = await req.json();
  const {
    subdomain,
    contact,
    owner,
    recordType,
    record,
  }: {
    subdomain: string;
    contact: number;
    owner: string;
    recordType: number;
    record: string;
  } = body;

  const user = await currentUser();
  if (!user?.id) {
    return new Response(JSON.stringify("Unauthorized"), {
      status: 401,
    });
  }

  let contactType = "email";
  let email: string = "";
  if (contact === 0) {
    contactType = "email";
    email = owner;
  } else if (contact === 1) {
    contactType = "discord";
  } else {
    contactType = "twitter";
  }

  let recordTypeString = "A";
  if (recordType === 0) {
    recordTypeString = "CNAME";
  } else if (recordType === 1) {
    recordTypeString = "A";
  } else if (recordType === 2) {
    recordTypeString = "AAAA";
  } else if (recordType === 3) {
    recordTypeString = "MX";
  } else if (recordType === 6) {
    recordTypeString = "URL"
  } else {
    recordTypeString = "TXT";
  }

  const jsonF = JSON.stringify({
    owner: {
      username: user.username,
      email: email,
      [contactType]: owner,
    },
    record: {
        [recordTypeString]: record
    },
  });

  return new Response(jsonF);
}
