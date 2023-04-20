import Modal from 'components/Modal'
import { Timeline } from 'components/Timeline'
import { useState } from 'react'
import { FiClock } from 'react-icons/fi'

export default function CreateFinanceOfferModal() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button onClick={() => setOpen(true)} className="btn-primary-fill">
        Create offer
      </button>
      <Modal open={open} onOpenChange={setOpen}>
        <div className="flex h-[600px] w-[600px] items-center justify-center p-4">
          <Timeline
            events={[
              {
                icon: FiClock,
                content: <p className="text-xs text-gray-400">Purchase</p>,
                reached: true,
              },
              {
                icon: FiClock,
                content: <p className="text-xs text-gray-400">7 days later</p>,
                reached: true,
              },
              {
                icon: FiClock,
                content: <p className="text-xs text-gray-400">14 days later</p>,
                reached: true,
              },
              {
                icon: FiClock,
                content: <p className="text-xs text-gray-400">21 days later</p>,
                reached: false,
              },
            ]}
            orientation="horizontal"
            contentPosition="below"
          />
        </div>
      </Modal>
    </>
  )
}
