import React from 'react'
import NumberFormField from './NumberFormField'
import SelectFormField from './SelectFormField'

const CustomListingForm = () => {
  return (
    <div className="flex flex-col justify-between space-y-24">
      <div className="flex flex-col space-y-4 divide-y">
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
      <div className="flex space-x-8 self-end">
        <button className="rounded-full text-sm font-bold uppercase">
          Nevermind
        </button>
        <button className="rounded-full border-2 border-black px-8 py-3 text-sm font-bold uppercase">
          Create Listing
        </button>
      </div>
    </div>
  )
}

export default CustomListingForm
