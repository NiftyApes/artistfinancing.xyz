import * as Tabs from '@radix-ui/react-tabs'
import { useTokens } from '@reservoir0x/reservoir-kit-ui'
import { FC, useContext } from 'react'
import BatchOffer from './BatchOffer'
import CustomOffer from './CustomOffer'
import Expiration from './Expiration'
import Header from './Header'
import OfferTransactions from './OfferTransactions'
import { CreateOffersStore } from './store'

type Props = {
  token: ReturnType<typeof useTokens>['data'][0]
  onClose: () => void
}

const OfferModalContainer: FC<Props> = ({ token, onClose }) => {
  const { state } = useContext(CreateOffersStore)

  const tabTriggerStyles =
    'h-[35px] text-sm font-semibold text-gray-400 data-[state=active]:text-black'
  const tabContentStyles = 'h-[580px]'

  return (
    <div className="flex h-[700px] w-[830px] flex-col py-6 px-4 text-black">
      <Header
        collectionName={token?.token?.collection?.name}
        nftId={token?.token?.tokenId}
        onClose={onClose}
      />
      {state.stage === 'form_input' ? (
        <Tabs.Root defaultValue="custom">
          <Tabs.List className="ml-[216px] flex justify-between gap-6 border-b-[1px] py-2">
            <div className="flex gap-8">
              <Tabs.Trigger value="batch" className={tabTriggerStyles}>
                List Art for Sale
              </Tabs.Trigger>
              <Tabs.Trigger value="custom" className={tabTriggerStyles}>
                Custom Offer
              </Tabs.Trigger>
            </div>
            <Expiration />
          </Tabs.List>
          <Tabs.Content value="batch" className={tabContentStyles}>
            <BatchOffer token={token} onClose={onClose} />
          </Tabs.Content>
          <Tabs.Content value="custom" className={tabContentStyles}>
            <CustomOffer token={token} onClose={onClose} />
          </Tabs.Content>
        </Tabs.Root>
      ) : (
        <OfferTransactions token={token} />
      )}
    </div>
  )
}

export default OfferModalContainer
