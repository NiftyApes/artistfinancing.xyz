import { useTokens } from '@reservoir0x/reservoir-kit-ui'
import { Timeline } from 'components/Timeline'
import { formatNumber } from 'lib/numbers'
import { times } from 'lodash'
import { FC, useContext, useMemo } from 'react'
import { FiClock } from 'react-icons/fi'
import Footer from './Footer'
import { processTerms, validateTerms } from './lib/processTerms'
import OfferForm from './OfferForm'
import { CreateOffersStore } from './store'
import TokenImage from './TokenImage'

type Props = {
  token: ReturnType<typeof useTokens>['data'][0]
}

const CustomOffer: FC<Props> = ({ token }) => {
  const { state, dispatch } = useContext(CreateOffersStore)

  const handleFormChange = (key: string, value: string) => {
    dispatch({ type: 'update_custom_form_value', payload: { key, value } })
  }

  const validateForm = () => {
    const errorKeys = validateTerms(state.custom)

    if (errorKeys.length === 0) {
      console.log('Valid terms. Submitting...')
    } else {
      dispatch({ type: 'update_custom_error_keys', payload: errorKeys })
    }
  }

  const events = useMemo(() => {
    const processedTerms = processTerms(state.custom)
    let remainingPrincipal = processedTerms.remainingPrincipal
    let valueReceived = 0

    // Add 1 to the number of pay periods to include down payment on purchase.
    return times(processedTerms.numPayPeriods + 1, (i) => {
      if (i === 0) {
        valueReceived += Number(processedTerms.onSale)
      } else {
        valueReceived +=
          processedTerms.minPrincipalPerPeriod +
          remainingPrincipal * (processedTerms.periodInterestRate / 100)
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
          <OfferForm terms={state.custom} handleFormChange={handleFormChange} />
        </div>
      </div>
      <div className="ml-8">
        <Timeline
          events={events}
          orientation="horizontal"
          succeedingLine={false}
        />
      </div>
      <Footer type="custom" onSubmit={validateForm} />
    </div>
  )
}

export default CustomOffer
