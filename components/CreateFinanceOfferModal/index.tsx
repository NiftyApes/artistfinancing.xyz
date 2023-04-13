import * as Tabs from '@radix-ui/react-tabs'
import Modal from 'components/Modal'
import { useState } from 'react'
import Header from './header'

export default function CreateFinanceOfferModal() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button onClick={() => setOpen(true)} className="btn-primary-fill">
        Create offer
      </button>
      <Modal open={open} onOpenChange={setOpen}>
        <div className="h-[704px] w-[830px] p-4">
          <Header
            collectionName="Botfrens"
            nftId="485"
            onClose={() => setOpen(false)}
          />
          <Tabs.Root>
            <Tabs.List>
              <Tabs.Trigger value="single">Single Listing</Tabs.Trigger>
              <Tabs.Trigger value="batch">Batch Create</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="single" />
            <Tabs.Content value="batch" />
          </Tabs.Root>
        </div>
      </Modal>
    </>
  )
}
