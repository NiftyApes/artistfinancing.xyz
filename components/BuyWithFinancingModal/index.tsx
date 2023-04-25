import { Offer, useOffers } from '@niftyapes/sdk'
import { useTokens } from '@reservoir0x/reservoir-kit-ui'
import BuyWithFinancingModalPresentational from 'components/BuyWithFinancingModal/BuyWithFinancingModalPresentational'
import Section from 'components/BuyWithFinancingModal/Section'
import Modal from 'components/Modal'
import { useEffect, useState } from 'react'

const buyNow = 'Buy Now'

type Props = {
  collection: string
  nftId: string
}

export function BuyWithFinancingModal({ collection, nftId }: Props) {
  const [open, setOpen] = useState(false)

  const [selectedOffer, setSelectedOffer] = useState<Offer>()

  const [offers, setOffers] = useState<Offer[]>([])

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
    if (offersData.data && offers.length === 0) {
      const offers = offersData.data

      setOffers(offers)

      setSelectedOffer(offers[0])
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
        selectedOffer={selectedOffer}
        setSelectedOffer={setSelectedOffer}
        offers={offers}
      />
      {selectedOffer && (
        <Modal open={open}>
          <BuyWithFinancingModalPresentational
            tokenImgUrl={tokenImgUrl}
            selectedOffer={selectedOffer}
            setSelectedOffer={setSelectedOffer}
            offers={offers}
            closeModal={() => setOpen(false)}
            nameOfWhatYouAreBuying={tokenName}
          />
        </Modal>
      )}
    </div>
  )
}
