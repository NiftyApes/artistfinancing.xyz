import { FC, useState } from 'react'
import NFTImage from './NFTImage'
import PostPurchaseFooter from './PostPurchaseFooter'
import PostPurchaseMainContent from './PostPurchaseMainContent'
import PrePurchaseFooter from './PrePurchaseFooter'
import PrePurchaseMainContent from './PrePurchaseMainContent'

type Props = {
  nameOfWhatYouAreBuying: string
}

const SRUBuyWithFinancing: FC<Props> = ({
  nameOfWhatYouAreBuying,
}: {
  nameOfWhatYouAreBuying: string
}) => {
  const [stage, setStage] = useState<'PRE' | 'POST'>('PRE')

  return (
    <div>
      <NFTImage imgSrc="https://i.seadn.io/gae/WrAd3MWdytcr_EchzpMXR1VfpVQwg3oWzkkobUI5EG7W7xJLKz0KbGjDVbaSpTHGccBzL0v6qDuUM3yDHus7r93urgUuZLZe7zDzw2k?w=500&auto=format" />
      {stage === 'PRE' ? (
        <PrePurchaseMainContent
          nameOfWhatYouAreBuying={nameOfWhatYouAreBuying}
        />
      ) : (
        <PostPurchaseMainContent
          nameOfWhatYouAreBuying={nameOfWhatYouAreBuying}
        />
      )}
      <hr />
      {stage === 'PRE' ? <PrePurchaseFooter /> : <PostPurchaseFooter />}
    </div>
  )
}

export default SRUBuyWithFinancing
