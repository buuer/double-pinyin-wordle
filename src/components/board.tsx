import { STATUS } from "~/utils/counst"
import { addTone, removeTone } from "~/utils/pinyin"
import { status } from "~/utils/types"
import { indexArray, randomNum } from "../utils/func"
import { Mige } from "./mige"

const ROW_LEN = 6
const COL_LEN = 4

const Loop: FC<{
  node: (index: number) => ReactNode
  length: number
}> = (props) => {
  return <>{indexArray(props.length).map(props.node)}</>
}

const statusClass = (status: status) => ({
  "c-wordle-green": status === STATUS.CORRENT,
  "c-wordle-yellow": status === STATUS.PRESENT,
  "c-wordle-gray": status === STATUS.ABSENT,
})

const BoardCell: FC<{
  value?: [string, string, string, number]
  status?: [status, status, status, status]
}> = (props) => {
  const { value, status } = props
  const [statusHan, statusSheng, statusYun, statusTone] = status || [
    STATUS.BASE,
    STATUS.BASE,
    STATUS.BASE,
    STATUS.BASE,
  ]

  const [han, sheng, yun, tone] = value || ["", "", "", 0]

  return (
    <div
      className={classnames(
        "board-cell relative text-center",
        "lt-mmd:w-16 lt-mmd:h-16",
        "at-mmd:w-20 at-mmd:h-20",
        "mlg:w-24 mlg:h-24",
        "flex flex-none items-center justify-center",
        "mr-[-1px] z-1",
        statusHan === STATUS.CORRENT
          ? "c-white bg-wordle-green all-[.status-color]-c-white"
          : "c-#310f1b"
      )}
    >
      <div
        className={classnames(
          "at-mmd:text-base lt-mmd:text-sm mlg:text-xl",
          "absolute top-0 w-full",
          "border-b border-white border-opacity-10"
        )}
      >
        <span
          className={classnames(
            statusClass(statusSheng),
            "status-color uppercase"
          )}
        >
          {sheng}
        </span>
        <span className={"relative"}>
          <span
            className={classnames(
              "status-color",
              statusClass(statusTone),
              "absolute left-0 z--1"
            )}
          >
            {addTone(yun, tone)}
          </span>
          <span className={classnames(statusClass(statusYun), "status-color")}>
            {removeTone(yun)}
          </span>
        </span>
      </div>
      <Mige
        className={classnames(
          statusClass(statusHan),
          "status-color",
          "at-mmd:text-3xl lt-mmd:text-2xl mlg:text-4xl font-serif w-full"
        )}
      >
        {han}
      </Mige>
    </div>
  )
}

export const BoardRow: FC<{
  rowData?: [string, number][]
  shaking?: boolean
}> = (props) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [word, setWord] = useState("")

  const handleChange = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      const word = ev.target.value.replace(/\s|[0-9A-z]/g, "").slice(0, 4)
      setWord(word)
    },
    []
  )

  const handleClick = useCallback(() => {
    if (!inputRef.current) return
    inputRef.current.focus()
  }, [])

  return (
    <div className="relative">
      <input
        className="absolute bottom-0 text-20 w-full outline-none text-transparent z--1
                  caret-transparent
                  at-mmd:text-20 lt-mmd:text-16 mlg:text-24
                  at-mmd:h-20 lt-mmd:h-16 mlg:h-24"
        ref={inputRef}
        value={word}
        onChange={handleChange}
      />
      <div
        className={classnames(
          "board-row flex justify-center items-center mt--1px previous-[input:focus]:bg-blue-200",
          {
            shaking: Boolean(props.shaking),
          }
        )}
        onClick={handleClick}
      >
        <Loop
          node={(index) => (
            <BoardCell
              key={index}
              status={[randomNum(3), randomNum(3), randomNum(3), randomNum(3)]}
              value={[word[index], "m", "ào", 4]}
            />
          )}
          length={COL_LEN}
        />
      </div>
    </div>
  )
}

export const Board: FC = () => {
  return (
    <div className="board my-4 min-w-260px flex flex-col items-center">
      <Loop node={(index) => <BoardRow key={index} />} length={ROW_LEN} />
    </div>
  )
}
