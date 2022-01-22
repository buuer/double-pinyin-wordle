import { FunctionalComponent } from 'preact'
import { useCallback } from 'preact/hooks'
import './header.scss'

const MenuIcon: FunctionalComponent<{
  icon: string
  onClick: () => void
}> = (props) => {
  return (
    <div
      className={`icon px-4 text-fz-12 cursor-pointer`}
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
    document.getElementById('app')?.classList.toggle('nightmode')
  }, [])

  return (
    <div class="header flex">
      <div className="menu">
        <MenuIcon icon="❔" onClick={handleHelp} />
      </div>
      <div className="title text-fz-36 text-fw-blod text-center"> wordle </div>
      <div className="menu">
        <MenuIcon icon="⚙️" onClick={handleSetting} />
      </div>
    </div>
  )
}

export default Header
