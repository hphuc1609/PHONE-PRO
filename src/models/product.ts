export interface ICustomAPIResponse {
  productId: string
  title: string
  company: string
  photoImage: string
  price: number
  star: number
  rateCount: number
  promotion: IPromotion
  specifications: ISpecifications
}

export interface ISpecifications {
  screen: string
  os: string
  camera: string
  cameraFront: string
  cpu: string
  ram: string
  rom: string
  microUSB: string
  battery: string
}

export interface IPromotion {
  name: string
  value: string
}

export interface IComment {
  id: number
  userId: string
  username: string
  content: string
  createDate: string
  parentId: string | null
  productId: string
}
