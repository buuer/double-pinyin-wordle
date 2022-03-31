import { FunctionalComponent } from 'react'
import { useWordleContext } from '../utils/reduce'
import Popup from './popup'
import './help.scss'
import { BoardRow } from './board'
import { useCallback, useEffect, useState } from 'react'

const Link: FunctionalComponent<{ href: string }> = (props) => (
  <a class="help-a" rel="noreferrer" target="_blink" href={props.href}>
    {props.children}
  </a>
)

const getRowData = (keys: string, status: Record<string, number>) =>
  keys.split(' ').map((k, idx) => [k, status[idx] || 0] as [string, number])

const Help: FunctionalComponent = () => {
  const { emit, state } = useWordleContext()
  const [statusDely, setStatusDely] = useState(false)

  useEffect(() => {
    requestAnimationFrame(() => setStatusDely(state.showHelp))
  }, [state.showHelp])

  const handleClose = useCallback(() => {
    emit('setState', { showHelp: false })
  }, [emit])

  return (
    <Popup show={state.showHelp} onMaskClick={handleClose}>
      <div className="help">
        <h1 className="help-h1">
          怎么玩
          <span className="help-close" onClick={handleClose}>
            &#x2715;
          </span>
        </h1>

        <div className="help-scroll">
          <p>六次机会猜成语，填满一行按 🕹 </p>
          <p>声母/韵母颜色，提供猜词线索</p>
          <div className="help-hr" />
          <p>例：</p>
          <div className="help-board board">
            <BoardRow
              rowData={getRowData(
                'l v u v q k u j',
                statusDely ? { 0: 1 } : {}
              )}
            />
          </div>
          <p>
            <span className="with-status correct">L</span>本格正确
          </p>
          <div className="help-board board">
            <BoardRow
              rowData={getRowData(
                'f w h l t g d a',
                statusDely ? { 3: 2 } : {}
              )}
            />
          </div>
          <p>
            <span className="with-status present">iang/uang</span>位置错误
          </p>
          <div className="help-board board">
            <BoardRow
              rowData={getRowData(
                'd m d c h w b d',
                statusDely ? { 4: 3 } : {}
              )}
            />
          </div>
          <p>
            <span className="with-status absent">H</span>成语中没有用到该拼音
          </p>
          <div className="help-hr" />
          <p>每天都有一个新的成语</p>

          <div className="help-links">
            <p>
              <Link href="https://www.powerlanguage.co.uk/wordle/">WORDLE</Link>
              原版
            </p>
            <p>
              韵母输入使用
              <Link href="https://help.flypy.com/#/up">小鹤双拼</Link>
              的映射规则
            </p>
            <p>
              本项目托管于
              <Link href="https://github.com/buuer/double-pinyin-wordle/">
                github
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Popup>
  )
}

export default Help
