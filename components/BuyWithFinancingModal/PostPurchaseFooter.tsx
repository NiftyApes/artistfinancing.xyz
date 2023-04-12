import { FC } from 'react'

const PostPurchaseFooter: FC = () => {
  return (
    <div className="flex w-full items-center justify-end">
      <button className="width-xl focus:outline-no whitespace-nowrap rounded-full px-14 py-3 font-bold hover:text-gray-400 sm:px-14 md:px-4 md:hover:bg-gray-200 md:hover:text-black lg:px-14">
        CLOSE
      </button>
    </div>
  )
}

export default PostPurchaseFooter
