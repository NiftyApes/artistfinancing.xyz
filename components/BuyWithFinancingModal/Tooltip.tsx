import { QuestionMarkIcon } from '@radix-ui/react-icons'
import * as Tooltip from '@radix-ui/react-tooltip'

const TooltipDemo = ({ tooltipText }: { tooltipText: string }) => {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button className="IconButton ml-1 inline-flex items-center justify-center rounded-full border border-gray-300 p-0.5 hover:border-gray-400 focus:border-gray-400 focus:outline-none">
            <QuestionMarkIcon className="h-3 w-3 text-gray-700" />
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="TooltipContent rounded-md border border-gray-200 bg-white p-2 text-black shadow-lg"
            sideOffset={5}
          >
            {tooltipText}
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}

export default TooltipDemo
