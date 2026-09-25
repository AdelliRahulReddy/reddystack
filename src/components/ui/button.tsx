import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Slot } from "radix-ui"

// Pill buttons from the v3 homepage: a fill that sweeps up from below on hover.
const sweep =
  "before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] before:translate-y-[101%] before:transition-transform before:duration-500 before:ease-studio hover:before:translate-y-0"

const buttonVariants = cva(
  "group/btn relative isolate inline-flex shrink-0 items-center justify-center gap-2.5 overflow-hidden rounded-full font-sans font-semibold leading-none whitespace-nowrap transition-[color,background-color,border-color,transform] duration-400 ease-studio outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: cn("bg-lime text-lime-ink before:bg-ivory hover:text-lime-ink", sweep),
        ghost: cn("border border-line-strong text-ivory before:bg-ivory hover:text-lime-ink", sweep),
        dark: cn("bg-ink text-ivory before:bg-ivory hover:text-lime-ink", sweep),
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

/** The circled arrow used inside buttons and text links; turns on hover. */
function ButtonArrow({ down = false, className }: { down?: boolean; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-grid size-[22px] place-items-center rounded-full bg-current/12 text-[13px] leading-none transition-transform duration-400 ease-studio",
        down ? "group-hover/btn:translate-y-0.5" : "group-hover/btn:translate-x-[3px] group-hover/btn:-rotate-45",
        className
      )}
    >
      {down ? "↓" : "→"}
    </span>
  )
}

export { Button, ButtonArrow, buttonVariants }
