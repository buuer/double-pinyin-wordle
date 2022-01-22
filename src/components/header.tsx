import { FunctionalComponent } from 'preact'
import { useCallback } from 'preact/hooks'
import './header.scss'

const MenuIcon: FunctionalComponent<{
  icon: string
  onClick: () => void
}> = (props) => {
  return (
    <div
      className={`icon px-4 text-fz-12 cursor-pointer ${props.icon}`}
      onClick={props.onClick}
    >
      {props.icon}
    </div>
  )
}
const Header: FunctionalComponent = () => {
  const handleHelp = useCallback(() => {
    console.log('help')
  }, [])

  const handleSetting = useCallback(() => {
    console.log('setting')
  }, [])

  return (
    <div class="header flex">
      <div className="menu">
        <MenuIcon icon="game-help" onClick={handleHelp} />
      </div>
      <div className="title text-fz-36 text-fw-blod text-center"> wordle </div>
      <div className="menu">
        <MenuIcon icon="game-setting" onClick={handleSetting} />
      </div>
    </div>
  )
}

export default Header
