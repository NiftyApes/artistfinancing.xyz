import { useQuery } from 'react-query'
import qs from 'query-string'

import instance from 'lib/niftyapes/AxiosInstance'

type OffersParams = {
  collection?: string
  creator?: string
  includeExpired?: boolean
  nftId?: string
}

const useOffers = ({
  collection,
  creator,
  nftId,
  includeExpired,
}: OffersParams) => {
  const url = qs.stringifyUrl({
    url: '/offers',
    query: {
      collection,
      creator,
      includeExpired,
      nftId,
    },
  })

  const getOffers = () => instance.get(url)

  const { data, error, isLoading } = useQuery(
    [
      'offers',
      {
        collection,
        creator,
        includeExpired,
        nftId,
      },
    ],
    getOffers
  )

  return {
    data,
    error,
    isLoading,
  }
}

export default useOffers
