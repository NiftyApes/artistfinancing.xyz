import { createContext, Dispatch, ReactNode, useReducer } from 'react'
import { createListingsReducer, initialState, State } from './reducer'
import { Action } from './actions'

interface Store {
  state: State
  dispatch: Dispatch<Action>
}

export const CreateListingsStore = createContext<Store>({
  state: initialState,
  dispatch: () => {
    console.warn(
      'Default dispatch is a no-op. Components requiring the store must be wrapped in the CreateListingsStoreProvider'
    )
  },
})

export const CreateListingsStoreProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [state, dispatch] = useReducer(createListingsReducer, initialState)

  return (
    <CreateListingsStore.Provider value={{ state, dispatch }}>
      {children}
    </CreateListingsStore.Provider>
  )
}
