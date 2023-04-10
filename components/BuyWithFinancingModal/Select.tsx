import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import React from 'react'

export default function Select({ options, onSelect, value }: any) {
  return (
    <div style={{ fontFamily: 'Inter' }}>
      <DropdownMenu>
        <DropdownMenuTrigger className="group relative">
          <span className="inline-flex select-none items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-bold hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2">
            {value}
            <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-500 group-hover:text-gray-500" />
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mt-1 w-full rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {options.map((option: any, index: number, arr: any) => (
            <React.Fragment key={index}>
              {index > 0 && (
                <DropdownMenuSeparator className="h-px bg-gray-300" />
              )}
              <DropdownMenuItem
                onSelect={() => onSelect(option)}
                className="group flex cursor-pointer select-none justify-between rounded-md px-4 py-2 text-sm font-medium text-gray-900 hover:bg-indigo-400 hover:text-white"
                style={{
                  borderRadius:
                    index === 0
                      ? '0.375rem 0.375rem 0 0'
                      : index === arr.length - 1
                      ? '0 0 0.375rem 0.375rem'
                      : '0',
                }}
              >
                <span className="font-bold">{option}</span>
                {index !== 0 && (
                  <span className="hover-gray-400-to-white ml-10">10%</span>
                )}
              </DropdownMenuItem>
            </React.Fragment>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
