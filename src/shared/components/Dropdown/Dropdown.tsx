import type { LucideIcon } from 'lucide-react'
import type { ComponentProps, Dispatch, ReactNode, SetStateAction } from 'react'
import clsx from 'clsx'
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useControlledState } from '@/shared/hooks'
import { buildContext } from '@/shared/utils'
import { Popover } from '../Popover/Popover'
import styles from './Dropdown.module.css'

export interface DropdownContextProps {
  selectedLabel: ReactNode
  selectedIcon: LucideIcon | undefined
  selectedValue: string
  isOpen: boolean
  setSelectedValue: Dispatch<SetStateAction<string>>
  setSelectedLabel: Dispatch<SetStateAction<ReactNode>>
  setSelectedIcon: Dispatch<SetStateAction<LucideIcon | undefined>>
}

const [DropdownContext, useDropdownContext] = buildContext<DropdownContextProps>()

export interface DropdownProps {
  children: ReactNode
  external?: [string, Dispatch<SetStateAction<string>>]
  externalPopover?: [boolean, Dispatch<SetStateAction<boolean>>]
  initial?: {
    value: string
    label: string
    icon?: LucideIcon
  }
}

function Dropdown({ children, external, externalPopover, initial }: DropdownProps) {
  const [selectedValue, setSelectedValue] = useControlledState(
    external,
    initial?.value ?? external?.[0] ?? '',
  )
  const [selectedLabel, setSelectedLabel] = useState<ReactNode>(initial?.label ?? '')
  const [selectedIcon, setSelectedIcon] = useState<LucideIcon | undefined>(initial?.icon)
  const internalPopover = useControlledState(externalPopover, false)

  const contextValue = useMemo(() => ({
    selectedValue,
    selectedLabel,
    selectedIcon,
    isOpen: internalPopover[0],
    setSelectedValue,
    setSelectedLabel,
    setSelectedIcon,
  }), [internalPopover, selectedValue, selectedIcon, selectedLabel, setSelectedValue])

  return (
    <Popover external={internalPopover}>
      <DropdownContext value={contextValue}>
        {children}
      </DropdownContext>
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
      {Icon
        ? (<Icon />)
        : (
            <>
              <span>{selectedLabel}</span>
              <ChevronIcon className={styles.arrow} />
            </>
          )}
    </Popover.Trigger>
  )
}

export interface DropdownItemsProps {
  children: ReactNode
}

function DropdownItems({ children }: DropdownItemsProps) {
  return (
    <Popover.Content className={styles.options}>
      {children}
    </Popover.Content>
  )
}

export interface DropdownItemProps extends ComponentProps<'button'> {
  children: ReactNode
  className?: string
  value: string
  icon?: LucideIcon
}

function DropdownItem({ children, icon, value, className, ...props }: DropdownItemProps) {
  const { selectedValue, setSelectedValue, setSelectedLabel, setSelectedIcon } = useDropdownContext()
  const Icon = icon

  const handleSelect = () => {
    setSelectedValue(value)
    setSelectedLabel(children)
    setSelectedIcon(icon)
  }

  return (
    <button
      {...props}
      type="button"
      className={clsx(
        value === selectedValue && styles.active,
        className,
      )}
      onClick={handleSelect}
    >
      {Icon && <Icon />}
      <span>{children}</span>
    </button>
  )
}

Dropdown.Trigger = DropdownTrigger
Dropdown.Items = DropdownItems
Dropdown.Item = DropdownItem

export { Dropdown }
