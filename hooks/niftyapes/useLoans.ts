import { useQuery } from 'react-query'
import qs from 'query-string'

import instance from 'lib/niftyapes/AxiosInstance'

type LoansParams = {
  buyer?: string
  seller?: string
}

export const useLoans = ({
                           seller,
                           buyer
                         }: LoansParams) => {
  const url = qs.stringifyUrl({
    url: '/loans',
    query: {
      seller: seller,
      buyer: buyer
    }
  })

  const getLoans = () => instance.get(url)

  const { data, error, isLoading } = useQuery(
    [
      'loans',
      {
        seller: seller,
        buyer: buyer
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

export default useLoans
