import { Dropdown } from '@/shared/components'

export function App() {
  return (
    <Dropdown initial={{ value: '1', label: 'Variant 1' }}>
      <Dropdown.Trigger />
      <Dropdown.Options>
        <Dropdown.Option value="1">Variant 1</Dropdown.Option>
        <Dropdown.Option value="2">Variant 2</Dropdown.Option>
        <Dropdown.Option value="3">Variant 3</Dropdown.Option>
      </Dropdown.Options>
    </Dropdown>
  )
}
