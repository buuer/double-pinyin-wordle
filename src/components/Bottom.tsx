export const Bottom: FC<{
  onConfirm?: (word: string) => void
}> = (props) => {
  const { onConfirm } = props


  return (
    <>
      <div
        className="fixed bottom-0 bg-white 
                flex h-10
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
        </div>
        <button className="w-12 w-20 text-base text-center cursor-grab active:cursor-grabbing"></button>
      </div>
      <div className="h-20" />
    </>
  )
}
