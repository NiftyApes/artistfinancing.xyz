import { Offer, useBuyWithFinancing } from '@niftyapes/sdk'
import BuyWithFinancingModal from 'components/BuyWithFinancingModal/BuyWithFinancingModalPresentational'
import Section from 'components/BuyWithFinancingModal/Section'
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
    offer: selectedOffer.offer,
    signature: selectedOffer.signature,
    buyer: address,
  })

  return (
    <div>
      <Section
        setOpen={setOpen}
        selectedOffer={selectedOffer}
        setSelectedOffer={setSelectedOffer}
        offers={offers}
      />
      <Modal open={open}>
        {data && (
          <BuyWithFinancingModal
            tokenImgUrl={tokenImgUrl}
            selectedOffer={selectedOffer}
            setSelectedOffer={setSelectedOffer}
            offers={offers}
            closeModal={() => setOpen(false)}
            nameOfWhatYouAreBuying={tokenName}
            buyWithFinancing={data.write}
          />
        )}
      </Modal>
    </div>
  )
}
