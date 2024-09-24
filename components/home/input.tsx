"use client";

import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export function HomeInput() {

    const [inputValue, setInputValue] = useState("");
    const [isAvailable, setIsAvailable] = useState<boolean | null>(null);

  const placeholders = [
    "satindar",
    "everyone",
    "monke",
    "your-own-domain",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setInputValue(e.target.value.toString());
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch(`/api/github/checkAvail?domain=${inputValue}`, {
        cache: "no-cache",
    }).then((res) => {
        if (res.status === 200) {
            console.log("Domain is available");
            setIsAvailable(true);
            toast.success("Domain is available");
        } else if(res.status === 400) {
            console.log("Domain is not available");
            setIsAvailable(false);
            toast.error("Domain is not available");
        }
    });
  };
  return (
    <div className="h-[40rem] flex flex-col justify-center  items-center px-4">
      <h2 className="mb-10 sm:mb-20 text-xl text-center sm:text-5xl dark:text-white text-black">
        Check domain availability
      </h2>
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
      {isAvailable == true ? (
        <p className="text-green-500">Domain is available. <Link href={"/domain/register?domain=" + inputValue}>Get it</Link></p>
      ) : isAvailable == false ? (
        <p className="text-red-500">Domain is not available. <br /><Link href={"/whois/" + inputValue}>See who ownes it</Link></p>
      ) : (
        <p className="text-gray-500">Enter a domain to check.</p>
      )}
    </div>
  );
}
