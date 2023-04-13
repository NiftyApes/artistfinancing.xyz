import React from 'react'
import NumberFormField from './NumberFormField'

const CustomListingForm = () => {
  return (
    <div className="flex w-full flex-col gap-4 divide-y">
      <NumberFormField
        name="Price"
        descriptor="ETH"
        infoName="Total Profit"
        infoValue="4.689"
      />
      <NumberFormField
        name="Down Payment"
        descriptor="%"
        infoName="Due"
        infoValue="4.6893151"
      />
      <NumberFormField
        name="Duration"
        descriptor="Days"
        infoName="Payments"
        infoValue="1.1733"
      />
      <NumberFormField
        name="APR"
        descriptor="%"
        infoName="Interest"
        infoValue="0.00"
      />
    </div>
  )
}

export default CustomListingForm
