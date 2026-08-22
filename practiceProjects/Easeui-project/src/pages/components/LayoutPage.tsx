import ComponentDemo from "../ComponentsDemo";
import PropsTable from "@/components/Personal/PropsTable";
import { Container, Flex, Grid, Stack, Center, Divider } from "@/components/Layout/Layout";

const LayoutPage = () => {
  const basicUsageCode = `import { Container, Flex, Grid, Divider, Center, Stack } from "@/components";

export default function App() {
  return (
    <Container size="full">
      <Flex justify="between" align="center" className="mb-8 p-4 bg-[var(--bg-color)] dark:bg-gray-800 rounded-lg">
        <div className="font-bold">Header Flex</div>
        <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400">
          <div>Link 1</div>
          <div>Link 2</div>
        </div>
      </Flex>

      <Grid cols={3} gap={4}>
        <div className="bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-100 h-32 rounded-lg flex items-center justify-center font-bold">Grid 1</div>
        <div className="bg-indigo-200 dark:bg-indigo-800 text-indigo-900 dark:text-indigo-50 h-32 rounded-lg flex items-center justify-center font-bold">Grid 2</div>
        <div className="bg-indigo-300 dark:bg-indigo-700 text-indigo-950 dark:text-white h-32 rounded-lg flex items-center justify-center font-bold">Grid 3</div>
      </Grid>

      <Divider />

      <Center className="h-40 bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm">
        <Stack gap={2} align="center">
          <div className="font-bold">Centered Stack</div>
          <div className="text-gray-500 dark:text-gray-400 text-sm">Perfectly centered content</div>
        </Stack>
      </Center>
    </Container>
  );
}`;

  const appShellCode = `import { Flex, Grid } from "@/components";

export default function App() {
  return (
    <Flex className="h-64 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-inner">
      <div className="w-32 md:w-48 bg-gray-900 text-white p-4 flex flex-col gap-6">
        <div className="font-bold text-lg">Ease UI</div>
        <ul className="space-y-3 opacity-80 text-sm">
          <li className="cursor-pointer hover:opacity-100">Dashboard</li>
          <li className="cursor-pointer hover:opacity-100">Projects</li>
          <li className="cursor-pointer hover:opacity-100">Settings</li>
        </ul>
      </div>
      <Flex direction="col" className="flex-1 bg-[var(--bg-color)] dark:bg-slate-900">
        <header className="h-14 bg-white dark:bg-slate-950 border-b border-gray-200 dark:border-slate-800 px-4 flex items-center justify-between">
          <div className="font-medium">Dashboard</div>
          <div className="w-8 h-8 bg-[var(--bg-color)] dark:bg-slate-800 rounded-full" />
        </header>
        <div className="p-4 flex-1 overflow-auto">
          <Grid cols={2} gap={4}>
            <div className="bg-white dark:bg-slate-950 p-4 rounded-lg shadow-sm h-32 border border-gray-200 dark:border-slate-800 flex items-center justify-center text-gray-500">Card 1</div>
            <div className="bg-white dark:bg-slate-950 p-4 rounded-lg shadow-sm h-32 border border-gray-200 dark:border-slate-800 flex items-center justify-center text-gray-500">Card 2</div>
          </Grid>
        </div>
      </Flex>
    </Flex>
  );
}`;

  const flexPropsData = [
    {
      prop: "direction",
      type: '"row" | "col"',
      default: '"row"',
      description: "Flex direction",
    },
    {
      prop: "justify",
      type: '"start" | "end" | "center" | "between" | "around" | "evenly"',
      default: '"start"',
      description: "Justify content",
    },
    {
      prop: "align",
      type: '"start" | "end" | "center" | "baseline" | "stretch"',
      default: '"stretch"',
      description: "Align items",
    },
    {
      prop: "gap",
      type: "number | string",
      default: "4",
      description: "Gap between flex items (number implies tailwind spacing)",
    },
  ];

  const gridPropsData = [
    {
      prop: "cols",
      type: "1 | 2 | 3 | 4 | 5 | 6 | 12",
      default: "1",
      description: "Number of columns in the grid (responsive)",
    },
    {
      prop: "gap",
      type: "number | string",
      default: "4",
      description: "Gap between grid items (number implies tailwind spacing)",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-12 animate-fadeIn">
      <header className="space-y-2">
        <p className="text-4xl font-bold tracking-tight" style={{ color: "var(--text-color)" }}>
          Layout
        </p>
        <p className="text-lg" style={{ color: "var(--text-muted)" }}>
          Essential structural components (Container, Flex, Grid, Stack, Center, Divider) to layout your application.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Usage</h2>
        <ComponentDemo code={basicUsageCode}>
          <div className="w-full">
            <Container size="full">
              <Flex justify="between" align="center" className="mb-8 p-4 rounded-lg" style={{ background: "var(--surface)" }}>
                <div className="font-bold" style={{ color: "var(--text-color)" }}>Header Flex</div>
                <div className="flex gap-4 text-sm" style={{ color: "var(--text-muted)" }}>
                  <div>Link 1</div>
                  <div>Link 2</div>
                </div>
              </Flex>

              <Grid cols={3} gap={4}>
                <div className="bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-100 h-32 rounded-lg flex items-center justify-center font-bold">Grid 1</div>
                <div className="bg-indigo-200 dark:bg-indigo-800 text-indigo-900 dark:text-indigo-50 h-32 rounded-lg flex items-center justify-center font-bold">Grid 2</div>
                <div className="bg-indigo-300 dark:bg-indigo-700 text-indigo-950 dark:text-white h-32 rounded-lg flex items-center justify-center font-bold">Grid 3</div>
              </Grid>

              <Divider />

              <Center className="h-40 rounded-lg shadow-sm border" style={{ background: "var(--surface)", borderColor: "var(--border-color)" }}>
                <Stack gap={2} align="center">
                  <div className="font-bold" style={{ color: "var(--text-color)" }}>Centered Stack</div>
                  <div className="text-sm" style={{ color: "var(--text-muted)" }}>Perfectly centered content</div>
                </Stack>
              </Center>
            </Container>
          </div>
        </ComponentDemo>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Application Shell</h2>
        <ComponentDemo code={appShellCode}>
          <div className="w-full">
            <Flex className="h-64 border rounded-xl overflow-hidden shadow-inner" style={{ borderColor: "var(--border-color)" }}>
              <div className="w-32 md:w-48 p-4 flex flex-col gap-6" style={{ background: "var(--primary-color)", color: "white" }}>
                <div className="font-bold text-lg">Ease UI</div>
                <ul className="space-y-3 opacity-80 text-sm">
                  <li className="cursor-pointer hover:opacity-100">Dashboard</li>
                  <li className="cursor-pointer hover:opacity-100">Projects</li>
                  <li className="cursor-pointer hover:opacity-100">Settings</li>
                </ul>
              </div>
              <Flex direction="col" className="flex-1" style={{ background: "var(--bg-secondary)" }}>
                <header className="h-14 border-b px-4 flex items-center justify-between" style={{ background: "var(--card-bg)", borderColor: "var(--border-color)" }}>
                  <div className="font-medium" style={{ color: "var(--text-color)" }}>Dashboard</div>
                  <div className="w-8 h-8 rounded-full" style={{ background: "var(--border-color)" }} />
                </header>
                <div className="p-4 flex-1 overflow-auto">
                  <Grid cols={2} gap={4}>
                    <div className="p-4 rounded-lg shadow-sm h-32 border flex items-center justify-center" style={{ background: "var(--card-bg)", borderColor: "var(--border-color)", color: "var(--text-color)" }}>Card 1</div>
                    <div className="p-4 rounded-lg shadow-sm h-32 border flex items-center justify-center" style={{ background: "var(--card-bg)", borderColor: "var(--border-color)", color: "var(--text-color)" }}>Card 2</div>
                  </Grid>
                </div>
              </Flex>
            </Flex>
          </div>
        </ComponentDemo>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Flex API Reference</h2>
        <PropsTable data={flexPropsData} />
      </section>
      
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Grid API Reference</h2>
        <PropsTable data={gridPropsData} />
      </section>
    </div>
  );
};

export default LayoutPage;
