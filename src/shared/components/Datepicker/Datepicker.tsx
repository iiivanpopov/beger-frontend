import type { Dispatch, SetStateAction } from 'react'
import clsx from 'clsx'
import { CalendarIcon } from 'lucide-react'
import { useState } from 'react'
import { Popover } from '@/shared/components'
import { getDaysInMonth } from '@/shared/utils'
import styles from './Datepicker.module.css'

export interface DatepickerProps {
  value: Date
  onChange: Dispatch<SetStateAction<Date>>
  variant?: 'contained'
  className?: string
}

function Datepicker({ onChange, value, variant = 'contained', className }: DatepickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [viewDate, setViewDate] = useState({
    year: value.getFullYear(),
    month: value.getMonth(),
    day: value.getDate(),
  })

  const numberOfDays = getDaysInMonth(viewDate.year, viewDate.month + 1)
  const days = Array.from({ length: numberOfDays }, (_, i) => i + 1)

  const handleChange = (updates: Partial<{ year: number, month: number, day: number }>) => {
    const newViewDate = { ...viewDate, ...updates }
    setViewDate(newViewDate)

    if ('day' in updates || 'month' in updates || 'year' in updates) {
      const newDate = new Date(Date.UTC(newViewDate.year, newViewDate.month, newViewDate.day))
      onChange(newDate)
    }
  }

  const isSelectedDay = (day: number) => {
    return (
      value.getDate() === day
      && value.getMonth() === viewDate.month
      && value.getFullYear() === viewDate.year
    )
  }

  return (
    <Popover isOpen={isOpen} setIsOpen={setIsOpen}>
      <Popover.Trigger className={clsx(
        styles.trigger,
        variant && styles[variant],
        className,
      )}
      >
        <span className={styles.date}>
          {value.toLocaleDateString('uk-UA')}
        </span>
        <CalendarIcon />
      </Popover.Trigger>
      <Popover.Content className={styles.content}>
        <div className={styles.header}>
          <select
            value={viewDate.year}
            onChange={e => handleChange({ year: Number(e.target.value) })}
            className={styles.select}
          >
            {Array.from({ length: 6 }, (_, i) => viewDate.year - 2 + i).map(y => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
          <select
            value={viewDate.month}
            onChange={e => handleChange({ month: Number(e.target.value) })}
            className={styles.select}
          >
            {Array.from({ length: 12 }, (_, i) => i).map(m => (
              <option key={m} value={m}>
                {new Date(2000, m, 1).toLocaleDateString('en-US', { month: 'long' })}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.grid}>
          {days.map(day => (
            <button
              key={day}
              type="button"
              onClick={() => handleChange({ day })}
              className={clsx(styles.day, isSelectedDay(day) && styles.selected)}
            >
              {day}
            </button>
          ))}
        </div>
      </Popover.Content>
    </Popover>
  )
}

export { Datepicker }
