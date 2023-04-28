import clsx from 'clsx'
import React from 'react'
import NumberFormField from './NumberFormField'
import SelectFormField from './SelectFormField'

const ListingForm = () => {
  const formFieldStyles = 'pt-4 first:pt-0'

  return (
    <form className="flex flex-grow flex-col space-y-4 divide-y">
      <div className={formFieldStyles}>
        <NumberFormField
          name="Price"
          descriptor="ETH"
          infoName="Total Profit"
          infoValue="4.689"
        />
      </div>
      <div className={formFieldStyles}>
        <NumberFormField
          name="Down Payment"
          descriptor="%"
          infoName="Due"
          infoValue="4.6893151"
        />
      </div>
      <div className={clsx(formFieldStyles, 'flex flex-col space-y-4')}>
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
      <div className={formFieldStyles}>
        <NumberFormField
          name="APR"
          descriptor="%"
          infoName="Interest"
          infoValue="0.00"
          tooltip="Lorem ipsum I don't missum"
        />
      </div>
    </form>
  )
}

export default ListingForm
