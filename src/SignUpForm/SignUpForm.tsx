import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Input } from '../newComponents/Input'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { Button, Intent } from '@blueprintjs/core'

const SingupSchema = z
  .object({
    email: z.string().min(1).email(),
    password: z.string().min(6).max(24),
    confirmPassword: z.string().min(6).max(24),
  })
  .refine(
    form => {
      return form.confirmPassword === form.password
    },
    {
      message: 'Passwords must match',
      path: ['confirmPassword'],
    }
  )

export type SignupFormValues = z.infer<typeof SingupSchema>

interface SignUpFormProps {
  onSubmit: SubmitHandler<SignupFormValues>
  suffix: React.ReactElement
}

export interface SignUpApi {
  setErrors: (errors: Record<string, string>) => void
}

export const SignUpForm =
  // forwardRef<SignUpApi, SignUpFormProps>(
  ({ onSubmit, suffix }: SignUpFormProps) => {
    const {
      register,
      handleSubmit,
      // setError,
      formState: { errors, isSubmitting },
    } = useForm<SignupFormValues>({
      resolver: zodResolver(SingupSchema),
    })

    // const setErrorRef = useRef(setError)
    // setErrorRef.current = setError
    // useImperativeHandle(
    //   ref,
    //   () => {
    //     return {
    //       setErrors: (errors: Record<string, string>) => {
    //         Object.entries(errors).forEach(([key, value]) => {
    //           setErrorRef.current(
    //             key as 'email' | 'password' | 'confirmPassword',
    //             { message: value }
    //           )
    //         })
    //       },
    //     }
    //   },
    //   []
    // )

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="email"
          label="Email"
          error={errors.email?.message}
          inputProps={register('email')}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          error={errors.password?.message}
          inputProps={register('password')}
        />
        <Input
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          error={errors.confirmPassword?.message}
          inputProps={register('confirmPassword')}
        />
        <Button type="submit" disabled={isSubmitting} intent={Intent.PRIMARY}>
          {isSubmitting ? 'Sending...' : 'Register'}
        </Button>

        {suffix}
      </form>
    )
  }
// )
