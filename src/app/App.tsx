import { Bell, LayoutDashboard, SearchIcon } from 'lucide-react'
import { Dropdown } from '@/shared/components'

export function App() {
  return (
    <Dropdown initial={{ value: '1', label: 'Variant 1', icon: SearchIcon }}>
      <Dropdown.Trigger />
      <Dropdown.Options>
        <Dropdown.Option value="1" icon={SearchIcon}>Variant 1</Dropdown.Option>
        <Dropdown.Option value="2" icon={LayoutDashboard}>Variant 2</Dropdown.Option>
        <Dropdown.Option value="3" icon={Bell}>Variant 3</Dropdown.Option>
      </Dropdown.Options>
    </Dropdown>
  )
}
