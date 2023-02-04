import { BigNumberish } from 'ethers'
import { formatBN } from 'lib/numbers'
import { FC } from 'react'

type Props = {
  amount: BigNumberish | null | undefined
  maximumFractionDigits?: number
  children?: React.ReactNode
  decimals?: number
  fontSize?: number
}

const FormatCurrency: FC<Props> = ({
  amount,
  maximumFractionDigits = 2,
  children,
  decimals,
  fontSize,
}) => {
  const value = formatBN(amount, maximumFractionDigits, decimals)

  return (
    <div className="inline-flex flex-none items-center gap-1">
      {value !== '-' ? children : null}
      <span
        className="flex-grow whitespace-nowrap font-semibold"
        style={{ fontSize: `${fontSize}px` }}
      >
        {value as any}
      </span>
    </div>
  )
}

export default FormatCurrency
