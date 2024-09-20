// "use client"

// import { HomeInput } from "@/components/home/input";
import Hero from "@/components/home/hero";
import { HomeInput } from "@/components/home/input";
import { HeroHighlight } from "@/components/ui/hero-highlight";

export default function Home() {
  return (
    <HeroHighlight className="">
      <Hero />
      <HomeInput />
    </HeroHighlight>
  );
}
