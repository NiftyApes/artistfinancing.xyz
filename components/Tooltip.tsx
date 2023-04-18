import React from 'react'
import * as RadixTooltip from '@radix-ui/react-tooltip'

export type Side = 'top' | 'bottom' | 'left' | 'right'

interface Props extends RadixTooltip.TooltipProps {
  content: string
  children: React.ReactNode
  side?: Side
  modeOverride?: 'light' | 'dark'
}

const Tooltip = ({
  content,
  children,
  side,
  modeOverride,
  ...props
}: Props) => {
  let arrowStyles = 'fill-black dark:fill-white'
  let contentStyles = 'bg-black text-white dark:bg-white dark:text-black'

  if (modeOverride === 'light') {
    arrowStyles = 'fill-black'
    contentStyles = 'bg-black text-white'
  }

  if (modeOverride === 'dark') {
    arrowStyles = 'fill-white'
    contentStyles = 'bg-white text-black'
  }

  return (
    <RadixTooltip.Provider>
      <RadixTooltip.Root delayDuration={300} {...props}>
        <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
        <RadixTooltip.Content
          side={side}
          className="data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade"
        >
          <div
            className={`align-center p-2 text-center text-sm ${contentStyles}`}
          >
            {content}
          </div>
          <RadixTooltip.Arrow className={`${arrowStyles}`} />
        </RadixTooltip.Content>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  )
}

export default Tooltip
