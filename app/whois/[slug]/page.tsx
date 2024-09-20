"use client";

import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";

export default function WhoisPage({ params }: { params: { slug: string } }) {
  const [owner, setOwner] = useState<{
    username: string;
    email: string;
    twitter: string | null;
    discord: string | null;
  } | null>(null);

  useEffect(() => {
    fetch(`/api/github/whois?whois=${params.slug}`, {
      next: {
        revalidate: 60,
      },
    })
      .then((res) => {
        if (res.status === 404) {
          return { error: "Domain not found." };
        }
        return res.json();
      })
      .then((data) => {
        const cont: any = JSON.parse(atob(data.content));
        setOwner(cont.owner);
      });
  }, [params.slug]);

  return (
    <>
      <div className="z-10 h-screen w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
        <div className="max-w-2xl mx-auto p-4">
          <h1 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
            {params.slug}.is-a.dev
          </h1>
          <p></p>
          <Suspense fallback={"Loading"}>
            <p className="text-neutral-300 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
              Owner: {owner?.username || "Loading..."}
            </p>
            {!owner?.email ? (
              <Link href={"mailto:sad.com"}>Email</Link>
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
          </Suspense>
<ShootingStars />
<StarsBackground />
        </div>
      </div>
    </>
  );
}
