import { FunctionalComponent } from 'preact'
import { useMemo } from 'preact/hooks'
import { STATUS_MAP } from '../utils/counst'
import { indexArray } from '../utils/func'
import './board.scss'

const state = [
  ['w', 'ai', 'ch', 'ang', '3', 'z', 'c'],
  ['x', '', ''],
  ['', '', ''],
]
const statusState = [[0, 1, 2, 3, 4], []]



const BoardCell: FunctionalComponent<{ rowIdx: number; colIdx: number }> = (
  props
) => {
  const { rowIdx, colIdx } = props
  const val = useMemo(() => {
    return state[rowIdx]?.[colIdx] || ''
  }, [rowIdx, colIdx])

  const status = useMemo(() => {
    return STATUS_MAP[statusState[rowIdx]?.[colIdx] || 0]
  }, [rowIdx, colIdx])
  return <div className={`board-cell ${status}`}> {val} </div>
}
const Board: FunctionalComponent = () => {
  return (
    <div className="board">
      {indexArray(6).map((rowIdx) => (
        <div className="board-row">
          {indexArray(8).map((colIdx) => (
            <BoardCell colIdx={colIdx} rowIdx={rowIdx} />
          ))}
        </div>
      ))}
    </div>
  )
}

export default Board
