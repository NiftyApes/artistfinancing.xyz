import { useTokens } from '@reservoir0x/reservoir-kit-ui'
import ListingsAccordion from './ListingsAccordion'
import TokenImage from './TokenImage'

export default function BatchListing({
  token,
}: {
  token: ReturnType<typeof useTokens>['data'][0]
}) {
  return (
    <div className="flex flex-col space-y-12">
      <div className="flex items-start space-x-4">
        <TokenImage imageSrc={token?.token?.image} />
        <div className="h-[450px] flex-grow overflow-y-auto">
          <ListingsAccordion />
        </div>
      </div>
      <div className="flex space-x-8 self-end">
        <button className="rounded-full text-sm font-bold uppercase">
          Nevermind
        </button>
        <button className="rounded-full border-2 border-black px-8 py-3 text-sm font-bold uppercase">
          Create Listing
        </button>
      </div>
    </div>
  )
}
