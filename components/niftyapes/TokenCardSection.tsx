import { Offer } from 'hooks/niftyapes/useOffers'
import useTokens from 'hooks/useTokens'
import { processOffer } from 'lib/niftyapes/processOffer'
import { Collection } from 'types/reservoir'
import BuyNowPayLaterModal from './bnpl/BuyNowPayLaterModal'
import ListFinancingModal from './list-financing/ListFinancingModal'

export default function TokenCardSection({
                                           token,
                                           collection,
                                           isOwner,
                                           offer
                                         }: {
  token: ReturnType<typeof useTokens>['tokens']['data'][0]
  collection?: Collection
  isOwner: boolean
  offer: Offer
}) {
  const terms = processOffer(offer.offer)
  // click click blink blik
  // LOVE DAO
  // CLICK CLICK LOVE REPEAT

  return (
    <div class="mt-2 mb-4 ml-4 mr-4">

      <div class='pb-4 mb-4 border-b border-gray-500'>
        <div class='text-[13px] text-gray-400'>List Price</div>
        <div class='text-[13px] text-gray-400 font-semibold'>{terms.listPrice}Ξ</div>
      </div>

      {isOwner ? (
        "This is you"
      ) : (
        <BuyNowPayLaterModal
          token={token}
          roundedButton={true}
          offer={offer}
        />
      )}
    </div>
  )
}
