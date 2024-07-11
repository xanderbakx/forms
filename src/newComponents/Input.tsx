import { FormGroup, InputGroup } from '@blueprintjs/core'
import { UseFormRegisterReturn } from 'react-hook-form'

interface InputProps {
  id: string
  label: string
  error?: string
  type?: string
  required?: boolean
  disabled?: boolean
  inputProps?: UseFormRegisterReturn
}

export const Input = ({
  id,
  label,
  error,
  type,
  required,
  disabled,
  inputProps,
}: InputProps) => {
  return (
    <FormGroup
      label={label}
      labelFor={id}
      labelInfo={required ? '*' : ''}
      disabled={disabled}
      helperText={error ?? ''}
    >
      <InputGroup id={id} type={type ?? 'text'} {...(inputProps ?? {})} />
    </FormGroup>
  )
}
