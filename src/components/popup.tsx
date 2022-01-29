import { FunctionComponent } from 'preact'
import { useEffect, useRef, useState } from 'preact/hooks'
import { joinClass } from '../utils/func'
import './popup.scss'

const Popup: FunctionComponent<{ show: boolean; onMaskClick?: () => void }> = (
  props
) => {
  const [delayShow, setShow] = useState(props.show)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (props.show) {
      requestAnimationFrame(() => setShow(props.show))
    }
  }, [props.show])

  const showVal = useRef<boolean>(false)
  showVal.current = props.show

  useEffect(() => {
    const refEl = ref.current
    const handleEvent = (ev: TransitionEvent) => {
      if (ev.target !== ref.current) return
      setShow(showVal.current)
    }
    refEl?.addEventListener('transitionend', handleEvent)
    return () => {
      refEl?.removeEventListener('transitionend', handleEvent)
    }
  }, [])

  return (
    <>
      <div
        ref={ref}
        className={joinClass([
          'popup-mask',
          {
            'pop-hide': !props.show && !delayShow,
            'pop-mask-show': props.show && delayShow,
          },
        ])}
        onClick={props.onMaskClick}
        onTouchMove={(ev) => ev.preventDefault()}
      />
      <div
        className={joinClass([
          'popup',
          {
            'pop-hide': !props.show && !delayShow,
            'pop-show': props.show && delayShow,
          },
        ])}
        onClick={props.onMaskClick}
      >
        {props.children}
      </div>
    </>
  )
}

export default Popup
