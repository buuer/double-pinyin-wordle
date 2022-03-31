import { FunctionalComponent } from "react"
import { useMemo } from "react"
import { STATUS_MAP } from "../utils/counst"
import {
  getShengmuByKey,
  getYunmuByKey,
  indexArray,
  joinClass,
} from "../utils/func"
import { useWordleContext } from "../utils/reduce"
import "./board.scss"

const BoardCell: FunctionalComponent<{
  data: [string, number]
  isCurrentRow?: boolean
  isYunmu?: boolean
}> = (props) => {
  const [value, status] = props.data || []

  const showValue: string[] = useMemo(() => {
    if (!value) return []
    if (!props.isYunmu) return [getShengmuByKey(value)]
    return getYunmuByKey(value)
  }, [value, props.isYunmu])

  return (
    <div
      className={joinClass([
        "board-cell",
        STATUS_MAP[status || 0] || "",
        {
          unconfirmed: !!props.isCurrentRow && !!value,
          "board-cell-muti": showValue.length > 1,
        },
      ])}
    >
      {showValue.map((k) => {
        return <span>{k}</span>
      })}
    </div>
  )
}

export const BoardRow: FunctionalComponent<{
  rowData: [string, number][]
  isCurrentRow?: boolean
  shaking?: boolean
}> = (props) => {
  return (
    <div className={joinClass(["board-row", { shaking: !!props.shaking }])}>
      {indexArray(8).map((colIdx) => (
        <BoardCell
          data={props.rowData[colIdx]}
          isYunmu={colIdx % 2 === 1}
          isCurrentRow={props.isCurrentRow}
        />
      ))}
    </div>
  )
}

const Board: FunctionalComponent = () => {
  const { state } = useWordleContext()

  return (
    <div className="board pop-bg">
      {indexArray(6).map((rowIdx) => (
        <BoardRow
          rowData={state.historyRow[rowIdx]}
          isCurrentRow={state.currentIdx === rowIdx}
          shaking={state.shaking && state.currentIdx === rowIdx}
        />
      ))}
      <div className="gap"></div>
    </div>
  )
}

export default Board
