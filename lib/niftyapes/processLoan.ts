import { isAfter } from 'date-fns'
import { formatEther } from 'ethers/lib/utils.js'
import { LoanDetails } from 'hooks/niftyapes/useLoans'
import { OfferDetails } from 'hooks/niftyapes/useOffers'

export type ProcessedLoan = LoanDetails & {
  minimumPayment: number
  isPastDue: boolean
}

export function processLoan(loan: LoanDetails, offer?: OfferDetails): ProcessedLoan {
  const minPrincipalPerPeriod = Number(
    formatEther(loan.minimumPrincipalPerPeriod)
  )
  const remainingPrincipal = Number(formatEther(loan.remainingPrincipal))
  const periodInterestRate = loan.periodInterestRateBps / 100
  const interestToBePaid = (periodInterestRate / 100) * remainingPrincipal
  const isPastDue = offer?.expiration ? isAfter(new Date(), new Date(offer.expiration)) : true

  let minimumPayment = minPrincipalPerPeriod + interestToBePaid

  // If the remainingPrincipal is less than the minimumPrincipalPerPeriod, the
  // minimumPayment should be the remainingPrincipal + interest
  if (remainingPrincipal < minPrincipalPerPeriod) {
    minimumPayment = remainingPrincipal + interestToBePaid
  }

  return { ...loan, minimumPayment, isPastDue }
}
