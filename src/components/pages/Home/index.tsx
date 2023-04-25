import styled from "@emotion/styled"
import { ArrowRightOutlined } from "@mui/icons-material"
import { Grid, Typography } from "@mui/material"
import ProductListRow from "components/ProductListRow"
import SlideSwiper from "components/Swiper"
import { Link } from "react-router-dom"
import { companyList } from "utils/CompanyList"

const DropDown = styled(Grid)`
  display: flex;
  border: 1px solid ${({ theme }: any) => theme.palette.primary.main};
  padding: 8px 10px;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 5px;
`

const Home = () => {
  return (
    <>
      <SlideSwiper />
      <Grid container spacing={1} justifyContent="center" marginTop={2}>
        {companyList.map((item, index) => (
          <Grid
            item
            xs={0}
            key={index}
            sx={{
              "&.MuiGrid-root": {
                transition: "all ease 0.3s ",
                "&:hover": {
                  transform: "scale(1.1)",
                },
              },
            }}
          >
            <Link to={`company=${item.path}`} style={{ display: "block" }}>
              <img src={item.image} alt={item.name} height={33} width={150} />
            </Link>
          </Grid>
        ))}
      </Grid>

      <Grid container justifyContent="center" mt={5} mb={2}>
        <DropDown item xs={0}>
          <Typography>Giá tiền</Typography>
          <ArrowRightOutlined color="primary" />
        </DropDown>
        <DropDown item xs={0}>
          <Typography>Khuyến mãi</Typography>
          <ArrowRightOutlined color="primary" />
        </DropDown>
        <DropDown item xs={0}>
          <Typography>Số lượng sao</Typography>
          <ArrowRightOutlined color="primary" />
        </DropDown>
        <DropDown item xs={0}>
          <Typography>Sắp xếp</Typography>
          <ArrowRightOutlined color="primary" />
        </DropDown>
      </Grid>

      <ProductListRow title={""} icon={undefined} />
    </>
  )
}

export default Home
