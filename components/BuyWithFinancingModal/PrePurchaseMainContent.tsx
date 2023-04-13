import { FC, useState } from 'react'
import DurationSelect from './DurationSelect'
import ExplanationMsg from './ExplanationMsg'
import InfoRow from './InfoRow'
import LoanInfo from './LoanInfo'
import Timeline from './Timeline'
import { DurationSelectOption } from './types'

type Props = {
  nameOfWhatYouAreBuying: string
  durationSelectOptions: DurationSelectOption[]
  getTotalCostInEthOfDurationSelectOption: (
    duration: DurationSelectOption
  ) => number
  getDownPaymentInEthOfDurationSelectOption: (
    duration: DurationSelectOption
  ) => number
}

const PrePurchaseMainContent: FC<Props> = ({
  nameOfWhatYouAreBuying,
  durationSelectOptions,
  getTotalCostInEthOfDurationSelectOption,
  getDownPaymentInEthOfDurationSelectOption,
}) => {
  const [duration, setDuration] = useState(durationSelectOptions[0])

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
          <DurationSelect
            durationSelectOptions={durationSelectOptions}
            duration={duration}
            setDuration={setDuration}
          />
        </div>
      </div>

      {typeof duration !== 'string' ? (
        <>
          <div className="mt-4">
            <LoanInfo
              totalCost={`${getTotalCostInEthOfDurationSelectOption(
                duration
              )} ETH`}
              downPayment={`~ ${getDownPaymentInEthOfDurationSelectOption(
                duration
              )} ETH`}
              duration={`${duration[0]} Days`}
              APR={`${duration[1]}%`}
            />
          </div>
          <div className="mt-12">
            <Timeline />
          </div>
          <div className="mt-12">
            <ExplanationMsg />
          </div>
        </>
      ) : (
        <div className="mt-4">
          <InfoRow
            rowName="Total Cost"
            rowValue={`${getTotalCostInEthOfDurationSelectOption(
              duration
            )} ETH`}
          />
        </div>
      )}
    </div>
  )
}

export default PrePurchaseMainContent
