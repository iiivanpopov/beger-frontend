import type { User } from '@/api'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface AuthStore {
  user: User | null
  isAuth: boolean
  setAuth: (user: User | null, isAuth: boolean) => void
}

export const useAuthStore = create<AuthStore>()(
  devtools(set => ({
    user: null,
    isAuth: false,
    setAuth: (user, isAuth) => set({ user, isAuth }),
  })),
)
