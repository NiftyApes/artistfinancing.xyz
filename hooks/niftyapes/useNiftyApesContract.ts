import { Address, goerli, mainnet, useProvider } from 'wagmi'

import { ContractAbi } from '../../contracts/niftyapes/contract.abi'
import useEnvChain from '../useEnvChain'

const isGoerli = (cid?: number): boolean => {
  return cid === goerli.id
}

const isMainnet = (cid?: number): boolean => {
  return cid === mainnet.id
}

export const useNiftyApesContract = () => {
  const provider = useProvider()
  const chain = useEnvChain()

  if (provider && isGoerli(chain?.id)) {
    return {
      address: '0xa608475ec077e10d71db7476745d85f9e860e540' as Address,
      abi: ContractAbi,
    }
  }

  if (provider && isMainnet(chain?.id)) {
    return {
      address: '0x3a5846f85e7631c32b09528dd2479334a905ee42' as Address,
      abi: ContractAbi,
    }
  }

  return {
    address: '0xa608475ec077e10d71db7476745d85f9e860e540' as Address,
    abi: ContractAbi,
  }
}
