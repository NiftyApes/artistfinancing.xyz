import { gql, GraphQLClient } from 'graphql-request'
import type { NextApiRequest, NextApiResponse } from 'next'

const SUPER_RARE_API_KEY = process.env.NEXT_PUBLIC_SUPER_RARE_API_KEY || ''
const SUPER_RARE_API_BASE =
  process.env.NEXT_PUBLIC_SUPER_RARE_API_BASE ||
  'https://staging-api.superrare.co'

export interface SuperRareTokenData {
  erc721_token: {
    universal_token_id: string
    contract_address: string
    token_id: number
    erc721_creator: {
      contract_address: string
      token_id: number
      address: string
      creator: {
        id: string
        username: string
        fullname: string
        avatar: string
        bio: string
      }
    }
  } | null
}

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
        erc721_creator {
          contract_address
          token_id
          address
          creator {
            id
            username
            fullname
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

  try {
    const data = await graphQLClient.request<SuperRareTokenData>(
      document,
      { universalTokenId },
      headers
    )
    return res.status(200).send(data)
  } catch (error) {
    return res.status(400).send(error)
  }
}
