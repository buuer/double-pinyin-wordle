import { useEffect } from "react"

const setNightmodeClass = (value: boolean) => {
  const docEl = document.documentElement

  if (!docEl) return

  if (value) {
    docEl.classList.add("dark")
  } else {
    docEl.classList.remove("dark")
  }
}

export const useAutoNightmode = () => {
  useEffect(() => {
    const modeMatch = window.matchMedia("(prefers-color-scheme: dark)")
    const handleEvent = (event: MediaQueryListEvent) =>
      setNightmodeClass(event.matches)

    modeMatch.addEventListener("change", handleEvent)

    return () => modeMatch.removeEventListener("change", handleEvent)
  }, [])
  return
}
