import type { Dispatch, SetStateAction } from 'react'
import { useState } from 'react'

export function useControlledState<T>(
  external: [T, Dispatch<SetStateAction<T>>] | undefined,
  defaultValue: T,
): [T, Dispatch<SetStateAction<T>>] {
  const [internalState, setInternalState] = useState(defaultValue)

  if (external)
    return external
  return [internalState, setInternalState]
}
