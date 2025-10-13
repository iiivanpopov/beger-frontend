import type { User } from '@/api'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface AuthStore {
  user: User | null
  setAuth: (user: User | null) => void
}

export const useAuthStore = create<AuthStore>()(devtools(set => ({
  user: null,
  setAuth: user => set({ user }),
})))
