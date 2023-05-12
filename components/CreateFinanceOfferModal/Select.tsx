import React, { FC } from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'
import {
  IoCaretDownSharp,
  IoCheckmark,
  IoChevronDown,
  IoChevronUp,
} from 'react-icons/io5'

interface Props extends SelectPrimitive.SelectProps {
  triggerClassName?: string
}

export const Select = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<FC<Props>>
>(({ children, triggerClassName, ...props }, forwardedRef) => {
  return (
    <SelectPrimitive.Root {...props}>
      <SelectPrimitive.Trigger
        ref={forwardedRef}
        className={
          triggerClassName
            ? triggerClassName
            : 'inline-flex h-[46px] w-[170px] items-center justify-between gap-2 border-[1px] border-gray-500 bg-white px-[15px] text-sm font-bold leading-none outline-none focus:shadow-[0_0_0_1px] focus:shadow-black'
        }
      >
        <SelectPrimitive.Value />
        <SelectPrimitive.Icon>
          <IoCaretDownSharp />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal className="z-[1002]">
        <SelectPrimitive.Content className="overflow-hidden rounded-md bg-white shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
          <SelectPrimitive.ScrollUpButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-black">
            <IoChevronUp />
          </SelectPrimitive.ScrollUpButton>
          <SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>
          <SelectPrimitive.ScrollDownButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-black">
            <IoChevronDown />
          </SelectPrimitive.ScrollDownButton>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  )
})

Select.displayName = 'Select'

export const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ children, ...props }, forwardedRef) => {
  return (
    <SelectPrimitive.Item
      {...props}
      className="relative flex h-[25px] select-none items-center rounded-sm px-[35px] pl-[25px] text-sm font-semibold text-black data-[highlighted]:bg-gray-200 data-[highlighted]:text-black data-[highlighted]:outline-none"
      ref={forwardedRef}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className="absolute left-0 inline-flex w-[25px] items-center justify-center">
        <IoCheckmark size={16} />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  )
})

SelectItem.displayName = 'SelectItem'
