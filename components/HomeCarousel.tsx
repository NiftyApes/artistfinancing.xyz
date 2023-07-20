import { FC, useEffect, useState } from 'react'

type FeaturedNFT = {
  artist: string
  buyFinancingPrice: number
  buyNowPrice: number
  title: string
  image: string
  rarity: string
}

type Props = {
  cards: FeaturedNFT[],
}

const HomeCarousel: FC<Props> = ({ cards }) => {

  const [shiftedCards, setShiftedCards] = useState(cards)
  const featuredNft: FeaturedNFT = shiftedCards[0]

  const timer = 5000
  const cardOffset = 15
  const cardTotal = cards.length
  const cardSize = 295
  const frameSize = cardSize + (cardTotal * cardOffset)

  const topCardY = cardTotal * cardOffset
  const btmCardY = 190 + topCardY

  useEffect(() => {
    const interval = setInterval(() => {

      setShiftedCards((prevList) => {

        const listCopy: FeaturedNFT[] = [...prevList]
        const lastEl: FeaturedNFT = listCopy.pop()
        listCopy.unshift(lastEl)
        return listCopy
      })
    }, timer)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div style={{width: `${frameSize}px`, height: `${frameSize}px`}}>
      <div className='relative left-[20px]'>
        {shiftedCards.map((item, idx) => {
          return (<div key={`card-${idx}`}
                       style={{
                         top: `${(cardTotal * cardOffset) - ((idx + 1) * cardOffset)}px`,
                         left: `${idx * cardOffset}px`,
                         opacity: (cardTotal - idx) / cardTotal,
                         zIndex: cardTotal - idx
                       }}
                       className={`absolute left-${idx * cardOffset} overflow-hidden w-[${cardSize}px] h-[${cardSize}px]`}>

              <img src={item.image} alt={item.title} />
            </div>
          )
        })}
      </div>
      <div
        className={`absolute border border-gray-700 bg-black text-sm opacity-85 py-[14px] px-[18px] mt-[${topCardY}px] z-50`}>
        {featuredNft.rarity}
      </div>
      <div
        className={`absolute border border-gray-700 bg-black opacity-85 py-[14px] px-[18px] mt-[${btmCardY}px] z-50`}>
        <div className='mb-3'>
          <div className='text-xs text-gray-500'>{featuredNft.artist}</div>
          <div className='text-sm'>{featuredNft.title}</div>
        </div>
        <div className='flex'>
          <div>
            <div className='text-[10px]'>{featuredNft.buyNowPrice} ETH</div>
            <div className='text-[8px] text-gray-500 uppercase'>price</div>
          </div>
          <div className='ml-10'>
            <div className='text-[10px]'>{featuredNft.buyFinancingPrice} ETH</div>
            <div className='text-[8px] text-gray-500 uppercase'>buy with financing</div>
          </div>
        </div>
      </div>
      <div className='clearfix'></div>
    </div>
  )
}

export default HomeCarousel
