import { useTokens } from '@reservoir0x/reservoir-kit-ui'
import Modal from 'components/Modal'
import { FC, useState } from 'react'
import OfferModalContainer from './OfferModalContainer'
import { CreateOffersStoreProvider } from './store'

type Props = {
  token: ReturnType<typeof useTokens>['data'][0]
}

const CreateFinanceOfferModal: FC<Props> = ({ token }) => {
  const [open, setOpen] = useState(false)
  const onClose = () => setOpen(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full rounded-full border-2 bg-white px-8 py-3 text-sm font-bold uppercase text-black hover:bg-white hover:text-black"
      >
        Create Offers
      </button>
      <Modal open={open} onOpenChange={setOpen}>
        <CreateOffersStoreProvider>
          <OfferModalContainer token={token} onClose={onClose} />
        </CreateOffersStoreProvider>
      </Modal>
    </>
  )
}

export default CreateFinanceOfferModal
