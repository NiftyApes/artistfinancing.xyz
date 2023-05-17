import { useERC721Approve, Address } from '@niftyapes/sdk'
import { useTokens } from '@reservoir0x/reservoir-kit-ui'
import { FC } from 'react'
import { useNetwork } from 'wagmi'

type Props = {
  token: ReturnType<typeof useTokens>['data'][0]
}

const ApproveNFTStep: FC<Props> = ({ token }) => {
  console.log(token?.token?.tokenId)

  const { chain, chains } = useNetwork()
  console.log(chain, chains)

  const { approvalRequired, approvalCheckErr, write } = useERC721Approve({
    tokenId: token?.token?.tokenId as string,
    contractAddress: token?.token?.contract as Address,
  })

  return (
    <div className="flex flex-col space-y-1">
      <p className="text-sm text-black">Approve NiftyApes to access your NFT</p>
      {approvalRequired && (
        <p className="text-xs underline">Approval transaction required</p>
      )}
      {approvalCheckErr && (
        <p className="text-xs text-red-500 underline">
          Error checking approval
        </p>
      )}
    </div>
  )
}

export default ApproveNFTStep
