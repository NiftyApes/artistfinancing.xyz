import { useTokens } from '@reservoir0x/reservoir-kit-ui'
import { FC, useContext } from 'react'
import Footer from './Footer'
import { validateTerms } from './lib/processTerms'
import OffersAccordion from './OffersAccordion'
import { CreateOffersStore } from './store'
import TokenImage from './TokenImage'

type Props = {
  token: ReturnType<typeof useTokens>['data'][0]
}

const BatchOffer: FC<Props> = ({ token }) => {
  const { state, dispatch } = useContext(CreateOffersStore)

  let formErrorsExist = false

  // Checks enabled offers for any form errors before submitting.
  const validateForms = () => {
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
      if (!batchOffer.enabled) {
        dispatch({
          type: 'update_batch_form_errors',
          payload: { idx, formErrors: {} },
        })

        return
      }

      const formErrors = validateTerms(batchOffer)

      if (Object.keys(formErrors).length > 0) {
        formErrorsExist = true
        dispatch({
          type: 'update_batch_form_errors',
          payload: { idx, formErrors },
        })
      }
    })

    if (!formErrorsExist) {
      console.log('Valid batch terms. Submitting...')
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
        infoText="You'll be asked to sign each offer from your wallet."
        formErrors={{}}
      />
    </div>
  )
}

export default BatchOffer
