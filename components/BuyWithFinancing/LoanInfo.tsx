import { FC, useMemo } from 'react'
import InfoRow from './InfoRow'

type Props = {
  isDarkMode: boolean
  totalCost: string
  downPayment: string
  duration: string
  APR: string
}

const LoanInfo: FC<Props> = ({
  isDarkMode,
  totalCost,
  downPayment,
  duration,
  APR,
}) => {
  const rows = useMemo(
    () => [
      ['Total Cost', totalCost + ' Ξ'],
      ['Down Payment', downPayment + ' Ξ'],
      [
        'Duration',
        duration,
        'Length of financing, shorter means less interest.',
      ],
      ['APR', APR, 'Annual cost of borrowing, lower is better.'],
    ],
    [totalCost, downPayment, duration, APR]
  )

  return (
    <div style={{ fontFamily: 'Inter' }}>
      {rows.map((row, i) => (
        <InfoRow
          isDarkMode={isDarkMode}
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
