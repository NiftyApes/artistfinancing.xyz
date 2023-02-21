import useSWR from 'nifty-swr';
import qs from 'query-string';

import instance from 'lib/niftyapes/AxiosInstance';

type OffersParams = {
  collection?: string,
  creator?: string,
  includeExpired?: boolean,
  nftId?: string,
}

const useOffers = ({ collection, creator, nftId, includeExpired }: OffersParams) => {
  const url = qs.stringifyUrl({
    url: '/offers',
    query: {
      collection,
      creator,
      includeExpired,
      nftId,
    },
  });

  const { data, error, isLoading, mutate } = useSWR(url, instance);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useOffers;
