import clsx from 'clsx'
import { calculateTotalInterest } from 'lib/niftyapes/processOffer'
import { formatNumber } from 'lib/numbers'
import { FC } from 'react'
import NumberFormField from './NumberFormField'
import SelectFormField from './SelectFormField'

type FinancingTerms = {
  price: string
  downPayment: string
  duration: string
  payFreq: string
  apr: string
}

type ProcessedTerms = FinancingTerms & {
  profit: string
  onSale: string
  payments: string
  interest: string
}

type Props = {
  terms: FinancingTerms
  handleFormChange: (key: string, value: string) => void
}

const ListingForm: FC<Props> = ({ terms, handleFormChange }) => {
  const processedTerms = processTerms(terms)

  const formFieldStyles = 'pt-4 first:pt-0'

  return (
    <form className="flex flex-grow flex-col space-y-4 divide-y">
      <div className={formFieldStyles}>
        <NumberFormField
          name="Price"
          descriptor="ETH"
          infoName="Total Profit"
          infoValue={processedTerms.profit}
          defaultValue={processedTerms.price}
          onChange={(value) => {
            handleFormChange('price', value)
          }}
        />
      </div>
      <div className={formFieldStyles}>
        <NumberFormField
          name="Down Payment"
          descriptor="%"
          infoName="On Sale"
          infoValue={processedTerms.onSale}
          defaultValue={processedTerms.downPayment}
          onChange={(value) => {
            handleFormChange('downPayment', value)
          }}
        />
      </div>
      <div className={clsx(formFieldStyles, 'flex flex-col space-y-4')}>
        <NumberFormField
          name="Duration"
          descriptor="Days"
          tooltip="Length of financing, shorter means less interest."
          defaultValue={processedTerms.duration}
          onChange={(value) => {
            handleFormChange('duration', value)
          }}
        />
        <SelectFormField
          name="Payment Freq."
          infoName="Payments"
          infoValue={processedTerms.payments}
          tooltip="How often payments are due from the buyer."
          defaultValue={processedTerms.payFreq}
          options={[
            { value: 'weekly', label: 'Weekly' },
            { value: 'monthly', label: 'Monthly' },
          ]}
          onChange={(value) => {
            handleFormChange('payFreq', value)
          }}
        />
      </div>
      <div className={formFieldStyles}>
        <NumberFormField
          name="APR"
          descriptor="%"
          infoName="Interest"
          infoValue={processedTerms.interest}
          tooltip="Annual cost of borrowing, lower is more attractive for buyers."
          defaultValue={processedTerms.apr}
          onChange={(value) => {
            handleFormChange('apr', value)
          }}
        />
      </div>
    </form>
  )
}

function processTerms(terms: FinancingTerms): ProcessedTerms {
  const termsAsNums = {
    price: Number(terms.price),
    downPayment: Number(terms.downPayment),
    apr: Number(terms.apr),
    payFreq: terms.payFreq === 'weekly' ? 7 : 30, // Convert to explicit days
    duration: Number(terms.duration), // days
  }

  const onSale = (termsAsNums.downPayment / 100) * termsAsNums.price
  const remainingPrincipal = termsAsNums.price - onSale
  const numPayPeriods = Math.ceil(termsAsNums.duration / termsAsNums.payFreq)
  const minPrincipalPerPeriod = remainingPrincipal / numPayPeriods

  // Calculate interest per period.
  // NOTE: If the payment frequency is greater than the duration, we calculate the
  // interest using the duration.
  const periodDuration =
    Math.min(termsAsNums.payFreq, termsAsNums.duration) * 86400 // in seconds
  const interestRatePerSecond = termsAsNums.apr / (365 * 86400)
  const periodInterestRate = interestRatePerSecond * periodDuration
  const totalIntEarned = calculateTotalInterest(
    periodInterestRate,
    remainingPrincipal,
    minPrincipalPerPeriod,
    numPayPeriods
  )
  const intPerPeriod = totalIntEarned / numPayPeriods

  // TODO: Subtract royalties and marketplace fees
  const profit = termsAsNums.price + totalIntEarned

  return {
    ...terms,
    profit: String(formatNumber(profit)),
    onSale: String(formatNumber(onSale)),
    payments: String(formatNumber(minPrincipalPerPeriod)),
    interest: String(formatNumber(intPerPeriod)),
  }
}

export default ListingForm
