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
    return '0x8353bd84bb346c4c0c236d6a7caf92dea7b9df86'
  }

  if (provider && isMainnet(chain?.id)) {
    return '0x'
  }
}
