import { Offer } from 'hooks/niftyapes/useOffers'
import { processOffer } from 'lib/niftyapes/processOffer'

export default function TokeCardOfferDetails({ offer }: { offer: Offer }) {
  const terms = processOffer(offer.offer)
  return (
    <div className="mt-2">
      <div className="text-[13px] text-gray-400">List Price</div>
      <div className="text-[13px] font-semibold text-gray-400">
        {terms.listPrice}Ξ
      </div>
    </div>
  )
}
