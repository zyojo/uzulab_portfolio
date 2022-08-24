export const translateWorkDuration: any = (startMonth: string, endMonth: string) => {
  let outputMonth = ''
  if (startMonth !== undefined || endMonth !== undefined) {
    if (startMonth !== endMonth) {
      const startYear = startMonth.split('/')[0]
      const endYear = endMonth.split('/')[0]
      if (startYear == endYear) {
        outputMonth = startYear + '.' + startMonth.split('/')[1] + ' ~ ' + endMonth.split('/')[1]
      } else {
        outputMonth = startMonth.replace('/', '.') + ' ~ ' + endMonth.replace('/', '.')
      }
    } else {
      outputMonth = startMonth.replace('/', '.')
    }
  }
  return outputMonth
}
