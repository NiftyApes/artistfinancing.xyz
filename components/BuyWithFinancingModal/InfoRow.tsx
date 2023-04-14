import clsx from 'clsx'
import { FC } from 'react'
import Tooltip from './Tooltip'

type Props = {
  isDarkMode: boolean
  rowName: string
  rowValue: string
  rowTooltipText?: string
}

const InfoRow: FC<Props> = ({
  isDarkMode,
  rowName,
  rowValue,
  rowTooltipText,
}) => {
  return (
    <div className="flex justify-between">
      <div className="mb-1">
        <span className={clsx(!isDarkMode && 'text-gray-500')}>{rowName}</span>
        <span>
          {rowTooltipText && (
            <Tooltip
              modeOverride={isDarkMode ? 'dark' : 'light'}
              tooltipText={rowTooltipText}
            />
          )}
        </span>
      </div>

      <div>{rowValue}</div>
    </div>
  )
}

export default InfoRow
