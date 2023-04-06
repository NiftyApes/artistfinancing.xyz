import { FC, useState } from 'react'
import NFTImage from './NFTImage'
import PostPurchaseFooter from './PostPurchaseFooter'
import PostPurchaseMainContent from './PostPurchaseSideContent'
import PrePurchaseFooter from './PrePurchaseFooter'
import PrePurchaseSideContent from './PrePurchaseSideContent copy'
import PrePurchaseUnderImageContent from './PrePurchaseUnderImageContent'

type Props = {
  nameOfWhatYouAreBuying: string
}

const BuyWithFinancingModal: FC<Props> = ({
  nameOfWhatYouAreBuying,
}: {
  nameOfWhatYouAreBuying: string
}) => {
  const [stage, setStage] = useState<'PRE' | 'POST'>('PRE')

  return (
    <div className="container max-w-4xl">
      <div className="flex flex-wrap">
        <div className="w-full p-2  md:w-1/3">
          <NFTImage imgSrc="https://i.seadn.io/gae/WrAd3MWdytcr_EchzpMXR1VfpVQwg3oWzkkobUI5EG7W7xJLKz0KbGjDVbaSpTHGccBzL0v6qDuUM3yDHus7r93urgUuZLZe7zDzw2k?w=500&auto=format" />
        </div>
        <div className="w-full p-2 md:w-2/3 ">
          {stage === 'PRE' ? (
            <PrePurchaseSideContent
              nameOfWhatYouAreBuying={nameOfWhatYouAreBuying}
            />
          ) : (
            <PostPurchaseMainContent
              nameOfWhatYouAreBuying={nameOfWhatYouAreBuying}
            />
          )}
        </div>
      </div>
      <div className="w-full p-2">
        {stage === 'PRE' ? <PrePurchaseUnderImageContent /> : 'post'}
      </div>
      <div className="mt-8 w-full border-t border-gray-300 pt-8">
        {stage === 'PRE' ? <PrePurchaseFooter /> : <PostPurchaseFooter />}
      </div>
    </div>
  )
}

export default BuyWithFinancingModal
