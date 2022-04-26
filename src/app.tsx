import { Board } from "./components/board"
import Header from "./components/header"
import Help from "./components/help"
import { useAutoNightmode } from "./hooks/nightmode"
import { wordleContext } from "./state/context"
import { useWordReducer } from "./state/reduce"


export const App: FC = () => {
  useAutoNightmode()
  const ctxValue = useWordReducer()
  return (
    <wordleContext.Provider value={ctxValue}>
      <Header />
      <Board />
      <Help />
    </wordleContext.Provider>
  )
}
