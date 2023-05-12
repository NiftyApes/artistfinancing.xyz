import clsx from 'clsx'
import { FC } from 'react'
import { FinancingTerms, processTerms } from './lib/processTerms'
import NumberFormField from './NumberFormField'
import SelectFormField from './SelectFormField'

type Props = {
  terms: FinancingTerms
  handleFormChange: (key: string, value: string) => void
}

const ListingForm: FC<Props> = ({ terms, handleFormChange }) => {
  const processedTerms = processTerms(terms)

  const formFieldStyles = 'pt-4 first:pt-0'

  return (
    <form className="flex flex-grow flex-col space-y-4 divide-y">
      <div className={formFieldStyles}>
        <NumberFormField
          name="Price"
          descriptor="ETH"
          infoName="Sale Total"
          infoValue={processedTerms.saleTotal}
          defaultValue={processedTerms.price}
          onChange={(value) => {
            handleFormChange('price', value)
          }}
        />
      </div>
      <div className={formFieldStyles}>
        <NumberFormField
          name="Down Payment"
          descriptor="%"
          infoName="On Sale"
          infoValue={processedTerms.onSale}
          defaultValue={processedTerms.downPayment}
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
          defaultValue={processedTerms.duration}
          onChange={(value) => {
            handleFormChange('duration', value)
          }}
        />
        <SelectFormField
          name="Payment Freq."
          infoName="Payments"
          infoValue={processedTerms.payments}
          tooltip="How often payments are due from the buyer."
          defaultValue={processedTerms.payFreq}
          options={[
            { value: 'weekly', label: 'Weekly' },
            { value: 'monthly', label: 'Monthly' },
          ]}
          onChange={(value) => {
            handleFormChange('payFreq', value)
          }}
        />
      </div>
      <div className={formFieldStyles}>
        <NumberFormField
          name="APR"
          descriptor="%"
          infoName="Interest"
          infoValue={processedTerms.interest}
          tooltip="Annual cost of borrowing, lower is more attractive for buyers."
          defaultValue={processedTerms.apr}
          onChange={(value) => {
            handleFormChange('apr', value)
          }}
        />
      </div>
    </form>
  )
}

export default ListingForm
