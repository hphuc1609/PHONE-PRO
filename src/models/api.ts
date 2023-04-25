export interface ICustomAPIResponse {
  productName: string
  productCompany: string
  productPhotoImage: string
  productPrice: string
  productStar: number
  productRateCount: number
}

export interface IProductSpecifications {
  screen: string
  os: string
  camara: string
  camaraFront: string
  cpu: string
  ram: string
  rom: string
  microUSB: string
  battery: string
}

export interface IProductPromotion {
  name: string
  value: string
}

export interface IGetPromoResponse {
  productPromotion?: IProductPromotion
}

export interface IGetSpecResponse {
  productSpec?: IProductSpecifications
}
