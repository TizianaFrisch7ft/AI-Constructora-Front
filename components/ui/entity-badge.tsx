import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.ComponentProps<"div"> {}

export const Badges = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full border px-2 py-1 text-xs font-medium",
          className
        )}
        {...props}
      />
    )
  }
)

Badges.displayName = "Badges"
