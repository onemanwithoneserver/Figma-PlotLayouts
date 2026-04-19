import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { cn } from "./utils";

interface ThemeToggleProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function ThemeToggle({ className, size = "md" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  };

  const iconSizes = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "inline-flex items-center justify-center rounded-full transition-all duration-300 ease-in-out",
        "bg-card border border-border hover:border-primary/50",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
        "text-foreground hover:text-primary",
        "dark:shadow-[0_0_12px_rgba(139,195,74,0.25)]",
        sizeClasses[size],
        className
      )}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <div className="relative">
        <Sun
          className={cn(
            iconSizes[size],
            "absolute inset-0 m-auto transition-all duration-300",
            theme === "dark"
              ? "rotate-90 scale-0 opacity-0"
              : "rotate-0 scale-100 opacity-100"
          )}
        />
        <Moon
          className={cn(
            iconSizes[size],
            "transition-all duration-300",
            theme === "light"
              ? "-rotate-90 scale-0 opacity-0"
              : "rotate-0 scale-100 opacity-100"
          )}
        />
      </div>
    </button>
  );
}
