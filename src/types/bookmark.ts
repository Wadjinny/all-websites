export interface LinkItem {
  id: string
  title: string
  description: string
  url: string
  image: string
  tag: string
  featured?: boolean
  order?: number | null
}
