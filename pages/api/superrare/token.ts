import { gql, GraphQLClient } from 'graphql-request'
import type { NextApiRequest, NextApiResponse } from 'next'

const SUPER_RARE_API_KEY = process.env.NEXT_PUBLIC_SUPER_RARE_API_KEY || ''
const SUPER_RARE_API_BASE =
  process.env.NEXT_PUBLIC_SUPER_RARE_API_BASE ||
  'https://staging-api.superrare.co'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    res.status(405)
    return
  }

  const endpoint = new URL('graphql', SUPER_RARE_API_BASE)
  const graphQLClient = new GraphQLClient(endpoint.href)

  const universalTokenId = req.query['id']

  const document = gql`
    query ($universalTokenId: String!) {
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
    'x-api-key': SUPER_RARE_API_KEY,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }

  // TODO: Change this. And export to the hook.
  interface Data {
    Movie: { releaseDate: string; actors: Array<{ name: string }> }
  }

  try {
    const data = await graphQLClient.request<Data>(
      document,
      { universalTokenId },
      headers
    )
    return res.status(200).send(data)
  } catch (error) {
    return res.status(400).send(error)
  }
}
