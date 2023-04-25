import axios from "axios"

const baseUrl = "https://phone-specs-clzpu7gyh-azharimm.vercel.app"

const getAllBrands = async () => {
  const res = await axios.get(`${baseUrl}/brands`)
  getListProduct(res.data[0]?.brand_slug)

  return res.data
}

// Product list by brand
const getListProduct = async (brandSlug: string) => {
  const res = await axios.get(`${baseUrl}/brands/`, {
    params: { brandSlug },
  })
  getApiSpec(res.data.phones[0]?.slug)

  return res.data
}

// Specifications
const getApiSpec = async (phoneSlug: string) => {
  const res = await axios.get(`${baseUrl}`, {
    params: { phoneSlug },
  })
  return res.data
}

export default { getAllBrands, getListProduct, getApiSpec }
