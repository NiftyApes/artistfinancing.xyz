import { Expiration } from 'lib/niftyapes/expirationOptions'
import { FormErrors } from '../lib/processTerms'

export type Action =
  | {
      type: 'update_expiration'
      payload: Expiration
    }
  | {
      type: 'update_custom_form_value'
      payload: {
        key: string
        value: string
      }
    }
  | {
      type: 'update_custom_form_errors'
      payload: FormErrors
    }
  | {
      type: 'update_buy_now'
      payload: {
        key: string
        value: string | boolean
      }
    }
  | {
      type: 'update_buy_now_form_errors'
      payload: FormErrors
    }
  | {
      type: 'update_batch_form_value'
      payload: {
        idx: number
        key: string
        value: string | boolean
      }
    }
  | {
      type: 'update_batch_form_errors'
      payload: { idx: number; formErrors: FormErrors }
    }
  | {
      type: 'add_new_batch_offer'
    }
