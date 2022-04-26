import { useWordleContext } from "~/state/context"
import { RingText } from "./ringText"

export const Bottom: FC = () => {
  const { state, modify } = useWordleContext()

  return (
    <>
      <div
        className="fixed bottom-0 bg-white 
                flex h-10
                shadow-top w-full z-1"
      >
        <button className="w-20 text-center activatable">
          <RingText text="猜" />
        </button>
        <div className="border-x border-light grow my-2"></div>
        <button
          className="w-20 text-center activatable"
          key={state.editing ? "editing" : ""} // 防止 blur 事件触发修改 state.editing 导致收起异常
          onClick={() => modify("editing", (v) => !v)}
        >
          <RingText text={state.editing ? "收" : "写"} />
        </button>
      </div>
      <div className="h-20" />
    </>
  )
}
