import * as Select from '@radix-ui/react-select'
import clsx from 'clsx'
import React from 'react'
import {
  IoCaretDownSharp,
  IoCheckmark,
  IoChevronDown,
  IoChevronUp,
} from 'react-icons/io5'

export default function Expiration() {
  return (
    <div className="flex gap-2">
      <em className="text-sm">Expires</em>
      <Select.Root>
        <Select.Trigger
          className="inline-flex h-[35px] items-center justify-center gap-[5px] rounded bg-white px-[15px] text-[13px] leading-none text-violet11 shadow-[0_2px_10px] shadow-black/10 outline-none hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-violet9"
          aria-label="Expiration"
        >
          <Select.Value />
          <Select.Icon className="text-violet11">
            <IoCaretDownSharp />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal className="z-[1002]">
          <Select.Content className="overflow-hidden rounded-md bg-white shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
            <Select.ScrollUpButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-violet11">
              <IoChevronUp />
            </Select.ScrollUpButton>
            <Select.Viewport className="p-[5px]">
              <Select.Item value="test">
                <Select.ItemText>Test</Select.ItemText>
                <Select.ItemIndicator className="absolute left-0 inline-flex w-[25px] items-center justify-center">
                  <IoCheckmark />
                </Select.ItemIndicator>
              </Select.Item>
            </Select.Viewport>
            <Select.ScrollDownButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-violet11">
              <IoChevronDown />
            </Select.ScrollDownButton>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  )
}

// import * as Select from '@radix-ui/react-select'
// import React from 'react'
//
// export default function Expiration() {
//   return (
//     <div>
//       <em>Expires</em>
//       <Select.Root>
//         <Select.Trigger>
//           <Select.Value />
//           <Select.Icon className="text-violet11">
//             <IoCaretDownSharp />
//           </Select.Icon>
//         </Select.Trigger>
//         <Select.Portal className="z-[9999]">
//           <Select.Content>
//             <Select.Viewport>
//               <Select.Item value="test">
//                 <Select.ItemText>Test</Select.ItemText>
//               </Select.Item>
//             </Select.Viewport>
//           </Select.Content>
//         </Select.Portal>
//       </Select.Root>
//     </div>
//   )
// }
