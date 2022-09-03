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

export const translateDivs = (content: string) => {
  return content.replaceAll('%div%', '<div>').replaceAll('%/div%', '</div>')
}
export const translateEmbeddedEditor = (
  contents: { richEditor?: string | undefined; HTML?: string | undefined }[],
) => {
  let combinedHTML = ''
  contents.map((item) => {
    combinedHTML +=
      (item.richEditor !== undefined ? item.richEditor : '') +
      (item.HTML !== undefined ? item.HTML : '')
  })
  return combinedHTML
}
export const setLoadFlg = (e: any) => {
  if (e.target.srcset) {
    e.target.dataset.loaded = 'true'
  }
}
