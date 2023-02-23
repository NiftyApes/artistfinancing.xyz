import { useQuery } from 'react-query'
import qs from 'query-string'

import instance from 'lib/niftyapes/AxiosInstance'

type LoansParams = {
  owner?: string
  creator?: string
}

export const useLoans = ({
                           creator,
                           owner
                         }: LoansParams) => {
  const url = qs.stringifyUrl({
    url: '/loans',
    query: {
      creator,
      owner
    }
  })

  const getLoans = () => instance.get(url)

  const { data, error, isLoading } = useQuery(
    [
      'loans',
      {
        creator,
        owner
      }
    ],
    getLoans
  )

  return {
    data,
    error,
    isLoading
  }
}

export default useLoans;
