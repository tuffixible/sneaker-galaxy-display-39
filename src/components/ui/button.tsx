
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-lg hover:shadow-xl",
        outline:
          "border-2 border-input bg-background hover:bg-accent hover:text-accent-foreground shadow hover:shadow-lg",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow hover:shadow-lg",
        ghost: "hover:bg-accent/20 hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline font-medium",
        whatsapp: "bg-green-500 text-white hover:bg-green-600 shadow hover:shadow-lg",
        instagram: "bg-gradient-to-tr from-purple-600 via-pink-500 to-orange-400 text-white hover:opacity-90 shadow hover:shadow-lg",
        promotion: "bg-blue-500 text-white hover:bg-blue-600 shadow hover:shadow-lg",
        discount: "bg-green-500 text-white hover:bg-green-600 shadow hover:shadow-lg",
        featured: "bg-amber-500 text-white hover:bg-amber-600 shadow hover:shadow-lg",
      },
      size: {
        default: "h-11 px-6 py-2.5",
        sm: "h-9 rounded-full px-4",
        lg: "h-12 rounded-full px-8 text-base",
        icon: "h-10 w-10",
        circle: "h-12 w-12 rounded-full",
        pill: "h-11 rounded-full px-8",
      },
      animation: {
        none: "",
        pulse: "animate-pulse",
        bounce: "animate-bounce",
        wiggle: "hover:animate-[wiggle_1s_ease-in-out_infinite]",
        scale: "transition-transform hover:scale-105 active:scale-95",
        float: "hover:translate-y-[-4px] transition-transform",
        glow: "relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-200%] hover:before:animate-[shimmer_2s_infinite]",
        shine: "relative overflow-hidden after:absolute after:inset-0 after:translate-x-[-100%] hover:after:translate-x-[100%] after:bg-gradient-to-r after:from-transparent after:via-white/25 after:to-transparent after:transition-all after:duration-700",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      animation: "shine",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, animation, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, animation, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
