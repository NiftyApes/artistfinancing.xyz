import { FC } from 'react'
import Select from './Select'
import { DurationSelectOption } from './types'

type Props = {
  isDarkMode: boolean
  durationSelectOptions: DurationSelectOption[]
  duration: DurationSelectOption
  setDuration: (duration: DurationSelectOption) => void
}

const DurationSelect: FC<Props> = ({
  isDarkMode,
  durationSelectOptions,
  duration,
  setDuration,
}) => {
  return (
    <Select
      isDarkMode={isDarkMode}
      value={duration}
      options={durationSelectOptions}
      onSelect={setDuration}
    />
  )
}

export default DurationSelect
