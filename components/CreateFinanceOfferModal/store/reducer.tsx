import { useTokens } from '@reservoir0x/reservoir-kit-ui'
import { Expiration } from 'lib/niftyapes/expirationOptions'

export interface State {
  custom: {
    price: string
    downPayment: string
    duration: string
    payFreq: string
    apr: string
  }
  buyNow: {
    enabled: boolean
    price: string
  }
  batch: {
    enabled: boolean
    price: string
    downPayment: string
    duration: string
    payFreq: string
    apr: string
  }[]
  expiration: Expiration
}

type ActionTypes =
  | 'update_expiration'
  | 'update_custom_form_value'
  | 'update_buy_now'
  | 'update_batch_form_value'
  | 'add_new_batch_listing'

export interface Action {
  type: ActionTypes
  payload?: any // TODO
}

// TODO (?): Use information from token to determine base price
export const getInitialState = (
  token?: ReturnType<typeof useTokens>['data'][0]
): State => {
  return {
    custom: {
      price: '',
      downPayment: '',
      duration: '',
      payFreq: '',
      apr: '',
    },
    buyNow: {
      enabled: false,
      price: '',
    },
    batch: [
      {
        enabled: false,
        price: '',
        downPayment: '25',
        duration: '30',
        payFreq: 'weekly',
        apr: '0',
      },
      {
        enabled: false,
        price: '',
        downPayment: '33',
        duration: '90',
        payFreq: 'monthly',
        apr: '3',
      },
      {
        enabled: false,
        price: '',
        downPayment: '25',
        duration: '180',
        payFreq: 'monthly',
        apr: '8',
      },
    ],
    expiration: Expiration.OneMonth,
  }
}

export function createListingsReducer(state: State, action: Action) {
  switch (action.type) {
    case 'update_expiration':
      return {
        ...state,
        expiration: action.payload,
      }
    case 'update_custom_form_value':
      return {
        ...state,
        custom: {
          ...state.custom,
          [action.payload.key]: action.payload.value,
        },
      }
    case 'update_buy_now':
      return {
        ...state,
        buyNow: {
          ...state.buyNow,
          [action.payload.key]: action.payload.value,
        },
      }
    case 'update_batch_form_value':
      const { idx, key, value } = action.payload
      const batch = [...state.batch]
      batch[idx] = {
        ...batch[idx],
        [key]: value,
      }

      return { ...state, batch }
    case 'add_new_batch_listing':
      return {
        ...state,
        batch: [
          ...state.batch,
          {
            enabled: false,
            price: '',
            downPayment: '',
            duration: '',
            payFreq: '',
            apr: '',
          },
        ],
      }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}
