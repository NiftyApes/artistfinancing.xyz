import { prepareWriteContract, readContract, writeContract } from '@wagmi/core'
import { BigNumber } from 'ethers'
import { getAddress } from 'ethers/lib/utils.js'
import { useEffect, useState } from 'react'
import { Address } from 'wagmi'
import { useNiftyApesContract } from './useNiftyApesContract'

export default function useERC721Approval({
  tokenId,
  contractAddress,
}: {
  contractAddress: Address
  tokenId: string
}) {
  const { address: operator } = useNiftyApesContract()

  const [hasApproval, setHasApproval] = useState(false)
  const [hasCheckedApproval, setHasCheckedApproval] = useState(false)
  const [approvalCheckErr, setApprovalCheckErr] = useState(false)

  useEffect(() => {
    async function checkWhetherHasApproval() {
      if (!tokenId || !operator || hasCheckedApproval) {
        return
      }

      try {
        const data = await readContract({
          address: contractAddress,
          abi: [
            {
              inputs: [
                { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
              ],
              name: 'getApproved',
              outputs: [{ internalType: 'address', name: '', type: 'address' }],
              stateMutability: 'view',
              type: 'function',
            },
          ],
          functionName: 'getApproved',
          args: [BigNumber.from(tokenId)],
        })

        setHasApproval(getAddress(data) === getAddress(operator))
        setHasCheckedApproval(true)
      } catch (err) {
        console.error('Error checking token approval', err)
        setApprovalCheckErr(true)
      }
    }

    checkWhetherHasApproval()
  }, [tokenId, operator, hasCheckedApproval])

  return {
    approvalCheckErr: approvalCheckErr,
    approvalRequired: hasCheckedApproval && !hasApproval,

    grantApproval: async ({
      onSuccess,
      onError,
    }: {
      onSuccess: () => void
      onError: () => void
    }) => {
      try {
        if (!operator) {
          throw Error('Missing operator')
        }

        const config = await prepareWriteContract({
          address: contractAddress,
          abi: [
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
          ],
          functionName: 'approve',
          args: [operator, BigNumber.from(tokenId)],
        })
        const tx = await writeContract(config)
        const receipt = await tx.wait()

        if (receipt.status !== 1) {
          throw new Error('reason: revert')
        }

        onSuccess && onSuccess()
        setHasCheckedApproval(false)
      } catch (err) {
        console.error('Error granting token approval', err)
        onError()
      }
    },
  }
}
