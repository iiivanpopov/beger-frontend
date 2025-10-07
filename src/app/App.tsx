import { Input, Popover } from '@/shared/components'

export function App() {
  return (
    <Popover>
      <Popover.Trigger>Trigger</Popover.Trigger>
      <Popover.Content><Input placeholder="Input123" /></Popover.Content>
    </Popover>
  )
}
