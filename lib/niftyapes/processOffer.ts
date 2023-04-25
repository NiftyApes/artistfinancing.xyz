import { useTokens } from '@reservoir0x/reservoir-kit-ui'
import { FinancingFormFields } from 'components/niftyapes/list-financing/FinancingTermsForm'
import { formatEther } from 'ethers/lib/utils.js'
import { Offer } from 'hooks/niftyapes/useOffers'
import { DateTime, Duration } from 'luxon'
import { Address } from 'wagmi'
import expirationOptions, { Expiration } from './expirationOptions'

export type FinancingTerms = {
  listPrice: number
  downPaymentPercent: number
  apr: number
  loanDurMos: number
  payPeriodDays: number
  expiration?: Expiration
  expirationRelative?: string
  contract?: Address
  tokenId?: string
  expirationSeconds?: number
  downPaymentAmount?: number
  remainingPrincipal?: number
  minPrincipalPerPeriod?: number
  numPayPeriods: number
  periodDuration?: number
  periodInterestRate?: number
  periodInterestRateBps?: number
  totalIntEarned?: number
  intPerPeriod?: number
  profit?: number
  totalCost?: number
  tokenHref?: string
  tokenName?: string
  collectionName?: string
  image?: string
}

export function processOffer(
  offerDetails: Offer['offer'],
  tokenContainer?: ReturnType<typeof useTokens>['data'][0]
): FinancingTerms {
  const token: Record<string, any> = tokenContainer?.token || {}

  let tokenId: any = offerDetails.nftId
  const contract = offerDetails.nftContractAddress
  const listPrice = Number(formatEther(offerDetails.price))
  const downPaymentAmount = Number(formatEther(offerDetails.downPaymentAmount))
  const remainingPrincipal = listPrice - downPaymentAmount
  const downPaymentPercent = (downPaymentAmount / listPrice) * 100
  const apr = calculateAPR(
    offerDetails.periodInterestRateBps,
    offerDetails.periodDuration
  )
  const minPrincipalPerPeriod = Number(
    formatEther(offerDetails.minimumPrincipalPerPeriod)
  )
  const payPeriodDays = Duration.fromObject({
    seconds: offerDetails.periodDuration,
  }).as('days')

  const numPayPeriods =
    Math.ceil(remainingPrincipal / minPrincipalPerPeriod) || 0

  const loanDurMos = Math.round(
    Duration.fromObject({
      days: payPeriodDays * numPayPeriods,
    }).as('months')
  )

  const periodInterestRate = offerDetails.periodInterestRateBps / 100
  const totalIntEarned = calculateTotalInterest(
    periodInterestRate,
    remainingPrincipal,
    minPrincipalPerPeriod,
    numPayPeriods
  )
  const totalCost = listPrice + totalIntEarned

  return {
    image: token?.image,
    tokenName: token?.name || `#${tokenId}`,
    collectionName: token?.collection?.name || '',
    contract,
    tokenId,
    listPrice,
    downPaymentAmount,
    downPaymentPercent,
    apr,
    minPrincipalPerPeriod,
    payPeriodDays,
    loanDurMos,
    totalCost,
    expirationRelative: DateTime.fromSeconds(
      offerDetails.expiration
    ).toRelative()!,
    tokenHref: `/${contract}/${tokenId}`,
    numPayPeriods,
  }
}

export function processFormValues(
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

  const downPaymentAmount =
    (fieldNums.downPaymentPercent / 100) * fieldNums.listPrice
  const remainingPrincipal = fieldNums.listPrice - downPaymentAmount
  const loanDurDays = Duration.fromObject({
    months: fieldNums.loanDurMos,
  }).as('days')
  const numPayPeriods = Math.ceil(loanDurDays / formFields.payPeriodDays)
  const minPrincipalPerPeriod = remainingPrincipal / numPayPeriods
  // Calculate periodInterestRate basis points
  const periodDuration = fieldNums.payPeriodDays * 86400 // in seconds
  const interestRatePerSecond = fieldNums.apr / (365 * 86400)
  const periodInterestRate = interestRatePerSecond * periodDuration
  const periodInterestRateBps = Math.round(periodInterestRate * 100)
  const totalIntEarned = calculateTotalInterest(
    periodInterestRate,
    remainingPrincipal,
    minPrincipalPerPeriod,
    numPayPeriods
  )
  const intPerPeriod = totalIntEarned / numPayPeriods

  // TODO: Subtract royalties and marketplace fees
  const profit = fieldNums.listPrice + totalIntEarned

  // Calculate expiration in seconds
  const expirationOption = expirationOptions.find(
    (option) => option.value === fieldNums.expiration
  )!

  const expirationSeconds = Math.round(
    DateTime.now()
      .plus({
        [expirationOption.relativeTimeUnit as string]:
          expirationOption.relativeTime,
      })
      .toSeconds()
  )

  return {
    ...fieldNums,
    downPaymentAmount,
    remainingPrincipal,
    minPrincipalPerPeriod,
    numPayPeriods,
    periodDuration,
    periodInterestRate,
    periodInterestRateBps,
    totalIntEarned,
    intPerPeriod,
    profit,
    expirationSeconds,
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

function calculateAPR(
  periodInterestRateBps: number,
  periodDuration: number
): number {
  const interestRatePerSecond = periodInterestRateBps / periodDuration / 100
  return Math.round(interestRatePerSecond * (365 * 86400))
}
