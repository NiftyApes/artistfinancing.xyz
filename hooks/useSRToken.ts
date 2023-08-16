import useSWR from 'swr'
import { gql, GraphQLClient } from 'graphql-request'

// universalTokenId is a concatenation of `contractAddress-tokenId`
export default function useSRToken(contractAddress: string, tokenId: string) {
  const endpoint = 'https://staging-api.superrare.co/graphql'

  const graphQLClient = new GraphQLClient(endpoint, {
    credentials: 'include',
    mode: 'no-cors',
  })

  const universalTokenId = `${contractAddress}-${tokenId}`

  const document = gql`
    {
      erc721_token(universalTokenId: $universalTokenId) {
        universal_token_id
        contract_address
        token_id
        erc721_owner {
          contract_address
          owner {
            id
            fullname
            about
            avatar
            bio
          }
        }
        erc721_creator {
          contract_address
          token_id
          address
          creator {
            id
            fullname
            about
            avatar
            bio
          }
        }
      }
    }
  `

  const headers = {
    'x-api-key': process.env.NEXT_PUBLIC_SUPER_RARE_API_KEY || '',
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }

  // TODO: Change this.
  interface Data {
    Movie: { releaseDate: string; actors: Array<{ name: string }> }
  }

  const gqlReq = (document: string) =>
    graphQLClient.request<Data>(document, { universalTokenId }, headers)

  return useSWR(document, gqlReq)
}
