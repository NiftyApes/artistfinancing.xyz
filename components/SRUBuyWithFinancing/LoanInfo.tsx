import { FC } from 'react'

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
    ['Down Payment', downPayment, 'optional tooltip text #1'],
    ['Duration', duration, 'optional tooltip text #1'],
    ['APR', APR],
  ]

  return (
    <div>
      {rows.map((row, i) => (
        <div key={i}>
          <div>{row[0]}</div>
          <div>{row[1]}</div>
          <div>{row[2]}</div>
        </div>
      ))}
    </div>
  )
}

export default LoanInfo
