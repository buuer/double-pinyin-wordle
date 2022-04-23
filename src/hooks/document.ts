export const useLockScroll = (lock: boolean) => {
  useEffect(() => {
    if (lock) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  }, [lock])
}

export const useNodeClassname = (opt: {
  className: string
  id: string
  value: boolean
}) => {
  const { className, id, value } = opt
  useEffect(() => {
    const classArr = className.split(/\s/).filter(Boolean)
    const el = document.getElementById(id)
    if (!el) return

    if (value) {
      el.classList.add(...classArr)
    } else {
      el.classList.remove(...classArr)
    }

    return () => el.classList.remove(...classArr)
  }, [className, id, value])
}
