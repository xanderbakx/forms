import { useRef } from 'react'
import {
  SignUpApi,
  SignUpForm,
  SignupFormValues,
} from '../SignUpForm/SignUpForm'
import { Button } from '@blueprintjs/core'

export default function SignUpPage() {
  // const signupFormRef = useRef<SignUpApi>(null)

  const handleSubmit = async (data: SignupFormValues) => {
    console.log('submit ready data', data)
    await new Promise(resolve => setTimeout(resolve, 500))
  }

  return (
    <SignUpForm
      // ref={signupFormRef}
      onSubmit={handleSubmit}
      suffix={<Button color="secondary">Log In</Button>}
    />
  )
}

// SignUpForm.displayName = 'ForwardRefedSignUpForm'
