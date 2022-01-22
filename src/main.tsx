import { createContext, render } from 'preact'
import 'normalize.css'
import './style/index.css'
import './style/atom.scss'

import { App } from './app'
import { useWordReducer } from './utils/reduce'

const ctx = createContext({})
const Entry = () => {
  const ctxValue = useWordReducer()
  return (
    <ctx.Provider value={ctxValue}>
      <App />
    </ctx.Provider>
  )
}

render(<Entry />, document.getElementById('app')!)
