import { FC } from 'react'
import DurationSelect from './DurationSelect'
import ExplanationMsg from './ExplanationMsg'
import InfoRow from './InfoRow'
import LoanInfo from './LoanInfo'
import Timeline from './Timeline'
import { DurationSelectOption } from './types'

type Props = {
  nameOfWhatYouAreBuying?: string
  durationSelectOptions: DurationSelectOption[]
  getTotalCostInEthOfDurationSelectOption: (
    duration: DurationSelectOption
  ) => number
  getDownPaymentInEthOfDurationSelectOption: (
    duration: DurationSelectOption
  ) => number
  selectedDuration: DurationSelectOption
  setSelectedDuration: (duration: DurationSelectOption) => void
}

const PrePurchaseMainContent: FC<Props> = ({
  nameOfWhatYouAreBuying,
  durationSelectOptions,
  getTotalCostInEthOfDurationSelectOption,
  getDownPaymentInEthOfDurationSelectOption,
  selectedDuration,
  setSelectedDuration,
}) => {
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
            isDarkMode={false}
            durationSelectOptions={durationSelectOptions}
            duration={selectedDuration}
            setDuration={setSelectedDuration}
          />
        </div>
      </div>

      {typeof selectedDuration !== 'string' ? (
        <>
          <div className="mt-4">
            <LoanInfo
              isDarkMode={false}
              totalCost={`${getTotalCostInEthOfDurationSelectOption(
                selectedDuration
              )} ETH`}
              downPayment={`~ ${getDownPaymentInEthOfDurationSelectOption(
                selectedDuration
              )} ETH`}
              duration={`${selectedDuration[0]} Days`}
              APR={`${selectedDuration[1]}%`}
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
            isDarkMode={false}
            rowName="Total Cost"
            rowValue={`${getTotalCostInEthOfDurationSelectOption(
              selectedDuration
            )} ETH`}
          />
        </div>
      )}
    </div>
  )
}

export default PrePurchaseMainContent
