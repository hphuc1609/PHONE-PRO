import { Grid, Typography } from "@mui/material"
import { Helmet } from "react-helmet"

const IntroPage = () => {
  return (
    <>
      <Helmet>
        <title>Phone Pro - Giới thiệu</title>
        <meta name="description" content="Description of Introduce Page ..." />
      </Helmet>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography component="h1" variant="h4">
            Giới thiệu
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography component="p" variant="body1" textAlign="justify">
            Chúng tôi, <b>PhonePro</b>, là một trong những công ty hàng đầu
            trong lĩnh vực bán lẻ điện thoại di động. Với nhiều năm kinh nghiệm
            và tinh thần đổi mới liên tục, chúng tôi cam kết mang đến cho khách
            hàng những sản phẩm chất lượng cao cùng dịch vụ chuyên nghiệp và tin
            cậy. Với đội ngũ nhân viên nhiệt tình, chuyên nghiệp và tâm huyết,
            chúng tôi luôn cố gắng cung cấp cho khách hàng những sản phẩm và
            dịch vụ tốt nhất. Chúng tôi cung cấp một loạt các sản phẩm điện
            thoại di động từ các thương hiệu hàng đầu trong ngành, đảm bảo mang
            đến sự lựa chọn đa dạng và phù hợp với mọi nhu cầu của khách hàng.
            Tại <b>PhonePro</b>, chúng tôi không chỉ bán các sản phẩm điện thoại
            di động, chúng tôi còn cung cấp các dịch vụ hậu mãi tuyệt vời như
            sửa chữa, bảo hành, tư vấn và hỗ trợ khách hàng với các vấn đề liên
            quan đến sản phẩm. Điều này giúp chúng tôi tạo được niềm tin và sự
            tín nhiệm từ khách hàng trong nhiều năm qua. Chúng tôi luôn cập nhật
            và thích ứng với xu hướng mới nhất của thị trường, đem đến những sản
            phẩm và dịch vụ hiện đại và tiên tiến nhất cho khách hàng. Chúng tôi
            cũng cam kết luôn giữ giá cả cạnh tranh và phù hợp với khách hàng.{" "}
            <b>PhonePro</b> luôn sẵn sàng đáp ứng mọi yêu cầu của khách hàng, và
            mong muốn trở thành đối tác tin cậy của mọi khách hàng trong lĩnh
            vực điện thoại di động. Hãy đến với chúng tôi và trải nghiệm sự khác
            biệt của dịch vụ chuyên nghiệp và sản phẩm chất lượng.
          </Typography>
        </Grid>
      </Grid>
    </>
  )
}
export default IntroPage
