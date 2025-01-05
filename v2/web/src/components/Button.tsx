import { ComponentPropsWithoutRef } from 'react'

type NativeButtonProps = ComponentPropsWithoutRef<'button'>

export const Button = ({ className, children, ...props }: NativeButtonProps) => {
  return (
    <button className={`w-full rounded-md h-12 bg-[#422223] text-white ${className}`} {...props}>
      {children}
    </button>
  )
}
