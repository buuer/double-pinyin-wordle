import { createRoot } from "react-dom/client"
import { App } from "./app"

import "@unocss/reset/tailwind.css"
import "./style/index.css"
import "uno.css"
import { StrictMode } from "react"

const appEl = document.getElementById("app")!

createRoot(appEl).render(
  <StrictMode>
    <App />
  </StrictMode>
)
