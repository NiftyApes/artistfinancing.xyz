import { createContext, Dispatch, ReactNode, useReducer } from 'react'
import { Action } from './actions'
import { createOffersReducer, initialState, State } from './reducer'

interface Store {
  state: State
  dispatch: Dispatch<Action>
}

export const CreateOffersStore = createContext<Store>({
  state: initialState,
  dispatch: () => {
    console.warn(
      'Default dispatch is a no-op. Components requiring the store must be wrapped in the CreateOffersStoreProvider'
    )
  },
})

export const CreateOffersStoreProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [state, dispatch] = useReducer(createOffersReducer, initialState)

  return (
    <CreateOffersStore.Provider value={{ state, dispatch }}>
      {children}
    </CreateOffersStore.Provider>
  )
}
