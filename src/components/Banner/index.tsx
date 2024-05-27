import { Box, Theme, useMediaQuery } from "@mui/material"
import { Autoplay, Pagination } from "swiper"
import "swiper/css/pagination"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/swiper.css"

const slideShow = [
  "../assets/images/banner/banner1.png",
  "../assets/images/banner/banner2.png",
  "../assets/images/banner/banner3.png",
  "../assets/images/banner/banner4.png",
  "../assets/images/banner/banner5.png",
  "../assets/images/banner/banner6.png",
  "../assets/images/banner/banner7.png",
  "../assets/images/banner/banner8.png",
  "../assets/images/banner/banner9.png",
  // "../assets/images/banner/banner0.gif",
]

const SlideSwiper = () => {
  const smallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  )

  return (
    <Swiper
      slidesPerView={smallScreen ? 1 : 2}
      spaceBetween={smallScreen ? 0 : 400}
      pagination={{ clickable: true }}
      autoplay={{ disableOnInteraction: false }}
      loop={slideShow.length > 2}
      grabCursor={true}
      modules={[Autoplay, Pagination]}
    >
      {slideShow.map((item) => (
        <SwiperSlide key={item}>
          <Box paddingTop={smallScreen && 8} height={{ xs: 200, md: 300 }}>
            <img
              src={item}
              alt="IMG..."
              width={smallScreen ? "100%" : "fit-content"}
              height="100%"
              loading="lazy"
            />
          </Box>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default SlideSwiper
