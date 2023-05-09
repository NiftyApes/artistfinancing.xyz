import { Expiration } from 'lib/niftyapes/expirationOptions'

export interface State {
  custom: {
    price: string
    downPayment: string
    duration: string
    payFreq: string
    apr: string
  }
  batch: any // TODO
  expiration: Expiration
}

type ActionTypes =
  | 'update_custom_form_values'
  | 'update_batch_form_values'
  | 'update_expiration'

export interface Action {
  type: ActionTypes
  payload: any // TODO
}

export const initialState: State = {
  custom: {
    price: '',
    downPayment: '',
    duration: '',
    payFreq: '',
    apr: '',
  },
  batch: {
    buyNow: {
      price: '',
      enabled: false,
    },
  },
  expiration: Expiration.OneMonth,
}

export function createListingsReducer(state: State, action: Action) {
  switch (action.type) {
    case 'update_expiration':
      return {
        ...state,
        expiration: action.payload,
      }
    case 'update_custom_form_values':
      return {
        ...state,
        custom: {
          ...state.custom,
          [action.payload.key]: action.payload.value,
        },
      }
    case 'update_batch_form_values':
      return initialState
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}
