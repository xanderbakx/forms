import {
  FormGroup as BPFormGroup,
  FormGroupProps as BPFormGroupProps,
} from '@blueprintjs/core'
// import React from 'react'
import { useFormContext } from 'react-hook-form'
import { capitalizeFirstLetter } from '../helpers/stringUtils'

export interface FormGroupProps extends BPFormGroupProps {
  name: string
}

export const FormGroup = ({ children, name, helperText }: FormGroupProps) => {
  const {
    // control,
    formState: { errors },
  } = useFormContext()

  return (
    <BPFormGroup
      label={capitalizeFirstLetter(name)}
      labelFor={name}
      helperText={errors[name]?.message?.toString() ?? helperText}
      intent={errors[name] ? 'danger' : 'none'}
    >
      {children}
      {/* {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return (
            <Controller
              name={name}
              control={control}
              render={({ field }) =>
                React.cloneElement(child, {
                  ...child.props,
                  ...field,
                  value: field.value ?? '',
                })
              }
            />
          )
        }
        return child
      })} */}
    </BPFormGroup>
  )
}
