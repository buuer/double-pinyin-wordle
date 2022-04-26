import { useWordleContext } from "~/state/context"

const MenuIcon: FC<{
  icon: string
  classname?: string
  onClick?: () => void
}> = (props) => {
  return (
    <span
      className={classnames(
        "inline-block px-1 w-8 text-center activatable",
        props.classname
      )}
      onClick={props.onClick}
    >
      {props.icon}
    </span>
  )
}

const Header: FC = () => {
  const { modify } = useWordleContext()

  return (
    <header
      className="header px-4 sticky top-0 bg-white z-10
                flex justify-between items-center 
                text-base font-serif 
                border-b-1 border-light-500 shadow-bottom"
    >
      <div className="menu ">
        <MenuIcon icon="㊐" classname="dark:hidden" />
        <MenuIcon icon="㊊" classname="hidden dark:inline-block" />
      </div>
      <div className="title font-bold text-lg tracking-wider"> 拼音猜词 </div>
      <div className="menu">
        <MenuIcon icon="🪧" onClick={() => modify("modal", "status")} />
        <MenuIcon icon="㉄" onClick={() => modify("modal", "help")} />
      </div>
    </header>
  )
}

export default Header
