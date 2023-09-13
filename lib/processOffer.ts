import { Address, Offer } from '@niftyapes/sdk'
import { useTokens } from '@reservoir0x/reservoir-kit-ui'
import { BigNumber } from 'ethers'
import { formatEther } from 'ethers/lib/utils.js'
import { DateTime, Duration } from 'luxon'

export type FinancingTerms = {
  tokenId: string
  collection: Address
  listPrice: number
  apr: number
  loanDurMos: number
  loanDurDays: number
  payPeriodDays: number
  expirationRelative?: string
  downPaymentAmount: number
  minPrincipalPerPeriod: number
  intPerPeriod: number
  tokenName?: string
  collectionName?: string
  image?: string
}

export function processOffer(
  offerDetails: Offer['offer'],
  tokenContainer?: ReturnType<typeof useTokens>['data'][0]
): FinancingTerms {
  const token: Record<string, any> = tokenContainer?.token || {}
  const tokenId = offerDetails.nftId
  const collection = offerDetails.nftContractAddress

  const listPrice = Number(formatEther(offerDetails.price))
  const downPaymentAmount = Number(formatEther(offerDetails.downPaymentAmount))
  const remainingPrincipal = listPrice - downPaymentAmount
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

  const remPrinBN = BigNumber.from(offerDetails.price).sub(
    BigNumber.from(offerDetails.downPaymentAmount)
  )
  const minPrinBN = BigNumber.from(offerDetails.minimumPrincipalPerPeriod)
  const numPayPeriods = remPrinBN.gt(0)
    ? remPrinBN.div(minPrinBN).toNumber()
    : 0

  const loanDurMos = Math.round(
    Duration.fromObject({
      days: payPeriodDays * numPayPeriods,
    }).as('months')
  )

  const loanDurDays = Math.round(
    Duration.fromObject({
      days: payPeriodDays * numPayPeriods,
    }).as('days')
  )

  // Calculate int per period
  const periodInterestRate = offerDetails.periodInterestRateBps / 100
  const totalIntEarned = calculateTotalInterest(
    periodInterestRate,
    remainingPrincipal,
    minPrincipalPerPeriod,
    numPayPeriods
  )
  const intPerPeriod = totalIntEarned / numPayPeriods

  return {
    image: token?.image,
    tokenId,
    collection,
    tokenName: token?.name || `#${tokenId}`,
    collectionName: token?.collection?.name || '',
    listPrice,
    downPaymentAmount,
    apr,
    intPerPeriod,
    minPrincipalPerPeriod,
    payPeriodDays,
    loanDurMos,
    loanDurDays,
    expirationRelative: DateTime.fromSeconds(
      offerDetails.expiration
    ).toRelative()!,
  }
}

function calculateAPR(
  periodInterestRateBps: number,
  periodDuration: number
): number {
  const interestRatePerSecond = periodInterestRateBps / periodDuration / 100
  return Math.round(interestRatePerSecond * (365 * 86400))
}

export const calculateTotalInterest = (
  periodInterestRate: number,
  remainingPrincipal: number,
  minPrincipalPerPeriod: number,
  numPayPeriods: number
) => {
  let totalIntEarned = 0
  for (let i = 0; i < numPayPeriods; i++) {
    totalIntEarned += (periodInterestRate / 100) * remainingPrincipal
    remainingPrincipal -= minPrincipalPerPeriod
  }

  return totalIntEarned
}
