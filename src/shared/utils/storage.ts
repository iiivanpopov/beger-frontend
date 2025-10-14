import { LOCAL_STORAGE } from '@/config'

export const storage = {
  get: (key: string): string | null => {
    try {
      return localStorage.getItem(key)
    }
    catch {
      return null
    }
  },

  set: (key: string, value: string): boolean => {
    try {
      localStorage.setItem(key, value)
      return true
    }
    catch {
      return false
    }
  },

  remove: (key: string): boolean => {
    try {
      localStorage.removeItem(key)
      return true
    }
    catch {
      return false
    }
  },

  clear: (): boolean => {
    try {
      localStorage.clear()
      return true
    }
    catch {
      return false
    }
  },
}

export const authStorage = {
  getAccessToken: (): string | null => {
    return storage.get(LOCAL_STORAGE.accessToken)
  },

  getRefreshToken: (): string | null => {
    return storage.get(LOCAL_STORAGE.refreshToken)
  },

  setTokens: (accessToken: string, refreshToken: string): boolean => {
    const accessSet = storage.set(LOCAL_STORAGE.accessToken, accessToken)
    const refreshSet = storage.set(LOCAL_STORAGE.refreshToken, refreshToken)
    return accessSet && refreshSet
  },

  clearTokens: (): boolean => {
    const accessRemoved = storage.remove(LOCAL_STORAGE.accessToken)
    const refreshRemoved = storage.remove(LOCAL_STORAGE.refreshToken)
    return accessRemoved && refreshRemoved
  },
}
