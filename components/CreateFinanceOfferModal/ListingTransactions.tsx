import { useTokens } from '@reservoir0x/reservoir-kit-ui'
import { Timeline } from 'components/Timeline'
import { optimizeImage } from 'lib/optmizeImage'
import { FiClock } from 'react-icons/fi'

const ListingTransactions = ({
  token,
}: {
  token: ReturnType<typeof useTokens>['data'][0]
}) => {
  const imageSrc = token?.token?.image

  return (
    <div className="flex space-x-4">
      <img
        alt="Token Image"
        className="h-[400px] w-[400px] object-contain"
        src={optimizeImage(imageSrc, 400)}
      />
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
        orientation="vertical"
        succeedingLine={false}
        precedingLine={false}
      />
    </div>
  )
}

export default ListingTransactions
