import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import type { VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { badgeVariants } from "./badgeVariants"

function Badge({
  className,
  variant,
  asChild = false,
  bgColor,
  textColor,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & {
    asChild?: boolean
    bgColor?: string
    textColor?: string
  }) {
  const Comp = asChild ? Slot : "span"

  const style =
    variant === "custom"
      ? {
        backgroundColor: bgColor,
        color: textColor,
      }
      : undefined

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      style={style}
      {...props}
    />
  )
}

export { Badge }
