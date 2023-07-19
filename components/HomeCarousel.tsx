import { FC } from 'react'

type FeaturedNFT = {
  artist?: string
  buyFinancingPrice?: number
  buyNowPrice?: number
  title?: string
}

type Props = {
  content: FeaturedNFT[],
}

const HomeCarousel: FC<Props> = ({ content }) => {
  return <div className="relative">
    {content.map((item, idx) => {
      return (
        <div
          className={`absolute bg-red-500 top-${30 * idx} left-${30 * idx} w-40 h-40 border-2`}
          key={`item-${idx}`}
        >
          <img src="https://i.seadn.io/gcs/files/6ceed67665dad2b17d2bdf99d48055a4.png?auto=format&dpr=1&w=3840" alt="Image" />
        </div>
      );
    })}
  </div>
}

export default HomeCarousel
