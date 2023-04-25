import { Offer } from '@niftyapes/sdk'
import { processOffer } from 'lib/niftyapes/processOffer'
import { FC } from 'react'
import DurationSelect from './DurationSelect'
import LoanInfo from './LoanInfo'

type Props = {
  setOpen: (open: boolean) => void
  offers: Offer[]
  selectedOffer?: Offer
  setSelectedOffer: (duration: Offer) => void
}

const Section: FC<Props> = ({
  setOpen,
  offers,
  selectedOffer,
  setSelectedOffer,
}) => {
  return (
    <div
      className="max-w-md p-1 text-slate-50"
      style={{ minWidth: 'min(400px, 100vw)' }}
    >
      <div className="flex justify-between">
        <div className="font-semibold" style={{ fontFamily: 'Mulish' }}>
          FINANCING
        </div>
        <div style={{ marginTop: '-0.5rem' }}>
          {selectedOffer && (
            <DurationSelect
              isDarkMode={process.env.NEXT_PUBLIC_DARK_MODE === 'true'}
              offers={offers}
              selectedOffer={selectedOffer}
              setSelectedOffer={setSelectedOffer}
            />
          )}
        </div>
      </div>

      {selectedOffer ? (
        <>
          <div className="mt-12">
            <LoanInfo
              isDarkMode={process.env.NEXT_PUBLIC_DARK_MODE === 'true'}
              totalCost={processOffer(selectedOffer.offer).totalCost + ''}
              downPayment={
                processOffer(selectedOffer.offer).downPaymentAmount + ''
              }
              duration={`${
                processOffer(selectedOffer.offer).numPayPeriods *
                processOffer(selectedOffer.offer).payPeriodDays
              } Days`}
              APR={`${processOffer(selectedOffer.offer).apr}%`}
            />
          </div>
        </>
      ) : (
        <div className="mt-4">No offer selected</div>
      )}
      <div className="mt-16 flex justify-center">
        <button
          className="w-full max-w-sm rounded-full border-2 border-black bg-white py-4 font-bold text-black focus:outline-none"
          onClick={() => setOpen(true)}
        >
          PURCHASE
        </button>
      </div>
      <div className="mt-4 text-center italic">Powered by NiftyApes</div>
    </div>
  )
}

export default Section
