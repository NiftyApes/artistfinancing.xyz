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
    <div className="text-gray-600" style={{ fontFamily: 'Poppins' }}>
      <div className="mb-12">
        You have purchased <strong>{nameOfWhatYouAreBuying}</strong>.
        Congratulations!
      </div>
      <div className="mb-12 flex">
        <div className="mr-6">icon</div>
        <div>
          Make payments on this page, or on the payments page to manage your
          loan.
        </div>
      </div>
      <div className="flex">
        <div className="mr-6">icon</div>
        <div>
          <div className="mb-6">
            You&rsquo;ve also received an{' '}
            <span className="text-black">NFT representing your purchase</span>{' '}
            (a Buyer Ticket).
          </div>
          <div>
            You can transfer ownership of this loan by sending or selling that
            Buyer Ticket.
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostPurchaseMainContent
