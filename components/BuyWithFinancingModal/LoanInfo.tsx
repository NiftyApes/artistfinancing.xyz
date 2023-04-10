import { FC } from 'react'
import TooltipDemo from './Tooltip'

type Props = {
  totalCost: string
  downPayment: string
  duration: string
  APR: string
}

const LoanInfo: FC<Props> = ({
  totalCost,
  downPayment,
  duration,
  APR,
}: {
  totalCost: string
  downPayment: string
  duration: string
  APR: string
}) => {
  const rows = [
    ['Total Cost', totalCost],
    ['Down Payment', downPayment],
    ['Duration', duration, 'Tooltip explaining duration'],
    ['APR', APR, 'Tooltip explaining API'],
  ]

  return (
    <div style={{ fontFamily: 'Inter' }}>
      {rows.map((row, i) => (
        <div key={i} className="flex justify-between">
          <div className="mb-1">
            <span className="text-gray-500">{row[0]}</span>
            <span>
              {row[2] && <TooltipDemo tooltipText={row[2]} key={i} />}
            </span>
          </div>

          <div>{row[1]}</div>
        </div>
      ))}
    </div>
  )
}

export default LoanInfo
