interface FormateDateOption {
  hasDay?: boolean
}

export const formatDate = (date: Date, { hasDay = true }: FormateDateOption = {}): string => {
  const year = date.getFullYear()
  const month = `${date.getMonth() + 1}`.padStart(2, '0')

  if (hasDay) {
    const day = `${date.getDate()}`.padStart(2, '0')
    return [year, month, day].join('-')
  }

  return [year, month].join('-')
}

export const formatMonth = (date: Date): string => formatDate(date, { hasDay: false })
