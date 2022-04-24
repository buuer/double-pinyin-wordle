import "~/style/mizige.css"

export const Mige: FC<{ children: ReactNode; className?: string }> = (
  props
) => {
  return (
    <span className={classnames(props.className, "mizige-ge")}>
      <i className="mizige-zi">{props.children}</i>
    </span>
  )
}
