import { useReducer } from 'preact/hooks'

const initialState = {}

const reducer = (
  state: unknown,
  action: { type: string; payload: unknown }
) => {
  switch (action.type) {
    default:
      throw new Error('Unexpected action')
  }
}

export const useWordReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return { state, dispatch }
}
