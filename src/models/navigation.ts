export interface INavItem {
  name: string
  icon: React.ReactNode
  link?: string
  children?: IMenuChildren[]
}

export interface IMenuChildren {
  name: string
  link: string
  icon?: string
}
