import { FormGroup, InputGroup, Intent } from '@blueprintjs/core'
import { FormGroupProps, InputGroupProps } from '@blueprintjs/core'
import { Controller, RegisterOptions, useFormContext } from 'react-hook-form'
// import { useRef } from 'react'

interface InputProps extends FormGroupProps, InputGroupProps {
  name: string
  registerOptions?: RegisterOptions
}

const Input = ({ name, registerOptions, ...props }: InputProps) => {
  // const inputRef = useRef<HTMLInputElement>(null)
  const {
    control,
    formState: { isSubmitting, errors },
  } = useFormContext()
  const { ...formGroupProps } = props as FormGroupProps
  const { ...inputGroupProps } = props as InputGroupProps

  const error = errors?.[name]?.message as string | undefined

  return (
    <FormGroup
      className="flex mb-4"
      labelFor={name}
      label={name.charAt(0).toUpperCase() + name.slice(1)}
      labelInfo={registerOptions?.required ? '*' : ''}
      intent={error ? Intent.DANGER : Intent.NONE}
      helperText={error}
      {...formGroupProps}
    >
      <Controller
        name={name}
        control={control}
        rules={registerOptions}
        render={({ field: { ref, ...field } }) => (
          <InputGroup
            {...field}
            id={name}
            disabled={isSubmitting}
            intent={error ? Intent.DANGER : Intent.NONE}
            inputRef={ref}
            {...inputGroupProps}
          />
        )}
      />
    </FormGroup>
  )
}

export default Input
