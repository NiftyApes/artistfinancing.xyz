import { useNiftyApesContract } from './useNiftyApesContract'
import {
  Address,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi'

import { BigNumber } from 'ethers'

interface IWithdrawOfferSignatureProps {
  offer: {
    creator: string
    downPaymentAmount: string
    expiration: number
    minimumPrincipalPerPeriod: string
    nftContractAddress: string
    nftId: string
    periodDuration: number
    periodInterestRateBps: number
    price: string
  }
  signature: `0x${string}`
}

export const useWithdrawOfferSignature = (
  props: IWithdrawOfferSignatureProps
) => {
  const { offer, signature } = props
  const { address: niftyApesContractAddress, abi } = useNiftyApesContract()

  const { config } = usePrepareContractWrite({
    abi: abi,
    address: niftyApesContractAddress,
    args: [
      {
        creator: offer.creator as Address,
        downPaymentAmount: BigNumber.from(offer.downPaymentAmount),
        expiration: offer.expiration,
        minimumPrincipalPerPeriod: BigNumber.from(
          offer.minimumPrincipalPerPeriod
        ),
        nftId: BigNumber.from(offer.nftId),
        nftContractAddress: offer.nftContractAddress as Address,
        periodDuration: offer.periodDuration,
        periodInterestRateBps: offer.periodInterestRateBps,
        price: BigNumber.from(offer.price),
      },
      signature,
    ],
    functionName: 'withdrawOfferSignature',
  })

  const {
    data,
    write,
    isLoading: isLoadingWrite,
    isError: isErrorWrite,
  } = useContractWrite(config)

  const {
    isLoading: isLoadingTx,
    isSuccess,
    isError: isErrorTx,
  } = useWaitForTransaction({
    hash: data?.hash,
  })

  return {
    data,
    isLoadingTx,
    isLoadingWrite,
    isSuccess,
    isErrorTx,
    isErrorWrite,
    write,
  }
}