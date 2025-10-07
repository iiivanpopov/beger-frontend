import type { ComponentProps, Dispatch, ReactNode, SetStateAction } from 'react'
import clsx from 'clsx'
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useControlledState } from '@/shared/hooks'
import { buildContext, normalizeValue } from '@/shared/utils'
import { Popover } from '../Popover/Popover'
import styles from './Dropdown.module.css'

interface DropdownContextProps {
  selectedLabel: ReactNode
  setSelectedLabel: Dispatch<SetStateAction<ReactNode>>
  selected: string
  setSelected: Dispatch<SetStateAction<string>>
  isOpen: boolean
}

const [DropdownContext, useDropdownContext] = buildContext<DropdownContextProps>()

interface DropdownProps {
  children: ReactNode
  external?: [string, Dispatch<SetStateAction<string>>]
  initial?: {
    value: string | string[] | number
    label: string
  }
}

function Dropdown({ children, external, initial }: DropdownProps) {
  const [selected, setSelected] = useControlledState(
    external,
    external?.[0] ?? normalizeValue(initial?.value),
  )
  const [selectedLabel, setSelectedLabel] = useState<ReactNode>(initial?.label ?? '')
  const externalPopover = useState(false)

  const value = useMemo(
    () => ({
      selected,
      setSelected,
      selectedLabel,
      setSelectedLabel,
      isOpen: externalPopover[0],
    }),
    [externalPopover, selected, selectedLabel, setSelected, setSelectedLabel],
  )

  return (
    <Popover external={externalPopover}>
      <DropdownContext value={value}>{children}</DropdownContext>
    </Popover>
  )
}

type Variant = 'contained'

interface DropdownTriggerProps {
  variant?: Variant
  icon?: boolean
}

function DropdownTrigger({ variant = 'contained', icon }: DropdownTriggerProps) {
  const { isOpen, selectedLabel } = useDropdownContext()

  return (
    <Popover.Trigger className={clsx(
      styles.trigger,
      styles[variant],
      { [styles.icon]: icon },
    )}
    >
      <span>{selectedLabel}</span>
      {!isOpen && <ChevronDownIcon className={styles.arrow} />}
      {isOpen && <ChevronUpIcon className={styles.arrow} />}
    </Popover.Trigger>
  )
}

interface DropdownOptionsProps {
  children: ReactNode
}

function DropdownOptions({ children }: DropdownOptionsProps) {
  return (
    <Popover.Content className={styles.options}>
      {children}
    </Popover.Content>
  )
}

type DropdownOptionProps = ComponentProps<'button'> & {
  children: ReactNode
  className?: string
  value: string
}

function DropdownOption({ children, value, className, ...props }: DropdownOptionProps) {
  const { setSelectedLabel, setSelected, selected } = useDropdownContext()

  const handleSelect = () => {
    setSelected(value)
    setSelectedLabel(children)
  }

  return (
    <button
      {...props}
      type="button"
      className={clsx(
        { [styles.active]: value === selected },
        className,
      )}
      onClick={handleSelect}
    >
      {children}
    </button>
  )
}

Dropdown.Trigger = DropdownTrigger
Dropdown.Options = DropdownOptions
Dropdown.Option = DropdownOption

export { Dropdown }
