import expirationOptions from 'lib/niftyapes/expirationOptions'
import { useContext } from 'react'
import { Select, SelectItem } from './Select'
import { CreateListingsStore } from './state'

export default function Expiration() {
  const { state, dispatch } = useContext(CreateListingsStore)

  const handleSelect = (value: string) => {
    const selectedExpiration = expirationOptions.find(
      (option) => String(option.value) === value
    )

    if (selectedExpiration) {
      dispatch({ type: 'update_expiration', payload: selectedExpiration.value })
    }
  }

  return (
    <div className="flex space-x-1">
      <div className="flex h-[35px] items-center justify-center">
        <em className="text-xs text-gray-500">Expires</em>
      </div>

      <Select
        defaultValue={String(state.expiration)}
        onValueChange={handleSelect}
        triggerClassName="inline-flex h-[35px] items-center justify-center gap-2 rounded bg-white px-[15px] text-sm font-semibold leading-none outline-none focus:shadow-[0_0_0_1px] focus:shadow-black"
      >
        {expirationOptions.map((expiration, idx) => (
          <SelectItem key={idx} value={String(expiration.value)}>
            {expiration.label}
          </SelectItem>
        ))}
      </Select>
    </div>
  )
}
