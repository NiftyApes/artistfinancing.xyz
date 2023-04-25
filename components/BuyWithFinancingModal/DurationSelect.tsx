import { Offer } from '@niftyapes/sdk'
import { FC } from 'react'
import Select from './Select'

type Props = {
  isDarkMode: boolean
  offers: Offer[]
  selectedOffer: Offer
  setSelectedOffer: (duration: Offer) => void
}

const DurationSelect: FC<Props> = ({
  isDarkMode,
  offers,
  selectedOffer,
  setSelectedOffer,
}) => {
  return (
    <Select
      isDarkMode={isDarkMode}
      value={selectedOffer}
      options={offers}
      onSelect={setSelectedOffer}
    />
  )
}

export default DurationSelect
