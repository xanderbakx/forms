import { useFormContext, Controller } from 'react-hook-form'
import { InputGroup, InputGroupProps, FormGroup } from '@blueprintjs/core'

interface InputProps extends Omit<InputGroupProps, 'name'> {
  name: string
}

export const Input = ({
  name,
  placeholder,
  type = 'text',
  defaultValue,
}: InputProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext()

  return (
    <FormGroup
      label={name}
      labelFor={name}
      helperText={errors[name]?.message?.toString()}
      intent={errors[name] ? 'danger' : 'none'}
    >
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <InputGroup
            id={name}
            placeholder={placeholder}
            type={type}
            defaultValue={defaultValue}
            {...field}
          />
        )}
      />
    </FormGroup>
  )
}
