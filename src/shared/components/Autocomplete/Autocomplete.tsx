import type { ChangeEvent, Dispatch, ReactNode, SetStateAction } from 'react'
import clsx from 'clsx'
import { ChevronsUpDownIcon } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useControlledState } from '@/shared/hooks'
import { buildContext } from '@/shared/utils'
import { normalizeValue } from '@/shared/utils/normalizeValue'
import { Popover } from '../Popover/Popover'
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
  external?: [string, Dispatch<SetStateAction<string>>]
  externalPopover?: [boolean, Dispatch<SetStateAction<boolean>>]
  initial?: {
    value: string
    label: string
  }
}

function Autocomplete({ children, external, externalPopover, initial }: AutocompleteProps) {
  const [selectedValue, setSelectedValue] = useControlledState(
    external,
    initial?.value ?? external?.[0] ?? '',
  )
  const [selectedLabel, setSelectedLabel] = useState<ReactNode>(initial?.label ?? '')
  const internalPopover = useControlledState(externalPopover, false)

  const value = useMemo(() => ({
    selectedValue,
    setSelectedValue,
    selectedLabel,
    setSelectedLabel,
  }), [selectedValue, selectedLabel, setSelectedValue])

  return (
    <Popover external={internalPopover}>
      <AutocompleteContext value={value}>
        {children}
      </AutocompleteContext>
    </Popover>
  )
}

type Variant = 'contained'

export interface AutocompleteTriggerProps {
  className?: string
  variant?: Variant
}

function AutocompleteTrigger({ className, variant = 'contained' }: AutocompleteTriggerProps) {
  const { selectedLabel, setSelectedValue: setSelected, setSelectedLabel } = useAutocompleteContext()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setSelected(val)
    setSelectedLabel(val)
  }

  return (
    <Popover.Trigger className={clsx(styles.trigger, styles[variant], className)}>
      <input type="text" value={selectedLabel?.toString() ?? ''} onChange={handleChange} />
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
  const { selectedValue, setSelectedValue, setSelectedLabel } = useAutocompleteContext()

  const label = normalizeValue(children)

  const handleSelect = () => {
    setSelectedValue(value.toString())
    setSelectedLabel(label)
  }

  if (selectedValue) {
    const search = selectedValue.toLowerCase().trim()
    const normalizedValue = value.toString().toLowerCase()
    const normalizedLabel = label.toLowerCase()

    const matches = normalizedLabel.includes(search) || normalizedValue.includes(search)
    if (!matches)
      return null
  }

  return (
    <button
      type="button"
      className={clsx(styles.option, value === selectedValue && styles.active)}
      onClick={handleSelect}
    >
      {children}
    </button>
  )
}

Autocomplete.Trigger = AutocompleteTrigger
Autocomplete.Items = AutocompleteItems
Autocomplete.Item = AutocompleteItem

export { Autocomplete }
