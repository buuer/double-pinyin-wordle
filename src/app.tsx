import Help from './components/help'
import GameStatus from './components/gameStatus'
import Header from './components/header'
import Board from './components/board'
import Keyboard from './components/keyboard'

import { ctx, useWordReducer } from './utils/reduce'
import { useAutoNightmode } from './utils/nightmode'

export function App() {
  const ctxValue = useWordReducer()
  useAutoNightmode()
  return (
    <ctx.Provider value={ctxValue}>
      <Help />
      <GameStatus />
      <Header />
      <Board />
      <Keyboard />
    </ctx.Provider>
  )
}
