import { useEffect } from "react"

const setNightmode = (value: boolean) => {
  const appEl = document.getElementById("app")

  if (!appEl) return

  if (value) {
    appEl.classList.add("nightmode")
  } else {
    appEl.classList.remove("nightmode")
  }
  sessionStorage.setItem("nightmode", value.toString())
}

export const toggleNightmode = () => {
  const nightmode = sessionStorage.getItem("nightmode") === "true"
  setNightmode(!nightmode)
}

export const useAutoNightmode = () => {
  useEffect(() => {
    const modeMatch = window.matchMedia("(prefers-color-scheme: dark)")
    const handleEvent = (event: MediaQueryListEvent) =>
      setNightmode(event.matches)

    modeMatch.addEventListener("change", handleEvent)
    const sessionMode = sessionStorage.getItem("nightmode")
    const nightmode = sessionMode ? JSON.parse(sessionMode) : modeMatch.matches
    setNightmode(nightmode)

    return () => modeMatch.removeEventListener("change", handleEvent)
  }, [])
}
