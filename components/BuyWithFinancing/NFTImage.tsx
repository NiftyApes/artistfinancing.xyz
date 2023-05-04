import { FC } from 'react'

type Props = {
  imgSrc: string
}

const NFTImage: FC<Props> = ({ imgSrc }: { imgSrc: string }) => {
  return <img className="h-auto w-full" alt="NFT Image" src={imgSrc} />
}

export default NFTImage
