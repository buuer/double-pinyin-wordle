import { render } from 'preact'
import { App } from './app'
import 'normalize.css'
import './style/index.scss'
// import './style/atom.scss'



render(<App />, document.getElementById('app')!)
