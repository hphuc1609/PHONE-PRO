import { Grid } from "@mui/material"
import NewsRow from "./NewsRow"
import { Helmet } from "react-helmet"

const newsList = [
  {
    name: "Đánh giá smartphone chip S660, RAM 8 GB, giá 6,99 triệu tại Việt Nam",
    photoLink:
      "https://cdn.tgdd.vn/Files/2021/10/13/1406215/oppo-a95-1-800x450.jpg",
    category: "Doanh nghiệp",
    date: "1 ngày trước",
    path: "",
  },
  {
    name: "Khám phá smartphone màn hình gập được đầu tiên của Samsung",
    photoLink:
      "https://cdn.tgdd.vn/Files/2021/10/13/1406215/oppo-a95-1-800x450.jpg",
    category: "Thanh niên",
    date: "6 giờ",
    path: "",
  },
  {
    name: "Doanh số iPhone XS và iPhone XR thảm hại, Apple sản xuất lại iPhone X",
    photoLink:
      "https://cdn.tgdd.vn/Files/2021/10/13/1406215/oppo-a95-1-800x450.jpg",
    category: "VOV",
    date: "6 giờ",
    path: "",
  },
  {
    name: "Chiếc điện thoại thông minh này của LG sẽ có tới 16 Camera",
    photoLink:
      "https://cdn.tgdd.vn/Files/2021/10/13/1406215/oppo-a95-1-800x450.jpg",
    category: "VietQ",
    date: "13 giờ",
    path: "",
  },
  {
    name: "Những tiêu chí bạn không nên bỏ qua khi mua smartphone 2018",
    photoLink:
      "https://cdn.tgdd.vn/Files/2021/10/13/1406215/oppo-a95-1-800x450.jpg",
    category: "Zing",
    date: "9 giờ",
    path: "",
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
