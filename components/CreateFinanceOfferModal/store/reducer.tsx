import { Expiration } from 'lib/niftyapes/expirationOptions'
import { formatNumber } from 'lib/numbers'
import { FormErrors } from '../lib/processTerms'
import { Action } from './actions'

export type Stage = 'form_input' | 'custom_submitted' | 'batch_submitted'

export interface State {
  stage: Stage
  currentStep: number
  custom: {
    price: string
    downPayment: string
    duration: string
    payFreq: string
    apr: string
    formErrors: FormErrors
  }
  buyNow: {
    enabled: boolean
    price: string
    formErrors: FormErrors
  }
  batch: {
    enabled: boolean
    isDefault: boolean
    price: string
    downPayment: string
    duration: string
    payFreq: string
    apr: string
    formErrors: FormErrors
  }[]
  expiration: Expiration
}

export const initialState: State = {
  stage: 'form_input',
  currentStep: 0,
  custom: {
    price: '',
    downPayment: '',
    duration: '',
    payFreq: '',
    apr: '',
    formErrors: {},
  },
  buyNow: {
    enabled: false,
    price: '',
    formErrors: {},
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
      formErrors: {},
    },
    {
      enabled: false,
      isDefault: true,
      price: '',
      downPayment: '33',
      duration: '90',
      payFreq: 'monthly',
      apr: '3',
      formErrors: {},
    },
    {
      enabled: false,
      isDefault: true,
      price: '',
      downPayment: '25',
      duration: '180',
      payFreq: 'monthly',
      apr: '8',
      formErrors: {},
    },
  ],
  expiration: Expiration.OneMonth,
}

export function createOffersReducer(state: State, action: Action): State {
  let batch

  switch (action.type) {
    case 'update_stage':
      return {
        ...state,
        stage: action.payload,
      }
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
    case 'update_custom_form_errors':
      return {
        ...state,
        custom: {
          ...state.custom,
          formErrors: action.payload,
        },
      }
    case 'update_buy_now':
      return {
        ...state,
        buyNow: {
          ...state.buyNow,
          [action.payload.key]: action.payload.value,
        },
        // Update all default offers to follow the buy now price as it changes
        // and add a default markup.
        batch: state.batch.map((offer) => {
          if (!offer.isDefault || action.payload.key !== 'price') return offer

          let price = Number(action.payload.value)
          switch (offer.duration) {
            case '30':
              return {
                ...offer,
                // 0.5% markup for 30 day offer
                price: formatNumber(price + 0.005 * price),
              }
            case '90':
              return {
                ...offer,
                // 2.5% markup for 30 day offer
                price: formatNumber(price + 0.025 * price),
              }
            case '180':
              return {
                ...offer,
                // 10% markup for 30 day offer
                price: formatNumber(price + 0.1 * price),
              }
            default:
              return offer
          }
        }),
      }
    case 'update_buy_now_form_errors':
      return {
        ...state,
        buyNow: {
          ...state.buyNow,
          formErrors: action.payload,
        },
      }
    case 'update_batch_form_value':
      batch = [...state.batch]
      batch[action.payload.idx] = {
        ...batch[action.payload.idx],
        [action.payload.key]: action.payload.value,
        // Once edited a offer becomes custom and is no longer
        // updated alongside the buy now price.
        isDefault: false,
      }

      return { ...state, batch }
    case 'update_batch_form_errors':
      batch = [...state.batch]
      batch[action.payload.idx] = {
        ...batch[action.payload.idx],
        formErrors: action.payload.formErrors,
      }

      return { ...state, batch }
    case 'add_new_batch_offer':
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
            formErrors: {},
          },
        ],
      }
    case 'next_step':
      return {
        ...state,
        currentStep: state.currentStep + 1,
      }
    default:
      throw new Error(`Unhandled action type: ${action}`)
  }
}
