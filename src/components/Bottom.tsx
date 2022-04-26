export const Bottom: FC<{
  onConfirm?: (word: string) => void
}> = (props) => {
  const { onConfirm } = props
  const [word, setWord] = useState("")

  const handleChange = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      const word = ev.target.value.replace(/\s|[0-9A-z]/g, "").slice(0, 4)
      setWord(word)
      onConfirm?.(word)
    },
    [onConfirm]
  )

  return (
    <>
      <div
        className="fixed bottom-0 bg-white 
                flex 
                shadow-top w-full z-1"
      >
        <button className="w-20 text-center activatable">
          <span
            className="border-1 rounded-full w-5 h-5 
          inline-flex items-center justify-center
          text-sm "
          >
            确
          </span>
        </button>
        <div className="border-x border-light grow w-1 my-2 ">
          <input
            className="h-8 w-full rounded-0 outline-none text-lg text-center"
            placeholder="请输入成语"
            value={word}
            onChange={handleChange}
          />
        </div>
        <button className="w-12 w-20 text-base text-center cursor-grab active:cursor-grabbing"></button>
      </div>
      <div className="h-10" />
    </>
  )
}
