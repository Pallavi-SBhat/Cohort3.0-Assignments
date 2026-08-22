import AppRouter from "./router/AppRouter";
import ThemeToggle from "./components/ThemeToggle";

type Props = {};

function App({}: Props) {
  return (
    <div className="min-h-screen w-full relative">
      {/* Theme toggle positioned at top-right */}
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <AppRouter />
    </div>
  );
}

export default App;
