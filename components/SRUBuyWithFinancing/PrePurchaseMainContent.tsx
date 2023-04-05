import { FC, useState } from 'react'
import DurationSelect from './DurationSelect'
import ExplanationMsg from './ExplanationMsg'
import LoanInfo from './LoanInfo'
import Timeline from './Timeline'

type Props = {
  nameOfWhatYouAreBuying: string
}

const PrePurchaseMainContent: FC<Props> = ({
  nameOfWhatYouAreBuying,
}: {
  nameOfWhatYouAreBuying: string
}) => {
  const [duration, setDuration] = useState('1 month')

  return (
    <div>
      <strong>{nameOfWhatYouAreBuying}</strong>
      <DurationSelect duration={duration} setDuration={setDuration} />
      <LoanInfo totalCost="100" downPayment="10" duration={duration} APR="10" />
      <Timeline />
      <ExplanationMsg />
    </div>
  )
}

export default PrePurchaseMainContent
