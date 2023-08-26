import useEnvChain from 'hooks/useEnvChain'
import { truncateAddress } from 'lib/truncateText'
import { SuperRareToken } from 'pages/api/superrare/token'
import { FC } from 'react'
import { TokenDetails } from 'types/reservoir'

type Props = {
  token?: TokenDetails
  srToken?: SuperRareToken
}

const TokenInfo: FC<Props> = ({ token, srToken }) => {
  const envChain = useEnvChain()

  const blockExplorerBaseUrl =
    envChain?.blockExplorers?.default?.url || 'https://etherscan.io'

  const ipfsUrl =
    srToken?.erc721_token?.nft_image?.image_full || token?.media || token?.image

  const metadataUrl = srToken?.erc721_token?.erc721_metadata?.metadata_uri || ''

  const srTokenPageUrl = srToken?.erc721_token
    ? `https://superrare.com/${token?.contract}/${token?.tokenId}`
    : ''

  return (
    <div>
      <div className="mb-6 text-sm uppercase text-gray-400">details</div>
      {token?.contract && (
        <div className="mb-1 flex items-center">
          <div className="w-[180px] text-gray-400">Contract Address</div>
          <div>
            <a
              className="font-headings text-gray-300 underline"
              target="_blank"
              rel="noopener noreferrer"
              href={`${blockExplorerBaseUrl}/token/${token?.contract}?a=${token?.tokenId}`}
            >
              {truncateAddress(token?.contract)}
            </a>
          </div>
        </div>
      )}

      <div className="mb-1 flex items-center">
        <div className="w-[180px] text-gray-400">Token Standard</div>
        <div className="font-headings uppercase text-gray-300">
          {token?.kind}
        </div>
      </div>

      <div className="flex items-center">
        <div className="w-[180px] text-gray-400">Blockchain</div>
        <div className="font-headings text-gray-300">Ethereum</div>
      </div>

      <div className="mt-8">
        <div className="float-left text-base text-gray-400">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`https://etherscan.io/nft/${token?.contract}/${token?.tokenId}`}
          >
            <img
              src="/icons/sru-etherscan.svg"
              alt="Etherscan Icon"
              className="float-left mr-2 h-6 w-6"
            />
            Etherscan
          </a>
        </div>

        {metadataUrl !== '' && (
          <div className="float-left ml-4 text-base text-gray-400">
            <a target="_blank" rel="noopener noreferrer" href={metadataUrl}>
              <img
                src="/icons/sru-metadata.svg"
                alt="IPFS"
                className="float-left mr-2 h-6 w-6"
              />
              Metadata
            </a>
          </div>
        )}

        <div className="float-left ml-4 text-base text-gray-400">
          <a target="_blank" rel="noopener noreferrer" href={ipfsUrl}>
            <img
              src="/icons/sru-ipfs.svg"
              alt="IPFS"
              className="float-left mr-2 h-6 w-6"
            />
            IPFS
          </a>
        </div>

        {srTokenPageUrl !== '' && (
          <div className="float-left ml-4 text-base text-gray-400">
            <a target="_blank" rel="noopener noreferrer" href={srTokenPageUrl}>
              <img
                src="/icons/SuperRare.svg"
                alt="IPFS"
                className="float-left mr-2 h-6 w-6"
              />
              SuperRare
            </a>
          </div>
        )}
      </div>

      <div className="clear-left"></div>
    </div>
  )
}

export default TokenInfo
