import { FunctionComponent } from 'preact'
import { useCallback, useEffect, useRef, useState } from 'preact/hooks'
import { joinClass } from '../utils/func'
import './popup.scss'

const Popup: FunctionComponent<{ show: boolean; onMaskClick?: () => void }> = (
  props
) => {
  const [delayShow, setShow] = useState(props.show)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (props.show) {
      document.body.style.overflow = 'hidden'
      requestAnimationFrame(() => setShow(props.show))
    } else {
      document.body.style.overflow = 'auto'
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

  const popRef = useRef(null)

  const onMaskClick = useRef(props.onMaskClick)
  onMaskClick.current = props.onMaskClick
  const handlePopClick = useCallback((ev: MouseEvent) => {
    ev.target === popRef.current && onMaskClick.current?.()
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
        ref={popRef}
        className={joinClass([
          'popup',
          {
            'pop-hide': !props.show && !delayShow,
            'pop-show': props.show && delayShow,
          },
        ])}
        onClick={handlePopClick}
      >
        {props.children}
      </div>
    </>
  )
}

export default Popup
