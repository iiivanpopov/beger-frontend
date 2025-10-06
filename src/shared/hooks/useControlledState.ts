import type { Dispatch, SetStateAction } from 'react'
import { useState } from 'react'

export function useControlledState<T>(
  external: [T, Dispatch<SetStateAction<T>>] | undefined,
  defaultValue: T,
) {
  const [internalState, setInternalState] = useState(defaultValue)

  const state = external ? external[0] : internalState
  const setState = external ? external[1] : setInternalState

  return [state, setState] as const
}
