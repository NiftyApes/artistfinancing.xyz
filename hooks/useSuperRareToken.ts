import fetcher from 'lib/fetcher'
import useSWR from 'swr'
import { SuperRareTokenData } from 'pages/api/superrare/token'

// universalTokenId is a concatenation of `contractAddress-tokenId`
export default function useSuperRareToken(
  contractAddress: string,
  tokenId: string
) {
  const universalTokenId = `${contractAddress}-${tokenId}`
  return useSWR<SuperRareTokenData>(
    `/api/superrare/token?id=${universalTokenId}`,
    fetcher
  )
}
