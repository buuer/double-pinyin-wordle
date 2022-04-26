export const RingText: FC<{text:string}> = (props) => {
  return (
    <span
      className="border-1 rounded-full w-5 h-5 
                inline-flex items-center justify-center
                text-sm "
    >
      {props.text}
    </span>
  )
}
