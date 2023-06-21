import { Box } from "@mui/material"
import SwiperCore, { Autoplay, Pagination } from "swiper"
import "swiper/css/pagination"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/swiper.css"

// install Swiper modules
SwiperCore.use([Autoplay, Pagination])

const slideShow = [
  "../assets/images/banner/banner0.gif",
  "../assets/images/banner/banner1.png",
  "../assets/images/banner/banner2.png",
  "../assets/images/banner/banner3.png",
  "../assets/images/banner/banner4.png",
  "../assets/images/banner/banner5.png",
  "../assets/images/banner/banner6.png",
  "../assets/images/banner/banner7.png",
  "../assets/images/banner/banner8.png",
  "../assets/images/banner/banner9.png",
]

const SlideSwiper = () => {
  return (
    <Swiper
      slidesPerView={2}
      spaceBetween={200}
      pagination={{ clickable: true }}
      autoplay={{ disableOnInteraction: false }}
      loop={true}
      grabCursor={true}
    >
      {slideShow.map((item, index) => (
        <SwiperSlide key={index}>
          <Box height={{ xs: 200, md: 260 }} margin="auto">
            <img
              src={item}
              alt="..."
              width="fit-content"
              height="100%"
              style={{ margin: "0 auto", display: "flex" }}
            />
          </Box>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default SlideSwiper
