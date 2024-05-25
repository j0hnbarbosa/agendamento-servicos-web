export const formatDate = (date: string) => {
  if (!date) return ''

  const originalDate = new Date(date)
  const day = String(originalDate.getDate()).padStart(2, '0')
  const month = String(originalDate.getMonth() + 1).padStart(2, '0')
  const year = originalDate.getFullYear()

  return `${day}/${month}/${year}`
}

export const formatHour = (date: string) => {
  if (!date) return ''

  const originalDate = new Date(date)
  const hours = ("0" + originalDate.getHours()).slice(-2)
  const minutes = ("0" + originalDate.getMinutes()).slice(-2)

  return hours + ":" + minutes
}