import produce from "immer"
import { initialState } from "./state"

type stateType = typeof initialState
type stateKeys = keyof stateType
type stateVal<T extends stateKeys> =
  | stateType[T]
  | ((v: stateType[T]) => stateType[T])

type dispatch = <T extends stateKeys>(action: [T, stateVal<T>]) => void
type modify = <T extends stateKeys>(key: T, payload: stateVal<T>) => void

type reducerType = <T extends stateKeys>(
  state: stateType,
  action: [T, stateVal<T>]
) => stateType

export const useWordReducer = () => {
  const [state, dispatch] = useReducer<reducerType>(
    produce((draft, [key, payload]) => {
      ;(draft[key] as any) =
        typeof payload === "function" ? payload(draft[key]) : payload

      return draft
    }),
    initialState
  ) as [stateType, dispatch]

  const modify = useCallback<modify>(
    (key, payload) => dispatch([key, payload]),
    []
  )

  return { state, modify }
}

export type contextType = ReturnType<typeof useWordReducer>
