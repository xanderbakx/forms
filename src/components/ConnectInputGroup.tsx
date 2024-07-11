import { FormGroup, InputGroup, InputGroupProps } from '@blueprintjs/core'
import { ConnectForm } from './ConnectForm'

type ConnectInputGroupProps = InputGroupProps & { name: string }

export const ConnectInputGroup = ({ name }: ConnectInputGroupProps) => (
  <ConnectForm>
    {({ register, formState: { errors, isSubmitting } }) => (
      <FormGroup
        label={name}
        labelFor={name}
        helperText={errors[name]?.message?.toString()}
        intent={errors[name] ? 'danger' : 'none'}
        disabled={isSubmitting}
      >
        <InputGroup {...register(name)} />
      </FormGroup>
    )}
  </ConnectForm>
)
