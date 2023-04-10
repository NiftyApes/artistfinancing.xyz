import { FC } from 'react'

const PrePurchaseFooter: FC = () => {
  return (
    <div className="width-full">
      <div className="flex w-full items-center justify-between">
        <span className="italic">
          You&rsquo;ll be asked to approve this purchase from your wallet.
        </span>
        <div className="flex flex-wrap justify-center">
          <button className="width-xl focus:outline-no whitespace-nowrap rounded-full px-14 py-3 font-bold hover:text-gray-400 sm:px-14 md:px-4 md:hover:bg-gray-200 md:hover:text-black lg:px-14">
            NEVER MIND
          </button>
          <button className="rounded-full border-2 border-black px-14 py-3 font-bold hover:bg-black hover:text-white hover:text-white focus:outline-none sm:px-14 md:ml-4 md:px-4 lg:px-14">
            PURCHASE
          </button>
        </div>
      </div>
    </div>
  )
}

export default PrePurchaseFooter
