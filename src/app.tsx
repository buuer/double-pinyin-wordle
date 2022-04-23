import Header from "./components/header"
import { useAutoNightmode } from "./hooks/nightmode"
import { wordleContext } from "./state/context"
import { useWordReducer } from "./state/reduce"

export const App: FC = () => {
  useAutoNightmode()
  const ctxValue = useWordReducer()

  return (
    <>
      <wordleContext.Provider value={ctxValue}>
        <div className="app-content">
          <Header />
        </div>
        <div className="app-modal">modal</div>
      </wordleContext.Provider>
    </>
  )
}
