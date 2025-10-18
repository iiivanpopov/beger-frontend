import type { Dispatch, ReactNode, SetStateAction } from 'react'
import clsx from 'clsx'
import { ArrowLeftFromLineIcon, ArrowRightFromLineIcon } from 'lucide-react'
import { useMemo } from 'react'
import { buildContext } from '@/shared/utils'
import styles from './Sidebar.module.css'

export interface SidebarContextProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

const [SidebarContext, useSidebarContext] = buildContext<SidebarContextProps>()

export interface SidebarProps {
  children: ReactNode
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  className?: string
}

export function Sidebar({ children, isOpen, setIsOpen, className }: SidebarProps) {
  const contextValue = useMemo(() => ({
    isOpen,
    setIsOpen,
  }), [isOpen, setIsOpen])

  const Icon = isOpen ? ArrowLeftFromLineIcon : ArrowRightFromLineIcon

  const handleClick = () => {
    setIsOpen(prev => !prev)
  }

  return (
    <SidebarContext value={contextValue}>
      <div className={clsx(
        styles.sidebar,
        isOpen && styles.open,
        className,
      )}
      >
        <button
          className={styles.item}
          onClick={handleClick}
          type="button"
        >
          <Icon />
        </button>
        <hr className={styles.divider} />
        {children}
      </div>
    </SidebarContext>
  )
}

export interface SidebarItemProps {
  children: ReactNode
  className?: string
}

function SidebarItem({ children, className }: SidebarItemProps) {
  return (
    <div className={clsx(styles.item, className)}>
      {children}
    </div>
  )
}

export interface SidebarItemLabelProps {
  children: ReactNode
}

function SidebarItemLabel({ children }: SidebarItemLabelProps) {
  const { isOpen } = useSidebarContext()

  if (!isOpen)
    return null

  return <div className={styles.label}>{children}</div>
}

Sidebar.Item = SidebarItem
Sidebar.ItemLabel = SidebarItemLabel
