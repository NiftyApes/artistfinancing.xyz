import React from 'react'
import NumberFormField from './NumberFormField'

const CustomListingForm = () => {
  return (
    <div className="flex w-full flex-col gap-4 divide-y">
      <NumberFormField name="Price" descriptor="ETH" />
      <NumberFormField name="Down Payment" descriptor="%" />
      <NumberFormField name="Duration" descriptor="Days" />
      <NumberFormField name="APR" descriptor="%" />
    </div>
  )
}

export default CustomListingForm
