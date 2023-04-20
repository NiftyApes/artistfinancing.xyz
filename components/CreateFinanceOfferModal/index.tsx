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
        <div className="h-[704px] w-[830px]">
          <Header
            collectionName="Botfrens"
            nftId="485"
            onClose={() => setOpen(false)}
          />
        </div>
      </Modal>
    </>
  )
}
