import { Button, Form, Input, Select, SelectItem } from './components'
import { z } from 'zod'
import { selectOptions } from './helpers/selectOptions'
import { SubmitHandler } from 'react-hook-form'

interface FormData {
  name: string
  age: string
  item: SelectItem
}

function App() {
  const onSubmit: SubmitHandler<FormData> = data => {
    console.log('data ------->', data)
  }

  const schema = z.object({
    name: z.string().min(5, { message: 'Name must be at least 5 characters' }),
    age: z.string(),
    item: z
      .object({ id: z.number(), text: z.string(), label: z.string() })
      .refine(value => value.id !== -1 && value.text !== '', {
        message: 'Select an item',
      }),
  })

  return (
    <>
      <Form
        onSubmit={onSubmit}
        schema={schema}
        defaultValues={{
          name: '',
          age: '',
          item: { id: -1, text: '' } as SelectItem,
        }}
      >
        <Input name="name" placeholder="Name" />
        <Input name="age" placeholder="Age" type="text" />
        <Select name="item" items={selectOptions} />
        <div>
          <Button type="submit">Submit</Button>
          <Button type="reset">Reset</Button>
        </div>
      </Form>
    </>
  )
}

export default App
