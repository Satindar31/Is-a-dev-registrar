"use client";
import React, { useEffect } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
// import {
//   IconBrandGithub,
//   IconBrandGoogle,
//   IconBrandOnlyfans,
// } from "@tabler/icons-react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useSearchParams } from "next/navigation";
import { RegisterModal } from "../modals/register-modal";
import { toast } from "sonner";

export function RegisterDomainForm() {
  const domain = useSearchParams().get("domain");
  const [subdomain, setSubdomain] = React.useState("");
  console.log(domain);
  useEffect(() => {
    setSubdomain(domain?.toString() || "");
  }, [domain]);

  const [checked, setChecked] = React.useState(0);
  const [owner, setOwner] = React.useState("");

  const [checked2, setChecked2] = React.useState(0);
  const [record, setRecord] = React.useState("");

  const [disabled, setDisabled] = React.useState(false);

  const [showModal, setShowModal] = React.useState(false);
  const [data, setData] = React.useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisabled(true);
    toast.loading("Generating JSON");
    fetch("/api/generateJSON", {
      method: "POST",
      body: JSON.stringify({
        subdomain,
        contact: checked,
        owner,
        recordType: checked2,
        record: record,
      }),
      cache: "no-cache",
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setData(data)
          toast.success("JSON generated successfully");
          setDisabled(false);
          setShowModal(true);
        });
      } else {
        toast.error("Error generating JSON.");
        setDisabled(false);
      }
    });
  };
  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to is-a.dev
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Provide us some information to setup your domain
      </p>

      <form className="my-8 rounded-lg" onSubmit={handleSubmit}>
        <Label>Incase of emergency, contact me through</Label>
        <RadioGroup required className="antialiased" defaultValue="email">
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              onClick={() => setChecked(0)}
              value="default"
              id="r1"
              checked={checked === 0}
            />
            <Label htmlFor="r1">Email</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              onClick={() => setChecked(1)}
              value="comfortable"
              id="r2"
            />
            <Label htmlFor="r2">Discord</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              onClick={() => setChecked(2)}
              value="compact"
              id="r3"
            />
            <Label htmlFor="r3">Twitter</Label>
          </div>
          {checked === 0 && (
            <Input
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
              placeholder="Enter your email"
              type="email"
            />
          )}
          {checked === 1 && (
            <Input
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
              placeholder="Enter your discord ID"
              type="text"
            />
          )}
          {checked === 2 && (
            <Input
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
              placeholder="Enter your twitter handle"
              type="text"
            />
          )}
        </RadioGroup>
        <RadioGroup required className="antialiased" defaultValue="CNAME">
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              onClick={() => setChecked2(0)}
              value="CNAME"
              id="rd1"
            />
            <Label htmlFor="rd1">CNAME</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem onClick={() => setChecked2(1)} value="A" id="rd2" />
            <Label htmlFor="rd2">A</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              onClick={() => setChecked2(2)}
              value="AAA"
              id="rd3"
            />
            <Label htmlFor="rd3">AAAA</Label>
          </div>
          {/* <div className="flex items-center space-x-2">
            <RadioGroupItem
              onClick={() => setChecked2(3)}
              value="MX"
              id="rd4"
            />
            <Label htmlFor="r4">MX</Label>
          </div> */}
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              onClick={() => setChecked2(4)}
              value="TXT"
              id="rd5"
            />
            <Label htmlFor="r5">TXT</Label>
          </div>

          <div className="flex items-center space-x-2">
            <RadioGroupItem
              onClick={() => setChecked2(6)}
              value="URL"
              id="rd6"
            />
            <Label htmlFor="r6">URL</Label>
          </div>
          <Input
            value={record}
            onChange={(e) => setRecord(e.target.value)}
            placeholder="Enter record value"
          />
        </RadioGroup>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Subdomain</Label>
          <Input
            id="text"
            placeholder="monkey31"
            type="text"
            value={subdomain}
            onChange={(e) => setSubdomain(e.target.value)}
          />
        </LabelInputContainer>
        {/* <LabelInputContainer className="mb-8">
          <Label htmlFor="twitterpassword">Your twitter password</Label>
          <Input
            id="twitterpassword"
            placeholder="••••••••"
            type="twitterpassword"
          />
        </LabelInputContainer> */}

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
          disabled={disabled}
        >
          Sign up &rarr;
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
        {showModal && <RegisterModal data={JSON.stringify(data)} subdomain={subdomain} />}
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
