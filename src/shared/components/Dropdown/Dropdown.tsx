import type { ComponentProps, Dispatch, ReactNode, SetStateAction } from 'react'
import clsx from 'clsx'
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useControlledState } from '@/shared/hooks'
import { buildContext } from '@/shared/utils'
import { Popover } from '../Popover/Popover'
import styles from './Dropdown.module.css'

interface DropdownContextProps {
  selected: string
  setSelected: Dispatch<SetStateAction<string>>
  isOpen: boolean
}

const [DropdownContext, useDropdownContext] = buildContext<DropdownContextProps>()

interface DropdownProps {
  children: ReactNode
  defaultSelected?: string
  external?: [string, Dispatch<SetStateAction<string>>]
}

function Dropdown({ children, external, defaultSelected }: DropdownProps) {
  const [selected, setSelected] = useControlledState(external, external ? external[0] : defaultSelected ?? '')
  const externalPopover = useState(false)

  const value = useMemo(() => ({
    selected,
    setSelected,
    isOpen: externalPopover[0],
  }), [externalPopover, selected, setSelected])

  return (
    <Popover external={externalPopover}>
      <DropdownContext value={value}>
        {children}
      </DropdownContext>
    </Popover>
  )
}

type Variant = 'contained'

interface DropdownTriggerProps {
  variant?: Variant
}

function DropdownTrigger({ variant = 'contained' }: DropdownTriggerProps) {
  const { selected, isOpen } = useDropdownContext()

  return (
    <Popover.Trigger className={clsx(styles.trigger, styles[variant])}>
      <span>{selected}</span>
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
  children: string
  className?: string
}

function DropdownOption({ children, className, ...props }: DropdownOptionProps) {
  const { setSelected, selected } = useDropdownContext()

  const handleSelect = () => {
    setSelected(children)
  }

  return (
    <button
      {...props}
      type="button"
      className={clsx(
        { [styles.active]: children === selected },
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
