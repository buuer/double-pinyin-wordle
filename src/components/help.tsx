import Popup from "./popup"
import { BoardRow } from "./board"
import { useWordleContext } from "~/state/context"

const Link: FC<{ href: string; children: ReactNode }> = (props) => (
  <a
    className="m-1 underline"
    rel="noreferrer"
    target="_blink"
    href={props.href}
  >
    {props.children}
  </a>
)

const Help: FC = () => {
  const { modify, state } = useWordleContext()

  const handleClose = useCallback(() => {
    modify("modal", null)
  }, [modify])

  return (
    <Popup
      show={state.modal === "help"}
      className="inset-0 p-4  max-w-160 mx-auto c-#c0c4c3"
    >
      <h1 className="text-2xl font-600" onClick={handleClose}>
        怎么玩
      </h1>

      <div className="help-content all-[p]-my-2">
        <p>六次机会猜成语，填满一行按 🕹 </p>
        <p>声母/韵母颜色，提供猜词线索</p>
        <p className="border-b border-light border-opacity-30" />
        <p>例：</p>
        <p>
          <span className="inline-block mr-2 w-6 h-6 text-center bg-wordle-green">
            绿
          </span>
          <span className="inline-block mr-2 c-wordle-green">L</span>
          正确
        </p>
        <BoardRow />

        <p>
          <span className="inline-block mr-2 w-6 c-wordle-yellow">诚</span>
          <span className="inline-block mr-2 c-wordle-yellow">eng</span>
          <span className="inline-block mr-2 c-wordle-yellow">ˇ</span>
          位置错误
        </p>
        <BoardRow />
        <p>
          <span className="inline-block mr-2 c-wordle-gray">H</span>
          成语中没有用到该拼音/字
        </p>
        <BoardRow />

        <div className="mt-8 text-center">每天都有一个新的成语</div>
        <div
          className={classnames(
            "start text-center my-4 ",
            "border-1 border-light border-opacity-30 rounded-1 py-2",
            "activatable"
          )}
          onClick={handleClose}
        >
          开始吧
        </div>
        <div className="mt-4 text-right opacity-60 text-sm">
          <p>
            原版
            <Link href="https://www.powerlanguage.co.uk/wordle/">WORDLE</Link>
          </p>
          <p>
            本项目托管于
            <Link href="https://github.com/buuer/double-pinyin-wordle/">
              github
            </Link>
          </p>
        </div>
      </div>
    </Popup>
  )
}

export default Help
