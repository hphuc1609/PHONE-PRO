import { Box, useMediaQuery } from "@mui/material"
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

const BannerSwipe = () => {
  const smallScreen = useMediaQuery("( max-width: 640px )")

  return (
    <>
      <Swiper
        slidesPerView={smallScreen ? 1 : 2}
        spaceBetween={10}
        pagination={{ clickable: true }}
        autoplay={{ disableOnInteraction: false }}
        loop={slideShow.length > 2}
        grabCursor={true}
        modules={[Autoplay, Pagination]}
      >
        {slideShow.map((item) => (
          <SwiperSlide key={item}>
            <Box height={"fit-content"} width={"100%"}>
              <img
                src={item}
                alt="IMG..."
                width="100%"
                height="100%"
                loading="lazy"
                style={{ objectFit: "contain", flexShrink: 0 }}
              />
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
      <Box width="100%">
        <img
          src="../assets/blackFriday.gif"
          alt="img..."
          width="100%"
          height="100%"
          style={{ objectFit: "fill" }}
        />
      </Box>
    </>
  )
}

export default BannerSwipe
