import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../utils";

const badgeVariants = cva(
  "inline-flex items-center whitespace-nowrap rounded-lg border px-3 py-1 text-xs font-normal transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-bgLessDark text-white",
        secondary: "border-transparent bg-blueLight text-secondary-foreground hover:bg-blueLight/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground border-opacity-50",
        highlight: "whitespace-nowrap text-blue-500 text-center bg-blue-50 border border-blue-200 rounded-full px-6",
      },
      size: {
        default: "px-3 py-1",
        sm: "px-2 py-0.5",
        md: "px-3 py-1.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
