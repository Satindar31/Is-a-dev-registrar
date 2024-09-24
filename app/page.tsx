import Hero from "@/components/home/hero";
import { HomeInput } from "@/components/home/input";
import { Boxes } from "@/components/ui/background-boxes";

export default function Home() {
  return (
    <div className="h-screen p-8 z-50">
      <div className="w-full z-10 bg-transparent">
        <Hero />
        <HomeInput />
      </div>
      {/* <Boxes className="z-0"/> */}
    </div>
  );
}
