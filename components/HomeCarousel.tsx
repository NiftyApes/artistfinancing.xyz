import { FC, useEffect, useState } from 'react'
import Link from 'next/link'

export type FeaturedNFT = {
  artist: string
  buyFinancingPrice: number
  buyNowPrice: number
  contractAddress: string
  image: string
  rarity: string
  title: string
  tokenId: string
}

type Props = {
  cards: FeaturedNFT[]
}

const HomeCarousel: FC<Props> = ({ cards }) => {
  const [shiftedCards, setShiftedCards] = useState(cards)
  const featuredNft: FeaturedNFT = shiftedCards[0]

  const timer = 5000
  const cardOffset = 15
  const cardTotal = cards.length
  const cardSize = 430
  const frameSize = cardSize + cardTotal * cardOffset

  const topCardY = cardTotal * cardOffset
  const btmCardY = topCardY + cardSize - 115

  useEffect(() => {
    const interval = setInterval(() => {
      setShiftedCards((prevList) => {
        const listCopy: FeaturedNFT[] = [...prevList]
        const lastEl = listCopy.pop()
        if (lastEl) {
          listCopy.unshift(lastEl)
        }
        return listCopy
      })
    }, timer)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div style={{ width: `${frameSize}px`, height: `${frameSize}px` }}>
      <div className="relative left-[20px]">
        {shiftedCards.map((item, idx) => {
          return (
            <Link
              key={`card-${idx}`}
              href={`/${item.contractAddress}/${item.tokenId}`}
            >
              <div
                style={{
                  height: `${cardSize}px`,
                  left: `${idx * cardOffset}px`,
                  opacity: (cardTotal - idx) / cardTotal,
                  overflow: 'hidden',
                  position: 'absolute',
                  top: `${cardTotal * cardOffset - (idx + 1) * cardOffset}px`,
                  width: `${cardSize}px`,
                  zIndex: cardTotal - idx,
                }}
              >
                <img src={item.image} alt={item.title} />
              </div>
            </Link>
          )
        })}
      </div>
      <div
        style={{ marginTop: `${topCardY}px` }}
        className={`opacity-85 absolute z-50 border border-gray-700 bg-black py-[14px] px-[18px] text-sm`}
      >
        {featuredNft.rarity}
      </div>
      <div
        style={{ marginTop: `${btmCardY}px` }}
        className={`opacity-85 absolute z-50 border border-gray-700 bg-black py-[14px] px-[18px]`}
      >
        <div className="mb-3">
          <div className="text-sm text-gray-500">{featuredNft.artist}</div>
          <div className="text-base">{featuredNft.title}</div>
        </div>
        <div className="flex">
          <div>
            <div className="text-xs">{featuredNft.buyNowPrice} ETH</div>
            <div className="text-[10px] uppercase text-gray-500">price</div>
          </div>
          <div className="ml-10">
            <div className="text-xs">{featuredNft.buyFinancingPrice} ETH</div>
            <div className="text-[10px] uppercase text-gray-500">
              buy with financing
            </div>
          </div>
        </div>
      </div>
      <div className="clearfix"></div>
    </div>
  )
}

export default HomeCarousel
