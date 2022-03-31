import { createContext } from 'preact'
import { Reducer, useCallback, useContext, useReducer } from 'preact/hooks'
import { STATUS } from './counst'
import { getShengmuByKey, getYunmuByKey } from './func'

const initialState = {
  todayIdx: 0,
  currentIdx: 0,
  historyRow: [[], [], [], [], [], []] as [key: string, status: number][][],
  statusMap: {} as Record<string, [sheng: number, yun: number]>,
  shaking: false,
  showHelp: false,
  showStatus: false,
  riddleKeys: 'i r z c f u h v'.split(' ') as string[],
}

export type State = typeof initialState

type actions = {
  keypass: string
  confirm: { row: number; index: number }
  next: number
  backspace: never
  shake: boolean
  showResult: number
  setState: Partial<State>
}

const noop = (arg: never) => void 0

const handleKeypass = (state: State, key?: string) => {
  if (!key) return state
  const currentRow = state.historyRow[state.currentIdx]
  if (currentRow && currentRow.length !== 8) {
    currentRow.push([key, 0])
  }

  return { ...state }
}

const handleBackspace = (state: State) => {
  const currentRow = state.historyRow[state.currentIdx]
  currentRow && currentRow.splice(currentRow.length - 1, 1)
  return { ...state }
}

const handleConfirm = (state: State, payload: actions['confirm']) => {
  const currentRow = state.historyRow[payload.row]
  if (!currentRow) return state

  const index = payload.index

  const cell = currentRow[index]
  const [key, _] = cell
  const isShengmu = index % 2 === 0
  const statusIdx = isShengmu ? 0 : 1
  const diffArr = state.riddleKeys.filter((_, idx) => idx % 2 === statusIdx)

  if (key === state.riddleKeys[index]) {
    cell[1] = STATUS.CORRENT
  } else if (!diffArr.includes(key)) {
    cell[1] = STATUS.ABSENT
  } else {
    cell[1] = STATUS.PRESENT
  }

  const currentStatusMap = state.statusMap[key] || [0, 0]
  const currentKey = currentStatusMap[statusIdx]
  if (!currentKey || currentKey > cell[1]) {
    currentStatusMap[statusIdx] = cell[1]
  }
  state.statusMap[key] = [...currentStatusMap]

  return { ...state }
}

const handleNext = (state: State) => {
  if (state.currentIdx <= 5) {
    state.currentIdx += 1
  }
  return { ...state }
}
const handleShowResult = (state: State, rowIdx: number) => {
  const { historyRow } = state
  const currentRow = historyRow[rowIdx]
  if (!currentRow) return state
  const isALlRight = currentRow.every(([, status]) => status === STATUS.CORRENT)

  if (isALlRight || rowIdx === 5) {
    state.showStatus = true
  }

  return { ...state }
}

const reducer: Reducer<
  typeof initialState,
  { type: keyof actions; payload?: unknown }
> = (state, action) => {
  switch (action.type) {
    case 'keypass':
      return handleKeypass(state, action.payload as actions['keypass'])
    case 'confirm':
      return handleConfirm(state, action.payload as actions['confirm'])
    case 'next':
      return handleNext(state)
    case 'backspace':
      return handleBackspace(state)
    case 'shake':
      return { ...state, shaking: action.payload as actions['shake'] }
    case 'setState':
      return { ...state, ...(action.payload as actions['setState']) }
    case 'showResult':
      return handleShowResult(state, action.payload as actions['showResult'])
    default:
      noop(action.type)
      throw new Error('Unexpected action')
  }
}

type emit = <T extends keyof actions>(type: T, payload?: actions[T]) => void

export const useWordReducer = () => {
  const [state, dispatch] = useReducer<
    typeof initialState,
    Parameters<typeof reducer>[1]
  >(reducer, initialState)

  const emit: emit = useCallback(
    (type, payload) => dispatch({ type, payload }),
    []
  )
  return { state, emit }
}

export const ctx = createContext({} as ReturnType<typeof useWordReducer>)

export const useWordleContext = () => useContext(ctx)
