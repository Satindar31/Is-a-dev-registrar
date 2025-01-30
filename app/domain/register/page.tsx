import { RegisterDomainForm } from "@/components/forms/register-form";
import { TextRevealCard } from "@/components/ui/text-reveal-card";
import { UserButton } from '@clerk/nextjs'

export default function RegisterPage() {
  
  return (
    <div className="flex flex-col md:grid md:grid-cols-2 p-12">
      <div>
        <h1 className="text-2xl md:text-7xl font-black">Register</h1>
        <TextRevealCard
          text="Register your domain"
          revealText="With is-a.dev right now!"
          className="text-2xl md:text-7xl font-black bg-transparent border-0 text-center p-0 m-0"
        />
        <UserButton />
      </div>
      <RegisterDomainForm />
    </div>
  );
}
