import { FC, useState } from 'react'
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
}

const Section: FC<Props> = ({
  durationSelectOptions,
  getTotalCostInEthOfDurationSelectOption,
  getDownPaymentInEthOfDurationSelectOption,
}) => {
  const [duration, setDuration] = useState(durationSelectOptions[0])

  return (
    <div className="max-w-md text-slate-50">
      <div className="flex justify-between">
        <div className="font-semibold" style={{ fontFamily: 'Mulish' }}>
          FINANCING
        </div>
        <div style={{ marginTop: '-0.5rem' }}>
          <DurationSelect
            isDarkMode={process.env.NEXT_PUBLIC_DARK_MODE === 'true'}
            durationSelectOptions={durationSelectOptions}
            duration={duration}
            setDuration={setDuration}
          />
        </div>
      </div>

      {typeof duration !== 'string' ? (
        <>
          <div className="mt-12">
            <LoanInfo
              isDarkMode={process.env.NEXT_PUBLIC_DARK_MODE === 'true'}
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
        </>
      ) : (
        <div className="mt-4">
          <InfoRow
            isDarkMode={process.env.NEXT_PUBLIC_DARK_MODE === 'true'}
            rowName="Total Cost"
            rowValue={`${getTotalCostInEthOfDurationSelectOption(
              duration
            )} ETH`}
          />
        </div>
      )}
      <div className="mt-16 flex justify-center">
        <button className="w-full max-w-sm rounded-full border-2 border-black bg-white py-3 font-bold text-black focus:outline-none">
          PURCHASE
        </button>
      </div>
      <div className="mt-4 text-center italic">Powered by NiftyApes</div>
    </div>
  )
}

export default Section
