import { LoanDetails, OfferDetails, useMakePayment } from '@niftyapes/sdk'
import { Cross2Icon } from '@radix-ui/react-icons'
import Button from 'components/Button'
import Modal from 'components/Modal'
import { format } from 'date-fns'
import { BigNumber } from 'ethers'
import { formatEther, parseEther } from 'ethers/lib/utils'
import { useEtherscanUri } from 'hooks/useEtherscan'
import { optimizeImage } from 'lib/optmizeImage'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { SiEthereum } from 'react-icons/si'
import { useQueryClient } from 'react-query'
import { useWaitForTransaction } from 'wagmi'
import FormatNativeCrypto from './FormatNativeCrypto'

export default function MakePaymentModal({
  loan,
  offer,
  image,
  tokenName,
  tokenId,
  collectionName,
}: {
  loan: LoanDetails
  offer: OfferDetails
  image?: string
  tokenName?: string
  tokenId?: string
  collectionName?: string
}) {
  const router = useRouter()
  const { address } = router.query
  const parentTableQuery = `/loans?buyer=${address as string}`

  const [open, setOpen] = useState(false)
  const onOpen = () => setOpen(true)
  const onClose = () => setOpen(false)

  const etherscanUri = useEtherscanUri()

  const minPayment: BigNumber = BigNumber.from(
    loan.minimumPrincipalPerPeriod
  ).add(
    BigNumber.from(loan.remainingPrincipal)
      .mul(BigNumber.from(loan.periodInterestRateBps))
      .div(BigNumber.from('10000'))
  )

  const [payment, setPayment] = useState<BigNumber>(minPayment)

  const {
    data: paymentTxn,
    isError: isWriteError,
    write,
  } = useMakePayment({
    nftContractAddress: offer.nftContractAddress,
    nftId: BigNumber.from(offer.nftId),
    paymentAmount: payment,
  })

  const {
    isLoading: isLoadingTxn,
    isSuccess: isSuccessTxn,
    isError: isErrorTxn,
  } = useWaitForTransaction({
    hash: paymentTxn?.hash,
  })

  const queryClient = useQueryClient()
  useEffect(() => {
    // Invalidates parent table query three seconds after the transaction
    if (isSuccessTxn) {
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: [parentTableQuery] })
      }, 3000)
    }
  }, [isSuccessTxn])

  return (
    <>
      <Button textCase="capitalize" variant="secondary" onClick={onOpen}>
        Make Payment
      </Button>

      <Modal open={open} onOpenChange={setOpen}>
        <div className="p-4 text-black">
          <div className="flex flex-col">
            <div className="relative flex justify-center p-1">
              <h4 className="max-w-xl truncate text-center text-xl">{`Make Payment for ${collectionName} #${tokenId}`}</h4>

              <div className="absolute right-0 top-0">
                <Cross2Icon
                  style={{ width: '32px', height: '32px', strokeWidth: 4 }}
                  className="text-stone-950 hover:cursor-pointer hover:text-stone-500"
                  onClick={onClose}
                />
              </div>
            </div>
          </div>

          <div className="flex">
            <img
              alt={`Token image for ${tokenName}`}
              className="w-[200px] object-contain"
              src={optimizeImage(image, 200)}
            />
            <div className="w-full p-6">
              {paymentTxn && (
                <div>
                  {isSuccessTxn &&
                    `Thanks for your payment. Transaction processed successfully. `}
                  {isLoadingTxn && `Processing transaction... `}
                  {isErrorTxn && `Unable to process transaction... `}

                  <a
                    href={`${etherscanUri}/tx/${paymentTxn?.hash}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View Transaction
                  </a>
                </div>
              )}

              {!paymentTxn && (
                <div className="flex w-full flex-col justify-between gap-4">
                  <div className="flex w-full flex-row items-center justify-between rounded-md bg-gray-700 p-4">
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex flex-row items-center gap-2 text-xl font-semibold">
                        {Number(formatEther(loan.remainingPrincipal)).toFixed(
                          4
                        )}

                        <AiOutlineArrowRight />
                        <span className="text-green-400">
                          {Number(
                            formatEther(
                              BigNumber.from(loan.remainingPrincipal).sub(
                                BigNumber.from(loan.minimumPrincipalPerPeriod)
                              )
                            )
                          ).toFixed(4)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-300">Principal Change</p>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex flex-row items-center gap-2 text-xl font-semibold">
                        <FormatNativeCrypto
                          maximumFractionDigits={4}
                          amount={payment}
                        />
                      </div>
                      <p className="text-sm text-gray-300">Payment Due Now</p>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex flex-row items-center font-semibold">
                        <p>
                          {format(
                            new Date(loan.periodEndTimestamp * 1000),
                            'Pp'
                          )}
                        </p>
                      </div>
                      <p className="text-sm text-gray-300">Next Payment Due</p>
                    </div>
                  </div>

                  <div className="flex w-full flex-row items-center justify-between rounded-md bg-gray-700 p-4">
                    <div className="flex w-full flex-row items-center gap-4">
                      <div className="flex flex-row items-center gap-2 text-2xl font-bold">
                        <SiEthereum />
                        <p>ETH</p>
                      </div>
                      <input
                        value={formatEther(payment)}
                        type="number"
                        onChange={(event) => {
                          const newPayment: BigNumber = parseEther(
                            event.target.value
                          )
                          if (newPayment.gt(minPayment)) {
                            setPayment(newPayment)
                          }
                        }}
                        className="reservoir-label-l input-primary-outline dark:border-neutral-600 dark:bg-neutral-800
                        dark:text-white dark:ring-primary-900 dark:placeholder:text-neutral-400 dark:focus:ring-4"
                      />
                      <button
                        className="btn-purple-fill ml-auto"
                        onClick={() => write?.()}
                      >
                        Make Payment
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}
