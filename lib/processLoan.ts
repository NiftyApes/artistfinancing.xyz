import { LoanDetails } from '@niftyapes/sdk'
import { isAfter } from 'date-fns'
import { formatEther } from 'viem'

export type ProcessedLoan = LoanDetails & {
  minimumPayment: number
  interestToBePaid: number
  inDefault: boolean
}

export function processLoan(loan: LoanDetails): ProcessedLoan {
  const minPrincipalPerPeriod = Number(
    formatEther(BigInt(loan.minimumPrincipalPerPeriod))
  )
  const remainingPrincipal = Number(
    formatEther(BigInt(loan.remainingPrincipal))
  )
  const periodInterestRate = loan.periodInterestRateBps / 100
  const interestToBePaid = (periodInterestRate / 100) * remainingPrincipal
  const inDefault = isAfter(
    new Date(),
    new Date(loan.periodEndTimestamp * 1000)
  )

  let minimumPayment = minPrincipalPerPeriod + interestToBePaid

  // If the remainingPrincipal is less than the minimumPrincipalPerPeriod, the
  // minimumPayment should be the remainingPrincipal + interest
  if (remainingPrincipal < minPrincipalPerPeriod) {
    minimumPayment = remainingPrincipal + interestToBePaid
  }

  return { ...loan, minimumPayment, interestToBePaid, inDefault }
}
