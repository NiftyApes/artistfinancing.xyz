import { goerli } from 'wagmi'

import useEnvChain from 'hooks/useEnvChain'

const isGoerli = (cid?: number): boolean => {
  return cid === goerli.id
}

export const useEtherscanUri = (): string => {
  const chain = useEnvChain()
  return isGoerli(chain?.id)
    ? 'https://goerli.etherscan.io'
    : 'https://etherscan.io'
}
