import BuyWithFinancingModal from 'components/BuyWithFinancingModal'
import Modal from 'components/Modal'

export default function BuyWithFinancingModalPage() {
  return (
    <Modal open={true}>
      <BuyWithFinancingModal nameOfWhatYouAreBuying="Creation and Chaos" />
    </Modal>
  )
}
