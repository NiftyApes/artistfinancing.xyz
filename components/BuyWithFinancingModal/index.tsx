import { Offer, useOffers } from '@niftyapes/sdk'
import { useTokens } from '@reservoir0x/reservoir-kit-ui'
import BuyWithFinancingModal from 'components/BuyWithFinancingModal/BuyWithFinancingModalPresentational'
import Section from 'components/BuyWithFinancingModal/Section'
import Modal from 'components/Modal'
import { useEffect, useState } from 'react'

type Props = {
  collection: string
  nftId: string
}

export function BuyWithFinancing({ collection, nftId }: Props) {
  const [open, setOpen] = useState(false)

  const [offers, setOffers] = useState<Offer[]>([])

  const [selectedOffer, setSelectedOffer] = useState<Offer>()

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
    return <div>Token not found</div>
  }

  return (
    <div className="mt-24 flex flex-col items-center justify-center">
      {selectedOffer && (
        <>
          <Section
            setOpen={setOpen}
            selectedOffer={selectedOffer}
            setSelectedOffer={setSelectedOffer}
            offers={offers}
          />
          <Modal open={open}>
            <BuyWithFinancingModal
              tokenImgUrl={tokenImgUrl}
              selectedOffer={selectedOffer}
              setSelectedOffer={setSelectedOffer}
              offers={offers}
              closeModal={() => setOpen(false)}
              nameOfWhatYouAreBuying={tokenName}
            />
          </Modal>
        </>
      )}
    </div>
  )
}
