import { useEffect, useState } from 'react'
import { Address, useAccount, useContract, useProvider } from 'wagmi'
import { useSellerFinancingContractAddress } from './useContracts'

export default function useERC721Approval({
  tokenId,
  contractAddress,
}: {
  contractAddress: Address
  tokenId: string
}) {
  const owner = useAccount()
  const provider = useProvider()
  const operator = useSellerFinancingContractAddress()

  const [hasApproval, setHasApproval] = useState(false)
  const [hasCheckedApproval, setHasCheckedApproval] = useState(false)

  const minimumAbi = [
    {
      inputs: [
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
      ],
      name: 'approve',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
      name: 'getApproved',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      stateMutability: 'view',
      type: 'function',
    },
  ]

  const contract = useContract({
    abi: minimumAbi,
    address: contractAddress,
    signerOrProvider: provider,
  })

  useEffect(() => {
    async function checkWhetherHasApproval() {
      if (!contract || !tokenId || hasCheckedApproval) {
        return
      }

      const result = await contract.getApproved(tokenId)

      setHasApproval(result === operator)
      setHasCheckedApproval(true)
    }

    checkWhetherHasApproval()
  }, [owner, contract, tokenId, hasCheckedApproval])

  return {
    hasApproval,
    hasCheckedApproval,

    grantApproval: async ({
      onSuccess,
      onError,
    }: {
      onSuccess: () => void
      onError: () => void
    }) => {
      try {
        const tx = await contract?.approve(operator, tokenId)
        const receipt = await tx.wait()

        if (receipt.status !== 1) {
          throw new Error('reason: revert')
        }

        onSuccess && onSuccess()
      } catch (err) {
        console.error(err)
        onError()
      }
      setHasCheckedApproval(false)
    },
  }
}
