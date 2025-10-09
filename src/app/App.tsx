import { Controller, useForm } from 'react-hook-form'
import { Autocomplete } from '@/shared/components'

interface Inputs {
  dropdown: string
  autocomplete: string
}

export function App() {
  const { control } = useForm<Inputs>({
    defaultValues: {
      dropdown: '',
      autocomplete: '',
    },
  })

  return (
    <form>
      <Controller
        name="autocomplete"
        control={control}
        render={({ field }) => (
          <Autocomplete {...field}>
            <Autocomplete.Trigger />
            <Autocomplete.Items>
              <Autocomplete.Item value="1">Item1</Autocomplete.Item>
              <Autocomplete.Item value="2">Item2</Autocomplete.Item>
            </Autocomplete.Items>
          </Autocomplete>
        )}
      />
    </form>
  )
}
