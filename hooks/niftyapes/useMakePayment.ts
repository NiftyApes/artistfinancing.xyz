import { useNiftyApesContract } from './useNiftyApesContract'
import { Address, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { BigNumber } from 'ethers'

interface IMakePaymentHookProps {
  paymentAmount: BigNumber;
  nftContractAddress: Address;
  nftId: BigNumber;
}

export const useMakePayment = (props: IMakePaymentHookProps) => {

  const { paymentAmount, nftContractAddress, nftId } = props
  const { address: niftyApesContractAddress, abi } = useNiftyApesContract()

  const { config } = usePrepareContractWrite({
    abi: abi,
    address: niftyApesContractAddress,
    args: [nftContractAddress, nftId],
    functionName: 'makePayment',
    overrides: {
      value: paymentAmount
    }
  })

  const { data, write } = useContractWrite(config)

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash
  })

  return { data, isLoading, isSuccess, write }
}