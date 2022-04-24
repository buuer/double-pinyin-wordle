import { STATUS } from "./counst"

export type anyFn = (...arg: any[]) => any

type statusMap = typeof STATUS

export type status = statusMap[keyof statusMap]
