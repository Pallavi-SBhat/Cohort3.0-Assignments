import { useState } from "react";
import { Code } from "lucide-react";
import CodeBlock from "@/components/Personal/CodeBlock";

interface ComponentDemoProps {
  children?: React.ReactNode;
  code: string;
  showCode?: boolean;
}

const ComponentDemo = ({ children, code }: ComponentDemoProps) => {
  const [isCodeVisible, setIsCodeVisible] = useState(false);

  return (
    <div className="border border-[var(--border-color)]/60 dark:border-slate-700/60 rounded-xl overflow-hidden shadow-[var(--shadow-light)] bg-[var(--bg-color)]/50 dark:bg-slate-800/50 backdrop-blur-sm">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border-color)]/60 dark:border-slate-700/60 bg-[var(--bg-color)]/50 dark:bg-slate-900/50">
        <span className="text-sm font-medium text-[var(--text-color)] dark:text-gray-300">Preview</span>
        <button
          onClick={() => setIsCodeVisible(!isCodeVisible)}
          className="flex items-center gap-1 px-3 py-1 text-sm bg-[var(--bg-color)] dark:bg-gray-700 hover:bg-[var(--bg-color)] dark:hover:bg-gray-600 rounded transition-colors text-[var(--text-color)] dark:text-slate-200"
        >
          <Code size={14} />
          {isCodeVisible ? "Hide Code" : "View Code"}
        </button>
      </div>

      <div className="py-20 px-4 flex items-center justify-center">{children}</div>

      {isCodeVisible && (
        <div className="border-t border-[var(--border-color)] dark:border-gray-700">
          <CodeBlock code={code} />
        </div>
      )}
    </div>
  );
};

export default ComponentDemo;
