import { STATUS } from "~/utils/counst"
import { splitTone } from "~/utils/pinyin"
import { status } from "~/utils/types"
import { Mige } from "./mige"

const statusClass = (status: status) => ({
  "c-wordle-green": status === STATUS.CORRENT,
  "c-wordle-yellow": status === STATUS.PRESENT,
  "c-wordle-gray": status === STATUS.ABSENT,
})

export const BoardCell: FC<{
  value?: [string, string, string, number]
  status?: [status, status, status, status]
  index: number
  animate?: boolean
}> = (props) => {
  const { value, status, index } = props
  const [statusHan, statusSheng, statusYun, statusTone] = status || [
    STATUS.BASE,
    STATUS.BASE,
    STATUS.BASE,
    STATUS.BASE,
  ]

  const [han, sheng, yun, tone] = value || ["", "", "", 0]

  const aniDelay = [
    "animate-delay-0",
    "animate-delay-300",
    "animate-delay-600",
    "animate-delay-900",
  ][index]
  return (
    <div
      className={classnames(
        "board-cell relative text-center",
        "lt-mmd:w-16 lt-mmd:h-16",
        "at-mmd:w-20 at-mmd:h-20",
        "mlg:w-24 mlg:h-24",
        "flex flex-none items-center justify-center",
        "mr-[-1px] z-1",
        props.animate && "animate-[cell-flip]",
        "animate-duration-1600 animate-count-infinite",
        aniDelay,
        statusHan === STATUS.CORRENT
          ? "c-white bg-wordle-green all-[.status-color]-c-white"
          : "c-#310f1b"
      )}
    >
      <div
        className={classnames(
          "at-mmd:text-base lt-mmd:text-sm mlg:text-xl",
          "absolute top-0 w-full h-8",
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
            {yun}
          </span>
          <span className={classnames(statusClass(statusYun), "status-color")}>
            {splitTone(yun)[0]}
          </span>
        </span>
      </div>
      <Mige
        className={classnames(
          statusClass(statusHan),
          "status-color",
          "at-mmd:text-4xl lt-mmd:text-3xl mlg:text-5xl font-serif w-full"
        )}
      >
        {han}
      </Mige>
    </div>
  )
}
