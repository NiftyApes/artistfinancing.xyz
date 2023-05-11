import { useTokens } from '@reservoir0x/reservoir-kit-ui'
import { FC } from 'react'
import Footer from './Footer'
import ListingsAccordion from './ListingsAccordion'
import TokenImage from './TokenImage'

type Props = {
  token: ReturnType<typeof useTokens>['data'][0]
}

const BatchListing: FC<Props> = ({ token }) => {
  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex items-start space-x-4">
        <TokenImage
          imageSrc={token?.token?.image}
          previousSale={token?.token?.lastSell?.value}
        />
        <div className="h-[500px] flex-grow overflow-y-auto">
          <ListingsAccordion />
        </div>
      </div>
      <Footer footerText="You'll be asked to sign each offer from your wallet." />
    </div>
  )
}

export default BatchListing
