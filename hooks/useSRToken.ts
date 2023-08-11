import useSWR from 'swr'
import { request, gql } from 'graphql-request'

// universalTokenId is a concatenation of `contractAddress-tokenId`
export default function useSRToken(contractAddress: string, tokenId: string) {
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

  // TODO: Change this.
  interface Data {
    Movie: { releaseDate: string; actors: Array<{ name: string }> }
  }

  const gqlReq = (document: string) =>
    request<Data>('https://staging-api.superrare.co/graphql', document, {
      universalTokenId,
    })
  const { data } = useSWR(document, gqlReq)
}
