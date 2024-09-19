import { HomeInput } from "@/components/home/input";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  return (
    <BackgroundBeamsWithCollision className="items-center justify-items-center h-screen">
      <main>
        <h1 className="text-2xl relative z-20 md:text-4xl lg:text-7xl font-bold text-center text-black dark:text-white font-sans tracking-tight">
          is-a.dev registrar
        </h1>
        <HomeInput />
      </main>
    </BackgroundBeamsWithCollision>
  );
}
