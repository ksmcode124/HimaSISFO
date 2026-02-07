export function parseDate(dateInput: string | Date) {
  if (!dateInput) return '-'

  const date = new Date(dateInput)
  if (isNaN(date.getTime())) return '-'

  return new Intl.DateTimeFormat('id-ID', {
    timeZone: 'UTC',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}

export function formatTanggalIndonesia(dateString: string) {
  const date = new Date(dateString + 'T00:00:00Z')

  return new Intl.DateTimeFormat('id-ID', {
    timeZone: 'UTC',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}