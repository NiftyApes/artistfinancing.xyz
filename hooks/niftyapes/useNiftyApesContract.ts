import { Address, goerli, mainnet, useProvider } from 'wagmi'

import { GoerliAbi } from '../../contracts/niftyapes/goerli.abi'
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
      address: '0x964562f3377fbbf5acc39bffea89f8dc802a64ea' as Address,
      abi: GoerliAbi,
    }
  }

  if (provider && isMainnet(chain?.id)) {
    //TODO: Fix this
    return {
      address: '0x964562f3377fbbf5acc39bffea89f8dc802a64ea' as Address,
      abi: GoerliAbi,
    }
  }

  return {
    address: '0x964562f3377fbbf5acc39bffea89f8dc802a64ea' as Address,
    abi: GoerliAbi,
  }
}