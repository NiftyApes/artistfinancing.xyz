import { useQuery } from 'react-query'
import qs from 'query-string'

import instance from 'lib/niftyapes/AxiosInstance'
import { Address } from 'wagmi'

type OffersParams = {
  collection?: string
  creator?: string
  includeExpired?: boolean
  nftId?: string
}

export type OfferDetails = {
  creator: Address
  downPaymentAmount: string
  expiration: number
  minimumPrincipalPerPeriod: string
  nftContractAddress: Address
  nftId: string
  periodDuration: number
  periodInterestRateBps: number
  price: string
}

export type Offer = {
  offer: OfferDetails
  signature: `0x${string}`
  createdAt: number
  status: 'ACTIVE' | 'USED_TO_EXECUTE_LOAN' | 'CANCELLED'
}

const getOffers = async ({
  collection,
  creator,
  nftId,
  includeExpired,
}: OffersParams): Promise<Offer[]> => {
  const url = qs.stringifyUrl({
    url: '/offers',
    query: {
      collection,
      creator,
      includeExpired,
      nftId,
    },
  })

  try {
    const response = await instance.get(url)
    return response.data
  } catch (err) {
    console.error('failed to fetch offers', err)
    throw err
  }
}

const useOffers = ({
  collection,
  creator,
  nftId,
  includeExpired,
}: OffersParams) => {
  return useQuery(
    [
      'offers',
      {
        collection,
        creator,
        includeExpired,
        nftId,
      },
    ],
    () => getOffers({ collection, creator, nftId, includeExpired })
  )
}

export default useOffers