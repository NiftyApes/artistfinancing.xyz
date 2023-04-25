import { useOffers } from '@niftyapes/sdk'
import { useTokens } from '@reservoir0x/reservoir-kit-ui'
import BuyWithFinancingModal from 'components/BuyWithFinancingModal'
import Section from 'components/BuyWithFinancingModal/Section'
import { DurationSelectOption } from 'components/BuyWithFinancingModal/types'
import Modal from 'components/Modal'
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'

const buyNow = 'Buy Now'

export default function BuyWithFinancingModalPage() {
  const [open, setOpen] = useState(false)

  const [selectedDuration, setSelectedDuration] =
    useState<DurationSelectOption>(buyNow)

  const [durationSelectOptions, setDurationSelectOptions] = useState<
    DurationSelectOption[]
  >([])

  const tokenData = useTokens({
    tokens: [`0x01c7851ae4d42f7b649ce168716c78fc25fe3d16:74`],
    includeTopBid: true,
    includeAttributes: true,
    includeDynamicPricing: true,
  })

  const offersData = useOffers({
    collection: '0x01c7851ae4d42f7b649ce168716c78fc25fe3d16',
    nftId: '74',
  })

  useEffect(() => {
    if (offersData.data && durationSelectOptions.length === 0) {
      const offers = offersData.data

      const durations = offers.map((offer) => {
        const duration = 10

        const downPaymentAmount = Number(
          ethers.utils.formatEther(offer.offer.downPaymentAmount)
        )

        return [duration, downPaymentAmount] as [number, number]
      })

      setDurationSelectOptions([buyNow, ...durations])
      setSelectedDuration(durations[0])
    }
  }, [offersData])

  const token = tokenData?.data?.[0]

  const tokenImgUrl = token?.token?.image

  const tokenName = token?.token?.name

  const offers = offersData?.data

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
        <BuyWithFinancingModal
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
