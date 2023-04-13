import * as Tabs from '@radix-ui/react-tabs'
import { useTokens } from '@reservoir0x/reservoir-kit-ui'
import Modal from 'components/Modal'
import { optimizeImage } from 'lib/optmizeImage'
import { useState } from 'react'
import Header from './header'

export default function CreateFinanceOfferModal({
  token,
}: {
  token: ReturnType<typeof useTokens>['data'][0]
}) {
  const [open, setOpen] = useState(false)

  const tabTriggerStyles =
    'text-sm font-semibold text-gray-400 data-[state=active]:text-black'

  return (
    <>
      <button onClick={() => setOpen(true)} className="btn-primary-fill">
        Create offer
      </button>
      <Modal open={open} onOpenChange={setOpen}>
        <div className="h-[704px] w-[830px] py-8 px-6">
          <Header
            collectionName="Botfrens"
            nftId="485"
            onClose={() => setOpen(false)}
          />
          <div className="mt-6 flex gap-4">
            <img
              alt="Token Image"
              className="h-[240px] w-[240px] object-contain"
              src={optimizeImage(token?.token?.image, 200)}
            />
            <Tabs.Root defaultValue="single">
              <Tabs.List className="flex gap-6 text-black">
                <Tabs.Trigger value="single" className={tabTriggerStyles}>
                  Single Listing
                </Tabs.Trigger>
                <Tabs.Trigger value="batch" className={tabTriggerStyles}>
                  Batch Create
                </Tabs.Trigger>
              </Tabs.List>
              <Tabs.Content value="single" />
              <Tabs.Content value="batch" />
            </Tabs.Root>
          </div>
        </div>
      </Modal>
    </>
  )
}
