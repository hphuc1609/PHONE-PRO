import { Grid } from "@mui/material"
import NewsRow from "./NewsRow"
import { Helmet } from "react-helmet"

const newsList = [
  {
    name: "Đánh giá smartphone chip S660, RAM 8 GB, giá 6,99 triệu tại Việt Nam",
    photoLink: "../assets/images/news/news_1.jpg",
    category: "Doanh nghiệp",
    path: "https://doanhnghiepvn.vn/cong-nghe/danh-gia-smartphone-chip-s660-ram-8-gb-gia-6-99-trieu-tai-viet-nam/2018112603315443",
  },
  {
    name: "Khám phá smartphone màn hình gập được đầu tiên của Samsung",
    photoLink: "../assets/images/news/news_2.jpg",
    category: "Thanh niên",
    path: "https://thanhnien.vn/kham-pha-smartphone-man-hinh-gap-duoc-dau-tien-cua-samsung-185807113.htm",
  },
  {
    name: "Doanh số iPhone XS và iPhone XR thảm hại, Apple sản xuất lại iPhone X",
    photoLink: "../assets/images/news/news_3.jpg",
    category: "VOV",
    path: "https://vov.vn/cong-nghe/doanh-so-iphone-xs-va-iphone-xr-tham-hai-apple-san-xuat-lai-iphone-x-843717.vov",
  },
  {
    name: "Chiếc điện thoại thông minh này của LG sẽ có tới 16 Camera",
    photoLink: "../assets/images/news/news_4.jpg",
    category: "VietQ",
    path: "https://vietq.vn/chiec-dien-thoai-thong-minh-nay-cua-lg-se-co-toi-16-camera-d151674.html",
  },
  {
    name: "Những tiêu chí bạn không nên bỏ qua khi mua smartphone 2018",
    photoLink: "../assets/images/news/news_5.jpg",
    category: "Zing",
    path: "https://zingnews.vn/nhung-tieu-chi-ban-khong-nen-bo-qua-khi-mua-smartphone-2018-post894509.html",
  },
]

const NewsPage = () => {
  return (
    <>
      <Helmet>
        <title>Phone Pro | News</title>
        <meta name="description" content="Description of News Page ..." />
      </Helmet>

      <Grid container rowGap={2}>
        {newsList.map((item, index) => (
          <NewsRow key={index} detail={item} />
        ))}
      </Grid>
    </>
  )
}

export default NewsPage
