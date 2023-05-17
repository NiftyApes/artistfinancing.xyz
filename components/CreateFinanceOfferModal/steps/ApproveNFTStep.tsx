import { Address, useERC721Approve } from '@niftyapes/sdk'
import { useTokens } from '@reservoir0x/reservoir-kit-ui'
import { FC, useEffect } from 'react'

type Props = {
  token: ReturnType<typeof useTokens>['data'][0]
}

const ApproveNFTStep: FC<Props> = ({ token }) => {
  // TODO: Errors
  const { approvalRequired, approvalCheckErr, write } = useERC721Approve({
    tokenId: token?.token?.tokenId as string,
    contractAddress: token?.token?.contract as Address,
  })

  useEffect(() => {
    console.log('write', write)
    write?.()
  }, [])

  return (
    <div className="flex flex-col space-y-1">
      <p className="text-sm text-black">Approve NiftyApes to access your NFT</p>
      {approvalRequired && (
        <p className="text-xs underline">Waiting for approval</p>
      )}
      {approvalCheckErr && (
        <p className="text-xs text-red-500 underline">
          Error checking approval
        </p>
      )}
      {write && <button onClick={write}>Write</button>}
    </div>
  )
}

export default ApproveNFTStep
