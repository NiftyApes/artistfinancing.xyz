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
        'flex justify-around',
        { 'w-full flex-row': orientation === 'horizontal' },
        { 'h-full flex-col': orientation === 'vertical' }
      )}
    >
      {events.map((event, index) => {
        const IconComponent = event.reached
          ? event.reachedIcon || event.icon
          : event.icon

        return (
          <div
            key={index}
            className={clsx('flex flex-grow items-center', {
              'flex-col space-y-2':
                orientation === 'horizontal' && contentPosition === 'below',
              'flex-col-reverse space-y-2':
                orientation === 'horizontal' && contentPosition === 'above',
              'flex-row space-x-2':
                orientation === 'vertical' && contentPosition === 'right',
              'flex-row-reverse space-x-2':
                orientation === 'vertical' && contentPosition === 'left',
            })}
          >
            <div className="flex w-full items-center">
              <div
                className={clsx(
                  '',
                  { 'h-full w-[2px]': orientation === 'vertical' },
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
              <div
                className={clsx(
                  '',
                  { 'h-full w-[2px]': orientation === 'vertical' },
                  { 'h-[2px] w-full flex-grow': orientation === 'horizontal' },
                  { 'bg-gray-300': !event.reached },
                  { 'bg-black': event.reached }
                )}
              />
            </div>
            <div>{event.content}</div>
          </div>
        )
      })}
    </div>
  )
}
