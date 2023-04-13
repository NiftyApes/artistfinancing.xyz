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
        <div className="h-[704px] w-[830px] py-8 px-6 text-black">
          <Header
            collectionName="Botfrens"
            nftId="485"
            onClose={() => setOpen(false)}
          />
          <div className="mt-6 flex gap-4">
            <img
              alt="Token Image"
              className="h-[200px] w-[200px] object-contain"
              src={optimizeImage(token?.token?.image, 200)}
            />
            <div className="flex flex-grow justify-between">
              <Tabs.Root defaultValue="custom" className="w-full">
                <Tabs.List className="flex justify-between gap-6">
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
