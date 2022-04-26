import { useWordleContext } from "~/state/context"
import { indexArray, noop, randomNum } from "../utils/func"
import { BoardCell } from "./boardCell"
import { BoardInput } from "./boardInput"

const ROW_LEN = 6
const COL_LEN = 4

const Loop: FC<{
  node: (index: number) => ReactNode
  length: number
}> = (props) => {
  return <>{indexArray(props.length).map(props.node)}</>
}

export const BoardRow: FC<{
  rowData?: [string, number][]
  shaking?: boolean
  editable?: boolean
  handleClick: () => void
}> = (props) => {
  const { editable } = props
  const [word, setWord] = useState("")

  return (
    <div className="relative">
      <BoardInput editable={props.editable} value={word} onChange={setWord} />
      <div
        className={classnames(
          "board-row flex justify-center items-center mt--1px",
          "transition-colors previous-[input:focus]:bg-gray-200",
          {
            "cursor-text": editable,
            shaking: Boolean(props.shaking),
          }
        )}
        onClick={props.handleClick}
      >
        <Loop
          node={(index) => (
            <BoardCell
              key={word[index]}
              index={index}
              animate={editable}
              status={[randomNum(3), randomNum(3), randomNum(3), randomNum(3)]}
              value={[word[index], "m", "ào", 4]}
            />
          )}
          length={COL_LEN}
        />
      </div>
    </div>
  )
}

export const Board: FC = () => {
  const { modify } = useWordleContext()
  const handleRowClick = useCallback(() => {
    modify("editing", true)
  }, [modify])
  return (
    <div className="board my-4 min-w-260px flex flex-col items-center">
      <Loop
        node={(index) => (
          <BoardRow
            key={index}
            editable={index === 5}
            handleClick={index === 5 ? handleRowClick : noop}
          />
        )}
        length={ROW_LEN}
      />
    </div>
  )
}
