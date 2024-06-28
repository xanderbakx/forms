import { Button } from '@blueprintjs/core'
import Form from './common/components/Form'
import Input from './common/components/Input'
import { z } from 'zod'

// Define types for form data
interface FormData {
  name: string
  age: string
}

function App() {
  const onSubmit = (data: FormData) => {
    try {
      console.log(data)
    } catch (error) {
      console.error('Form submission error:', error)
    }
  }

  const schema = z.object({
    name: z.string().min(5, { message: 'Name must be at least 5 characters' }),
    age: z.string(),
  })

  return (
    <>
      <Form
        onSubmit={onSubmit}
        schema={schema}
        defaultValues={{
          name: '',
          age: '',
        }}
      >
        <Input
          name="name"
          placeholder="Name"
          registerOptions={{
            required: { value: true, message: 'Name is required' },
          }}
        />
        <Input name="age" placeholder="Age" type="text" />
        <Button type="submit">Submit</Button>
        <Button type="reset">Reset</Button>
      </Form>
    </>
  )
}

export default App
