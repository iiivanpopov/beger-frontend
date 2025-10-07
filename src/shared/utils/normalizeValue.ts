export function normalizeValue(
  value?: string | string[] | number,
): string {
  if (typeof value === 'string')
    return value
  if (Array.isArray(value))
    return value.join(', ')
  if (typeof value === 'number')
    return value.toString()
  return ''
}
