import { Offer } from '@niftyapes/sdk'
import { processOffer } from 'lib/niftyapes/processOffer'
import { FC } from 'react'
import DurationSelect from './DurationSelect'
import ExplanationMsg from './ExplanationMsg'
import LoanInfo from './LoanInfo'
import Timeline from './Timeline'

type Props = {
  nameOfWhatYouAreBuying?: string
  offers: Offer[]
  selectedOffer: Offer
  setSelectedOffer: (duration: Offer) => void
}

const PrePurchaseMainContent: FC<Props> = ({
  nameOfWhatYouAreBuying,
  offers,
  selectedOffer,
  setSelectedOffer,
}) => {
  return (
    <div>
      <div className="flex justify-between">
        <div
          className="text-lg font-semibold leading-6"
          style={{ fontFamily: 'Poppins' }}
        >
          {nameOfWhatYouAreBuying}
        </div>
        <div style={{ marginTop: '-0.5rem' }}>
          <DurationSelect
            isDarkMode={false}
            offers={offers}
            selectedOffer={selectedOffer}
            setSelectedOffer={setSelectedOffer}
          />
        </div>
      </div>

      <div className="mt-4">
        <LoanInfo
          isDarkMode={false}
          totalCost={processOffer(selectedOffer.offer).totalCost + ''}
          downPayment={processOffer(selectedOffer.offer).downPaymentAmount + ''}
          duration={`${
            processOffer(selectedOffer.offer).numPayPeriods *
            processOffer(selectedOffer.offer).payPeriodDays
          } Days`}
          APR={`${processOffer(selectedOffer.offer).apr}%`}
        />
      </div>

      <div className="mt-12">
        <Timeline offer={selectedOffer} />
      </div>

      <div className="mt-12">
        <ExplanationMsg />
      </div>
    </div>
  )
}

export default PrePurchaseMainContent
