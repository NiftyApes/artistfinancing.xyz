import BuyWithFinancingModal from 'components/BuyWithFinancingModal'
import Section from 'components/BuyWithFinancingModal/Section'
import Modal from 'components/Modal'
import { useState } from 'react'

const buyNow = 'Buy Now'
const _30days = [30, 20] as [number, number]
const _60days = [60, 15] as [number, number]
const _90days = [90, 10] as [number, number]

export default function BuyWithFinancingModalPage() {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <button onClick={() => setOpen(true)} className="mb-12">
        open
      </button>
      <Section
        durationSelectOptions={[buyNow, _30days, _60days, _90days]}
        getDownPaymentInEthOfDurationSelectOption={(duration) => {
          if (duration === buyNow) {
            return 0
          }

          if (duration === _30days) {
            return 5
          }

          return 10
        }}
        getTotalCostInEthOfDurationSelectOption={(duration) => {
          if (duration === buyNow) {
            return 100
          }

          if (duration === _30days) {
            return 90
          }

          return 100
        }}
      />
      <Modal open={open}>
        <BuyWithFinancingModal
          closeModal={() => setOpen(false)}
          nameOfWhatYouAreBuying="Creation and Chaos"
          durationSelectOptions={[buyNow, _30days, _60days, _90days]}
          getDownPaymentInEthOfDurationSelectOption={(duration) => {
            if (duration === buyNow) {
              return 0
            }

            if (duration === _30days) {
              return 5
            }

            return 10
          }}
          getTotalCostInEthOfDurationSelectOption={(duration) => {
            if (duration === buyNow) {
              return 100
            }

            if (duration === _30days) {
              return 90
            }

            return 100
          }}
        />
      </Modal>
    </div>
  )
}
