import useEnvChain from 'hooks/useEnvChain'
import { truncateAddress } from 'lib/truncateText'
import React, { FC, useState } from 'react'
import { TokenDetails } from 'types/reservoir'
import { setToast } from './setToast'

const PROXY_API_BASE = process.env.NEXT_PUBLIC_PROXY_API_BASE

type Props = {
  token?: TokenDetails
}

const TokenInfo: FC<Props> = ({ token }) => {
  const [refreshLoading, setRefreshLoading] = useState(false)
  const envChain = useEnvChain()

  const blockExplorerBaseUrl =
    envChain?.blockExplorers?.default?.url || 'https://etherscan.io'

  async function refreshToken(token: string | undefined) {
    function handleError(message?: string) {
      setToast({
        kind: 'error',
        message: message || 'Request to refresh this token was rejected.',
        title: 'Refresh token failed'
      })

      setRefreshLoading(false)
    }

    try {
      if (!token) throw new Error('No token')

      const data = {
        token
      }

      const pathname = `${PROXY_API_BASE}/tokens/refresh/v1`

      setRefreshLoading(true)

      const res = await fetch(pathname, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      if (!res.ok) {
        const json = await res.json()
        handleError(json?.message)
        return
      }

      setToast({
        kind: 'success',
        message: 'Request to refresh this token was accepted.',
        title: 'Refresh token'
      })
    } catch (err) {
      handleError()
      console.error(err)
      return
    }

    setRefreshLoading(false)
  }

  return (
    <div>
      <div className='text-sm uppercase mb-6 text-gray-400'>details</div>
      {token?.contract && (
        <div className='mb-1 flex items-center'>
          <div className='text-gray-400 w-[180px]'>
            Contract Address
          </div>
          <div>
            <a
              className='font-headings text-gray-300 underline'
              target='_blank'
              rel='noopener noreferrer'
              href={`${blockExplorerBaseUrl}/token/${token?.contract}?a=${token?.tokenId}`}
            >
              {truncateAddress(token?.contract)}
            </a>
          </div>
        </div>
      )}

      <div className='mb-1 flex items-center'>
        <div className='text-gray-400 w-[180px]'>Token Standard</div>
        <div className='font-headings text-gray-300 uppercase'>{token?.kind}</div>
      </div>

      <div className='flex items-center'>
        <div className='text-gray-400 w-[180px]'>Blockchain</div>
        <div className='font-headings text-gray-300'>Ethereum</div>
      </div>

      <div className='mt-8'>
        <div className='text-base text-gray-400 float-left'>
          <a target='_blank' rel='noopener noreferrer'
             href={`https://etherscan.io/nft/${token?.contract}/${token?.tokenId}`}
          >
            <img src='/icons/sru-etherscan.svg' alt='Etherscan Icon' className='h-6 w-6 float-left mr-2 w-[17px]' />
            Etherscan
          </a>
        </div>

        <div className='text-base text-gray-400 float-left ml-4'>
          <a target='_blank' rel='noopener noreferrer' href={''}>
            <img src='/icons/sru-metadata.svg' alt='IPFS' className='h-6 w-6 float-left mr-2 w-[17px]' />
            Metadata
          </a>
        </div>

        <div className='text-base text-gray-400 float-left ml-4'>
          <a target='_blank' rel='noopener noreferrer'
             href={token?.image}
          >
            <img src='/icons/sru-ipfs.svg' alt='IPFS' className='h-6 w-6 float-left mr-2 w-[17px]' />
            IPFS
          </a>
        </div>
      </div>

      <div className='clear-left'></div>

    </div>
  )
}

export default TokenInfo
