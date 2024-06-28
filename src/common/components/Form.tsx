import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import {
  useForm,
  FormProvider,
  SubmitHandler,
  FieldValues,
  DefaultValues,
  Path,
  PathValue,
} from 'react-hook-form'
import { z } from 'zod'

interface FormProps<T extends FieldValues> {
  onSubmit: SubmitHandler<T>
  defaultValues: T
  children: React.ReactNode
  formValues?: Partial<T>
  resetForm?: boolean
  schema: z.Schema<T>
}

const Form = <T extends FieldValues>({
  onSubmit,
  defaultValues,
  children,
  formValues,
  resetForm,
  schema,
}: FormProps<T>) => {
  const methods = useForm<T>({
    mode: 'onSubmit',
    defaultValues: defaultValues as DefaultValues<T>,
    resolver: zodResolver(schema),
    // values: formValues as T | undefined,
  })

  React.useEffect(() => {
    const subscription = methods.watch((value, { name, type }) =>
      console.log(value, name, type)
    )
    return () => subscription.unsubscribe()
  }, [methods])

  React.useEffect(() => {
    if (resetForm) {
      methods.reset(defaultValues)
    }
  }, [resetForm, defaultValues, methods])

  React.useEffect(() => {
    if (formValues) {
      Object.keys(formValues).forEach(key => {
        const value = formValues[key as keyof T]
        if (value !== undefined) {
          methods.setValue(key as Path<T>, value as PathValue<T, Path<T>>)
        }
      })
    }
  }, [formValues, methods])

  return (
    <FormProvider {...methods}>
      <form
        className="flex flex-col gap-2"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        {children}
      </form>
    </FormProvider>
  )
}

export default Form
