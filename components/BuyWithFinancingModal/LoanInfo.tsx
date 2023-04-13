import { FC, useMemo } from 'react'
import InfoRow from './InfoRow'

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
  const rows = useMemo(
    () => [
      ['Total Cost', totalCost],
      ['Down Payment', downPayment],
      ['Duration', duration, 'Tooltip explaining duration'],
      ['APR', APR, 'Tooltip explaining API'],
    ],
    [totalCost, downPayment, duration, APR]
  )

  return (
    <div style={{ fontFamily: 'Inter' }}>
      {rows.map((row, i) => (
        <InfoRow
          key={i}
          rowName={row[0]}
          rowValue={row[1]}
          rowTooltipText={row[2]}
        />
      ))}
    </div>
  )
}

export default LoanInfo
