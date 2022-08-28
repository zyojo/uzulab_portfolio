export const translateWorkDuration: any = (startDate: string, endDate: string) => {
  let outputMonth = ''
  if (startDate !== undefined || endDate !== undefined) {
    const startDateFormat = new Date(startDate)
    const endDateFormat = new Date(endDate)
    const startYear = startDateFormat.getFullYear()
    const endYear = endDateFormat.getFullYear()
    const startMonth =
      startDateFormat.getMonth() < 10
        ? '0' + startDateFormat.getMonth()
        : String(startDateFormat.getMonth())
    const endMonth =
      endDateFormat.getMonth() < 10
        ? '0' + endDateFormat.getMonth()
        : String(endDateFormat.getMonth())
    if (startYear !== endYear || startMonth !== endMonth) {
      if (startYear == endYear) {
        outputMonth = startYear + '.' + startMonth + ' ~ ' + endMonth
      } else {
        outputMonth = startYear + '.' + startMonth + ' ~ ' + endYear + '.' + endMonth
      }
    } else {
      outputMonth = startYear + '.' + startMonth
    }
  }
  return outputMonth
}
