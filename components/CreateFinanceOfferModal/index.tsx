import * as Tabs from '@radix-ui/react-tabs'
import { useTokens } from '@reservoir0x/reservoir-kit-ui'
import Modal from 'components/Modal'
import { optimizeImage } from 'lib/optmizeImage'
import { useState } from 'react'
import Expiration from './Expiration'
import Header from './Header'
import CustomListingForm from './CustomListingForm'

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
        <div className="h-[704px] w-[830px] px-6 pt-6 text-black">
          <Header
            collectionName={token?.token?.collection?.name}
            nftId={token?.token?.tokenId}
            onClose={() => setOpen(false)}
          />
          <div className="mt-6 flex space-x-4">
            <div className="flex flex-col space-y-2">
              <img
                alt="Token Image"
                className="mt-[52px] h-[200px] w-[200px] object-contain"
                src={optimizeImage(token?.token?.image, 200)}
              />
              <div className="flex justify-between px-2">
                <p className="text-xs text-gray-500">Previous Sale</p>
                <p className="text-sm font-bold text-gray-500">0.84 ETH</p>
              </div>
            </div>
            <div className="flex flex-grow justify-between">
              <Tabs.Root defaultValue="custom" className="w-full">
                <Tabs.List className="flex justify-between gap-6 border-b-[1px] py-2">
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
                <Tabs.Content value="batch" />
                <Tabs.Content value="custom">
                  <CustomListingForm />
                </Tabs.Content>
              </Tabs.Root>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}
