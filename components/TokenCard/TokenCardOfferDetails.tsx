import { Offer } from '@niftyapes/sdk'
import { processOffer } from 'lib/processOffer'

export default function TokenCardOfferDetails({ offer }: { offer: Offer }) {
  const terms = processOffer(offer.offer)

  return (
    <div className="mt-2 flex space-x-4">
      <div className="w-1/2">
        <div className="text-[13px] text-gray-400">Down Payment</div>
        <div className="text-[13px] font-semibold text-gray-400">
          {terms.listPrice}Ξ
        </div>
      </div>
      <div className="w-1/2">
        <div className="text-[13px] text-gray-400">Monthly</div>
        <div className="text-[13px] font-semibold text-gray-400">
          {terms.listPrice}Ξ
        </div>
      </div>
    </div>
  )
}
