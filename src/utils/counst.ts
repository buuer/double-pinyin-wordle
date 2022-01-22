export const STATUS_MAP = ['', 'correct', 'present', 'absent']
export const KEY_BOARD_QWERTY = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['_half', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', '_half'],
  ['enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'backspace'],
]

export const SHENG_MU = ['zh', 'ch', 'sh']
export const VOWEL = ['a', 'o', 'e', 'i', 'u']
export const DOUBLE_PINYIN_FLY: Record<string, string[]> = {
  a: ['a'],
  b: ['in'],
  c: ['ao'],
  d: ['ai'],
  e: ['e'],
  f: ['en'],
  g: ['eng'],
  h: ['ang'],
  i: ['i'],
  j: ['an'],
  k: ['ing', 'uai'],
  l: ['iang', 'uang'],
  m: ['ian'],
  n: ['iao'],
  o: ['o', 'uo'],
  p: ['ie'],
  q: ['iu'],
  r: ['uan'],
  s: ['iong', 'ong'],
  t: ['ue', 'üe'],
  u: ['u'],
  v: ['ü', 'ui'],
  w: ['ei'],
  x: ['ia', 'ua'],
  y: ['un'],
  z: ['ou'],
}
export const DOUBLE_PINYIN_FLY_SHENG: Record<string, string> = {
  i: 'ch',
  u: 'sh',
  v: 'zh',
}
