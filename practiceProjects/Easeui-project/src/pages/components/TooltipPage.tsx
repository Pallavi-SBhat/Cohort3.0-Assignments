import ComponentDemo from "../ComponentsDemo";
import PropsTable from "@/components/Personal/PropsTable";
import { Tooltip } from "@/components/Tooltip/Tooltip";
import { Button } from "@/components/Button/Button";

const TooltipPage = () => {
  const basicUsageCode = `import { Tooltip, Button } from "@/components";

export default function App() {
  return (
    <div className="flex gap-8 flex-wrap justify-center py-10">
      <Tooltip content="Tooltip on top" position="top">
        <Button variant="outline">Top</Button>
      </Tooltip>
      <Tooltip content="Tooltip on bottom" position="bottom">
        <Button variant="outline">Bottom</Button>
      </Tooltip>
      <Tooltip content="Tooltip on left" position="left">
        <Button variant="outline">Left</Button>
      </Tooltip>
      <Tooltip content="Tooltip on right" position="right">
        <Button variant="outline">Right</Button>
      </Tooltip>
    </div>
  );
}`;

  const richContentCode = `import { Tooltip, Button } from "@/components";

export default function App() {
  return (
    <div className="flex justify-center py-10">
      <Tooltip 
        position="bottom" 
        content={
          <div className="p-2 w-48 text-left">
            <p className="font-bold text-[15px]">Pro Feature</p>
            <p className="text-xs opacity-80 mt-1">Upgrade to our premium plan to unlock this amazing feature!</p>
          </div>
        }
      >
        <Button variant="primary">Hover for Info</Button>
      </Tooltip>
    </div>
  );
}`;

  const interactiveCode = `import { Tooltip, Button } from "@/components";

export default function App() {
  return (
    <div className="flex justify-center py-10">
      <Tooltip 
        interactive
        position="top" 
        content={
          <div className="flex gap-2 py-1">
            <Button variant="ghost" size="sm" className="bg-transparent text-[var(--text-color)] border border-[var(--border-color)] dark:border-gray-400">Edit</Button>
            <Button variant="destructive" size="sm">Delete</Button>
          </div>
        }
      >
        <Button variant="outline">Hover for Actions</Button>
      </Tooltip>
    </div>
  );
}`;

  const delayCode = `import { Tooltip, Button } from "@/components";

export default function App() {
  return (
    <div className="flex justify-center py-10">
      <Tooltip delay={500} content="I waited 500ms to show up!">
        <Button variant="outline">Hover and wait (500ms)</Button>
      </Tooltip>
    </div>
  );
}`;

  const propsData = [
    {
      prop: "content",
      type: "React.ReactNode",
      default: "-",
      description: "The content to display inside the tooltip",
    },
    {
      prop: "children",
      type: "React.ReactNode",
      default: "-",
      description: "The trigger element for the tooltip",
    },
    {
      prop: "position",
      type: '"top" | "bottom" | "left" | "right"',
      default: '"top"',
      description: "Position of the tooltip relative to the trigger",
    },
    {
      prop: "interactive",
      type: "boolean",
      default: "false",
      description: "If true, allows hovering over and clicking inside the tooltip content",
    },
    {
      prop: "delay",
      type: "number",
      default: "0",
      description: "Delay in milliseconds before the tooltip appears on hover",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-12 animate-fadeIn">
      <header className="space-y-2">
        <p className="text-4xl font-bold tracking-tight" style={{ color: "var(--text-color)" }}>
          Tooltip
        </p>
        <p className="text-lg text-[var(--text-color)] dark:text-gray-400">
          A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Examples</h2>
        <div className="space-y-12">
          <div>
            <h3 className="text-lg font-medium mb-4">Basic Positions</h3>
            <ComponentDemo code={basicUsageCode}>
              <div className="flex gap-8 flex-wrap justify-center py-10">
                <Tooltip content="Tooltip on top" position="top">
                  <Button variant="outline">Top</Button>
                </Tooltip>
                <Tooltip content="Tooltip on bottom" position="bottom">
                  <Button variant="outline">Bottom</Button>
                </Tooltip>
                <Tooltip content="Tooltip on left" position="left">
                  <Button variant="outline">Left</Button>
                </Tooltip>
                <Tooltip content="Tooltip on right" position="right">
                  <Button variant="outline">Right</Button>
                </Tooltip>
              </div>
            </ComponentDemo>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Rich Content Tooltip</h3>
            <ComponentDemo code={richContentCode}>
              <div className="flex justify-center py-10">
                <Tooltip 
                  position="bottom" 
                  content={
                    <div className="p-2 w-48 text-left">
                      <p className="font-bold text-[15px]">Pro Feature</p>
                      <p className="text-xs opacity-80 mt-1">Upgrade to our premium plan to unlock this amazing feature!</p>
                    </div>
                  }
                >
                  <Button variant="primary">Hover for Info</Button>
                </Tooltip>
              </div>
            </ComponentDemo>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Interactive Tooltip</h3>
            <ComponentDemo code={interactiveCode}>
              <div className="flex justify-center py-10">
                <Tooltip 
                  interactive
                  position="top" 
                  content={
                    <div className="flex gap-2 py-1">
                      <Button variant="ghost" size="sm" className="bg-transparent text-[var(--text-color)] border border-[var(--border-color)] dark:border-gray-400">Edit</Button>
                      <Button variant="destructive" size="sm">Delete</Button>
                    </div>
                  }
                >
                  <Button variant="outline">Hover for Actions</Button>
                </Tooltip>
              </div>
            </ComponentDemo>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Delayed Tooltip</h3>
            <ComponentDemo code={delayCode}>
              <div className="flex justify-center py-10">
                <Tooltip delay={500} content="I waited 500ms to show up!">
                  <Button variant="outline">Hover and wait (500ms)</Button>
                </Tooltip>
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

export default TooltipPage;
