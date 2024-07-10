import React from 'react'
import {
  Checkbox as BlueprintCheckbox,
  CheckboxProps as BlueprintCheckboxProps,
  FormGroup,
  FormGroupProps,
} from '@blueprintjs/core'
import { useFormContext, Controller } from 'react-hook-form'

interface CheckboxProps extends BlueprintCheckboxProps, FormGroupProps {
  name: string
  label: string
}

const Checkbox: React.FC<CheckboxProps> = ({ name, label, ...props }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext()

  // Separate FormGroup props from Checkbox props
  const { ...formGroupProps } = props as FormGroupProps
  const { ...checkboxProps } = props as BlueprintCheckboxProps

  return (
    <FormGroup
      label={label}
      labelFor={name}
      helperText={errors[name]?.message?.toString()}
      intent={errors[name] ? 'danger' : 'none'}
      {...formGroupProps}
    >
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <BlueprintCheckbox
            {...field}
            checked={field.value}
            {...checkboxProps}
          />
        )}
      />
    </FormGroup>
  )
}

export default Checkbox
