"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export const ThemeToggle = () => {
  const [ mounted, setMounted ] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);

    return () => clearTimeout(timer);
  }, [])

  if (!mounted) return null;

  return (
    <button
      aria-label="Toggle theme"
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      disabled={!mounted}
      className="inline-flex h-9 w-9 items-center justify-center rounded-md transition-opacity disabled:cursor-default"
      style={{ opacity: mounted ? 1 : 0 }}
    >
      {mounted && (resolvedTheme === "dark" ? <Moon size={18} /> : <Sun size={18} />)}
    </button>
  );
};
