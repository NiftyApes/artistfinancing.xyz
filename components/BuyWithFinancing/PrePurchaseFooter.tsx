import { FC, useEffect, useState } from 'react'
import { BeatLoader } from 'react-spinners'

type Props = {
  buyWithFinancing: () => void
  didBuyWithFinancingSucceed: boolean
  onSuccessfulPurchase: () => void
  closeModal: () => void
}

const PrePurchaseFooter: FC<Props> = ({
  buyWithFinancing,
  didBuyWithFinancingSucceed,
  onSuccessfulPurchase,
  closeModal,
}) => {
  const [status, setStatus] = useState<'READY' | 'PENDING' | 'SUCCESS'>('READY')

  useEffect(() => {
    if (didBuyWithFinancingSucceed && status === 'PENDING') {
      setStatus('SUCCESS')
      setTimeout(() => {
        onSuccessfulPurchase()
        setStatus('READY')
      }, 1000)
    }
  }, [didBuyWithFinancingSucceed])

  return (
    <div className="width-full">
      <div className="flex w-full items-center justify-between">
        <span className="italic">
          You&rsquo;ll be asked to approve this purchase from your wallet.
        </span>
        <div className="flex flex-wrap justify-center">
          <button
            className="width-xl focus:outline-no whitespace-nowrap rounded-full px-14 py-4 font-bold hover:text-gray-400 sm:px-14 md:px-4 md:hover:bg-gray-200 md:hover:text-black lg:px-14"
            onClick={closeModal}
          >
            NEVER MIND
          </button>
          <button
            className="rounded-full border-2 border-black px-14 py-4 font-bold hover:bg-black hover:text-white hover:text-white focus:outline-none sm:px-14 md:ml-4 md:px-4 lg:px-14"
            onClick={() => {
              setStatus('PENDING')
              buyWithFinancing()
            }}
          >
            {status === 'READY' ? (
              'PURCHASE'
            ) : status === 'PENDING' ? (
              <span>
                PENDING{' '}
                <span
                  style={{ position: 'relative', top: 1, marginLeft: '2px' }}
                >
                  <BeatLoader color="#fff" size={10} />
                </span>
              </span>
            ) : status === 'SUCCESS' ? (
              'SUCCESS'
            ) : (
              ''
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default PrePurchaseFooter
