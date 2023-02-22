import { useQuery } from 'react-query'
import qs from 'query-string'

import instance from 'lib/niftyapes/AxiosInstance'

type OffersParams = {
  collection?: string
  creator?: string
  includeExpired?: boolean
  nftId?: string
}

type Offers = {}

const getOffers = async ({
  collection,
  creator,
  nftId,
  includeExpired,
}: OffersParams): Promise<Offers> => {
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
