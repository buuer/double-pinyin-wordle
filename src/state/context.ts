import { createContext } from "react"
import type { contextType } from "./reduce"

export const wordleContext = createContext({} as contextType)

export const useWordleContext = () => useContext(wordleContext)
