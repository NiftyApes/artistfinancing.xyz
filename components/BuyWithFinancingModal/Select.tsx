import { Offer } from '@niftyapes/sdk'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import clsx from 'clsx'
import { processOffer } from 'lib/niftyapes/processOffer'
import React from 'react'

type Props = {
  isDarkMode: boolean
  options: Offer[]
  onSelect: (option: Offer) => void
  value: Offer
}

export default function Select({
  isDarkMode,
  options,
  onSelect,
  value,
}: Props) {
  const days =
    processOffer(value.offer).payPeriodDays *
    processOffer(value.offer).numPayPeriods

  const apr = processOffer(value.offer).apr

  return (
    <div style={{ fontFamily: 'Inter' }}>
      <DropdownMenu>
        <DropdownMenuTrigger
          className={clsx(
            'group relative rounded border',
            isDarkMode
              ? 'border-gray-300 bg-gray-900 hover:bg-gray-800'
              : 'border-gray-300 bg-white hover:bg-gray-50'
          )}
        >
          <span className="inline-flex select-none items-center justify-center rounded-md px-4 py-2 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2">
            {`${days} Days`}
            <ChevronDownIcon
              className={clsx(
                'ml-2 h-5 w-5 stroke-2',
                isDarkMode ? 'text-gray-300' : 'text-gray-500'
              )}
            />
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className={clsx(
            'mt-1 w-full rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none',
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          )}
        >
          {options.map((option: any, index: number, arr: any) => (
            <React.Fragment key={index}>
              {index > 0 && (
                <DropdownMenuSeparator className="h-px bg-gray-300" />
              )}
              <DropdownMenuItem
                onSelect={() => onSelect(option)}
                className={clsx(
                  'group flex cursor-pointer select-none justify-between px-4 py-2 text-sm font-medium',
                  isDarkMode
                    ? 'text-gray-300 hover:bg-indigo-500 hover:text-white'
                    : 'text-gray-900 hover:bg-indigo-400 hover:text-white',
                  {
                    'rounded-t-md': index === 0,
                    'rounded-b-md': index === arr.length - 1,
                  }
                )}
              >
                <span className="font-bold">
                  {typeof option === 'string' ? option : `${days} Days`}
                </span>
                {typeof option !== 'string' && (
                  <span
                    className={clsx(
                      'ml-10',
                      !isDarkMode && 'text-gray-300 hover:text-white'
                    )}
                  >{`${apr}%`}</span>
                )}
              </DropdownMenuItem>
            </React.Fragment>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
