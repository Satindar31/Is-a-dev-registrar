"use client";

import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { toast } from "sonner";

export default function WhoisPage({ params }: { params: { slug: string } }) {
  const [owner, setOwner] = useState<{
    username: string;
    email: string;
    twitter: string | null;
    discord: string | null;
  } | null>(null);

  useEffect(() => {
    toast.loading("Fetching owner");
    fetch(`/api/github/whois?whois=${params.slug}`, {
      next: {
        revalidate: 60,
      },
    })
      .then((res) => {
        if (res.status === 404) {
          toast.error("Domain not found.");
          return { error: "Domain not found." };
        }
        return res.json();
      })
      .then((data) => {
        const cont: any = JSON.parse(atob(data.content));
        setOwner(cont.owner);
        return toast.success("Owner fetched successfully");
      });
  }, [params.slug]);

  return (
    <div className="h-screen antialiased flex justify-center">
      <div className="z-10 w-full rounded-md relative flex flex-col items-center justify-center bg-transparent">
        <div className="max-w-3xl mx-auto p-4">
          
          <Link href={owner ? `https://${params.slug}.is-a.dev` : "#"}><h1 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
            {params.slug}.is-a.dev
          </h1></Link>
          <p></p>
          <Suspense fallback={"Loading"}>
            <p className="text-neutral-300 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
              Owner: {owner?.username || "Loading..."}
            </p>
            {owner?.email ? (
              <Link href={`mailto:${owner.email}`}><li>Email</li></Link>
            ) : (
              <li>No email</li>
            )}
            {owner?.discord ? (
              <Link
                className="z-50"
                href={"https://discord.com/users/" + owner.discord}
              >
                <li>Discord</li>
              </Link>
            ) : (
              <li>No Discord</li>
            )}
            {owner?.twitter ? (
              <Link href={"https://twitter.com/" + owner.twitter}>
                <li>Twitter</li>
              </Link>
            ) : (
              <li>No Twitter</li>
            )}
            {owner && (
              <Link href={`https://github.com/is-a-dev/register/blob/main/domains/${params.slug}.json`}><li>File</li></Link>
            )}
            {owner && (
              <Link href={"/records/" + params.slug}><li>Records</li></Link>
            )}
          </Suspense>
        </div>
      </div>
      <ShootingStars />
      <StarsBackground />
    </div>
  );
}
