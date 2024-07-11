import React from 'react'
import {
  Checkbox as BlueprintCheckbox,
  CheckboxProps as BlueprintCheckboxProps,
  FormGroup,
} from '@blueprintjs/core'
import { useFormContext, Controller } from 'react-hook-form'

interface CheckboxProps extends BlueprintCheckboxProps {
  name: string
  label: string
}

const Checkbox: React.FC<CheckboxProps> = ({ name, label, ...restProps }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormGroup
          label={label}
          labelFor={name}
          helperText={errors[name]?.message?.toString()}
          intent={errors[name] ? 'danger' : 'none'}
        >
          <BlueprintCheckbox {...field} checked={field.value} {...restProps} />
        </FormGroup>
      )}
    />
  )
}

export default Checkbox
