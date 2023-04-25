import { useOffers } from '@niftyapes/sdk'
import { useTokens } from '@reservoir0x/reservoir-kit-ui'
import BuyWithFinancingModalPresentational from 'components/BuyWithFinancingModal/BuyWithFinancingModalPresentational'
import Section from 'components/BuyWithFinancingModal/Section'
import { DurationSelectOption } from 'components/BuyWithFinancingModal/types'
import Modal from 'components/Modal'
import { processOffer } from 'lib/niftyapes/processOffer'
import _ from 'lodash'
import { useEffect, useState } from 'react'

const buyNow = 'Buy Now'

type Props = {
  collection: string
  nftId: string
}

export function BuyWithFinancingModal({ collection, nftId }: Props) {
  const [open, setOpen] = useState(false)

  const [selectedDuration, setSelectedDuration] =
    useState<DurationSelectOption>(buyNow)

  const [durationSelectOptions, setDurationSelectOptions] = useState<
    DurationSelectOption[]
  >([])

  const tokenData = useTokens({
    tokens: [`${collection}:${nftId}`],
    includeTopBid: true,
    includeAttributes: true,
    includeDynamicPricing: true,
  })

  const offersData = useOffers({
    collection,
    nftId,
  })

  useEffect(() => {
    if (offersData.data && durationSelectOptions.length === 0) {
      const offers = offersData.data

      const processedOffers = offers.map((offer) => processOffer(offer.offer))

      const durations = _.sortBy(
        processedOffers,
        (offer) => offer.numPayPeriods
      ).map((offer) => {
        const duration = offer.payPeriodDays * offer.numPayPeriods

        return [duration, offer.apr] as [number, number]
      })

      setDurationSelectOptions([buyNow, ...durations])
      setSelectedDuration(durations[0])
    }
  }, [offersData])

  const token = tokenData?.data?.[0]

  const tokenImgUrl = token?.token?.image

  const tokenName = token?.token?.name

  if (tokenData.isFetchingInitialData) {
    return <div>Loading...</div>
  }

  if (!tokenData.isFetchingInitialData && !token) {
    return null
  }

  return (
    <div className="mt-24 flex flex-col items-center justify-center">
      <Section
        setOpen={setOpen}
        selectedDuration={selectedDuration}
        setSelectedDuration={setSelectedDuration}
        durationSelectOptions={durationSelectOptions}
        getDownPaymentInEthOfDurationSelectOption={(duration) => {
          return Math.floor(Math.random() * 10) + 10
        }}
        getTotalCostInEthOfDurationSelectOption={(duration) => {
          return Math.floor(Math.random() * 20) + 20
        }}
      />
      <Modal open={open}>
        <BuyWithFinancingModalPresentational
          tokenImgUrl={tokenImgUrl}
          selectedDuration={selectedDuration}
          setSelectedDuration={setSelectedDuration}
          closeModal={() => setOpen(false)}
          nameOfWhatYouAreBuying={tokenName}
          durationSelectOptions={durationSelectOptions}
          getDownPaymentInEthOfDurationSelectOption={(duration) => {
            return Math.floor(Math.random() * 10) + 10
          }}
          getTotalCostInEthOfDurationSelectOption={(duration) => {
            return Math.floor(Math.random() * 20) + 20
          }}
        />
      </Modal>
    </div>
  )
}
