import { BuyWithFinancing } from 'components/BuyWithFinancingModal'

export default function BuyWithFinancingModalPage() {
  return (
    <div className="mt-24 flex flex-col items-center justify-center">
      <BuyWithFinancing
        collection="0x01c7851ae4d42f7b649ce168716c78fc25fe3d16"
        nftId="74"
      />
    </div>
  )
}
