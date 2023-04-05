import { FC, useState } from 'react'

type Props = {
  nameOfWhatYouAreBuying: string
}

const PostPurchaseMainContent: FC<Props> = ({
  nameOfWhatYouAreBuying,
}: {
  nameOfWhatYouAreBuying: string
}) => {
  const [duration, setDuration] = useState('1 month')
  return (
    <div>
      You have purchased <strong>{nameOfWhatYouAreBuying}</strong>.
      Congratulations!
    </div>
  )
}

export default PostPurchaseMainContent
