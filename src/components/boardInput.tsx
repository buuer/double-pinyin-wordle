import { useWordleContext } from "~/state/context"

export const BoardInput: FC<{
  editable?: boolean
  value: string
  onChange: (v: string) => void
}> = (props) => {
  const { editable, onChange } = props
  const inputRef = useRef<HTMLInputElement>(null)

  const handleChange = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      const word = ev.target.value.replace(/[^\u4e00-\u9fa5]/g, "").slice(0, 4)
      onChange(word)
    },
    [onChange]
  )

  const { state, modify } = useWordleContext()

  useEffect(() => {
    if (!editable || !inputRef.current) return

    if (state.editing) {
      inputRef.current.focus()
    } else {
      inputRef.current?.blur()
    }
  }, [state.editing, editable])

  const changeEditing = useCallback(
    (v: boolean) => {
      if (!editable || !inputRef.current) return
      if (state.editing === v) return
      modify("editing", v)
    },
    [modify, state.editing, editable]
  )

  return (
    <input
      className="absolute bottom-0 text-20 w-full outline-none text-transparent z--1
              caret-transparent bg-transparent focus:bg-gray-200 transition-colors
              at-mmd:text-20 lt-mmd:text-16 mlg:text-24
              at-mmd:h-20 lt-mmd:h-16 mlg:h-24"
      ref={inputRef}
      value={props.value}
      onFocus={() => changeEditing(true)}
      onBlur={() => changeEditing(false)}
      onChange={handleChange}
    />
  )
}
