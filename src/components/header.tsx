import { FunctionalComponent } from 'preact'
import { useCallback } from 'preact/hooks'
import { joinClass } from '../utils/func'
import { toggleNightmode } from '../utils/nightmode'
import { useWordleContext } from '../utils/reduce'
import './header.scss'

const MenuIcon: FunctionalComponent<{
  icon: string
  iconClass?: string
  onClick: () => void
}> = (props) => {
  return (
    <div
      className={joinClass([`icon`, props.iconClass])}
      onClick={props.onClick}
    >
      {props.icon}
    </div>
  )
}
const Header: FunctionalComponent = () => {
  const { emit } = useWordleContext()
  const handleHelp = useCallback(
    () => emit('setState', { showHelp: true }),
    [emit]
  )

  const handleSetting = useCallback(() => toggleNightmode(), [])

  return (
    <div class="header">
      <div className="menu">
        <MenuIcon icon="?" onClick={handleHelp} />
      </div>
      <div className="title"> wordle </div>
      <div className="menu">
        <MenuIcon icon="☀" onClick={handleSetting} />
      </div>
    </div>
  )
}

export default Header
