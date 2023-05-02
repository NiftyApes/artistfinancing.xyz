import { Offer, useOffers } from '@niftyapes/sdk'
import { useTokens } from '@reservoir0x/reservoir-kit-ui'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { BuyWithFinancingHookContainer } from './BuyWithFinancingHookContainer'

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

  const { address } = useAccount()

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
      {selectedOffer && address ? (
        <BuyWithFinancingHookContainer
          address={address}
          selectedOffer={selectedOffer}
          setSelectedOffer={setSelectedOffer}
          offers={offers}
          setOpen={setOpen}
          open={open}
          tokenImgUrl={tokenImgUrl}
          tokenName={tokenName}
        />
      ) : !selectedOffer ? (
        'no selected offer'
      ) : (
        'no wallet address'
      )}
    </div>
  )
}
