import { FC, useState } from 'react'
import DurationSelect from './DurationSelect'
import LoanInfo from './LoanInfo'

type Props = {
  nameOfWhatYouAreBuying: string
}

const PrePurchaseSideContent: FC<Props> = ({
  nameOfWhatYouAreBuying,
}: {
  nameOfWhatYouAreBuying: string
}) => {
  const [duration, setDuration] = useState('1 month')

  return (
    <div>
      <div className="flex justify-between">
        <strong>{nameOfWhatYouAreBuying}</strong>
        <DurationSelect duration={duration} setDuration={setDuration} />
      </div>
      <LoanInfo totalCost="100" downPayment="10" duration={duration} APR="10" />
    </div>
  )
}

export default PrePurchaseSideContent
