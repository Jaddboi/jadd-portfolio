// Reading or writing browser storage throws in private browsing, or when the
// visitor blocks site data. Then the setting simply isn't kept.
export const saved = {
  get(key) {
    try {
      return localStorage.getItem(key)
    } catch {
      return null
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, value)
    } catch {
      // Not stored: nothing to do.
    }
  },
}
