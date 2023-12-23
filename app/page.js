import Card from "@/components/card";
import RandomCard from "@/components/randomCard";
import Search from "@/components/search";

export default function Home() {
  return (
    <div className="justify-between font-mono text-sm">
      <Search />
      <div className="flex flex-col lg:flex-row lg:justify-between">
        <div className="max-w-screen-lg mx-auto">
          <RandomCard />
          <Card />
        </div>
      </div>
    </div>
  );
}
