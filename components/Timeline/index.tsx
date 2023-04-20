import clsx from 'clsx'
import React from 'react'
import { IconType } from 'react-icons'

type Event = {
  icon: IconType
  reachedIcon?: IconType
  content: React.ReactNode
  reached: boolean
}

type TimelineProps = {
  events: Event[]
  orientation: 'horizontal' | 'vertical'
  contentPosition?: 'above' | 'below' | 'left' | 'right'
}

export const Timeline: React.FC<TimelineProps> = ({
  events,
  orientation,
  contentPosition = orientation === 'horizontal' ? 'below' : 'right',
}) => {
  return (
    <div
      className={clsx(
        'flex h-full w-full justify-around',
        { 'flex-row': orientation === 'horizontal' },
        { 'flex-col': orientation === 'vertical' }
      )}
    >
      {events.map((event, index) => {
        const IconComponent = event.reached
          ? event.reachedIcon || event.icon
          : event.icon

        return (
          <div
            key={index}
            className={clsx(
              'flex flex-grow items-center',
              { 'flex-row': orientation === 'horizontal' },
              { 'flex-col': orientation === 'vertical' }
            )}
          >
            <div
              className={clsx(
                { 'h-full w-[2px] flex-grow': orientation === 'vertical' },
                { 'h-[2px] w-full flex-grow': orientation === 'horizontal' },
                { 'bg-gray-300': !event.reached },
                { 'bg-black': event.reached }
              )}
            />
            <div
              className={clsx('border border-black p-2', {
                'bg-black': event.reached,
                'bg-white': !event.reached,
              })}
            >
              <IconComponent
                className={clsx('h-4 w-4', {
                  'text-white': event.reached,
                  'text-black': !event.reached,
                })}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}
