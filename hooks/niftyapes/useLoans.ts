import { useQuery } from 'react-query'
import qs from 'query-string'

import instance from 'lib/niftyapes/AxiosInstance'
import { Address } from 'wagmi'
import { Offer } from './useOffers'

type LoansParams = {
  buyer?: Address
  seller?: Address
}

export type SellerFinancingReceiptNFT = {
  tokenId: string
  owner: Address
  ownerHistory: Address[]
  transferEvents: unknown[] // TODO
}

export type LoanDetails = {
  buyerNftId: string
  sellerNftId: string
  remainingPrincipal: string
  minimumPrincipalPerPeriod: string
  periodInterestRateBps: number
  periodDuration: number
  periodEndTimestamp: number
  periodBeginTimestamp: number
}

export type Loan = {
  loan: LoanDetails
  offer: Offer
  buyerNft: SellerFinancingReceiptNFT
  sellerNft: SellerFinancingReceiptNFT
  paymentHistory: unknown[] // TODO
  status: 'ACTIVE' | 'FULLY_REPAID' | 'ASSET_SEIZED'
}

const getLoans = async ({ buyer, seller }: LoansParams): Promise<Loan[]> => {
  const url = qs.stringifyUrl({
    url: '/loans',
    query: {
      seller: seller,
      buyer: buyer,
    },
  })

  try {
    const response = await instance.get(url)
    return response.data
  } catch (err) {
    console.error('failed to fetch loans', err)
    throw err
  }
}

export const useLoans = ({ seller, buyer }: LoansParams) => {
  return useQuery(
    [
      'loans',
      {
        seller: seller,
        buyer: buyer,
      },
    ],
    () => getLoans({ buyer, seller })
  )
}

export default useLoans
