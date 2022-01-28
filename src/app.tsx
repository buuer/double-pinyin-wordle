import Help from './components/help'
import Header from './components/header'
import Board from './components/board'
import Keyboard from './components/keyboard'
import { ctx, useWordReducer } from './utils/reduce'


export function App() {
  const ctxValue = useWordReducer()
  return (
    <ctx.Provider value={ctxValue}>
      <Help />
      <Header />
      <Board />
      <Keyboard />
    </ctx.Provider>
  )
}
