export type WorkType = {
  id: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  revisedAt: string
  title: string
  urn: string
  url: string
  thumbnail: {
    url: string
    height: number
    width: number
  }
  tags: {
    id: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    revisedAt: string
    name: string
  }[]
  summary_list: string
  summary_top: string
  header_pc: {
    url: string
    height: number
    width: number
  }
  header_sp: {
    url: string
    height: number
    width: number
  }
  start_date: string
  end_date: string
  responsibility?: string
  contents: {
    fieldId: string
    richEditor?: string
    HTML?: string
  }[]
}
