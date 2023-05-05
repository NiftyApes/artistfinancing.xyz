import React, { InputHTMLAttributes, useState } from 'react'

interface NumberInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  descriptor?: string
  onChange?: (valueAsString: string, valueAsNumber: number) => void
}

const NumberInput: React.FC<NumberInputProps> = ({
  descriptor,
  onChange,
  defaultValue,
  ...props
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue || '')

  const [isFocused, setIsFocused] = useState(false)

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true)
    if (props.onFocus) {
      props.onFocus(e)
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false)
    if (props.onBlur) {
      props.onBlur(e)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key.length === 1 && /[a-zA-Z]/g.test(e.key)) e.preventDefault()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInternalValue(e.target.value)

    if (onChange) {
      onChange(String(e.target.value), Number(e.target.value))
    }
  }

  const focusClasses = isFocused ? 'ring-1 ring-black border-transparent' : ''

  return (
    <div
      className={`flex border-[1px] border-gray-500 bg-white ${focusClasses}`}
    >
      <input
        type="number"
        className="w-full py-2 px-4 text-sm font-bold text-black focus:outline-none"
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={internalValue}
        {...props}
      />
      {descriptor && (
        <div className="py-2 px-4 text-gray-500">{descriptor}</div>
      )}
    </div>
  )
}

export default NumberInput
