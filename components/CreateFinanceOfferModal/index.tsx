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
                content: <p className="text-black">Event 1</p>,
                reached: true,
              },
              {
                icon: FiClock,
                content: <p className="text-black">Event 2</p>,
                reached: true,
              },
              {
                icon: FiClock,
                content: <p className="text-black">Event 3</p>,
                reached: true,
              },
              {
                icon: FiClock,
                content: <p className="text-black">Event 4</p>,
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
