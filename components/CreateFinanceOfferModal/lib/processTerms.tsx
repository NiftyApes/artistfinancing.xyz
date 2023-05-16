import { calculateTotalInterest } from 'lib/niftyapes/processOffer'
import { formatNumber } from 'lib/numbers'

export type FinancingTerms = {
  price: string
  downPayment: string
  duration: string
  payFreq: string
  apr: string
}

// TODO: Perhaps choose either `string` or `number`.
export type ProcessedTerms = FinancingTerms & {
  saleTotal: string
  onSale: string
  payments: string
  interest: string
  remainingPrincipal: number
  numPayPeriods: number
  intPerPeriod: number
  minPrincipalPerPeriod: number
  periodInterestRate: number
  payFreqDays: number
}

export function processTerms(terms: FinancingTerms): ProcessedTerms {
  const termsAsNums = {
    price: Number(terms.price),
    downPayment: Number(terms.downPayment),
    apr: Number(terms.apr),
    payFreqDays: terms.payFreq === 'weekly' ? 7 : 30, // Convert to explicit days
    duration: Number(terms.duration), // days
  }

  const onSale = (termsAsNums.downPayment / 100) * termsAsNums.price
  const remainingPrincipal = termsAsNums.price - onSale
  const numPayPeriods = Math.ceil(
    termsAsNums.duration / termsAsNums.payFreqDays
  )
  const minPrincipalPerPeriod = remainingPrincipal / numPayPeriods

  // Calculate interest per period.
  const periodDuration = termsAsNums.payFreqDays * 86400 // in seconds
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
  const saleTotal = termsAsNums.price + totalIntEarned

  return {
    ...terms,
    saleTotal: String(formatNumber(saleTotal)),
    onSale: String(formatNumber(onSale)),
    payments: String(formatNumber(minPrincipalPerPeriod)),
    interest: String(formatNumber(intPerPeriod)),
    remainingPrincipal,
    numPayPeriods,
    intPerPeriod,
    minPrincipalPerPeriod,
    periodInterestRate,
    payFreqDays: termsAsNums.payFreqDays,
  }
}

export type FormErrors = { [key: string]: string }

// validateTerms returns an array of field keys that are invalid
export function validateTerms(terms: FinancingTerms): FormErrors {
  let formErrors: FormErrors = {}

  if (!terms.price || Number(terms.price) <= 0) {
    formErrors['price'] = 'Price'
  }

  if (
    !terms.downPayment ||
    Number(terms.downPayment) < 0 ||
    Number(terms.downPayment) > 100
  ) {
    formErrors['downPayment'] = 'Down Payment'
  }

  if (!terms.duration || Number(terms.duration) <= 0) {
    formErrors['duration'] = 'Duration'
  }

  if (!terms.payFreq) {
    formErrors['payFreq'] = 'Payment Freq.'
  }

  if (!terms.apr || Number(terms.apr) < 0) {
    formErrors['apr'] = 'APR'
  }

  return formErrors
}
