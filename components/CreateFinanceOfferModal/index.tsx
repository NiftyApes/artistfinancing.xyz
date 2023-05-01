import * as Tabs from '@radix-ui/react-tabs'
import { useTokens } from '@reservoir0x/reservoir-kit-ui'
import Modal from 'components/Modal'
import { useState } from 'react'
import BatchListing from './BatchListing'
import CustomListing from './CustomListing'
import Expiration from './Expiration'
import Header from './Header'

export default function CreateFinanceOfferModal({
  token,
}: {
  token: ReturnType<typeof useTokens>['data'][0]
}) {
  const [open, setOpen] = useState(false)

  const tabTriggerStyles =
    'h-[35px] text-sm font-semibold text-gray-400 data-[state=active]:text-black'

  return (
    <>
      <button onClick={() => setOpen(true)} className="btn-primary-fill">
        Create offer
      </button>
      <Modal open={open} onOpenChange={setOpen}>
        <div className="h-[730px] w-[830px] py-6 px-4 text-black">
          <Header
            collectionName={token?.token?.collection?.name}
            nftId={token?.token?.tokenId}
            onClose={() => setOpen(false)}
          />
          <div className="mt-6 flex space-x-6">
            <div className="flex flex-grow justify-between">
              <Tabs.Root defaultValue="custom" className="w-full">
                <Tabs.List className="ml-[216px] flex justify-between gap-6 border-b-[1px] py-2">
                  <div className="flex gap-8">
                    <Tabs.Trigger value="batch" className={tabTriggerStyles}>
                      List Art for Sale
                    </Tabs.Trigger>
                    <Tabs.Trigger value="custom" className={tabTriggerStyles}>
                      Custom Listing
                    </Tabs.Trigger>
                  </div>
                  <Expiration />
                </Tabs.List>
                <Tabs.Content value="batch">
                  <BatchListing token={token} />
                </Tabs.Content>
                <Tabs.Content value="custom">
                  <CustomListing token={token} />
                </Tabs.Content>
              </Tabs.Root>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}
