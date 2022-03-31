import { render } from "react-dom"
import { App } from "./app"

import "@unocss/reset/tailwind.css"
import "./style/index.css"
import "uno.css"
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
render(<App />, document.getElementById("app")!)
