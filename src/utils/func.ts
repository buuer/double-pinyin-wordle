export const indexArray = (length: number) =>
  Array.from({ length }).map((_, idx) => idx)

export const never = (arg: never) => void 0

export const noop = (...arg: any[]) => void 0

export const identity = <T>(id: T) => id

export const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))

export const tryCatch = <T>(fn: () => T): [T, null] | [void, unknown] => {
  try {
    return [fn(), null]
  } catch (e) {
    return [undefined, e]
  }
}

export const randomNum = (max = 10, min = 0) => {
  const range = max - min + 1
  return Math.floor(Math.random() * range + min)
}

export const hashCode = (s: string) =>
  s.split("").reduce((a, b) => ((a << 5) - a + b.charCodeAt(0)) | 0, 0)

export const getIndexByHash = (hash: number, length: number) =>
  hashCode(hash.toString()) % length
