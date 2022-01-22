import { FunctionalComponent } from 'preact'
import { useCallback, useMemo, useState } from 'preact/hooks'
import {
  DOUBLE_PINYIN_FLY,
  KEY_BOARD_QWERTY,
  DOUBLE_PINYIN_FLY_SHENG,
  STATUS_MAP,
} from '../utils/counst'
import {  joinClass } from '../utils/func'
import './keyboard.scss'

const KeyButton: FunctionalComponent<{
  keyStr: string
  onClick: (k: string) => void
}> = (props) => {
  const { keyStr, onClick } = props

  const [shengMu, yunMu] = useMemo(() => {
    const zhchsh = DOUBLE_PINYIN_FLY_SHENG[keyStr]
    const sheng = zhchsh || keyStr
    const yun = (DOUBLE_PINYIN_FLY[keyStr] || []).filter((k) => k !== sheng)
    return [sheng, yun]
  }, [keyStr])

  const handleClick = useCallback(() => onClick(keyStr), [onClick, keyStr])

  const [shengStatus, yunStatus] = useMemo(() => {
    const idx = () => Math.floor(Math.random() * 5)
    const s = STATUS_MAP[idx()] || 'default'
    const y = STATUS_MAP[idx()] || 'default'
    return [s, y]
  }, [keyStr])

  if (keyStr === '_half') return <span class="key-half" />
  if (keyStr === 'enter') {
    return (
      <button className="key-button default func one-and-a-half">确</button>
    )
  }
  if (keyStr === 'backspace') {
    return (
      <button className="key-button default func one-and-a-half">{'<-'}</button>
    )
  }

  return (
    <button
      class={joinClass([
        'key-button',
        'transition',
        shengStatus,
        {
          'empty-yun': !yunMu.length,
        },
      ])}
      onClick={handleClick}
    >
      <div className="head transition uppercase">{shengMu}</div>

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
  const [state, setState] = useState(false)
  const handleClick = useCallback(() => {
    setState((s) => !s)
  }, [])
  const status = state ? 'sheng' : ''
  return (
    <div className={`keyboard transition ${status}`}>
      {KEY_BOARD_QWERTY.map((row) => (
        <div className="keyboard-row">
          {row.map((key, idx) => (
            <KeyButton keyStr={key} key={idx} onClick={handleClick} />
          ))}
        </div>
      ))}
    </div>
  )
}

export default Keyboard
