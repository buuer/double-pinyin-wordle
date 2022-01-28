import { FunctionalComponent } from 'preact'
import { useCallback, useMemo, useState } from 'preact/hooks'
import {
  DOUBLE_PINYIN_FLY,
  KEY_BOARD_QWERTY,
  DOUBLE_PINYIN_FLY_SHENG,
  STATUS_MAP,
} from '../utils/counst'
import { joinClass, throttle } from '../utils/func'
import { useWordleContext } from '../utils/reduce'
import './keyboard.scss'

const KeyButton: FunctionalComponent<{
  keyStr: string
}> = (props) => {
  const { keyStr } = props
  const { state, emit } = useWordleContext()

  const [shengMu, yunMu] = useMemo(() => {
    const zhchsh = DOUBLE_PINYIN_FLY_SHENG[keyStr]
    const sheng = zhchsh || keyStr
    const yun = (DOUBLE_PINYIN_FLY[keyStr] || []).filter((k) => k !== sheng)
    return [sheng, yun]
  }, [keyStr])

  const handleClick = useMemo(
    () => throttle(() => emit('keypass', keyStr), 150),
    [emit, keyStr]
  )

  const currentKeyStatus = state.statusMap[keyStr]

  const [shengStatus, yunStatus] = useMemo(() => {
    const [sheng, yun] = currentKeyStatus || [0, 0]
    const s = STATUS_MAP[sheng] || 'default'
    const y = STATUS_MAP[yun] || 'default'
    return [s, y]
  }, [currentKeyStatus])

  return (
    <button
      class={joinClass([
        'key-button',
        'transition',
        {
          'empty-yun': !yunMu.length,
          [shengStatus]: !yunMu.length,
        },
      ])}
      onClick={handleClick}
    >
      <div
        className={joinClass(['head', 'transition', 'uppercase', shengStatus])}
      >
        {shengMu}
      </div>

      {!!yunMu.length && (
        <div className={'tail transition ' + yunStatus}>
          {yunMu.map((k) => (
            <div className="tail-item">{k}</div>
          ))}
        </div>
      )}
    </button>
  )
}

const Keyboard: FunctionalComponent = () => {
  const { state, emit } = useWordleContext()

  const currentRow = state.historyRow[state.currentIdx]
  const status = currentRow.length % 2 ? 'sheng' : ''
  const handleKeyClick = useCallback((ev: Event) => ev.preventDefault(), [])

  const handleComfirm = useCallback(() => {
    if (currentRow.length !== 8) {
      emit('shake', true)
      setTimeout(() => emit('shake', false), 400)
      return
    }

    for (let idx = 0; idx < 8; idx++) {
      setTimeout(() => {
        emit('confirm', idx)
        idx === 7 && setTimeout(() => emit('rowConfirm'))
      }, 100 * idx)
    }
  }, [emit, currentRow])

  return (
    <div className={`keyboard transition ${status}`} onClick={handleKeyClick}>
      {KEY_BOARD_QWERTY.map((row) => (
        <div className="keyboard-row">
          {row.map((key, idx) => {
            if (key === '_half') return <span class="key-half" />
            if (key === 'enter')
              return (
                <button
                  className="key-button default func one-and-a-half"
                  onClick={handleComfirm}
                >
                  🕹️
                </button>
              )
            if (key === 'backspace')
              return (
                <button
                  className="key-button default func one-and-a-half"
                  onClick={() => emit('backspace')}
                >
                  {'⇦'}
                </button>
              )
            return <KeyButton keyStr={key} key={idx} />
          })}
        </div>
      ))}
    </div>
  )
}

export default Keyboard
