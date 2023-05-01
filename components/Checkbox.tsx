import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import clsx from 'clsx'
import React from 'react'
import { IoCheckmarkSharp } from 'react-icons/io5'

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, forwardedRef) => (
  <CheckboxPrimitive.Root
    className={clsx(
      'flex h-5 w-5 appearance-none items-center justify-center border border-black bg-white outline-none hover:bg-gray-100 focus:shadow-[0_0_0_1px_black] data-[state=checked]:bg-black data-[state=checked]:text-white',
      className
    )}
    {...props}
    ref={forwardedRef}
  >
    <CheckboxPrimitive.Indicator>
      <IoCheckmarkSharp size={16} />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))

Checkbox.displayName = 'Checkbox'

export default Checkbox
