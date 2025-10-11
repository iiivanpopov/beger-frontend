export function normalizeValue(
  value?: string | number | (number | string)[],
): string {
  if (typeof value === 'string')
    return value
  if (Array.isArray(value))
    return value.join('')
  if (typeof value === 'number')
    return value.toString()
  return ''
}

export function matchesSearch({
  search,
  ...fields
}: {
  search: string
  [key: string]: string | number
}): boolean {
  const normalizedSearch = search.toLowerCase().trim()
  return Object.values(fields).some(field => field.toString().toLowerCase().includes(normalizedSearch),
  )
}
