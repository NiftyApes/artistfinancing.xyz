import * as Select from '@radix-ui/react-select'
import {
  IoCaretDownSharp,
  IoCheckmark,
  IoChevronDown,
  IoChevronUp,
} from 'react-icons/io5'

const SelectInput = ({ ...props }: Select.SelectProps) => {
  return (
    <Select.Root defaultValue={'weekly'} {...props}>
      <Select.Trigger
        className="inline-flex h-[46px] w-[170px] items-center justify-between gap-2 border-[1px] border-gray-500 bg-white px-[15px] text-sm font-bold leading-none outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
        aria-label="Expiration"
      >
        <Select.Value />
        <Select.Icon>
          <IoCaretDownSharp />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal className="z-[1002]">
        <Select.Content className="overflow-hidden rounded-md bg-white shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
          <Select.ScrollUpButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-violet11">
            <IoChevronUp />
          </Select.ScrollUpButton>
          <Select.Viewport className="p-2">
            {[
              { value: 'weekly', label: 'Weekly' },
              { value: 'monthly', label: 'Monthly' },
            ].map((item, idx) => (
              <Select.Item
                key={idx}
                value={item.value}
                className="relative flex h-[25px] select-none items-center rounded-sm px-[35px] pl-[25px] text-sm font-semibold text-black data-[highlighted]:bg-gray-200 data-[highlighted]:text-black data-[highlighted]:outline-none"
              >
                <Select.ItemText>{item.label}</Select.ItemText>
                <Select.ItemIndicator className="absolute left-0 inline-flex w-[25px] items-center justify-center">
                  <IoCheckmark size={16} />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
          <Select.ScrollDownButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-violet11">
            <IoChevronDown />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}

export default SelectInput
