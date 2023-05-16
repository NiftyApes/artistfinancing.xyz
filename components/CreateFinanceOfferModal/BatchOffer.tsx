import { useTokens } from '@reservoir0x/reservoir-kit-ui'
import { FC, useContext, useState } from 'react'
import Footer from './Footer'
import { validateTerms } from './lib/processTerms'
import OffersAccordion from './OffersAccordion'
import { CreateOffersStore } from './store'
import TokenImage from './TokenImage'

type Props = {
  token: ReturnType<typeof useTokens>['data'][0]
  onClose: () => void
}

const BatchOffer: FC<Props> = ({ token, onClose }) => {
  const { state, dispatch } = useContext(CreateOffersStore)
  const [errorText, setErrorText] = useState('')

  // Checks enabled offers for any form errors before submitting.
  const validateForms = () => {
    let formErrorsExist = false

    // Check Buy Now errors
    if (
      state.buyNow.enabled &&
      (!state.buyNow.price || Number(state.buyNow.price) <= 0)
    ) {
      formErrorsExist = true
      dispatch({
        type: 'update_buy_now_form_errors',
        payload: { price: 'Price' },
      })
    } else {
      dispatch({
        type: 'update_buy_now_form_errors',
        payload: {},
      })
    }

    // Check batch errors
    state.batch.forEach((batchOffer, idx) => {
      const formErrors = validateTerms(batchOffer)

      if (batchOffer.enabled && Object.keys(formErrors).length > 0) {
        formErrorsExist = true
        dispatch({
          type: 'update_batch_form_errors',
          payload: { idx, formErrors },
        })
      } else {
        dispatch({
          type: 'update_batch_form_errors',
          payload: { idx, formErrors: {} },
        })
      }
    })

    if (!state.buyNow.enabled && !state.batch.some((offer) => offer.enabled)) {
      setErrorText('No offers selected.')
    } else if (formErrorsExist) {
      setErrorText('Please enter valid terms for the selected offers.')
    } else {
      setErrorText('')
      dispatch({
        type: 'update_stage',
        payload: 'batch_submitted',
      })
    }
  }

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex items-start space-x-4">
        <TokenImage
          imageSrc={token?.token?.image}
          previousSale={token?.token?.lastSell?.value}
        />
        <div className="h-[500px] flex-grow overflow-y-auto">
          <OffersAccordion />
        </div>
      </div>
      <Footer
        type="batch"
        onSubmit={validateForms}
        onClose={onClose}
        infoText="You'll be asked to sign each offer from your wallet."
        errorText={errorText}
      />
    </div>
  )
}

export default BatchOffer
