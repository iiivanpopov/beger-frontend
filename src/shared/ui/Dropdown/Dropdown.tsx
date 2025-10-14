import type { LucideIcon } from 'lucide-react'
import type { Dispatch, ReactNode, SetStateAction } from 'react'
import clsx from 'clsx'
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Popover, SelectList } from '@/shared/ui'
import { buildContext } from '@/shared/utils'
import styles from './Dropdown.module.css'

export interface DropdownContextProps {
  selectedLabel: ReactNode
  selectedIcon: LucideIcon | undefined
  selectedValue: string
  setSelectedValue: Dispatch<SetStateAction<string>>
  setSelectedLabel: Dispatch<SetStateAction<ReactNode>>
  setSelectedIcon: Dispatch<SetStateAction<LucideIcon | undefined>>
  isOpen: boolean
}

const [DropdownContext, useDropdownContext] = buildContext<DropdownContextProps>()

export interface DropdownProps {
  children: ReactNode
  value: string
  onChange: Dispatch<SetStateAction<string>>
  defaultLabel?: ReactNode
  defaultIcon?: LucideIcon
}

function Dropdown({
  children,
  value,
  onChange,
  defaultLabel,
  defaultIcon,
}: DropdownProps) {
  const [selectedLabel, setSelectedLabel] = useState<ReactNode>(defaultLabel)
  const [selectedIcon, setSelectedIcon] = useState<LucideIcon | undefined>(defaultIcon)
  const [isOpen, setIsOpen] = useState(false)

  const contextValue = useMemo(() => ({
    selectedValue: value,
    selectedLabel,
    selectedIcon,
    isOpen,
    setSelectedValue: onChange,
    setSelectedLabel,
    setSelectedIcon,
  }), [isOpen, value, selectedIcon, selectedLabel, onChange])

  return (
    <Popover isOpen={isOpen} setIsOpen={setIsOpen}>
      <DropdownContext value={contextValue}>
        {children}
      </DropdownContext>
    </Popover>
  )
}

export interface DropdownTriggerProps {
  variant?: 'contained'
}

function DropdownTrigger({ variant = 'contained' }: DropdownTriggerProps) {
  const { isOpen, selectedLabel, selectedIcon: Icon } = useDropdownContext()
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

export interface DropdownItemsProps {
  children: ReactNode
}

function DropdownItems({ children }: DropdownItemsProps) {
  return (
    <Popover.Content className={styles.items}>
      <SelectList>
        {children}
      </SelectList>
    </Popover.Content>
  )
}

export interface DropdownItemProps {
  children: ReactNode
  value: string
  icon?: LucideIcon
}

function DropdownItem({ children, icon, value }: DropdownItemProps) {
  const {
    selectedValue,
    setSelectedValue,
    setSelectedLabel,
    setSelectedIcon,
  } = useDropdownContext()

  return (
    <SelectList.Item
      icon={icon}
      active={value === selectedValue}
      onClick={() => {
        setSelectedValue(value)
        setSelectedLabel(children)
        setSelectedIcon(icon)
      }}
    >
      {children}
    </SelectList.Item>
  )
}

Dropdown.Trigger = DropdownTrigger
Dropdown.Items = DropdownItems
Dropdown.Item = DropdownItem

export { Dropdown }
