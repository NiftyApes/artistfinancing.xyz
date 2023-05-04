import { FC } from 'react'

const ExplanationMsg: FC = () => {
  return (
    <div className="text-center text-gray-600" style={{ fontFamily: 'Inter' }}>
      <div>The NFT will be locked in escrow until the last payment.</div>
      <div className="mt-8">
        If you fail to make a payment, the artist has the right to seize the
        asset and you will lose any payments made.
      </div>
    </div>
  )
}

export default ExplanationMsg
