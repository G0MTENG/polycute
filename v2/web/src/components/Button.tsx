import { ComponentPropsWithoutRef } from 'react'

type NativeButtonProps = ComponentPropsWithoutRef<'button'>

export const Button = ({ className, children, ...props }: NativeButtonProps) => {
  return (
    <button
      className={`w-full font-semibold rounded-md h-12 bg-[#805333] text-white ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
