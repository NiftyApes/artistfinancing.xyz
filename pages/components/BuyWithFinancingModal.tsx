import BuyWithFinancingModal from 'components/BuyWithFinancingModal'

const buyNow = 'Buy Now'
const _30days = [30, 20] as [number, number]
const _60days = [60, 15] as [number, number]
const _90days = [90, 10] as [number, number]

export default function BuyWithFinancingModalPage() {
  return (
    // <Modal open={true}>
    <BuyWithFinancingModal
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
    // </Modal>
  )
}
