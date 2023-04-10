import { FC } from 'react'
import Select from './Select'

type Props = {
  duration: string
  setDuration: (duration: string) => void
}

const DurationSelect: FC<Props> = ({
  duration,
  setDuration,
}: {
  duration: string
  setDuration: (duration: string) => void
}) => {
  return (
    <Select
      value={duration}
      options={['Buy Now', '1 Month', '3 Months', '6 Months']}
      onSelect={setDuration}
    />
  )
}

export default DurationSelect
