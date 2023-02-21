import { useNiftyApesContract } from './useNiftyApesContract'
import { useAccount, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'

import { GoerliAbi } from '../../contracts/niftyapes/goerli.abi'
import { ethers, BigNumber } from 'ethers'

export const useMakePayment = () => {

  const { address: goerliAddress } = useNiftyApesContract()
  const { address: walletAddress } = useAccount()

  const { config } = usePrepareContractWrite({
    abi: GoerliAbi,
    address: goerliAddress,
    args: ['0x5c20670e19e557930fcc76908c500ff870967087', BigNumber.from('11')],
    overrides: {
      from: walletAddress,
      value: ethers.utils.parseEther('0.01')
    },
    functionName: 'makePayment',
  })

  const { data, write:makePayment } = useContractWrite(config)

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash
  })

  return { data, isLoading, isSuccess, makePayment }

}