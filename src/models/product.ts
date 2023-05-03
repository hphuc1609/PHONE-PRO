export interface ICustomAPIResponse {
  productID: string
  productName: string
  productCompany: string
  productPhotoImage: string
  productPrice: string
  productStar: number
  productRateCount: number
  productPromotion: IProductPromotion
  productSpec: IProductSpecifications
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
  promotionName: string
  promotionValue: string
}
