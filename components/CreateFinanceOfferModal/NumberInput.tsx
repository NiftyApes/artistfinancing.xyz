import React, { InputHTMLAttributes } from 'react'

interface NumberInputProps extends InputHTMLAttributes<HTMLInputElement> {
  descriptor?: string
}

const NumberInput: React.FC<NumberInputProps> = ({ descriptor, ...props }) => {
  return (
    <div className="relative">
      <input
        type="number"
        className="w-[200px] border-[1px] border-gray-400 bg-white py-2 px-4 pr-10 font-bold text-black focus:border-transparent focus:outline-none focus:ring-2 focus:ring-black"
        {...props}
      />
      {descriptor && (
        <div className="absolute top-0 right-0 py-2 px-4 text-gray-500">
          {descriptor}
        </div>
      )}
    </div>
  )
}

export default NumberInput
