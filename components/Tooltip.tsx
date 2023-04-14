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
  let arrowStyles = 'fill-neutral-600 dark:fill-neutral-200'
  let contentStyles =
    'bg-neutral-600 text-white dark:bg-neutral-200 dark:text-black'

  if (modeOverride === 'light') {
    arrowStyles = 'fill-neutral-600'
    contentStyles = 'bg-neutral-600 text-white'
  }

  if (modeOverride === 'dark') {
    arrowStyles = 'fill-neutral-200'
    contentStyles = 'bg-neutral-200 text-black'
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
