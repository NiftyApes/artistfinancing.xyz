import { useTokens } from '@reservoir0x/reservoir-kit-ui'
import { Timeline } from 'components/Timeline'
import { FiClock } from 'react-icons/fi'
import ListingForm from './ListingForm'
import TokenImage from './TokenImage'

export default function CustomListing({
  token,
}: {
  token: ReturnType<typeof useTokens>['data'][0]
}) {
  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex items-start space-x-4">
        <TokenImage imageSrc={token?.token?.image} />
        <div className="flex-grow py-4 px-2">
          <ListingForm />
        </div>
      </div>
      <div className="ml-8">
        <Timeline
          events={[
            {
              icon: FiClock,
              content: <p className="text-xs text-gray-400">Purchase</p>,
              tooltipContent: (
                <div
                  className={`align-center bg-black px-6 py-4 text-center text-sm text-white`}
                >
                  0.88 ETH
                </div>
              ),
              current: true,
            },
            {
              icon: FiClock,
              content: <p className="text-xs text-gray-400">7 days later</p>,
            },
            {
              icon: FiClock,
              content: <p className="text-xs text-gray-400">14 days later</p>,
            },
            {
              icon: FiClock,
              content: <p className="text-xs text-gray-400">21 days later</p>,
            },
            {
              icon: FiClock,
              content: <p className="text-xs text-gray-400">30 days later</p>,
            },
          ]}
          orientation="horizontal"
          succeedingLine={false}
        />
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
