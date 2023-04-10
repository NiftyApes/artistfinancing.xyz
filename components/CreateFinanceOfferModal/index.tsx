import Modal from 'components/Modal'
import { useState } from 'react'

export default function CreateFinanceOfferModal() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button onClick={() => setOpen(true)} className="btn-primary-fill">
        Create offer
      </button>
      <Modal open={open} onOpenChange={setOpen}>
        <p className="text-black">Put your content here</p>
      </Modal>
    </>
  )
}
