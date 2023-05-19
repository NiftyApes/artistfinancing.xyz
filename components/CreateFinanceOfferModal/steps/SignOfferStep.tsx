import { FC } from 'react'
import { OfferTerms, processTerms } from '../lib/processTerms'

type Props = {
  terms: OfferTerms
}

const SignOfferStep: FC<Props> = ({ terms }) => {
  const processedTerms = processTerms(terms)

  return (
    <div className="flex flex-col space-y-1">
      <p className="text-sm text-black">
        Sign Financing Offer for <b>{processedTerms.saleTotal} ETH</b> over{' '}
        <b>{processedTerms.duration} days</b>
      </p>
      <div className="flex items-center space-x-2">
        {/** TODO: useCreateOffer & Transaction tracking **/}
      </div>
    </div>
  )
}

export default SignOfferStep
