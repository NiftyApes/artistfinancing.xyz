import { FC } from 'react'
import Link from 'next/link'
import { FeaturedNFT } from './HomeCarousel'

type Props = {
  cards: FeaturedNFT[]
}

const HomeFeatured: FC<Props> = ({ cards }) => {
  const renderFeaturedImage = (item: FeaturedNFT) => {
    return (
      <div className="group relative">
        <Link href="#">
          <div className="absolute right-0 z-50 bg-white py-[14px] px-[18px] opacity-0 transition-opacity duration-100 group-hover:opacity-100">
            <div className="mb-3">
              <span className="mr-2 text-sm text-gray-500">{item.artist}</span>
              <span className="text-base text-black">{item.title}</span>
            </div>
            <div className="flex">
              <div>
                <div className="text-xs text-black">{item.buyNowPrice} ETH</div>
                <div className="text-[10px] uppercase text-gray-500">price</div>
              </div>
              <div className="ml-5 mr-5 border-t border-r border-gray-200"></div>
              <div>
                <div className="text-xs text-black">
                  {item.buyFinancingPrice} ETH
                </div>
                <div className="text-[10px] uppercase text-gray-500">
                  buy with financing
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.75))',
            }}
            className="absolute bottom-0 right-0 h-full w-full opacity-0 transition-opacity duration-100 group-hover:opacity-100"
          ></div>
          <img className="h-full" src={item.image} />
        </Link>
      </div>
    )
  }

  return (
    <div className="col-span-full max-w-[1095px]">
      <div className="mb-[48px] flex px-[30px]">
        <div>
          <div className="text-4xl">Featured Art</div>
          <div className="mt-[24px] flex items-center text-gray-600">
            {cards.map((item, idx) => {
              return (
                <>
                  <div>{item.artist}</div>
                  {idx < cards.length - 1 && (
                    <div className="ml-[15px] mr-[15px] h-[6px] w-[6px] rounded-full bg-gray-700"></div>
                  )}
                </>
              )
            })}
          </div>
        </div>
        <div className="ml-auto">
          <Link href="https://niftyapes.readme.io/docs" target="_blank">
            <div className="flex items-center uppercase text-white">
              <span className="text-lg">explore</span>
              <div className="ml-[15px] h-[24px] w-[24px] rounded-full border border-white bg-[url('/icons/arrow-up-right.svg')] bg-center bg-no-repeat"></div>
            </div>
          </Link>
        </div>
      </div>

      <div>
        <div className="grid w-full grid-cols-4 items-end space-x-[24px]">
          {cards.slice(0, 4).map((item, idx) => {
            return renderFeaturedImage(item)
          })}
        </div>

        <div className="mt-[24px] grid w-full grid-cols-3 items-start space-x-[24px]">
          {cards.slice(4, 7).map((item) => {
            return renderFeaturedImage(item)
          })}
        </div>
      </div>
    </div>
  )
}

export default HomeFeatured
