import { useTokens } from '@reservoir0x/reservoir-kit-ui'
import { createContext, Dispatch, ReactNode, useReducer } from 'react'
import {
  Action,
  createListingsReducer,
  getInitialState,
  State,
} from './reducer'

interface Store {
  state: State
  dispatch: Dispatch<Action>
}

export const CreateListingsStore = createContext<Store>({
  state: getInitialState(),
  dispatch: () => {
    console.warn(
      'Default dispatch is a no-op. Components requiring the store must be wrapped in the CreateListingsStoreProvider'
    )
  },
})

export const CreateListingsStoreProvider = ({
  token,
  children,
}: {
  token: ReturnType<typeof useTokens>['data'][0]
  children: ReactNode
}) => {
  const initialState = getInitialState(token)
  const [state, dispatch] = useReducer(createListingsReducer, initialState)

  return (
    <CreateListingsStore.Provider value={{ state, dispatch }}>
      {children}
    </CreateListingsStore.Provider>
  )
}
