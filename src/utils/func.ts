export const indexArray = (len: number) =>
  Array(len)
    .fill(null)
    .map((_, i) => i)

export const getKeyboardLayout = (doublePyConf: Record<string, string>) =>
  Object.entries(doublePyConf).reduce((keyboard, [val, key]) => {
    keyboard[key] = keyboard[key] || []
    keyboard[key].push(val)
    return keyboard
  }, {} as Record<string, string[]>)

export const joinClass = (classArr: (string | Record<string, boolean>)[]) =>
  classArr
    .flatMap((name) => {
      if (typeof name === 'string') return name
      if (typeof name === 'object') {
        return Object.keys(name).filter((key) => name[key])
      }
      return ''
    })
    .join(' ')
