import { Address, useERC721Approve } from '@niftyapes/sdk'
import { useTokens } from '@reservoir0x/reservoir-kit-ui'
import { FC, useContext, useEffect, useRef } from 'react'
import { IoReload } from 'react-icons/io5'
import { BeatLoader } from 'react-spinners'
import { useWaitForTransaction } from 'wagmi'
import { CreateOffersStore } from '../store'

type Props = {
  token: ReturnType<typeof useTokens>['data'][0]
}

const ApproveNFTStep: FC<Props> = ({ token }) => {
  const { dispatch } = useContext(CreateOffersStore)

  const {
    approvalRequired,
    approvalCheckErr,
    data,
    write,
    isLoading,
    isError,
  } = useERC721Approve({
    tokenId: token?.token?.tokenId as string,
    contractAddress: token?.token?.contract as Address,
  })

  const {
    isLoading: isTxLoading,
    isSuccess: isTxSuccess,
    isError: isTxError,
  } = useWaitForTransaction({ hash: data?.hash })

  useEffect(() => {
    if (approvalRequired) {
      write?.()
    }
  }, [approvalRequired])

  const stepComplete = useRef(false)

  useEffect(() => {
    // No-op if we've already completed this step
    if (stepComplete.current) {
      return
    }

    if ((!approvalRequired && !approvalCheckErr) || isTxSuccess) {
      stepComplete.current = true
      dispatch({ type: 'next_step' })
    }
  }, [approvalRequired, approvalCheckErr, isTxSuccess])

  return (
    <div className="flex flex-col space-y-1">
      <p className="text-sm text-black">Approve NiftyApes to access your NFT</p>
      <div className="flex items-center space-x-2">
        {approvalCheckErr && (
          <p className="text-xs text-red-500 underline">
            Error checking approval
          </p>
        )}
        {approvalRequired && isLoading && (
          <>
            <p className="text-xs underline">Waiting for approval</p>
            <BeatLoader size={5} color="#36d7b7" />
          </>
        )}
        {!approvalRequired && (
          <p className="text-xs underline">NiftyApes approved to access</p>
        )}
        {isError && (
          <>
            <p className="text-xs text-red-500 underline">
              Error granting approval
            </p>
            <button onClick={() => write?.()}>
              <IoReload />
            </button>
          </>
        )}
        {isTxLoading && (
          <>
            <p className="text-xs underline">Waiting transaction</p>
            <BeatLoader size={5} color="#36d7b7" />
          </>
        )}
        {isTxSuccess && (
          <p className="text-xs underline">Transaction complete</p>
        )}
        {isTxError && (
          <p className="text-xs text-red-500 underline">Transaction error</p>
        )}
      </div>
    </div>
  )
}

export default ApproveNFTStep
