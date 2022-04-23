import { indexArray, randomNum } from "../utils/func"

const ROW_LEN = 6
const COL_LEN = 4

const STATUS = {
  BASE: 0,
  GRAY: 1,
  YELLOW: 2,
  GREEN: 3,
}

type statusMap = typeof STATUS
type status = statusMap[keyof statusMap]

const Loop: FC<{
  node: (index: number) => ReactNode
  length: number
}> = (props) => {
  return <>{indexArray(props.length).map(props.node)}</>
}

const statusClass = (status: status) => ({
  "c-wordle-green": status === STATUS.GREEN,
  "c-wordle-yellow": status === STATUS.YELLOW,
  "c-wordle-gray": status === STATUS.GRAY,
})

const BoardCell: FC<{
  value?: [string, string, string]
  status?: [status, status, status]
}> = (props) => {
  const { value, status } = props
  const [statusHan, statusSheng, statusYun] = status || [
    STATUS.BASE,
    STATUS.BASE,
    STATUS.BASE,
  ]

  const [han, sheng, yun] = value || ["", "", ""]

  return (
    <div
      className={classnames(
        "board-cell grid-cols-1 grid w-16 h-16 flex-none",
        "border-1 mr-[-1px] border-red-200",
        ""
      )}
    >
      <div className="text-center  border-b border-light">
        <span className={classnames("text-sm", statusClass(statusSheng))}>
          {sheng}
        </span>
        <span className={classnames("text-sm", statusClass(statusYun))}>
          {yun}
        </span>
      </div>
      <span
        className={classnames(
          "col-span-3 pb-1",
          "text-center text-2xl font-serif",
          statusClass(statusHan)
        )}
      >
        {han}
      </span>
    </div>
  )
}

export const BoardRow: FC<{
  rowData?: [string, number][]
  shaking?: boolean
}> = (props) => {
  return (
    <div
      className={classnames("board-row flex justify-center items-center my-2", {
        shaking: Boolean(props.shaking),
      })}
    >
      <Loop
        node={(index) => (
          <BoardCell
            key={index}
            status={[randomNum(3), randomNum(3), randomNum(3)]}
            value={["望", "W", "ang"]}
          />
        )}
        length={COL_LEN}
      />
    </div>
  )
}

export const Board: FC = () => {
  return (
    <div className="board my-4">
      <Loop node={(index) => <BoardRow key={index} />} length={ROW_LEN} />
    </div>
  )
}
