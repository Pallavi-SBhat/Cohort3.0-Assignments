import AppRouter from "./router/AppRouter";

type Props = {};

function App({}: Props) {
  return (
    <div
      className="min-h-screen w-full relative transition-colors duration-300"
      style={{ background: "var(--gradient-bg)", color: "var(--text-color)" }}
    >
      <AppRouter />
    </div>
  );
}

export default App;
