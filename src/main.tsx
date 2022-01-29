import { render } from 'preact'
import { App } from './app'
import 'normalize.css'
import './style/index.scss'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
render(<App />, document.getElementById('app')!)
