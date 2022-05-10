import { usePinyin } from "~/hooks/pinyin"
import { useWordleContext } from "~/state/context"
import { wordToPinyin } from "~/utils/pinyin"
import { indexArray, noop, randomNum } from "../utils/func"
import { BoardCell } from "./boardCell"
import { BoardInput } from "./boardInput"

const ROW_LEN = 6
const COL_LEN = 4

const Loop: FC<{
  children: (index: number) => ReactNode
  length: number
}> = (props) => {
  return <>{indexArray(props.length).map(props.children)}</>
}

export const BoardRow: FC<{
  rowData?: [string, number][]
  shaking?: boolean
  editable?: boolean
  handleClick?: () => void
}> = (props) => {
  const { editable } = props
  const [word, setWord] = useState("")
  const pinyin = useMemo(() => wordToPinyin(word), [word])

  return (
    <div
      className={classnames(
        "board-row inline-flex justify-center items-center relative mt-0 previous-[.board-row]:mt--1px",
        {
          "cursor-text": editable,
          shaking: Boolean(props.shaking),
        }
      )}
      onClick={props.handleClick}
    >
      <BoardInput editable={editable} value={word} onChange={setWord} />
      <Loop length={COL_LEN}>
        {(index) => (
          <BoardCell
            key={index}
            index={index}
            status={[randomNum(3), randomNum(3), randomNum(3), randomNum(3)]}
            value={[word[index], ...(pinyin[index] || [])]}
          />
        )}
      </Loop>
    </div>
  )
}

export const Board: FC = () => {
  const { modify } = useWordleContext()
  const handleRowClick = useCallback(() => {
    modify("editing", true)
  }, [modify])
  return (
    <div className="board my-4 min-w-260px flex flex-col items-center overflow-hidden">
      <Loop length={ROW_LEN}>
        {(index) => (
          <BoardRow
            key={index}
            editable={index === 5}
            handleClick={index === 5 ? handleRowClick : noop}
          />
        )}
      </Loop>
    </div>
  )
}
