import React, { InputHTMLAttributes, useState } from 'react'

interface NumberInputProps extends InputHTMLAttributes<HTMLInputElement> {
  descriptor?: string
}

const NumberInput: React.FC<NumberInputProps> = ({ descriptor, ...props }) => {
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

  const focusClasses = isFocused ? 'ring-1 ring-black border-transparent' : ''

  return (
    <div
      className={`flex h-[46px] w-[170px] border-[1px] border-gray-500 bg-white ${focusClasses}`}
    >
      <input
        type="number"
        className="w-full py-2 px-4 text-sm font-bold text-black focus:outline-none"
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
      {descriptor && (
        <div className="py-2 px-4 text-gray-500">{descriptor}</div>
      )}
    </div>
  )
}

export default NumberInput
