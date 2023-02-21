import { useProvider } from 'wagmi'
import { isGoerli, isMainnet } from './useContracts'

import { GoerliAbi } from '../../contracts/niftyapes/goerli.abi'
import useEnvChain from '../useEnvChain'

export const useNiftyApesContract = () => {

  const provider = useProvider()
  const chain = useEnvChain()

  if (provider && isGoerli(chain?.id)) {
    return { address: '0x14980cacdd01b3e40bac4c305eaebf3a5b08926e', abi: GoerliAbi }
  } else {
    return { address: '', abi: '' }
  }

  //
  // if (provider && isMainnet(chain?.id)) {
  //   return { contract: null, abi: null }
  // }
}