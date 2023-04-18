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
      className={`flex ${orientation === 'horizontal' ? '' : 'flex-col'} ${
        contentPosition === 'above' || contentPosition === 'below'
          ? 'items-center'
          : ''
      }`}
    >
      {events.map((event, index) => {
        const isLastEvent = index === events.length - 1
        const IconComponent = event.reached
          ? event.reachedIcon || event.icon
          : event.icon
        const connectingLineStyle = event.reached
          ? 'border-black'
          : 'border-gray-400'

        return (
          <div
            key={index}
            className={`flex ${
              orientation === 'horizontal' ? 'flex-row' : 'flex-col'
            } items-center ${
              !isLastEvent && orientation === 'horizontal' ? 'mr-4' : ''
            } ${!isLastEvent && orientation === 'vertical' ? 'mb-4' : ''}`}
          >
            <div className="flex items-center">
              <div
                className={`border-solid ${connectingLineStyle} ${
                  orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px'
                } absolute top-1/2 left-1/2`}
              />
              <div
                className={`border-2 p-1 ${
                  event.reached ? 'border-black' : 'border-gray-300'
                }`}
              >
                <IconComponent
                  className={`h-4 w-4 ${
                    event.reached ? 'text-black' : 'text-white'
                  }`}
                />
              </div>
            </div>
            <div
              className={`${
                orientation === 'horizontal'
                  ? contentPosition === 'above'
                    ? 'mb-4'
                    : 'mt-4'
                  : contentPosition === 'left'
                  ? 'mr-4'
                  : 'ml-4'
              } ${orientation === 'horizontal' ? 'inline-block' : ''}`}
            >
              {event.content}
            </div>
          </div>
        )
      })}
    </div>
  )
}
