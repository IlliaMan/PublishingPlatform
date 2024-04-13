import Card from "@/components/Card";
import Carousel from "@/components/Carousel";

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      <Carousel />
      <div className="flex flex-row flex-wrap gap-y-8 gap-x-4 justify-between">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
}
