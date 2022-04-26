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
        "lt-mxs:w-16 lt-mxs:h-16",
        "at-mxs:w-18 at-mxs:h-18",
        "at-msm:w-20 at-msm:h-20",
        "at-mmd:w-22 at-mmd:h-22",
        "mlg:w-24 mlg:h-24",
        "flex flex-none items-center justify-center",
        "mr-[-1px]",
        statusHan === STATUS.CORRENT
          ? "c-white bg-wordle-green all-[.status-color]-c-white z-1"
          : "c-#310f1b"
      )}
    >
      <div
        className={classnames(
          "text-base mmd:text-lg lt-msm:text-xs",
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
          "text-3xl mmd:text-4xl lt-msm:text-2xl font-serif w-full"
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
  return (
    <div
      className={classnames(
        "board-row flex justify-center items-center mt--1px",
        {
          shaking: Boolean(props.shaking),
        }
      )}
    >
      <Loop
        node={(index) => (
          <BoardCell
            key={index}
            status={[randomNum(3), randomNum(3), randomNum(3), randomNum(3)]}
            value={["帽", "m", "ào", 4]}
          />
        )}
        length={COL_LEN}
      />
    </div>
  )
}

export const Board: FC = () => {
  return (
    <div className="board my-4 min-w-260px">
      <Loop node={(index) => <BoardRow key={index} />} length={ROW_LEN} />
    </div>
  )
}
