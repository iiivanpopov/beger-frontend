import type { User } from '@/api'
import { create } from 'zustand'

interface AuthStore {
  user: User | null
  isAuth: boolean
  setAuth: (user: User | null, isAuth: boolean) => void
}

export const useAuthStore = create<AuthStore>(set => ({
  user: null,
  isAuth: false,
  setAuth: (user, isAuth) => set({ user, isAuth }),
}))
