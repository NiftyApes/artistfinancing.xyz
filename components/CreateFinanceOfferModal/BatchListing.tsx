import { useTokens } from '@reservoir0x/reservoir-kit-ui'
import Footer from './Footer'
import ListingsAccordion from './ListingsAccordion'
import TokenImage from './TokenImage'

export default function BatchListing({
  token,
}: {
  token: ReturnType<typeof useTokens>['data'][0]
}) {
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
