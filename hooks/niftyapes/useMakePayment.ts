// @ts-nocheck
import { useNiftyApesContract } from './useNiftyApesContract'
import { Address, useAccount, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { BigNumber} from 'ethers'
import _ from 'lodash'

interface IMakePaymentHookProps {
  paymentAmount: BigNumber;
  nftContractAddress: Address;
  nftId: BigNumber;
}
export const useMakePayment = (props: IMakePaymentHookProps) => {

  const { paymentAmount, nftContractAddress, nftId } = props
  const { address: niftyApesContractAddress, abi } = useNiftyApesContract()
  const { address: walletAddress } = useAccount()

  const { config } = usePrepareContractWrite({
    abi: abi,
    address: niftyApesContractAddress,
    args: [nftContractAddress, nftId],
    enabled: !_.isUndefined(walletAddress),
    functionName: 'makePayment',
    overrides: {
      from: walletAddress,
      value: paymentAmount,
    },
  })


  const { data, write: makePayment } = useContractWrite(config)

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash
  })

  return { data, isLoading, isSuccess, makePayment }
}