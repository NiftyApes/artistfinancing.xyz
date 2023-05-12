import { Offer, useBuyWithFinancing } from '@niftyapes/sdk'
import BuyWithFinancingModal from 'components/BuyWithFinancing/BuyWithFinancingModal'
import Section from 'components/BuyWithFinancing/Section'
import Modal from 'components/Modal'

type Props = {
  address: string
  selectedOffer: Offer
  setSelectedOffer: (offer: Offer | undefined) => void
  offers: Offer[]
  setOpen: (open: boolean) => void
  open: boolean
  tokenImgUrl: string | undefined
  tokenName: string | undefined
}

export function BuyWithFinancingHookContainer({
  address,
  selectedOffer,
  setSelectedOffer,
  offers,
  setOpen,
  open,
  tokenImgUrl,
  tokenName,
}: Props) {
  const data = useBuyWithFinancing({
    offer: selectedOffer,
    signature: selectedOffer.signature
  })

  return (
    <div>
      <Section
        offers={offers}
        selectedOffer={selectedOffer}
        setSelectedOffer={setSelectedOffer}
        setOpen={setOpen}
      />
      <Modal open={open}>
        {/* TODO: surface errors if data.write is undefined due to error in usePrepareContractWrite */}
        {data && data.write && (
          <BuyWithFinancingModal
            nameOfWhatYouAreBuying={tokenName}
            tokenImgUrl={tokenImgUrl}
            offers={offers}
            selectedOffer={selectedOffer}
            setSelectedOffer={setSelectedOffer}
            buyWithFinancing={data.write}
            didBuyWithFinancingSucceed={data.isSuccess}
            closeModal={() => setOpen(false)}
          />
        )}
      </Modal>
    </div>
  )
}
