export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID

interface CustomWindow extends Window {
  dataLayer: Array<any>
}

export const pageView = (url: string) => {
  if (process.env.NODE_ENV !== 'production') {
    return
  }
  const customWindow = window as unknown as CustomWindow
  customWindow.dataLayer.push({
    event: 'pageView',
    page: url,
  })
}
