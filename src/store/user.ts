import type { User } from '@/api'
import { create } from 'zustand'

interface UserStore {
  user: User | null
  setUser: (user: User | null) => void
}

export const useUserStore = create<UserStore>()(set => ({
  user: null,
  setUser: user => set({ user }),
}))
