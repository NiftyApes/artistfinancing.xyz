import { FC } from 'react'
import Select from './Select'
import { DurationSelectOption } from './types'

type Props = {
  durationSelectOptions: DurationSelectOption[]
  duration: DurationSelectOption
  setDuration: (duration: DurationSelectOption) => void
}

const DurationSelect: FC<Props> = ({
  durationSelectOptions,
  duration,
  setDuration,
}) => {
  return (
    <Select
      value={duration}
      options={durationSelectOptions}
      onSelect={setDuration}
    />
  )
}

export default DurationSelect
