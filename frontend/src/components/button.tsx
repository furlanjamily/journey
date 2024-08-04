import { ComponentProps } from "react"
import { tv, VariantProps } from 'tailwind-variants'

const buttonVariants = tv({
  base: 'flex font-medium justify-center items-center rounded-lg px-5 gap-2',

  variants: {
    variant: {
      primary: 'bg-red-900 text-zinc-200 hover:bg-red-600',
      secondary: 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700',
    },

    size: {
      default: 'py-2',
      full: 'w-full h-11'
    },
  },



  defaultVariants: {
    variant: 'primary',
    size: 'default',
  }
})

interface ButtonProps extends ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
}

export function Button({ variant, children, size, ...props }: ButtonProps) {
  return (
    <button {...props} className={buttonVariants({ variant, size })}>
      {children}
    </button>
  )
}
