export const toUpperCase = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1)
}

export function middleEllipsis(s: string, n = 10): string {
  if (s.length < n) return s
  const start = s.slice(0, n / 2)
  const end = s.slice(-(n / 2))
  return start + '...' + end
}
