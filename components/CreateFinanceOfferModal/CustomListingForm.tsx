import React from 'react'
import NumberFormField from './NumberFormField'
import SelectFormField from './SelectFormField'

const CustomListingForm = () => {
  return (
    <div className="flex flex-grow flex-col space-y-4 divide-y">
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
      <div>
        <NumberFormField
          name="Duration"
          descriptor="Days"
          tooltip="Diddi diddi blah blah"
        />
        <SelectFormField
          name="Payment Freq."
          infoName="Payments"
          infoValue="1.1733"
          tooltip="Diddi diddi blah blah"
        />
      </div>
      <NumberFormField
        name="APR"
        descriptor="%"
        infoName="Interest"
        infoValue="0.00"
        tooltip="Lorem ipsum I don't missum"
      />
    </div>
  )
}

export default CustomListingForm
