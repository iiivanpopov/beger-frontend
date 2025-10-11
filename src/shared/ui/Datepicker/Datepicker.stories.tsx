import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Datepicker } from './Datepicker'

const meta: Meta<typeof Datepicker> = {
  title: 'UI/Datepicker',
  component: Datepicker,
}

type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => {
    const [date, setDate] = useState(new Date())

    return <Datepicker value={date} onChange={setDate} />
  },
}

export default meta
