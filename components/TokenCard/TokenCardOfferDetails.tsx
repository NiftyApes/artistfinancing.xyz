import { Offer } from '@niftyapes/sdk'
import { formatNumber } from 'lib/numbers'
import { processOffer } from 'lib/processOffer'

export default function TokenCardOfferDetails({ offers }: { offers: Offer[] }) {
  const lowestMonthlyOfferTerms = offers
    .map((offer) => processOffer(offer.offer))
    .reduce((acc, curr) =>
      curr.minPrincipalPerPeriod < acc.minPrincipalPerPeriod ? curr : acc
    )

  return (
    <div className="mt-4 flex space-x-4">
      <div className="w-1/2">
        <div className="text-[13px] text-gray-400">Down Payment</div>
        <div className="text-[13px] font-semibold text-gray-400">
          {formatNumber(lowestMonthlyOfferTerms.downPaymentAmount)}Ξ
        </div>
      </div>
      <div className="w-1/2">
        <div className="text-[13px] text-gray-400">Monthly</div>
        <div className="text-[13px] font-semibold text-gray-400">
          ~
          {formatNumber(
            lowestMonthlyOfferTerms.minPrincipalPerPeriod +
              lowestMonthlyOfferTerms.intPerPeriod
          )}
          Ξ
        </div>
      </div>
    </div>
  )
}
