import { Offer } from '@niftyapes/sdk'
import { processOffer } from 'lib/niftyapes/processOffer'
import _ from 'lodash'
import { FC, useMemo } from 'react'
import { FiClock } from 'react-icons/fi'
import { Timeline as BaseTimeline } from '../Timeline'

type Props = {
  offer: Offer
}

const Timeline: FC<Props> = ({ offer }) => {
  const events = useMemo(() => {
    let remainingPrincipal = processOffer(offer.offer).totalCost

    return _.times(processOffer(offer.offer).numPayPeriods, (i) => {
      if (i === 0) {
        remainingPrincipal -= processOffer(offer.offer).downPaymentAmount
      } else {
        remainingPrincipal -= processOffer(offer.offer).minPrincipalPerPeriod
      }

      return {
        icon: FiClock,
        content: (
          <p className="text-xs text-gray-400">
            {i > 0 ? (
              <span>{i * processOffer(offer.offer).payPeriodDays} days</span>
            ) : (
              <span>Down payment</span>
            )}
          </p>
        ),
        tooltipContent: (
          <div
            className={`align-center bg-black px-6 py-4 text-center text-sm text-white`}
          >
            {i > 0 ? (
              <span>
                {processOffer(offer.offer).minPrincipalPerPeriod +
                  (remainingPrincipal *
                    processOffer(offer.offer).periodInterestRate) /
                    100}{' '}
                Ξ
              </span>
            ) : (
              <span>{processOffer(offer.offer).downPaymentAmount} Ξ</span>
            )}
          </div>
        ),
        current: i === 0,
      }
    })
  }, [offer])
  return (
    <BaseTimeline
      events={events}
      orientation="horizontal"
      succeedingLine={false}
      precedingLine={false}
    />
  )
}

export default Timeline
