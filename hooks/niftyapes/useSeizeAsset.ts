import { useNiftyApesContract } from './useNiftyApesContract'
import {
  Address,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction
} from 'wagmi'
import { BigNumber } from 'ethers'

interface ISeizeAssetProps {
  nftContractAddress: Address
  nftId: BigNumber
}

export const useSeizeAsset = (props: ISeizeAssetProps) => {
  const { nftContractAddress, nftId } = props
  const { address: niftyApesContractAddress, abi } = useNiftyApesContract()

  const { config } = usePrepareContractWrite({
    abi: abi,
    address: niftyApesContractAddress,
    args: [nftContractAddress, nftId],
    functionName: 'seizeAsset',
  })

  const { data, write } = useContractWrite(config)

  const { isLoading, isSuccess, isError } = useWaitForTransaction({
    hash: data?.hash
  })

  return { data, isLoading, isSuccess, isError, write }
}
