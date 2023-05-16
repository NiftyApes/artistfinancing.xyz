import { Expiration } from 'lib/niftyapes/expirationOptions'
import { formatNumber } from 'lib/numbers'
import { Action } from './actions'

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
    isDefault: boolean
    price: string
    downPayment: string
    duration: string
    payFreq: string
    apr: string
  }[]
  expiration: Expiration
}

export const initialState: State = {
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
      isDefault: true,
      price: '',
      downPayment: '25',
      duration: '30',
      payFreq: 'weekly',
      apr: '0',
    },
    {
      enabled: false,
      isDefault: true,
      price: '',
      downPayment: '33',
      duration: '90',
      payFreq: 'monthly',
      apr: '3',
    },
    {
      enabled: false,
      isDefault: true,
      price: '',
      downPayment: '25',
      duration: '180',
      payFreq: 'monthly',
      apr: '8',
    },
  ],
  expiration: Expiration.OneMonth,
}

export function createListingsReducer(state: State, action: Action): State {
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
        // Update all default listings to follow the buy now price as it changes
        // and add a default markup.
        batch: state.batch.map((listing) => {
          if (!listing.isDefault || action.payload.key !== 'price')
            return listing

          let price = Number(action.payload.value)
          switch (listing.duration) {
            case '30':
              return {
                ...listing,
                // 0.5% markup for 30 day listing
                price: formatNumber(price + 0.005 * price),
              }
            case '90':
              return {
                ...listing,
                // 2.5% markup for 30 day listing
                price: formatNumber(price + 0.025 * price),
              }
            case '180':
              return {
                ...listing,
                // 10% markup for 30 day listing
                price: formatNumber(price + 0.1 * price),
              }
            default:
              return listing
          }
        }),
      }
    case 'update_batch_form_value':
      const { idx, key, value } = action.payload
      const batch = [...state.batch]
      batch[idx] = {
        ...batch[idx],
        [key]: value,
        // Once edited a listing becomes custom and is no longer
        // updated alongside the buy now price.
        isDefault: false,
      }

      return { ...state, batch }
    case 'add_new_batch_listing':
      return {
        ...state,
        batch: [
          ...state.batch,
          {
            enabled: false,
            isDefault: false,
            price: '',
            downPayment: '',
            duration: '',
            payFreq: '',
            apr: '',
          },
        ],
      }
    default:
      throw new Error(`Unhandled action type: ${action}`)
  }
}
