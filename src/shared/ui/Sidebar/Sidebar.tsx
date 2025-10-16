import type { LucideIcon } from 'lucide-react'
import type { Dispatch, ReactNode, RefObject, SetStateAction } from 'react'
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
}

export function Sidebar({ children, isOpen, setIsOpen }: SidebarProps) {
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
      )}
      >
        <button
          className={styles.toggle}
          onClick={handleClick}
          type="button"
        >
          <Icon />
        </button>
        <hr />
        {children}
      </div>
    </SidebarContext>
  )
}

export interface SidebarNavProps {
  children: ReactNode
}

function SidebarNav({ children }: SidebarNavProps) {
  return (
    <div className={styles.nav}>
      {children}
    </div>
  )
}

export interface SidebarNavItemContextProps {
  iconRef: RefObject<SVGSVGElement>
  labelRef: RefObject<ReactNode>
}

export interface SidebarNavItemProps {
  children: ReactNode
  className?: string
}

function SidebarNavItem({ children, className }: SidebarNavItemProps) {
  return (
    <div className={clsx(styles.item, className)}>
      {children}
    </div>
  )
}

export interface SidebarNavItemIconProps {
  icon: LucideIcon
}

function SidebarNavItemIcon({ icon: Icon }: SidebarNavItemIconProps) {
  return <Icon className={styles.icon} />
}

export interface SidebarNavItemLabelProps {
  children: ReactNode
}

function SidebarNavItemLabel({ children }: SidebarNavItemLabelProps) {
  const { isOpen } = useSidebarContext()

  if (!isOpen)
    return null

  return <span className={styles.label}>{children}</span>
}

Sidebar.Nav = SidebarNav
Sidebar.NavItem = SidebarNavItem
Sidebar.NavItemIcon = SidebarNavItemIcon
Sidebar.NavItemLabel = SidebarNavItemLabel
