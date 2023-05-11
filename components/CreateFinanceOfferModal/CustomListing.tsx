import { useTokens } from '@reservoir0x/reservoir-kit-ui'
import { Timeline } from 'components/Timeline'
import { useContext } from 'react'
import { FiClock } from 'react-icons/fi'
import Footer from './Footer'
import ListingForm from './ListingForm'
import { CreateListingsStore } from './store'
import TokenImage from './TokenImage'

export default function CustomListing({
  token,
}: {
  token: ReturnType<typeof useTokens>['data'][0]
}) {
  const { state, dispatch } = useContext(CreateListingsStore)

  const handleFormChange = (key: string, value: string) => {
    dispatch({ type: 'update_custom_form_value', payload: { key, value } })
  }

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex items-start space-x-4">
        <TokenImage
          imageSrc={token?.token?.image}
          previousSale={token?.token?.lastSell?.value}
        />
        <div className="flex-grow py-4 px-2">
          <ListingForm
            terms={state.custom}
            handleFormChange={handleFormChange}
          />
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
      <Footer />
    </div>
  )
}
