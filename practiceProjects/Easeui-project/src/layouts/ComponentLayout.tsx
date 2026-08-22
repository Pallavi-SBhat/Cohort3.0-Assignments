import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { Menu } from "lucide-react";

type Props = {};

const ComponentLayout = ({}: Props) => {
  const location = useLocation();
  console.log(location);
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const components = [
    "Button",
    "Card",
    "Modal",
    "Input",
    "Navbar",
    "Carousel",
    "Tooltip",
    "Layout",
    "Forms",
  ];

  return (
    <div className="flex min-h-screen" style={{ background: "var(--bg-color)", color: "var(--text-color)" }}>
      <aside
        className={`
           w-64 p-6 flex flex-col bg-[var(--card-bg)]
           border-r border-[var(--border-color)]
          fixed md:static top-0 left-0 h-full z-20
          transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          transition-transform duration-300 ease-in-out
          md:translate-x-0
        `}
      >
        <h2 className="text-md font-bold mb-6" style={{ color: "var(--text-color)" }}>Components</h2>
        <ul className="flex flex-col gap-2">
          {components.map((item) => (
            <li
              onClick={() => navigate(item.toLowerCase())}
              key={item}
              className={`cursor-pointer hover:translate-x-1 transition-all duration-200 ease-in-out text-md ${
                location.pathname === `/components/${item.toLowerCase()}`
                  ? "font-semibold"
                  : ""
              }`}
              style={{
                color:
                  location.pathname === `/components/${item.toLowerCase()}`
                    ? "var(--primary-color)"
                    : "var(--text-muted)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-color)")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color =
                  location.pathname === `/components/${item.toLowerCase()}`
                    ? "var(--primary-color)"
                    : "var(--text-muted)")
              }
            >
              {item}
            </li>
          ))}
        </ul>
      </aside>

      <div className="flex-1 ml-10 overflow-auto h-screen p-6" style={{ background: "var(--bg-color)" }}>
        <button
          className="md:hidden mb-4 text-gray-700 dark:text-gray-300"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu size={24} />
        </button>

        <Outlet />
      </div>
    </div>
  );
};

export default ComponentLayout;
