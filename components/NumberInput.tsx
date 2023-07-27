import clsx from 'clsx'
import React, { InputHTMLAttributes, useEffect, useState } from 'react'

interface NumberInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  descriptor?: string
  onChange?: (valueAsString: string, valueAsNumber: number) => void
  formError?: string
}

const NumberInput: React.FC<NumberInputProps> = ({
  descriptor,
  onChange,
  defaultValue,
  formError,
  value: valueProp,
  min,
  ...props
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue || '')

  useEffect(() => {
    if (valueProp !== undefined) {
      setInternalValue(valueProp.toString())
    }
  }, [valueProp])

  const [isFocused, setIsFocused] = useState(false)

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true)
    if (props.onFocus) {
      props.onFocus(e)
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    // Set value to min on blur
    if (!isNaN(Number(min)) && Number(e.target.value) < Number(min)) {
      handleChange(String(min))
    }

    setIsFocused(false)
    if (props.onBlur) {
      props.onBlur(e)
    }
  }

  const handleChange = (value: string) => {
    setInternalValue(value)

    if (onChange) {
      onChange(value, Number(value))
    }
  }

  const handleChangeEvent = (e: React.ChangeEvent<HTMLInputElement>) =>
    handleChange(e.target.value)

  return (
    <div
      className={clsx(
        'flex h-full w-full items-center space-x-2 border-[1px] border-gray-500 bg-white px-4 py-2',
        { 'border-transparent ring-2 ring-black': isFocused },
        { 'border-red-500 ring-2 ring-red-500': formError }
      )}
    >
      <input
        type="number"
        className="w-full bg-transparent text-sm font-bold text-black focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChangeEvent}
        value={internalValue}
        min={min}
        {...props}
      />
      {descriptor && <div className="text-gray-500">{descriptor}</div>}
    </div>
  )
}

export default NumberInput
