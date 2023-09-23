import FormatCrypto from 'components/FormatCrypto'
import { ComponentProps, FC } from 'react'

type Props = ComponentProps<typeof FormatCrypto>

const FormatNativeCrypto: FC<Props> = ({
  amount,
  maximumFractionDigits,
  logoWidth,
  fontSize,
}) => {
  const address = '0x0000000000000000000000000000000000000000'
  const decimals = 18

  return (
    <FormatCrypto
      fontSize={fontSize}
      logoWidth={logoWidth}
      amount={amount}
      address={address}
      decimals={decimals}
      maximumFractionDigits={maximumFractionDigits}
    />
  )
}

export default FormatNativeCrypto
