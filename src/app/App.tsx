import { useState } from 'react'
import { Datepicker } from '@/shared/components'

export function App() {
  const [date, setDate] = useState<Date>(new Date())

  return (
    <Datepicker value={date} onChange={setDate} />
  )
}
