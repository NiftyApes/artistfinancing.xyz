import { FC } from 'react'
import TooltipDemo from './Tooltip'

type Props = {
  rowName: string
  rowValue: string
  rowTooltipText?: string
}

const InfoRow: FC<Props> = ({ rowName, rowValue, rowTooltipText }) => {
  return (
    <div className="flex justify-between">
      <div className="mb-1">
        <span className="text-gray-500">{rowName}</span>
        <span>
          {rowTooltipText && <TooltipDemo tooltipText={rowTooltipText} />}
        </span>
      </div>

      <div>{rowValue}</div>
    </div>
  )
}

export default InfoRow
