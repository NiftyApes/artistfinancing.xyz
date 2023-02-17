import { Address } from 'wagmi'
import { getApiUrl } from './getApiUrl'

export async function saveSignatureOfferInDb({
  chainId,
  creator,
  downPaymentAmount,
  expiration,
  minimumPrincipalPerPeriod,
  nftId,
  nftContractAddress,
  periodDuration,
  periodInterestRateBps,
  price,
  signature,
}: {
  chainId: number
  creator: Address
  downPaymentAmount: string
  expiration: number
  minimumPrincipalPerPeriod: string
  nftId: string
  nftContractAddress: Address
  periodDuration: number
  periodInterestRateBps: number
  price: string
  signature: string
}) {
  await fetch(getApiUrl(chainId, 'offers'), {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      offer: {
        creator,
        downPaymentAmount,
        expiration,
        minimumPrincipalPerPeriod,
        nftId,
        nftContractAddress,
        periodDuration,
        periodInterestRateBps,
        price,
      },
      signature,
    }),
  })
}
