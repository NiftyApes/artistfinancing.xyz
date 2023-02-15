import useEnvChain from 'hooks/useEnvChain'
import { useProvider, mainnet, goerli, Address } from 'wagmi'

export const isGoerli = (cid?: number): boolean => {
  return cid === goerli.id
}

export const isMainnet = (cid?: number): boolean => {
  return cid === mainnet.id
}

// TODO: Add full contract fetching when required.
export const useSellerFinancingContractAddress = (): Address => {
  const provider = useProvider()
  const chain = useEnvChain()

  if (provider && isGoerli(chain?.id)) {
    return '0x'
  }

  if (provider && isMainnet(chain?.id)) {
    return '0x'
  }

  return '0x'
}
