import { Link } from "react-router";

const componentsList = [
  { id: "button", name: "Button" },
  { id: "card", name: "Card" },
  { id: "modal", name: "Modal" },
  { id: "input", name: "Input" },
  { id: "navbar", name: "Navbar" },
  { id: "carousel", name: "Carousel" },
  { id: "tooltip", name: "Tooltip" },
  { id: "layout", name: "Layout" },
];

const ComponentShowcase = () => {
  return (
    <div className="w-full relative py-24 my-16 overflow-hidden">
      <div className="absolute inset-0 bg-indigo-50/50 dark:bg-indigo-950/10 backdrop-blur-3xl -z-10" />
      <div className="max-w-5xl mx-auto px-4 relative z-10">
        
        <div className="text-center">
          <h3 className="text-sm font-bold tracking-[0.2em] text-indigo-500 dark:text-indigo-400 uppercase mb-8">
            Explore Components
          </h3>
          
          <div className="flex flex-wrap justify-center gap-4">
            {componentsList.map((item) => (
              <Link
                key={item.id}
                to={`/components/${item.id}`}
                className="px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 shadow-sm bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10 dark:hover:shadow-indigo-500/5 hover:border-indigo-200 dark:hover:border-indigo-500/30 hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default ComponentShowcase;
