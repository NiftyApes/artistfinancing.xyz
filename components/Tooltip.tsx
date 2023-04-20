import React from 'react'
import * as RadixTooltip from '@radix-ui/react-tooltip'

export type Side = 'top' | 'bottom' | 'left' | 'right'

interface Props extends RadixTooltip.TooltipProps {
  content: React.ReactNode
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

  if (modeOverride === 'light') {
    arrowStyles = 'fill-black'
  }

  if (modeOverride === 'dark') {
    arrowStyles = 'fill-white'
  }

  return (
    <RadixTooltip.Provider>
      <RadixTooltip.Root delayDuration={300} {...props}>
        <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
        <RadixTooltip.Content
          side={side}
          sideOffset={5}
          className="data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade"
        >
          {content}
          <RadixTooltip.Arrow
            width={16}
            height={8}
            className={`${arrowStyles}`}
          />
        </RadixTooltip.Content>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  )
}

export default Tooltip
