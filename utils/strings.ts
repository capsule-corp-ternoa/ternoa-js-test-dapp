export const toUpperCase = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1)
}

export function middleEllipsis(s: string, n = 10): string {
  if (s.length < n) return s
  const start = s.slice(0, n / 2)
  const end = s.slice(-(n / 2))
  return start + '...' + end
}

export const removeURLSlash = (url: string) => {
  if (url.length === 0) return url
  const lastChar = url.charAt(url.length - 1)
  if (lastChar === '/') {
    return url.slice(0, -1)
  } else {
    return url
  }
}
