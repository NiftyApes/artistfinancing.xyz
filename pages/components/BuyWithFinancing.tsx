import { BuyWithFinancing } from 'components/BuyWithFinancing'

export default function BuyWithFinancingModalPage() {
  return (
    <div className="mt-24 flex flex-col items-center justify-center">
      <BuyWithFinancing
        collection="0x01c7851AE4D42f7B649ce168716C78fC25fE3D16"
        nftId="78"
      />
    </div>
  )
}
