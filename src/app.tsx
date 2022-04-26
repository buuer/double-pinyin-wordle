import { Board } from "./components/board"
import { Bottom } from "./components/Bottom"
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
      <Bottom />
      <Help />
    </wordleContext.Provider>
  )
}
