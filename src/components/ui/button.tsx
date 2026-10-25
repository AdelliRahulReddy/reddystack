import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Slot } from "radix-ui"

const buttonVariants = cva(
  "group/btn relative isolate inline-flex shrink-0 items-center justify-center gap-2.5 overflow-hidden rounded-full font-sans font-semibold leading-none whitespace-nowrap transition-[color,background-color,border-color,transform] duration-200 active:scale-[0.98] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-lime text-lime-ink hover:bg-[var(--btn-hover,var(--color-ivory))]",
        ghost: "border border-line-strong text-ivory hover:bg-raised",
        dark: "bg-ink text-ivory hover:bg-raised",
        outline: "border border-input bg-transparent text-ivory hover:bg-raised",
        secondary: "bg-raised text-ivory hover:bg-charcoal",
        destructive: "bg-destructive text-lime-ink hover:bg-destructive/90",
        link: "rounded-md px-0 text-lime underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-5 text-[15px]",
        sm: "h-9 gap-2 px-4 text-sm",
        lg: "h-[52px] px-6 text-base",
        icon: "size-11",
        "icon-sm": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
