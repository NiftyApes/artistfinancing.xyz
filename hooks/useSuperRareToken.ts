import fetcher from 'lib/fetcher'
import useSWR from 'swr'

// universalTokenId is a concatenation of `contractAddress-tokenId`
// TODO: import Interface for data and error from the API
export default function useSuperRareToken(
  contractAddress: string,
  tokenId: string
) {
  const universalTokenId = `${contractAddress}-${tokenId}`
  return useSWR(`/api/superrare/token?id=${universalTokenId}`, fetcher)
}
