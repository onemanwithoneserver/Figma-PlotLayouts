import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-[#4CAF50] hover:shadow-theme-md dark:hover:shadow-[0_0_12px_rgba(139,195,74,0.25)]",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
        outline:
          "border border-border bg-background text-foreground hover:bg-secondary hover:text-secondary-foreground dark:border-[rgba(46,125,50,0.3)] dark:hover:bg-[#1B3B1E] dark:hover:border-[#4CAF50]/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-[#C8E6C9] dark:bg-[#1B3B1E] dark:hover:bg-[#1B5E20] dark:text-[#E8F5E9]",
        ghost:
          "hover:bg-secondary hover:text-secondary-foreground dark:hover:bg-[#1B3B1E] dark:hover:text-[#E8F5E9]",
        link: "text-primary underline-offset-4 hover:underline dark:text-[#4CAF50]",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
