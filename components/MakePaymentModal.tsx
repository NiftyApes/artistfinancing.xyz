import { LoanDetails, OfferDetails, useMakePayment } from '@niftyapes/sdk'
import { Cross2Icon } from '@radix-ui/react-icons'
import Button from 'components/Button'
import Modal from 'components/Modal'
import { format } from 'date-fns'
import { BigNumber } from 'ethers'
import { formatEther, parseEther } from 'ethers/lib/utils'
import { useEtherscanUri } from 'hooks/useEtherscan'
import { formatBN, scientificToDecimal } from 'lib/numbers'
import { optimizeImage } from 'lib/optmizeImage'
import { useEffect, useState } from 'react'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { IoCheckmarkCircle } from 'react-icons/io5'
import { BeatLoader, PropagateLoader } from 'react-spinners'
import { useWaitForTransaction } from 'wagmi'
import NumberInput from './NumberInput'

export default function MakePaymentModal({
  loan,
  offer,
  refetchLoans,
  image,
  tokenName,
  tokenId,
  collectionName,
}: {
  loan: LoanDetails
  offer: OfferDetails
  refetchLoans: () => void
  image?: string
  tokenName?: string
  tokenId?: string
  collectionName?: string
}) {
  const [open, setOpen] = useState(false)
  const onOpen = () => setOpen(true)
  // Reset modal state
  const onClose = () => {
    resetWrite()
    setInputVal(formatEther(minPayment))
    setPayment(minPayment)
    setValueErr(false)
    setOpen(false)
  }
  const onOpenChange = (open: boolean) => {
    if (!open) {
      onClose()
    }
  }

  const etherscanUri = useEtherscanUri()

  const minPayment: BigNumber = BigNumber.from(
    loan.minimumPrincipalPerPeriod
  ).add(
    BigNumber.from(loan.remainingPrincipal)
      .mul(BigNumber.from(loan.periodInterestRateBps))
      .div(BigNumber.from('10000'))
  )

  const [inputVal, setInputVal] = useState(formatEther(minPayment))
  const [payment, setPayment] = useState<BigNumber>(minPayment)
  const [valueErr, setValueErr] = useState(false)

  const {
    data: paymentTxn,
    isError: isErrorWrite,
    isLoading: isLoadingWrite,
    error: writeError,
    reset: resetWrite,
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

  useEffect(() => {
    setTimeout(refetchLoans, 1000)
  }, [isSuccessTxn, isErrorTxn])

  const [errorText, setErrorText] = useState('')
  useEffect(() => {
    if (!isErrorWrite && !valueErr) {
      setErrorText('')
      return
    }

    if (valueErr) {
      setErrorText('Please enter a valid payment value')
      return
    }

    if ((writeError as any)?.code === 'INSUFFICIENT_FUNDS') {
      setErrorText('You have insufficient funds for payment.')
    } else if ((writeError as any)?.code === 'ACTION_REJECTED') {
      setErrorText('You rejected the transaction.')
    } else {
      setErrorText('An error occurred with this transaction.')
    }
  }, [isErrorWrite, valueErr])

  return (
    <>
      <Button textCase="capitalize" variant="secondary" onClick={onOpen}>
        Make Payment
      </Button>

      <Modal open={open} onOpenChange={onOpenChange}>
        <div className="flex min-w-[700px] flex-col space-y-6 px-6 py-4 text-black selection:bg-blue-200">
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

          <div className="flex flex-col space-y-6">
            <div className="flex space-x-6">
              <img
                alt={`Token image for ${tokenName}`}
                className="w-[200px] object-contain"
                src={optimizeImage(image, 200)}
              />
              <div className="w-full">
                {paymentTxn && (
                  <>
                    {isLoadingTxn && (
                      <div className="flex flex-col items-center justify-center space-y-8">
                        <i>Transaction Submitted</i>
                        <PropagateLoader size={10} color="#36d7b7" />
                        <a
                          target="_blank"
                          rel="noreferrer"
                          href={`${etherscanUri}/tx/${paymentTxn?.hash}`}
                          className="underline underline-offset-4"
                        >
                          View on Etherscan
                        </a>
                      </div>
                    )}
                    {isSuccessTxn && (
                      <div className="flex flex-col items-center justify-center space-y-8">
                        <i>
                          Thanks for your payment. Transaction processed
                          successfully.
                        </i>
                        <IoCheckmarkCircle
                          size={48}
                          className="text-green-600"
                        />
                        <a
                          target="_blank"
                          rel="noreferrer"
                          href={`${etherscanUri}/tx/${paymentTxn?.hash}`}
                          className="underline underline-offset-4"
                        >
                          View on Etherscan
                        </a>
                      </div>
                    )}
                    {isErrorTxn && (
                      <div className="flex flex-col items-center justify-center space-y-8">
                        <i className="text-red-500">Transaction Error</i>
                        <p>There was an error processing your transaction</p>
                        <a
                          target="_blank"
                          rel="noreferrer"
                          href={`${etherscanUri}/tx/${paymentTxn?.hash}`}
                          className="underline underline-offset-4"
                        >
                          View on Etherscan
                        </a>
                      </div>
                    )}
                  </>
                )}
                {!paymentTxn && (
                  <div className="flex w-full flex-col space-y-6">
                    <div className="flex justify-between">
                      <p className="text-gray-500">Amount Due</p>
                      <p className="font-bold">{`${formatBN(
                        minPayment,
                        8
                      )} ETH`}</p>
                    </div>

                    <div className="flex justify-between">
                      <p className="text-gray-500">Principal Change</p>
                      <div className="flex flex-row items-center gap-2">
                        <p className="font-bold">
                          {`${formatBN(loan.remainingPrincipal, 8)} ETH`}
                        </p>
                        <AiOutlineArrowRight />
                        <p className="font-bold text-green-600">
                          {`${formatBN(
                            BigNumber.from(loan.remainingPrincipal).sub(
                              BigNumber.from(loan.minimumPrincipalPerPeriod)
                            ),
                            8
                          )} ETH`}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <p className="text-gray-500">Due On</p>
                      <div className="flex flex-row items-center">
                        <p>
                          {format(
                            new Date(loan.periodEndTimestamp * 1000),
                            'Pp'
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="flex w-full flex-row items-center gap-4">
                      <p className="text-gray-500">Payment Amount</p>
                      <div className="w-[280px]">
                        <NumberInput
                          value={inputVal}
                          disabled={isLoadingTxn || isLoadingWrite}
                          descriptor="ETH"
                          min={0}
                          onChange={(valueAsString) => {
                            setValueErr(false)
                            if (!valueAsString) {
                              setValueErr(true)
                              return
                            }
                            setInputVal(valueAsString)

                            // Setting the payment value requires parsing scientific notation input
                            // into decimal and then attempting to parse and ether value from that.
                            // If the user enters an invalid ether value, then we do not set the
                            // payment value. They will have to fix their input to proceed.
                            let parsedEther
                            try {
                              parsedEther = parseEther(
                                scientificToDecimal(valueAsString)
                              )
                            } catch (err) {
                              setValueErr(true)
                              return
                            }

                            resetWrite()
                            setPayment(parsedEther)
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
              <i className="text-sm text-red-500">{errorText}</i>
              <div className="flex flex-shrink-0 space-x-8 self-end">
                {!paymentTxn ? (
                  <>
                    <button
                      onClick={onClose}
                      className="rounded-full text-sm font-bold uppercase hover:underline hover:underline-offset-4"
                    >
                      Nevermind
                    </button>
                    <button
                      disabled={
                        !write || valueErr || isLoadingWrite || isLoadingTxn
                      }
                      onClick={() => write?.()}
                      className="rounded-full border-2 border-black px-8 py-3 text-sm font-bold uppercase hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-black"
                    >
                      {isLoadingWrite || isLoadingTxn ? (
                        <span>
                          PENDING{' '}
                          <span
                            style={{
                              position: 'relative',
                              top: 1,
                              marginLeft: '2px',
                            }}
                          >
                            <BeatLoader color="#36d7b7" size={10} />
                          </span>
                        </span>
                      ) : (
                        'Make Payment'
                      )}
                    </button>
                  </>
                ) : (
                  <button
                    onClick={onClose}
                    className="rounded-full border-2 border-black px-8 py-3 text-sm font-bold uppercase hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-black"
                  >
                    Close
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}
