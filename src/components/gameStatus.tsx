import { FunctionalComponent } from 'react'
import { wordles } from '../utils/chengyu'
import { State, useWordleContext } from '../utils/reduce'
import Popup from './popup'
import './gameStatus.scss'

const Letter: FunctionalComponent<{ pinyin: string; letter: string }> = (
  props
) => (
  <div className="answer-letter">
    <div className="pinyin"> {props.pinyin} </div>
    <div className="letter"> {props.letter} </div>
  </div>
)

const statusMap: Record<string, string> = {
  1: '🟩',
  2: '🟨',
  3: '⬜',
}
const mapHistory = (history: State['historyRow']) => {
  return history
    .map((row) =>
      row
        .map(([, status], idx, arr) => {
          const gap = idx === arr.length - 1 || idx % 2 === 0 ? '' : ' '
          return statusMap[status] + gap
        })
        .join('')
    )
    .join('\r\n')
}

const GameStatus: FunctionalComponent = () => {
  const { emit, state } = useWordleContext()
  const [letter, pinlin] = wordles[state.todayIdx]
  const showLetterList = letter.split('')
  const showPinlinList = pinlin.split(' ')
  return (
    <Popup
      show={state.showStatus}
      onMaskClick={() => emit('setState', { showStatus: false })}
    >
      <div className="game-status">
        <div className="answer">
          <div className="answer-letter">
            {showLetterList.map((l, idx) => (
              <Letter letter={l} pinyin={showPinlinList[idx]} />
            ))}
          </div>
        </div>
        <div className="board-status">
          {
            mapHistory(state.historyRow)

            //   .map((line) => (
            //     <>l ine {'\r\n'}</>
            //   ))
          }
        </div>
        {/* <div className="timer"></div> */}
      </div>
    </Popup>
  )
}

export default GameStatus
