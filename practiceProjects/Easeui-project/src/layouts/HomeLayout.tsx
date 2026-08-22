import { Outlet } from "react-router";
import Navbar from "../components/Personal/Navbar";

type Props = {};

const HomeLayout = ({}: Props) => {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--gradient-bg)", color: "var(--text-color)" }}>
      <Navbar />
      <main className="flex-grow p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default HomeLayout;
