import { calculateTotalInterest } from 'lib/niftyapes/processOffer'
import { formatNumber } from 'lib/numbers'

export type FinancingTerms = {
  price: string
  downPayment: string
  duration: string
  payFreq: string
  apr: string
}

export type ProcessedTerms = FinancingTerms & {
  profit: string
  onSale: string
  payments: string
  interest: string
}

export function processTerms(terms: FinancingTerms): ProcessedTerms {
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
