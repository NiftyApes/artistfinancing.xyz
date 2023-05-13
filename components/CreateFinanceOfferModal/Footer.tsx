import clsx from 'clsx'
import { FC } from 'react'
import { FormErrors } from './lib/processTerms'

type Props = {
  type: 'custom' | 'batch'
  infoText?: string
  onSubmit: () => void
  formErrors: FormErrors
}

const Footer: FC<Props> = ({ type, infoText, onSubmit, formErrors }) => {
  let footerText = infoText

  if (Object.keys(formErrors).length > 0) {
    footerText = `Please check the following fields: ${Object.keys(formErrors)
      .map((key) => formErrors[key])
      .join(', ')}`
  }

  return (
    <div className="flex items-center justify-between">
      <i
        className={clsx('text-sm', {
          'text-red-500': Object.keys(formErrors).length > 0,
        })}
      >
        {footerText}
      </i>
      <div className="flex flex-shrink-0 space-x-8 self-end">
        <button className="rounded-full text-sm font-bold uppercase hover:underline hover:underline-offset-4">
          Nevermind
        </button>
        <button
          onClick={onSubmit}
          className="rounded-full border-2 border-black px-8 py-3 text-sm font-bold uppercase hover:bg-black hover:text-white"
        >
          {type === 'custom' ? 'Create Offer' : 'Create Offers'}
        </button>
      </div>
    </div>
  )
}

export default Footer
