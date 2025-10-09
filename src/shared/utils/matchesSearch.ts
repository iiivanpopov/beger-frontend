export function matchesSearch({
  search,
  ...fields
}: {
  search: string
  [key: string]: string | number
}): boolean {
  const normalizedSearch = search.toLowerCase().trim()
  return Object.values(fields).some(field =>
    field.toString().toLowerCase().includes(normalizedSearch),
  )
}
