import { Address, prepareWriteContract, writeContract } from '@wagmi/core'
import { BigNumber } from 'ethers'
import { useSellerFinancingContractAddress } from './useContracts'

// TODO: Possibly return to types.
export default function useExecuteBuy() {
  const address = useSellerFinancingContractAddress()

  return {
    async executeBuy({
      offer,
      signature,
      onSuccess,
      onError,
    }: {
      offer: {
        creator: string
        downPaymentAmount: string
        expiration: number
        minimumPrincipalPerPeriod: string
        nftId: string
        nftContractAddress: string
        periodDuration: number
        periodInterestRateBps: number
        price: string
      }
      signature: `0x${string}`
      onSuccess: () => void
      onError: () => void
    }) {
      try {
        if (!address) {
          throw Error('Missing seller financing contract address')
        }

        console.log('offer', offer)

        const config = await prepareWriteContract({
          address,
          abi: [
            {
              inputs: [
                {
                  components: [
                    {
                      internalType: 'uint128',
                      name: 'price',
                      type: 'uint128',
                    },
                    {
                      internalType: 'uint128',
                      name: 'downPaymentAmount',
                      type: 'uint128',
                    },
                    {
                      internalType: 'uint128',
                      name: 'minimumPrincipalPerPeriod',
                      type: 'uint128',
                    },
                    {
                      internalType: 'uint256',
                      name: 'nftId',
                      type: 'uint256',
                    },
                    {
                      internalType: 'address',
                      name: 'nftContractAddress',
                      type: 'address',
                    },
                    {
                      internalType: 'address',
                      name: 'creator',
                      type: 'address',
                    },
                    {
                      internalType: 'uint32',
                      name: 'periodInterestRateBps',
                      type: 'uint32',
                    },
                    {
                      internalType: 'uint32',
                      name: 'periodDuration',
                      type: 'uint32',
                    },
                    {
                      internalType: 'uint32',
                      name: 'expiration',
                      type: 'uint32',
                    },
                  ],
                  internalType: 'struct ISellerFinancingStructs.Offer',
                  name: 'offer',
                  type: 'tuple',
                },
                {
                  internalType: 'bytes',
                  name: 'signature',
                  type: 'bytes',
                },
              ],
              name: 'buyWithFinancing',
              outputs: [],
              stateMutability: 'payable',
              type: 'function',
            },
          ],
          functionName: 'buyWithFinancing',
          args: [
            {
              creator: offer.creator as Address,
              downPaymentAmount: BigNumber.from(offer.downPaymentAmount),
              expiration: offer.expiration,
              minimumPrincipalPerPeriod: BigNumber.from(
                offer.minimumPrincipalPerPeriod
              ),
              nftId: BigNumber.from(offer.nftId),
              nftContractAddress: offer.nftContractAddress as Address,
              periodDuration: offer.periodDuration,
              periodInterestRateBps: offer.periodInterestRateBps,
              price: BigNumber.from(offer.price),
            },
            signature,
          ],
          overrides: {
            gasLimit: BigNumber.from('210000'),
          },
        })
        const tx = await writeContract(config)
        const receipt = await tx.wait()
        console.log(receipt)

        if (receipt.status !== 1) {
          throw new Error('reason: revert')
        }

        onSuccess && onSuccess()
      } catch (err) {
        console.error(err)
        onError()
      }
    },
  }
}
