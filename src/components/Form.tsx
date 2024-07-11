import React from 'react'
import {
  useForm,
  FormProvider,
  SubmitHandler,
  DefaultValues,
} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ZodSchema } from 'zod'
import { FieldValues } from 'react-hook-form'

interface FormProps<T extends FieldValues> {
  onSubmit: SubmitHandler<T>
  schema: ZodSchema<T>
  defaultValues: DefaultValues<T>
  children: React.ReactNode
}

export const Form = <T extends FieldValues>({
  onSubmit,
  schema,
  defaultValues,
  children,
}: FormProps<T>) => {
  const methods = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
  })

  React.useEffect(() => {
    const subscription = methods.watch((value, { name, type }) =>
      console.log(value, name, type)
    )
    return () => subscription.unsubscribe()
  }, [methods.watch])

  const handleKeyDown = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === 'Enter') {
      methods.handleSubmit(onSubmit)()
    }
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} onKeyDown={handleKeyDown}>
        {children}
      </form>
    </FormProvider>
  )
}
