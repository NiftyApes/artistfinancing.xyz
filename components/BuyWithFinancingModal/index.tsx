import { Cross2Icon } from '@radix-ui/react-icons'
import { FC, useState } from 'react'
import NFTImage from './NFTImage'
import PostPurchaseFooter from './PostPurchaseFooter'
import PostPurchaseMainContent from './PostPurchaseMainContent'
import PrePurchaseFooter from './PrePurchaseFooter'
import PrePurchaseMainContent from './PrePurchaseMainContent'
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

const BuyWithFinancingModal: FC<Props> = ({
  nameOfWhatYouAreBuying,
  durationSelectOptions,
  getTotalCostInEthOfDurationSelectOption,
  getDownPaymentInEthOfDurationSelectOption,
}) => {
  const [stage, setStage] = useState<'PRE' | 'POST'>('PRE')

  return (
    <div
      className="relative p-4"
      style={{
        width: 'min(100vw, 960px)',
      }}
    >
      <div className="absolute right-2 top-2">
        <Cross2Icon style={{ width: '32px', height: '32px', strokeWidth: 4 }} />
      </div>
      <div
        className="mb-6 text-center text-xl md:mb-12"
        style={{ fontFamily: 'Mulish' }}
      >
        Buy {nameOfWhatYouAreBuying}
      </div>
      <div className="flex flex-wrap">
        <div className="w-full p-2  md:w-2/5">
          <NFTImage imgSrc="https://ipfs.pixura.io/ipfs/QmYMW5cEt5HxCqiggN3PHSSLhF62Q5G7oNPar5BXyvC65Z/Mutateme.jpg" />
        </div>
        <div className="mt-4 w-full py-1 md:mt-0 md:w-3/5 md:pl-10">
          {stage === 'PRE' ? (
            <PrePurchaseMainContent
              nameOfWhatYouAreBuying={nameOfWhatYouAreBuying}
              durationSelectOptions={durationSelectOptions}
              getTotalCostInEthOfDurationSelectOption={
                getTotalCostInEthOfDurationSelectOption
              }
              getDownPaymentInEthOfDurationSelectOption={
                getDownPaymentInEthOfDurationSelectOption
              }
            />
          ) : (
            <PostPurchaseMainContent
              nameOfWhatYouAreBuying={nameOfWhatYouAreBuying}
            />
          )}
        </div>
      </div>

      <div className="mt-8 w-full border-t border-gray-300 pt-8 md:border-none">
        {stage === 'PRE' ? (
          <PrePurchaseFooter onSuccessfulPurchase={() => setStage('POST')} />
        ) : (
          <PostPurchaseFooter />
        )}
      </div>
    </div>
  )
}

export default BuyWithFinancingModal
