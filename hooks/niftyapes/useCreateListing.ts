import { Expiration } from 'lib/niftyapes/expirationOptions'

export default function useCreateListing() {
  return {
    createListing: async function ({
      listPrice,
      downPaymentPercent,
      interestRatePercent,
      minPrincipalPercent,
      payPeriodDays,
      expiration,
    }: {
      listPrice: number
      downPaymentPercent: number
      interestRatePercent: number
      minPrincipalPercent: number
      payPeriodDays: number
      expiration: Expiration
    }) {
      console.log('diggity')
    },
  }
}
