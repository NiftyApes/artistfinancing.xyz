import * as Tabs from '@radix-ui/react-tabs'
import { useTokens } from '@reservoir0x/reservoir-kit-ui'
import Modal from 'components/Modal'
import { useState } from 'react'
import BatchOffer from './BatchOffer'
import CustomOffer from './CustomOffer'
import Expiration from './Expiration'
import Header from './Header'
import OfferTransactions from './OfferTransactions'
import { CreateOffersStoreProvider } from './store'

export default function CreateFinanceOfferModal({
  token,
}: {
  token: ReturnType<typeof useTokens>['data'][0]
}) {
  const [open, setOpen] = useState(false)

  const tabTriggerStyles =
    'h-[35px] text-sm font-semibold text-gray-400 data-[state=active]:text-black'
  const tabContentStyles = 'h-[580px]'

  return (
    <>
      <button onClick={() => setOpen(true)} className="btn-primary-fill">
        Create offer
      </button>
      <Modal open={open} onOpenChange={setOpen}>
        <CreateOffersStoreProvider>
          <div className="flex h-[700px] w-[830px] flex-col py-6 px-4 text-black">
            <Header
              collectionName={token?.token?.collection?.name}
              nftId={token?.token?.tokenId}
              onClose={() => setOpen(false)}
            />
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
                <BatchOffer token={token} onClose={() => setOpen(false)} />
              </Tabs.Content>
              <Tabs.Content value="custom" className={tabContentStyles}>
                <CustomOffer token={token} onClose={() => setOpen(false)} />
              </Tabs.Content>
            </Tabs.Root>
          </div>
        </CreateOffersStoreProvider>
      </Modal>
    </>
  )
}
