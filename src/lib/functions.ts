export const translateWorkDuration: any = (startDateString: string, endDateString: string) => {
  let outputMonth = ''
  if (startDateString !== undefined || endDateString !== undefined) {
    const startDate = new Date(startDateString)
    const startDateMonth = startDate.getMonth() + 1
    const endDate = new Date(endDateString)
    const endDateMonth = endDate.getMonth() + 1
    const startYear = startDate.getFullYear()
    const endYear = endDate.getFullYear()
    const startMonthString = startDateMonth < 10 ? '0' + startDateMonth : String(startDateMonth)
    console.log('end:', endDate)
    const endMonthString = endDateMonth < 10 ? '0' + endDateMonth : String(endDateMonth)
    if (startYear !== endYear || startMonthString !== endMonthString) {
      if (startYear == endYear) {
        outputMonth = startYear + '.' + startMonthString + ' ~ ' + endMonthString
      } else {
        outputMonth = startYear + '.' + startMonthString + ' ~ ' + endYear + '.' + endMonthString
      }
    } else {
      outputMonth = startYear + '.' + startMonthString
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
