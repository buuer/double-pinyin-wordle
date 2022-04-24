import { useLockScroll, useNodeClassname } from "~/hooks/document"
import { createPortal } from "react-dom"
import { withTransition } from "./transition"

const isHide = (state: string) => state === "exited" || state === "exiting"

const Mask: FC<{ show: boolean; onClick?: () => void }> = (props) => {
  const nodeRef = useRef(null)
  return withTransition(
    {
      in: props.show,
      nodeRef,
      timeout: 300,
      unmountOnExit: true,
      mountOnEnter: true,
    },
    (state) => (
      <div
        ref={nodeRef}
        className={classnames(
          "absolute inset-0 z-1 opacity-65",
          "bg-black transition-opacity duration-300"
        )}
        style={isHide(state) ? { opacity: 0 } : {}}
        onClick={props.onClick}
      />
    )
  )
}

const PopContent: FC<{
  show: boolean
  className?: string
  children?: ReactNode
}> = (props) => {
  const nodeRef = useRef(null)
  return withTransition(
    {
      in: props.show,
      nodeRef,
      timeout: 300,
      unmountOnExit: true,
      mountOnEnter: true,
    },
    (state) => (
      <div
        ref={nodeRef}
        className={classnames(
          props.className,
          "absolute z-2",
          "opacity-100 translate-y-0",
          "overflow-auto transition duration-300"
        )}
        style={
          isHide(state)
            ? {
                opacity: 0,
                transform: "translateY(1.5rem)",
              }
            : {}
        }
      >
        {props.children}
      </div>
    )
  )
}

const PopPortal: FC<{
  show: boolean
  className?: string
  onMaskClick?: () => void
  children?: ReactNode
}> = (props) => {
  useLockScroll(props.show)

  useNodeClassname({
    id: "app",
    className: "filter-blur",
    value: props.show,
  })

  return createPortal(
    <>
      <Mask show={props.show} onClick={props.onMaskClick} />
      <PopContent
        show={props.show}
        className={props.className}
        children={props.children}
      />
    </>,
    document.getElementById("modal")!
  )
}

export default PopPortal
