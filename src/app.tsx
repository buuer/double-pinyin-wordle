import Help from './components/help'
import Header from './components/header'
import Board from './components/board'
import Keyboard from './components/keyboard'
import { ctx, useWordleContext, useWordReducer } from './utils/reduce'
import { useEffect } from 'preact/hooks'
import { useAutoNightmode } from './utils/nightmode'

export function App() {
  const ctxValue = useWordReducer()
  useAutoNightmode()
  return (
    <ctx.Provider value={ctxValue}>
      <Help />
      <Header />
      <Board />
      <Keyboard />
    </ctx.Provider>
  )
}
