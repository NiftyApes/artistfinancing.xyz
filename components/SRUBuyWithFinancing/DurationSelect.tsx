import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@radix-ui/react-icons'
import * as Select from '@radix-ui/react-select'
import { FC } from 'react'

type Props = {
  duration: string
  setDuration: (duration: string) => void
}

const SelectItem = ({ children, value }: any) => (
  <Select.Item value={value}>
    <Select.ItemText>{children}</Select.ItemText>
    <Select.ItemIndicator className="SelectItemIndicator">
      <CheckIcon />
    </Select.ItemIndicator>
  </Select.Item>
)

const DurationSelect: FC<Props> = ({
  duration,
  setDuration,
}: {
  duration: string
  setDuration: (duration: string) => void
}) => {
  return (
    <Select.Root value={duration} onValueChange={(value) => setDuration(value)}>
      <Select.Trigger className="SelectTrigger" aria-label="Durations">
        <Select.Value placeholder="1 month" />
        <Select.Icon className="SelectIcon">
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="SelectContent">
          <Select.ScrollUpButton className="SelectScrollButton">
            <ChevronUpIcon />
          </Select.ScrollUpButton>
          <Select.Viewport className="SelectViewport">
            <Select.Group>
              <Select.Label className="SelectLabel">Duration</Select.Label>
              <SelectItem value="1 month">1 month</SelectItem>
              <SelectItem value="3 months">2 months</SelectItem>
              <SelectItem value="6 months">3 months</SelectItem>
            </Select.Group>
          </Select.Viewport>
          <Select.ScrollDownButton className="SelectScrollButton">
            <ChevronDownIcon />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}

export default DurationSelect
