import { FunctionalComponent } from 'preact'
import './header.css'

const Header: FunctionalComponent = () => {
  return <div class='header'>
      <div className="game-help-icon">?</div>
      <div className="title"> wordle </div>
      <div className="menu-icons">
          <div className="setting-icon">setting</div>
      </div>
  </div>
}

export default Header
