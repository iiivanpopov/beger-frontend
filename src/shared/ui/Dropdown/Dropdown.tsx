import type { LucideIcon } from 'lucide-react'
import type { ComponentProps, Dispatch, ReactNode, SetStateAction } from 'react'
import clsx from 'clsx'
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Popover } from '@/shared/ui'
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

export interface DropdownItemsProps {
  children: ReactNode
}

function DropdownItems({ children }: DropdownItemsProps) {
  return (
    <Popover.Content className={styles.items}>
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
  const {
    selectedValue,
    setSelectedValue,
    setSelectedLabel,
    setSelectedIcon,
  } = useDropdownContext()
  const Icon = icon

  return (
    <button
      {...props}
      type="button"
      className={clsx(
        styles.item,
        value === selectedValue && styles.active,
        className,
      )}
      onClick={() => {
        setSelectedValue(value)
        setSelectedLabel(children)
        setSelectedIcon(icon)
      }}
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
