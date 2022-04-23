const createStorageHook =
  (storage: {
    getItem: (key: string) => string | null
    setItem: (key: string, val: string) => void
  }) =>
  <T>(key: string, initialValue: T) => {
    const [storageVal, setStorage] = useState(initialValue)

    useEffect(() => {
      const value = storage.getItem(key)

      if (value) {
        setStorage(JSON.parse(value))
      }
    }, [key])

    const setValue = useCallback(
      (value: T | ((prev: T) => T)) => {
        try {
          const valueToStore =
            value instanceof Function ? value(storageVal) : value

          setStorage(valueToStore)
          storage.setItem(key, JSON.stringify(valueToStore))
        } catch (error) {
          console.log(error)
        }
      },
      [key, storageVal]
    )

    return [storageVal, setValue] as const
  }

export const useLocalStorage = createStorageHook(window.localStorage)
export const useSessionStorage = createStorageHook(window.sessionStorage)
