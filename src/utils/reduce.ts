import { useReducer } from 'preact/hooks'

const initialState = {}

const reducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return state + 1
    case 'decrement':
      return state - 1
    case 'reset':
      return 0
    default:
      throw new Error('Unexpected action')
  }
}

export const useWordReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return { state, dispatch }
}
