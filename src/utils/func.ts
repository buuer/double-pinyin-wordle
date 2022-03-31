import { wordle } from './chengyu'
import { DOUBLE_PINYIN_FLY, DOUBLE_PINYIN_FLY_SHENG } from './counst'

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

export const joinClass = (
  classArr: (string | Record<string, boolean> | null | undefined)[]
) =>
  classArr
    .flatMap((name) => {
      if (typeof name === 'string') return name
      if (name && typeof name === 'object') {
        return Object.keys(name).filter((key) => name[key])
      }
      return ''
    })
    .filter(Boolean)
    .join(' ')

const tones = {
  a: ['a', 'ā', 'á', 'ǎ', 'à'],
  o: ['o', 'ō', 'ó', 'ǒ', 'ò'],
  e: ['e', 'ē', 'é', 'ě', 'è'],
  i: ['i', 'ī', 'í', 'ǐ', 'ì'],
  u: ['u', 'ū', 'ú', 'ǔ', 'ù'],
  v: ['ü', 'ǖ', 'ǘ', 'ǚ', 'ǜ'],
}

const toneMap: Record<string, string> = {
  á: 'a',
  à: 'a',
  ǎ: 'a',
  ā: 'a',
  é: 'e',
  è: 'e',
  ě: 'e',
  ē: 'e',
  í: 'i',
  ì: 'i',
  ǐ: 'i',
  ī: 'i',
  ó: 'o',
  ò: 'o',
  ǒ: 'o',
  ō: 'o',
  ú: 'u',
  ù: 'u',
  ǔ: 'u',
  ū: 'u',
  ǘ: 'v',
  ǜ: 'v',
  ǚ: 'v',
  ǖ: 'v',
}

export const getYunmuByKey = (key: string) => DOUBLE_PINYIN_FLY[key]
export const getShengmuByKey = (key: string) =>
  DOUBLE_PINYIN_FLY_SHENG[key] || key

const getPinyinMap = () => {
  const pinyinMap = Object.entries(DOUBLE_PINYIN_FLY)
    .flatMap(([key, val]) => val.map((yun) => ({ [yun]: key })))
    .reduce((a, b) => ({ ...a, ...b }), {})

  Object.entries(DOUBLE_PINYIN_FLY_SHENG).forEach(([key, val]) => {
    pinyinMap[val] = key
  })

  return pinyinMap
}

export const getRiddle = (wordle: wordle) => {
  const [word, pinyin] = wordle.map((s) => s.normalize())

  const pinyinMap = getPinyinMap()

  const shengYun = pinyin.split(' ').flatMap((character) => {
    const isZCS = /^[zcs]h/.test(character)
    const sliceIdx = isZCS ? 2 : 1
    const sheng = character.slice(0, sliceIdx)
    const yun = character
      .slice(sliceIdx)
      .split('')
      .map((c) => toneMap[c] || c)
      .join('')
    return [sheng, yun]
  })

  const pinyinKeys = shengYun.map((py) => pinyinMap[py] || py)

  return [word, pinyin, pinyinKeys]
}

export const throttle = <T extends (...arg: any[]) => any>(
  fn: T,
  wait: number
) => {
  let timer: number | null = null
  const throttleFn = (...args: Parameters<T>) => {
    if (timer) return
    timer = setTimeout(() => {
      fn(...args)
      timer = null
    }, wait)
  }

  return throttleFn as T
}

export const setLocalData = (key: string, value: unknown) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    return error
  }
}

export const getLocalData = <T>(
  key: string
): [null, T | null] | [unknown, null] => {
  try {
    const strData = localStorage.getItem(key)
    const data = strData === null ? strData : (JSON.parse(strData) as T)
    return [null, data]
  } catch (error) {
    return [error, null]
  }
}
