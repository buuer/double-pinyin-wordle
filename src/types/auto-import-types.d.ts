import React from "react"

declare global {
  type FC<T = {}> = React.FC<T>
  type ReactNode = React.ReactNode
}

export {}
