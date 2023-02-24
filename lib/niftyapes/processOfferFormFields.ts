import { FinancingFormFields } from 'components/niftyapes/list-financing/FinancingTermsForm'
import { Duration } from 'luxon'
import { Expiration } from './expirationOptions'

export type FinancingTerms = {
  listPrice: number
  downPaymentPercent: number
  apr: number
  loanDurMos: number
  payPeriodDays: number
  expiration: Expiration
  receivedOnSale: number
  remainingPrincipal: number
  minPrincipalPerPeriod: number
  periodInterestRate: number
  periodInterestRateBps: number
  totalIntEarned: number
  intPerPeriod: number
  profit: number
}

export default function processFormValues(
  formFields: FinancingFormFields
): FinancingTerms {
  const fieldNums = {
    listPrice: Number(formFields.listPrice),
    downPaymentPercent: Number(formFields.downPaymentPercent),
    apr: Number(formFields.apr),
    payPeriodDays: formFields.payPeriodDays,
    loanDurMos: Number(formFields.loanDurMos),
    expiration: formFields.expiration,
  }

  const receivedOnSale =
    (fieldNums.downPaymentPercent / 100) * fieldNums.listPrice
  const remainingPrincipal = fieldNums.listPrice - receivedOnSale
  const loanDurDays = Duration.fromObject({
    months: fieldNums.loanDurMos,
  }).as('days')
  const numPayPeriods = Math.ceil(loanDurDays / formFields.payPeriodDays)
  const minPrincipalPerPeriod = remainingPrincipal / numPayPeriods
  // Calculate periodInterestRate basis points
  const periodDuration = fieldNums.payPeriodDays * 86400 // in seconds
  const interestRatePerSecond = fieldNums.apr / (365 * 86400)
  const periodInterestRate = Math.round(interestRatePerSecond * periodDuration)
  const periodInterestRateBps = periodInterestRate * 100
  const totalIntEarned = calculateTotalInterest(
    periodInterestRate,
    remainingPrincipal,
    minPrincipalPerPeriod,
    numPayPeriods
  )
  const intPerPeriod = totalIntEarned / numPayPeriods

  // TODO: Subtract royalties and marketplace fees
  const profit = fieldNums.listPrice + totalIntEarned

  return {
    ...fieldNums,
    receivedOnSale,
    remainingPrincipal,
    minPrincipalPerPeriod,
    periodInterestRate,
    periodInterestRateBps,
    totalIntEarned,
    intPerPeriod,
    profit,
  }
}

function calculateTotalInterest(
  periodInterestRate: number,
  remainingPrincipal: number,
  minPrincipalPerPeriod: number,
  numPayPeriods: number
) {
  let totalIntEarned = 0
  for (let i = 0; i < numPayPeriods; i++) {
    totalIntEarned += (periodInterestRate / 100) * remainingPrincipal
    remainingPrincipal -= minPrincipalPerPeriod
  }

  return totalIntEarned
}
