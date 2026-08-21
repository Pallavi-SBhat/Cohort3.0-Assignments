import ComponentDemo from "../ComponentsDemo";
import PropsTable from "@/components/Personal/PropsTable";
import { Carousel } from "@/components/Carousel/Carousel";
import { Card } from "@/components/Card/Card";

const CarouselPage = () => {
const basicUsageCode = `import { Carousel } from "@/components"

export default function App() {
  const items = [
    <div key="1" className="h-[300px] bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center text-3xl font-bold rounded-2xl">Slide 1</div>,
    <div key="2" className="h-[300px] bg-gradient-to-br from-emerald-400 to-teal-500 text-white flex items-center justify-center text-3xl font-bold rounded-2xl">Slide 2</div>,
    <div key="3" className="h-[300px] bg-gradient-to-br from-rose-400 to-red-500 text-white flex items-center justify-center text-3xl font-bold rounded-2xl">Slide 3</div>,
  ];

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Carousel items={items} autoPlay interval={3000} />
    </div>
  );
}`;

const manualCarouselCode = `import { Carousel } from "@/components"

export default function App() {
  const items = [
    <div key="1" className="h-[300px] bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center text-3xl font-bold rounded-2xl">Slide 1</div>,
    <div key="2" className="h-[300px] bg-gradient-to-br from-emerald-400 to-teal-500 text-white flex items-center justify-center text-3xl font-bold rounded-2xl">Slide 2</div>,
    <div key="3" className="h-[300px] bg-gradient-to-br from-rose-400 to-red-500 text-white flex items-center justify-center text-3xl font-bold rounded-2xl">Slide 3</div>,
  ];

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Carousel items={items} showArrows={false} interval={1500} />
    </div>
  );
}`;

const cardCarouselCode = `import { Carousel, Card } from "@/components"

export default function App() {
  const cardItems = [
    <div key="c1" className="p-4 h-full">
      <Card title="Analytics" description="View your latest statistics and engagement metrics." variant="light" hoverAnimation="float3D" className="h-full" />
    </div>,
    <div key="c2" className="p-4 h-full">
      <Card title="Settings" description="Configure your account and preferences." variant="light" hoverAnimation="float3D" className="h-full" />
    </div>,
    <div key="c3" className="p-4 h-full">
      <Card title="Security" description="Manage your passwords and 2FA settings." variant="light" hoverAnimation="float3D" className="h-full" />
    </div>,
  ];

  return (
    <div className="w-full max-w-sm mx-auto h-[250px]">
      <Carousel items={cardItems} autoPlay={false} />
    </div>
  );
}`;

  const propsData = [
    {
      prop: "items",
      type: "React.ReactNode[]",
      default: "-",
      description: "Array of items to display in the carousel",
    },
    {
      prop: "autoPlay",
      type: "boolean",
      default: "false",
      description: "Whether the carousel should auto-play",
    },
    {
      prop: "interval",
      type: "number",
      default: "3000",
      description: "Time in ms between auto-play transitions",
    },
    {
      prop: "showArrows",
      type: "boolean",
      default: "true",
      description: "Whether to show next/prev arrows",
    },
    {
      prop: "showDots",
      type: "boolean",
      default: "true",
      description: "Whether to show pagination dots",
    },
  ];

  const items = [
    <div key="1" className="h-[300px] bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center text-3xl font-bold rounded-2xl">Slide 1</div>,
    <div key="2" className="h-[300px] bg-gradient-to-br from-emerald-400 to-teal-500 text-white flex items-center justify-center text-3xl font-bold rounded-2xl">Slide 2</div>,
    <div key="3" className="h-[300px] bg-gradient-to-br from-rose-400 to-red-500 text-white flex items-center justify-center text-3xl font-bold rounded-2xl">Slide 3</div>,
  ];

  const cardItems = [
    <div key="c1" className="p-4 h-full">
      <Card title="Analytics" description="View your latest statistics and engagement metrics." variant="light" hoverAnimation="float3D" className="h-full" />
    </div>,
    <div key="c2" className="p-4 h-full">
      <Card title="Settings" description="Configure your account and preferences." variant="light" hoverAnimation="float3D" className="h-full" />
    </div>,
    <div key="c3" className="p-4 h-full">
      <Card title="Security" description="Manage your passwords and 2FA settings." variant="light" hoverAnimation="float3D" className="h-full" />
    </div>,
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-12 animate-fadeIn">
      <header className="space-y-2">
        <p className="text-4xl font-bold tracking-tight" style={{ color: "var(--text-color)" }}>
          Carousel
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          A slideshow component for cycling through elements, images or slides.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Examples</h2>
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-medium mb-4">Default AutoPlay Carousel</h3>
            <ComponentDemo code={basicUsageCode}>
              <div className="w-full max-w-2xl mx-auto">
                <Carousel items={items} autoPlay />
              </div>
            </ComponentDemo>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Manual Carousel (No Arrows, Fast transition)</h3>
            <ComponentDemo code={manualCarouselCode}>
              <div className="w-full max-w-2xl mx-auto">
                <Carousel items={items} showArrows={false} interval={1500} />
              </div>
            </ComponentDemo>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Card Carousel</h3>
            <ComponentDemo code={cardCarouselCode}>
              <div className="w-full max-w-sm mx-auto h-[250px]">
                <Carousel items={cardItems} autoPlay={false} />
              </div>
            </ComponentDemo>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">API Reference</h2>
        <PropsTable data={propsData} />
      </section>
    </div>
  );
};

export default CarouselPage;
