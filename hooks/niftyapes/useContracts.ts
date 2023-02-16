import useEnvChain from 'hooks/useEnvChain'
import { useProvider, mainnet, goerli, Address } from 'wagmi'

export const isGoerli = (cid?: number): boolean => {
  return cid === goerli.id
}

export const isMainnet = (cid?: number): boolean => {
  return cid === mainnet.id
}

// TODO: Add full contract fetching when required.
export const useSellerFinancingContractAddress = (): Address | undefined => {
  const provider = useProvider()
  const chain = useEnvChain()

  if (provider && isGoerli(chain?.id)) {
    // TODO: Change this when stable.
    return '0xbc8f74e0812973e0f454d103b29547fbc37eb14a'
  }

  if (provider && isMainnet(chain?.id)) {
    return '0x'
  }
}
