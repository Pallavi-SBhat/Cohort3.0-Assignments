import { toggleTheme } from "@/features/ThemeSlice";
import { Moon, Search, Sun } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mode } = useSelector(
    (state: { theme: { mode: string } }) => state.theme
  );
  console.log("this is theme->", mode);

  return (
    <nav className="h-16 w-full flex items-center justify-between px-8 sticky top-0 z-50 bg-[var(--bg-color)]/80 backdrop-blur-lg border-b border-[var(--border-color)]/50 dark:border-gray-800/50 transition-colors duration-300">
      <div className="flex items-center gap-10">
        <h1
          onClick={() => navigate("/")}
          className="font-bold text-2xl cursor-pointer"
        >
          EaseUi
        </h1>

        <div className="hidden sm:flex items-center bg-transparent rounded-md px-3 py-1.5 shadow-xs shadow-[var(--shadow-light)] dark:shadow-gray-800 border border-[var(--border-color)] dark:border-gray-700">
          <Search size={18} className="text-[var(--icon-color)]" />
          <input
            type="text"
            placeholder="Search components"
            className="ml-2 bg-transparent outline-none text-sm text-[var(--text-color)] dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
          />
        </div>
      </div>

      <ul className="hidden md:flex items-center gap-6 text-[var(--text-color)]">
        <li
          onClick={() => navigate("components")}
          className="cursor-pointer hover:text-black dark:hover:text-white transition-colors"
        >
          Components
        </li>
        <li style={{ color: "var(--primary-color)" }} className="cursor-pointer hover:text-black dark:hover:text-white transition-colors">About</li>
        <li className="cursor-pointer hover:text-black dark:hover:text-white transition-colors">Templates</li>
        {mode === "dark" && (
          <li
            className="cursor-pointer p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => dispatch(toggleTheme())}
          >
            <Sun size={20} className="text-yellow-400" />
          </li>
        )}
        {mode === "light" && (
          <li
            className="cursor-pointer p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => dispatch(toggleTheme())}
          >
            <Moon size={20} style={{ color: "var(--text-muted)" }} />
          </li>
        )}
      </ul>

      {/* Mobile Hamburger */}
      <button className="text-sm font-medium text-[var(--text-color)]">☰</button>
    </nav>
  );
};

export default Navbar;
