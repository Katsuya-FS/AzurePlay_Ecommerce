export const Storage = {
  Get<T>(Key: string, Fallback: T): T {
    try {
      const Value = localStorage.getItem(Key)
      return Value ? JSON.parse(Value) as T : Fallback
    } catch {
      return Fallback
    }
  },
  Set<T>(Key: string, Value: T): void {
    try {
      localStorage.setItem(Key, JSON.stringify(Value))
    } catch {
      return
    }
  },
  Remove(Key: string): void {
    try {
      localStorage.removeItem(Key)
    } catch {
      return
    }
  }
}
