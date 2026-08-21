// import CodeBlock from "@/components/Personal/CodeBlock";
import { Button } from "@/components/Button/Button";
import ComponentDemo from "../ComponentsDemo";
import PropsTable from "@/components/Personal/PropsTable";

const ButtonPage = () => {
  const basicUsageCode = `import { Button } from "@/components"

export default function App() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 place-items-center py-4">
      <Button animation="scaleIn" variant="primary" hoverAnimation="jiggle">
        Jiggle
      </Button>
      <Button animation="slideUp" variant="secondary" hoverAnimation="bounce">
        Bounce
      </Button>
      <Button animation="fadeIn" variant="outline" hoverAnimation="scale">
        Scale
      </Button>
      <Button animation="bounceIn" variant="dark" hoverAnimation="shadowPulse">
        Shadow Pulse
      </Button>
      <Button animation="scaleIn" variant="ok" hoverAnimation="float3D">
        Float 3D
      </Button>
      <Button animation="fadeIn" variant="destructive" hoverAnimation="wobbleFollow">
        Wobble Follow
      </Button>
    </div>
  );
}`;

  const propsData = [
    {
      prop: "variant",
      type: '"primary" | "secondary" | "outline" | "destructive" | "ghost" | "dark" | "ok" | "link"',
      default: '"primary"',
      description: "The visual style variant of the button",
    },
    {
      prop: "size",
      type: '"sm" | "lg" | "xl" | "icon" | "auto" | "full"',
      default: '"lg"',
      description: "The size of the button",
    },
    {
      prop: "animation",
      type: '"fadeIn" | "scaleIn" | "slideUp" | "bounceIn" | "none"',
      default: '"none"',
      description: "Animation when mounting",
    },
    {
      prop: "hoverAnimation",
      type: '"jiggle" | "scale" | "bounce" | "none"',
      default: '"none"',
      description: "hovering on element animation",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-12">
      <header className="space-y-2">
        <p
          className="text-4xl font-bold tracking-tight"
          style={{ color: "var(--text-color)" }}
        >
          Button
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Displays a button or a component that looks like a button.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Usage</h2>
        <ComponentDemo code={basicUsageCode}>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 place-items-center py-4">
            <Button
              animation="scaleIn"
              variant="primary"
              hoverAnimation="jiggle"
            >
              Jiggle
            </Button>
            <Button
              animation="slideUp"
              variant="secondary"
              hoverAnimation="bounce"
            >
              Bounce
            </Button>
            <Button
              animation="fadeIn"
              variant="outline"
              hoverAnimation="scale"
            >
              Scale
            </Button>
            <Button
              animation="bounceIn"
              variant="dark"
              hoverAnimation="shadowPulse"
            >
              Shadow Pulse
            </Button>
            <Button
              animation="scaleIn"
              variant="ok"
              hoverAnimation="float3D"
            >
              Float 3D
            </Button>
            <Button
              animation="fadeIn"
              variant="destructive"
              hoverAnimation="wobbleFollow"
            >
              Wobble Follow
            </Button>
          </div>
        </ComponentDemo>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">API Reference</h2>
        <PropsTable data={propsData} />
      </section>
    </div>
  );
};

export default ButtonPage;
