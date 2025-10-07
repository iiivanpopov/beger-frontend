import { Dropdown } from '@/shared/components'

export function App() {
  return (
    <>
      <Dropdown defaultSelected="Variant 1">
        <Dropdown.Trigger />
        <Dropdown.Options>
          <Dropdown.Option>Variant 1</Dropdown.Option>
          <Dropdown.Option>Variant 2</Dropdown.Option>
          <Dropdown.Option>Variant 3</Dropdown.Option>
        </Dropdown.Options>
      </Dropdown>
    </>
  )
}
