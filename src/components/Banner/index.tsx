import { Box } from "@mui/material"
import SwiperCore, { Autoplay, Pagination } from "swiper"
import "swiper/css/pagination"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/swiper.css"

// install Swiper modules
SwiperCore.use([Autoplay, Pagination])

const slideShow = [
  {
    image: "../assets/images/banner/banner0.gif",
  },
  {
    image: "../assets/images/banner/banner1.png",
  },
  {
    image: "../assets/images/banner/banner2.png",
  },
  {
    image: "../assets/images/banner/banner3.png",
  },
  {
    image: "../assets/images/banner/banner4.png",
  },
  {
    image: "../assets/images/banner/banner5.png",
  },
  {
    image: "../assets/images/banner/banner6.png",
  },
  {
    image: "../assets/images/banner/banner7.png",
  },
  {
    image: "../assets/images/banner/banner8.png",
  },
  {
    image: "../assets/images/banner/banner9.png",
  },
]

const SlideSwiper = () => {
  return (
    <Swiper
      slidesPerView={1}
      pagination={{ clickable: true }}
      autoplay={{ delay: 2000, disableOnInteraction: false }}
      loop={true}
      grabCursor={true}
    >
      {slideShow.map((item, index) => (
        <SwiperSlide key={index}>
          <Box height={{ xs: 220, md: 400 }}>
            <img src={item.image} alt="..." width="100%" height="100%" />
          </Box>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default SlideSwiper
