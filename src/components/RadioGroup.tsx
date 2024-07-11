import {
  RadioGroup as BPRadioGroup,
  RadioGroupProps as BPRadioGroupProps,
  FormGroup,
} from '@blueprintjs/core'
import { Controller, RegisterOptions, useFormContext } from 'react-hook-form'

interface RadioGroupProps extends BPRadioGroupProps {
  name: string
  registerOptions?: RegisterOptions
}

export const RadioGroup = ({
  children,
  name,
  registerOptions,
}: RadioGroupProps) => {
  const { control } = useFormContext()
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormGroup
          label={name}
          labelInfo={registerOptions?.required ? '*' : ''}
        >
          <BPRadioGroup
            {...field}
            onChange={event => field.onChange(event.target)}
          >
            {children}
          </BPRadioGroup>
        </FormGroup>
      )}
    />
  )
}
