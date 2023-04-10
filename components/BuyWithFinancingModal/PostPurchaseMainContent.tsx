import { FC } from 'react'

type Props = {
  nameOfWhatYouAreBuying: string
}

const PostPurchaseMainContent: FC<Props> = ({
  nameOfWhatYouAreBuying,
}: {
  nameOfWhatYouAreBuying: string
}) => {
  return (
    <div>
      You have purchased <strong>{nameOfWhatYouAreBuying}</strong>.
      Congratulations!
    </div>
  )
}

export default PostPurchaseMainContent
