
import Hero from "@/components/home/hero";
import { HomeInput } from "@/components/home/input";
import { Boxes } from "@/components/ui/background-boxes";
import { HeroHighlight } from "@/components/ui/hero-highlight";

export default function Home() {
  return (
    <div className="h-screen p-8">
        <Hero />
      <Boxes />
        <HomeInput />
    </div>
  );
}
