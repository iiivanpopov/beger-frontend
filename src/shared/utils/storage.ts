import { storageKeys } from '../config'

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
    return storage.get(storageKeys.accessToken)
  },

  getRefreshToken: (): string | null => {
    return storage.get(storageKeys.refreshToken)
  },

  setTokens: (accessToken: string, refreshToken: string): boolean => {
    const accessSet = storage.set(storageKeys.accessToken, accessToken)
    const refreshSet = storage.set(storageKeys.refreshToken, refreshToken)
    return accessSet && refreshSet
  },

  clearTokens: (): boolean => {
    const accessRemoved = storage.remove(storageKeys.accessToken)
    const refreshRemoved = storage.remove(storageKeys.refreshToken)
    return accessRemoved && refreshRemoved
  },
}
