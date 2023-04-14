import { FC } from 'react'
import DurationSelect from './DurationSelect'
import InfoRow from './InfoRow'
import LoanInfo from './LoanInfo'
import { DurationSelectOption } from './types'

type Props = {
  durationSelectOptions: DurationSelectOption[]
  getTotalCostInEthOfDurationSelectOption: (
    duration: DurationSelectOption
  ) => number
  getDownPaymentInEthOfDurationSelectOption: (
    duration: DurationSelectOption
  ) => number
  selectedDuration: DurationSelectOption
  setSelectedDuration: (duration: DurationSelectOption) => void
  setOpen: (open: boolean) => void
}

const Section: FC<Props> = ({
  durationSelectOptions,
  getTotalCostInEthOfDurationSelectOption,
  getDownPaymentInEthOfDurationSelectOption,
  selectedDuration,
  setSelectedDuration,
  setOpen,
}) => {
  return (
    <div
      className="max-w-md p-1 text-slate-50"
      style={{ minWidth: 'min(400px, 100vw)' }}
    >
      <div className="flex justify-between">
        <div className="font-semibold" style={{ fontFamily: 'Mulish' }}>
          FINANCING
        </div>
        <div style={{ marginTop: '-0.5rem' }}>
          <DurationSelect
            isDarkMode={process.env.NEXT_PUBLIC_DARK_MODE === 'true'}
            durationSelectOptions={durationSelectOptions}
            duration={selectedDuration}
            setDuration={setSelectedDuration}
          />
        </div>
      </div>

      {typeof selectedDuration !== 'string' ? (
        <>
          <div className="mt-12">
            <LoanInfo
              isDarkMode={process.env.NEXT_PUBLIC_DARK_MODE === 'true'}
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
        </>
      ) : (
        <div className="mt-4">
          <InfoRow
            isDarkMode={process.env.NEXT_PUBLIC_DARK_MODE === 'true'}
            rowName="Total Cost"
            rowValue={`${getTotalCostInEthOfDurationSelectOption(
              selectedDuration
            )} ETH`}
          />
        </div>
      )}
      <div className="mt-16 flex justify-center">
        <button
          className="w-full max-w-sm rounded-full border-2 border-black bg-white py-4 font-bold text-black focus:outline-none"
          onClick={() => setOpen(true)}
        >
          PURCHASE
        </button>
      </div>
      <div className="mt-4 text-center italic">Powered by NiftyApes</div>
    </div>
  )
}

export default Section
