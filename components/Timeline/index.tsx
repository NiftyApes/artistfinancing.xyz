import clsx from 'clsx'
import Tooltip from 'components/Tooltip'
import React from 'react'
import { IconType } from 'react-icons'

type Event = {
  icon: IconType
  completedIcon?: IconType
  content: React.ReactNode
  tooltipContent?: React.ReactNode
  defaultTooltipOpen?: boolean
  current?: boolean
  completed?: boolean
}

type TimelineProps = {
  events: Event[]
  orientation: 'horizontal' | 'vertical'
  precedingLine?: boolean
  succeedingLine?: boolean
}

export const Timeline: React.FC<TimelineProps> = ({
  events,
  orientation,
  precedingLine = true,
  succeedingLine = true,
}) => {
  const currIndex = events.findIndex((event) => event.current)

  return (
    <div
      className={clsx(
        'flex justify-around',
        { 'w-full flex-row': orientation === 'horizontal' },
        { 'h-full flex-col': orientation === 'vertical' }
      )}
    >
      {events.map((event, index) => {
        // Update current state for consistency. Ensures only one event can be
        // the current event.
        event.current = index === currIndex ? true : false

        // Update completed state for items previous to current. Ensures only
        // events previous to the current event can be completed.
        event.completed = index < currIndex ? true : false

        // Use completed icon if it exists
        const IconComponent = event.completed
          ? event.completedIcon || event.icon
          : event.icon

        // reached represents items past and current
        const reached = event.completed || event.current

        const eventRender = (
          <div
            key={index}
            className={clsx('flex flex-grow items-center', {
              'flex-col space-y-2': orientation === 'horizontal',
              'flex-row space-x-2': orientation === 'vertical',
            })}
          >
            <div
              className={clsx('flex items-center', {
                'w-full flex-row': orientation === 'horizontal',
                'h-full flex-col': orientation === 'vertical',
              })}
            >
              <div
                className={clsx({
                  invisible: index === 0 && !precedingLine,
                  'h-full w-[2px]': orientation === 'vertical',
                  'h-[2px] w-full': orientation === 'horizontal',
                  'bg-gray-300': !reached,
                  'bg-black': reached,
                })}
              />
              <div
                className={clsx('border border-black p-2', {
                  'bg-black': reached,
                  'bg-white': !reached,
                })}
              >
                <IconComponent
                  className={clsx('h-4 w-4', {
                    'text-white': reached,
                    'text-black': !reached,
                  })}
                />
              </div>
              <div
                className={clsx({
                  invisible: index === events.length - 1 && !succeedingLine,
                  'h-full w-[2px]': orientation === 'vertical',
                  'h-[2px] w-full': orientation === 'horizontal',
                  'bg-gray-300': event.current || !reached,
                  'bg-black': !event.current && reached,
                })}
              />
            </div>
            <div>{event.content}</div>
          </div>
        )

        return event.tooltipContent ? (
          <Tooltip
            key={index}
            content={event.tooltipContent}
            defaultOpen={event.defaultTooltipOpen}
            side={orientation === 'horizontal' ? 'top' : 'left'}
            modeOverride="light"
          >
            {eventRender}
          </Tooltip>
        ) : (
          eventRender
        )
      })}
    </div>
  )
}
