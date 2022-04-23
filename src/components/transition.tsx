import { Transition, TransitionStatus } from "react-transition-group"
import { TransitionProps } from "react-transition-group/Transition"

type StatusToElement = (s: TransitionStatus) => React.ReactElement

const DelayState: FC<{
  state: TransitionStatus
  children: StatusToElement
}> = (props) => {
  const [delayState, setDelay] = useState(props.state)

  useEffect(() => {
    if (props.state === "entering") {
      requestAnimationFrame(() => setDelay(props.state))
    } else {
      setDelay(props.state)
    }
  }, [props.state])

  return props.children(delayState)
}

export const withTransition = (props: TransitionProps, fn: StatusToElement) => {
  return (
    <Transition {...props}>
      {(state) => <DelayState state={state} children={fn} />}
    </Transition>
  )
}
