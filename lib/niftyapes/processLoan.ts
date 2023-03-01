import { formatEther } from 'ethers/lib/utils.js'
import { LoanDetails } from 'hooks/niftyapes/useLoans'

export type ProcessedLoan = LoanDetails & {
  minimumPayment: number
}

export function processLoan(loan: LoanDetails): ProcessedLoan {
  const minPrincipalPerPeriod = Number(
    formatEther(loan.minimumPrincipalPerPeriod)
  )
  const remainingPrincipal = Number(formatEther(loan.remainingPrincipal))
  const periodInterestRate = loan.periodInterestRateBps / 100
  const interestToBePaid = (periodInterestRate / 100) * remainingPrincipal
  let minimumPayment = minPrincipalPerPeriod + interestToBePaid

  // If the remainingPrincipal is less than the minimumPrincipalPerPeriod, the
  // minimumPayment should be the remainingPrincipal + interest
  if (remainingPrincipal < minPrincipalPerPeriod) {
    minimumPayment = remainingPrincipal + interestToBePaid
  }

  return { ...loan, minimumPayment }
}
