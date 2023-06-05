import { Address, useCreateOffer } from '@niftyapes/sdk'
import { useTokens } from '@reservoir0x/reservoir-kit-ui'
import { parseEther } from 'ethers/lib/utils'
import { FC, useContext, useEffect, useRef } from 'react'
import { IoReload } from 'react-icons/io5'
import { BeatLoader } from 'react-spinners'
import { OfferTerms, processTerms } from '../lib/processTerms'
import { CreateOffersStore } from '../store'

type Props = {
  token: ReturnType<typeof useTokens>['data'][0]
  terms: OfferTerms
  assignedStep: number
}

const SignOfferStep: FC<Props> = ({ token, terms, assignedStep }) => {
  const { state, dispatch } = useContext(CreateOffersStore)
  const processedTerms = processTerms(terms, state.expiration)

  const { isLoading, isSuccess, isError, signAndSaveOffer } = useCreateOffer({
    nftId: token?.token?.tokenId!,
    nftContractAddress: token?.token?.contract! as Address,
    terms: {
      price: parseEther(terms.price),
      downPayment: parseEther(processedTerms.onSale),
      durationSeconds: processedTerms.loanDurationSeconds,
      payPeriodSeconds: processedTerms.periodDuration,
      expirationSeconds: processedTerms.expirationSeconds,
      apr: Number(terms.apr),
      collectionOfferLimit: 0, // Defaults to 0 in the context of this modal's flow
    },
  })

  // Attempt to signAndSaveOffer when it is the current step
  useEffect(() => {
    if (state.currentStep === assignedStep) {
      signAndSaveOffer()
    }
  }, [state.currentStep, assignedStep])

  const stepComplete = useRef(false)

  useEffect(() => {
    // No-op if we've already completed this step
    if (stepComplete.current) {
      return
    }

    if (isSuccess) {
      stepComplete.current = true
      dispatch({ type: 'next_step' })
    }
  }, [isSuccess])

  return (
    <div className="flex flex-col space-y-1">
      <p className="text-sm text-black">
        Sign Financing Offer for <b>{processedTerms.saleTotal} ETH</b> over{' '}
        <b>{processedTerms.duration} days</b>
      </p>
      <div className="flex items-center space-x-2">
        {isLoading && (
          <>
            <p className="text-xs underline">Waiting for signature</p>
            <BeatLoader size={5} color="#36d7b7" />
          </>
        )}
        {isSuccess && (
          <p className="text-xs underline">Offer signed and saved</p>
        )}
        {isError && (
          <>
            <p className="text-xs text-red-500 underline">
              Error signing offer
            </p>
            <button onClick={() => signAndSaveOffer()}>
              <IoReload />
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default SignOfferStep
