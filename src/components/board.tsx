import { FunctionalComponent } from 'preact'
import { useMemo } from 'preact/hooks'
import { STATUS_MAP } from '../utils/counst'
import { indexArray, joinClass } from '../utils/func'
import { useWordleContext } from '../utils/reduce'
import './board.scss'

const BoardCell: FunctionalComponent<{
  data: [string, number, ...string[]]
  isCurrentRow: boolean
  isYunmu: boolean
}> = (props) => {
  const [value, status, ...showValue] = props.data || []

  return (
    <div
      className={joinClass([
        'board-cell',
        STATUS_MAP[status || 0] || '',
        {
          unconfirmed: props.isCurrentRow && !!value,
          'board-cell-muti': showValue.length > 1,
        },
      ])}
    >
      {showValue.map((k) => {
        return <span>{k}</span>
      })}
    </div>
  )
}

const Board: FunctionalComponent = () => {
  const { state } = useWordleContext()

  return (
    <div className="board">
      {indexArray(6).map((rowIdx) => (
        <div
          className={joinClass([
            'board-row',
            { shaking: rowIdx === state.currentIdx && state.shaking },
          ])}
        >
          {indexArray(8).map((colIdx) => (
            <BoardCell
              data={state.historyRow[rowIdx][colIdx]}
              isYunmu={colIdx % 2 === 1}
              isCurrentRow={rowIdx === state.currentIdx}
            />
          ))}
        </div>
      ))}
      <div className="gap"></div>
    </div>
  )
}

export default Board
