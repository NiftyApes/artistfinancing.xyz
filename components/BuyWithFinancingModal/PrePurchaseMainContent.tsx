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
  const [duration, setDuration] = useState('Buy Now')

  return (
    <div>
      <div className="flex justify-between">
        <div
          className="text-lg font-semibold leading-6"
          style={{ fontFamily: 'Poppins' }}
        >
          {nameOfWhatYouAreBuying}
        </div>
        <div style={{ marginTop: '-0.5rem' }}>
          <DurationSelect duration={duration} setDuration={setDuration} />
        </div>
      </div>

      <div className="mt-4">
        <LoanInfo
          totalCost="100 ETH"
          downPayment={`~ ${10} ETH`}
          duration={duration}
          APR="10%"
        />
      </div>

      <div className="mt-12">
        <Timeline />
      </div>
      <div className="mt-12">
        <ExplanationMsg />
      </div>
    </div>
  )
}

export default PrePurchaseMainContent
