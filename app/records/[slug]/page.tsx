"use client"

import { BackgroundBeams } from "@/components/ui/background-beams";
import { useState, useEffect, Suspense } from "react";

type record = {
    CNAME: string | null;
    A: string[] | null;
    MX: string[] | null;
    TXT: string[] | null;
    AAAA: string[] | null;
}

export default function RecordsPage({ params }: { params: { slug: string } }) {
    const [record, setRecord] = useState<record | null>(null);
    
    useEffect(() => {
        fetch(`/api/records?domain=${params.slug}`, {
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
            setRecord(data);
        });
    }, [params.slug]);
    
    return (
        <div className="h-screen flex justify-center">
        <div className="z-10 w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center bg-transparent">
            <div className="max-w-2xl mx-auto p-4">
            <h1 className="relative z-10 text-4xl md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
                Records for {params.slug}
            </h1>
            <Suspense fallback={"Loading"}>
                <div className="text-neutral-300 max-w-lg mx-auto my-2 text-sm md:text:3xl text-center relative z-10">
                <ul>
                    <li><b>CNAME:</b> {record?.CNAME || "No CNAME record(s)"}</li>
                    <li><b>A:</b> {record?.A?.join(", ") || "No A record(s)"}</li>
                    <li><b>MX:</b> {record?.MX?.join(", ") || "No MX record(s)"}</li>
                    <li><b>TXT:</b> {record?.TXT || "No TXT record(s)"}</li>
                    <li><b>AAAA:</b> {record?.AAAA?.join(", ") || "No AAAA record(s)"}</li>
                </ul>
                </div>
            </Suspense>
            </div>
        </div>

        <BackgroundBeams />
        </div>
    );
    }