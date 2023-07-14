import { Offer } from '@niftyapes/sdk'
import { useTokens } from '@reservoir0x/reservoir-kit-ui'
import { formatEther } from 'ethers/lib/utils.js'
import { DateTime, Duration } from 'luxon'

export type FinancingTerms = {
  listPrice: number
  apr: number
  loanDurMos: number
  payPeriodDays: number
  expirationRelative?: string
  downPaymentAmount: number
  minPrincipalPerPeriod: number
  tokenName?: string
  tokenId?: string
  collectionName?: string
  image?: string
}

export function processOffer(
  offerDetails: Offer['offer'],
  tokenContainer?: ReturnType<typeof useTokens>['data'][0]
): FinancingTerms {
  const token: Record<string, any> = tokenContainer?.token || {}
  const tokenId: any = offerDetails.nftId

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

  const numPayPeriods =
    Math.ceil(remainingPrincipal / minPrincipalPerPeriod) || 0
  const loanDurMos = Math.round(
    Duration.fromObject({
      days: payPeriodDays * numPayPeriods,
    }).as('months')
  )

  return {
    image: token?.image,
    tokenId,
    tokenName: token?.name || `#${tokenId}`,
    collectionName: token?.collection?.name || '',
    listPrice,
    downPaymentAmount,
    apr,
    minPrincipalPerPeriod,
    payPeriodDays,
    loanDurMos,
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
