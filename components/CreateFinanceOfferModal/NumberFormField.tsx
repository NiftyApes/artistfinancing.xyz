import { FC } from 'react'
import FormField from './FormField'
import NumberInput from './NumberInput'

type Props = {
  name: string
  descriptor: string
  infoName?: string
  infoValue?: string
  tooltip?: string
  defaultValue?: string
  onChange?: (value: string) => void
}

const NumberFormField: FC<Props> = ({
  name,
  descriptor,
  infoName,
  infoValue,
  tooltip,
  defaultValue,
  onChange,
}) => {
  return (
    <FormField
      name={name}
      infoName={infoName}
      infoValue={infoValue}
      tooltip={tooltip}
    >
      <div className="h-[46px] w-[170px]">
        <NumberInput
          id={name}
          descriptor={descriptor}
          onChange={onChange}
          defaultValue={defaultValue}
        />
      </div>
    </FormField>
  )
}

export default NumberFormField
