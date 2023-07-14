import { LoanDetails, OfferDetails, useMakePayment } from '@niftyapes/sdk'
import { Cross2Icon } from '@radix-ui/react-icons'
import clsx from 'clsx'
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
import { useQueryClient } from 'react-query'
import { useWaitForTransaction } from 'wagmi'
import FormatNativeCrypto from './FormatNativeCrypto'
import NumberInput from './NumberInput'

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

          <div className="flex flex-col">
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
                    <div className="flex w-full flex-row items-center justify-between rounded-md p-4">
                      <div className="flex flex-col items-center gap-2">
                        <p className="text-sm">Principal Change</p>
                        <div className="flex flex-row items-center gap-2 text-xl font-semibold">
                          {Number(formatEther(loan.remainingPrincipal)).toFixed(
                            4
                          )}

                          <AiOutlineArrowRight />
                          <span className="text-green-600">
                            {Number(
                              formatEther(
                                BigNumber.from(loan.remainingPrincipal).sub(
                                  BigNumber.from(loan.minimumPrincipalPerPeriod)
                                )
                              )
                            ).toFixed(4)}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <p className="text-sm">Payment Due Now</p>
                        <div className="flex flex-row items-center gap-2 text-xl font-semibold">
                          <FormatNativeCrypto
                            maximumFractionDigits={4}
                            amount={payment}
                          />
                        </div>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <p className="text-sm">Next Payment Due</p>
                        <div className="flex flex-row items-center font-semibold">
                          <p>
                            {format(
                              new Date(loan.periodEndTimestamp * 1000),
                              'Pp'
                            )}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex w-full flex-row items-center justify-center gap-4">
                      <p>Payment Amount</p>
                      <div className="w-[280px]">
                        <NumberInput
                          defaultValue={formatEther(payment)}
                          onChange={(valueAsString) => {
                            const newPayment: BigNumber =
                              parseEther(valueAsString)
                            if (newPayment.gt(minPayment)) {
                              setPayment(newPayment)
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between">
              <i
                className={clsx('text-sm', {
                  'text-red-500': undefined, // errorText
                })}
              >
                {'Testing footer text'}
              </i>
              <div className="flex flex-shrink-0 space-x-8 self-end">
                <button
                  onClick={onClose}
                  className="rounded-full text-sm font-bold uppercase hover:underline hover:underline-offset-4"
                >
                  Nevermind
                </button>
                <button
                  onClick={() => write?.()}
                  className="rounded-full border-2 border-black px-8 py-3 text-sm font-bold uppercase hover:bg-black hover:text-white"
                >
                  Make Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}
