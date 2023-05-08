export interface State {
  custom: {
    price: string
    downPayment: string
    duration: string
    payFreq: string
    apr: string
  }
  batch: Array<any>
  expiration: string
}

type ActionTypes =
  | 'update_custom_form_values'
  | 'update_batch_form_values'
  | 'update_expiration'

export interface Action {
  type: ActionTypes
  payload: any
}

export const initialState: State = {
  custom: {
    price: '',
    downPayment: '',
    duration: '',
    payFreq: '',
    apr: '',
  },
  batch: [],
  expiration: '',
}

export function createListingsReducer(state: State, action: Action) {
  switch (action.type) {
    case 'update_custom_form_values':
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      }
    case 'update_batch_form_values':
      return initialState
    case 'update_expiration':
      return initialState
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}
