import { useTokens } from '@reservoir0x/reservoir-kit-ui'
import { Timeline } from 'components/Timeline'
import { formatNumber } from 'lib/numbers'
import { times } from 'lodash'
import { useContext, useMemo } from 'react'
import { FiClock } from 'react-icons/fi'
import Footer from './Footer'
import { processTerms } from './lib/processTerms'
import ListingForm from './ListingForm'
import { CreateListingsStore } from './store'
import TokenImage from './TokenImage'

export default function CustomListing({
  token,
}: {
  token: ReturnType<typeof useTokens>['data'][0]
}) {
  const { state, dispatch } = useContext(CreateListingsStore)

  const handleFormChange = (key: string, value: string) => {
    dispatch({ type: 'update_custom_form_value', payload: { key, value } })
  }

  const events = useMemo(() => {
    const processedTerms = processTerms(state.custom)
    let remainingPrincipal = processedTerms.remainingPrincipal
    let valueReceived = 0

    console.log('numPayPeriods', processedTerms.numPayPeriods)

    // Add 1 to the number of pay periods to include down payment on purchase.
    return times(processedTerms.numPayPeriods + 1, (i) => {
      if (i === 0) {
        valueReceived += Number(processedTerms.onSale)
      } else {
        valueReceived +=
          processedTerms.minPrincipalPerPeriod + processedTerms.intPerPeriod
        // (remainingPrincipal * processedTerms.periodInterestRate) / 100
        remainingPrincipal -= processedTerms.minPrincipalPerPeriod
      }

      return {
        icon: FiClock,
        content: (
          <p className="text-xs text-gray-400">
            {i === 0
              ? 'Purchase'
              : `${i * processedTerms.payFreqDays} days later`}
          </p>
        ),
        tooltipContent: (
          <div
            className={`align-center bg-black px-6 py-4 text-center text-sm text-white`}
          >
            {formatNumber(valueReceived)} ETH
          </div>
        ),
        current: i === 0,
      }
    })
  }, [state.custom])

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex items-start space-x-4">
        <TokenImage
          imageSrc={token?.token?.image}
          previousSale={token?.token?.lastSell?.value}
        />
        <div className="flex-grow py-4 px-2">
          <ListingForm
            terms={state.custom}
            handleFormChange={handleFormChange}
          />
        </div>
      </div>
      <div className="ml-8">
        <Timeline
          events={events}
          // events={[
          //   {
          //     icon: FiClock,
          //     content: <p className="text-xs text-gray-400">Purchase</p>,
          //     tooltipContent: (
          //       <div
          //         className={`align-center bg-black px-6 py-4 text-center text-sm text-white`}
          //       >
          //         0.88 ETH
          //       </div>
          //     ),
          //     current: true,
          //   },
          //   {
          //     icon: FiClock,
          //     content: <p className="text-xs text-gray-400">7 days later</p>,
          //   },
          //   {
          //     icon: FiClock,
          //     content: <p className="text-xs text-gray-400">14 days later</p>,
          //   },
          //   {
          //     icon: FiClock,
          //     content: <p className="text-xs text-gray-400">21 days later</p>,
          //   },
          //   {
          //     icon: FiClock,
          //     content: <p className="text-xs text-gray-400">30 days later</p>,
          //   },
          // ]}
          orientation="horizontal"
          succeedingLine={false}
        />
      </div>
      <Footer />
    </div>
  )
}
