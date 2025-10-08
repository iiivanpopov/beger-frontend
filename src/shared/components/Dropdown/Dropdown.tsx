import type { LucideIcon } from 'lucide-react'
import type { ComponentProps, Dispatch, ReactNode, SetStateAction } from 'react'
import clsx from 'clsx'
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'
import { useControlledState } from '@/shared/hooks'
import { buildContext, normalizeValue } from '@/shared/utils'
import { Popover } from '../Popover/Popover'
import styles from './Dropdown.module.css'

export interface DropdownContextProps {
  selectedLabel: ReactNode
  selectedIcon: LucideIcon | undefined
  selected: string
  isOpen: boolean
  handleSelect: (value: string, label: ReactNode, icon?: LucideIcon) => void
}

const [DropdownContext, useDropdownContext] = buildContext<DropdownContextProps>()

export interface DropdownProps {
  children: ReactNode
  external?: [string, Dispatch<SetStateAction<string>>]
  initial?: {
    value: string | string[] | number
    label: string
    icon?: LucideIcon
  }
}

function Dropdown({ children, external, initial }: DropdownProps) {
  const [selected, setSelected] = useControlledState(
    external,
    external?.[0] ?? normalizeValue(initial?.value),
  )
  const [selectedLabel, setSelectedLabel] = useState<ReactNode>(initial?.label ?? '')
  const [selectedIcon, setSelectedIcon] = useState<LucideIcon | undefined>(initial?.icon)
  const externalPopover = useState(false)

  const handleSelect = useCallback((value: string, label: ReactNode, icon?: LucideIcon) => {
    setSelected(value)
    setSelectedLabel(label)
    if (icon)
      setSelectedIcon(icon)
  }, [setSelected])

  const value = useMemo(
    () => ({
      selected,
      selectedLabel,
      selectedIcon,
      isOpen: externalPopover[0],
      handleSelect,
    }),
    [selected, selectedLabel, selectedIcon, externalPopover, handleSelect],
  )

  return (
    <Popover external={externalPopover}>
      <DropdownContext value={value}>{children}</DropdownContext>
    </Popover>
  )
}

type Variant = 'contained'

export interface DropdownTriggerProps {
  variant?: Variant
}

function DropdownTrigger({ variant = 'contained' }: DropdownTriggerProps) {
  const { isOpen, selectedLabel, selectedIcon } = useDropdownContext()
  const Icon = selectedIcon
  const ChevronIcon = isOpen ? ChevronUpIcon : ChevronDownIcon

  return (
    <Popover.Trigger
      className={clsx(
        styles.trigger,
        styles[variant],
        Icon && styles.icon,
      )}
    >
      {Icon && <Icon />}
      {!Icon && (
        <>
          <span>{selectedLabel}</span>
          <ChevronIcon className={styles.arrow} />
        </>
      )}
    </Popover.Trigger>
  )
}

export interface DropdownOptionsProps {
  children: ReactNode
}

function DropdownOptions({ children }: DropdownOptionsProps) {
  return (
    <Popover.Content className={styles.options}>
      {children}
    </Popover.Content>
  )
}

export interface DropdownOptionProps extends ComponentProps<'button'> {
  children: ReactNode
  className?: string
  value: string
  icon?: LucideIcon
}

function DropdownOption({ children, icon, value, className, ...props }: DropdownOptionProps) {
  const { selected, handleSelect } = useDropdownContext()
  const Icon = icon

  const onClick = useCallback(() => {
    handleSelect(value, children, icon)
  }, [handleSelect, value, children, icon])

  return (
    <button
      {...props}
      type="button"
      className={clsx(
        value === selected && styles.active,
        className,
      )}
      onClick={onClick}
    >
      {Icon && <Icon />}
      <span>{children}</span>
    </button>
  )
}

Dropdown.Trigger = DropdownTrigger
Dropdown.Options = DropdownOptions
Dropdown.Option = DropdownOption

export { Dropdown }
