import clsx from 'clsx'
import { FC } from 'react'
import NumberFormField from './NumberFormField'
import SelectFormField from './SelectFormField'

type FinancingTerms = {
  price: string
  downPayment: string
  duration: string
  payFreq: unknown // TODO
  apr: string
}

type Props = {
  defaultTerms?: FinancingTerms
  handleFormChange: (key: string, value: string) => void
}

const ListingForm: FC<Props> = ({ defaultTerms, handleFormChange }) => {
  const formFieldStyles = 'pt-4 first:pt-0'

  return (
    <form className="flex flex-grow flex-col space-y-4 divide-y">
      <div className={formFieldStyles}>
        <NumberFormField
          name="Price"
          descriptor="ETH"
          infoName="Total Profit"
          infoValue="4.689"
          onChange={(value) => {
            handleFormChange('price', value)
          }}
        />
      </div>
      <div className={formFieldStyles}>
        <NumberFormField
          name="Down Payment"
          descriptor="%"
          infoName="Due"
          infoValue="4.6893151"
          onChange={(value) => {
            handleFormChange('downPayment', value)
          }}
        />
      </div>
      <div className={clsx(formFieldStyles, 'flex flex-col space-y-4')}>
        <NumberFormField
          name="Duration"
          descriptor="Days"
          tooltip="Length of financing, shorter means less interest."
          onChange={(value) => {
            handleFormChange('duration', value)
          }}
        />
        <SelectFormField
          name="Payment Freq."
          infoName="Payments"
          infoValue="1.1733"
          tooltip="How often payments are due from the buyer."
          defaultValue="weekly"
          options={[
            { value: 'weekly', label: 'Weekly' },
            { value: 'monthly', label: 'Monthly' },
          ]}
        />
      </div>
      <div className={formFieldStyles}>
        <NumberFormField
          name="APR"
          descriptor="%"
          infoName="Interest"
          infoValue="0.00"
          tooltip="Annual cost of borrowing, lower is more attractive for buyers."
          onChange={(value) => {
            handleFormChange('apr', value)
          }}
        />
      </div>
    </form>
  )
}

export default ListingForm
