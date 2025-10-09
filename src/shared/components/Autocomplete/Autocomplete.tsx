import type { Dispatch, ReactNode, SetStateAction } from 'react'
import clsx from 'clsx'
import { ChevronsUpDownIcon } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Popover } from '@/shared/components'
import { buildContext, matchesSearch, normalizeValue } from '@/shared/utils'
import styles from './Autocomplete.module.css'

export interface AutocompleteContextProps {
  selectedValue: string
  setSelectedValue: Dispatch<SetStateAction<string>>
  selectedLabel: ReactNode
  setSelectedLabel: Dispatch<SetStateAction<ReactNode>>
}

const [AutocompleteContext, useAutocompleteContext] = buildContext<AutocompleteContextProps>()

export interface AutocompleteProps {
  children: ReactNode
  value: string
  onChange: Dispatch<SetStateAction<string>>
  defaultLabel?: ReactNode
}

function Autocomplete({ children, value, onChange, defaultLabel }: AutocompleteProps) {
  const [selectedLabel, setSelectedLabel] = useState<ReactNode>(defaultLabel)
  const [isOpen, setIsOpen] = useState(false)

  const contextValue = useMemo(() => ({
    selectedValue: value,
    setSelectedValue: onChange,
    selectedLabel,
    setSelectedLabel,
  }), [value, onChange, selectedLabel])

  return (
    <Popover isOpen={isOpen} setIsOpen={setIsOpen}>
      <AutocompleteContext value={contextValue}>
        {children}
      </AutocompleteContext>
    </Popover>
  )
}

export interface AutocompleteTriggerProps {
  className?: string
  variant?: 'contained'
}

function AutocompleteTrigger({ className, variant = 'contained' }: AutocompleteTriggerProps) {
  const {
    selectedLabel,
    setSelectedValue,
    setSelectedLabel,
  } = useAutocompleteContext()

  return (
    <Popover.Trigger className={clsx(styles.trigger, styles[variant], className)}>
      <input
        type="text"
        value={selectedLabel?.toString() ?? ''}
        onChange={(e) => {
          setSelectedValue(e.target.value)
          setSelectedLabel(e.target.value)
        }}
      />
      <ChevronsUpDownIcon className={styles.arrow} />
    </Popover.Trigger>
  )
}

export interface AutocompleteItemsProps {
  children: ReactNode
}

function AutocompleteItems({ children }: AutocompleteItemsProps) {
  return (
    <Popover.Content className={styles.options}>
      {children}
    </Popover.Content>
  )
}

export interface AutocompleteItemProps {
  children: string | number | (string | number)[]
  value: string | number
}

function AutocompleteItem({ children, value }: AutocompleteItemProps) {
  const {
    selectedValue,
    setSelectedValue,
    selectedLabel,
    setSelectedLabel,
  } = useAutocompleteContext()

  const label = normalizeValue(children)

  useEffect(() => {
    if (label === selectedLabel)
      setSelectedValue(value.toString())
  }, [label, selectedLabel, setSelectedValue, value])

  if (selectedValue && !matchesSearch({ search: selectedValue, value, label }))
    return null

  return (
    <button
      type="button"
      className={clsx(
        styles.option,
        value === selectedValue && styles.active,
      )}
      onClick={() => {
        setSelectedValue(value.toString())
        setSelectedLabel(label)
      }}
    >
      {children}
    </button>
  )
}

Autocomplete.Trigger = AutocompleteTrigger
Autocomplete.Items = AutocompleteItems
Autocomplete.Item = AutocompleteItem

export { Autocomplete }
