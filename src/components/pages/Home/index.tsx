import { ArrowRightOutlined, Whatshot } from "@mui/icons-material"
import { Grid, Typography, styled } from "@mui/material"
import ProductListRow from "components/ProductListRow"
import SlideSwiper from "components/Banner"
import { dataProducts } from "components/data/apiProducts"
import { Link } from "react-router-dom"
import { companyList } from "utils/CompanyList"

const DropDown = styled(Grid)`
  display: flex;
  border: 1px solid ${({ theme }) => theme.palette.primary.main};
  padding: 8px 10px;
  border-radius: 5px;
  cursor: pointer;
`

const Home = () => {
  return (
    <>
      <SlideSwiper />
      <Grid
        container
        spacing={1}
        marginTop={2}
        display={{ xs: "none", md: "flex" }}
        justifyContent="center"
      >
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

      <Grid
        container
        columnGap={1}
        justifyContent="center"
        mt={5}
        display={{ xs: "none", md: "flex" }}
      >
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

      <ProductListRow
        title="Sản phẩm nổi bật"
        icon={<Whatshot color="error" />}
        products={dataProducts}
      />
      <ProductListRow title="Sản phẩm mới" icon={<Whatshot color="error" />} />
      <ProductListRow title="Trả góp 0%" icon={<Whatshot color="error" />} />
      <ProductListRow title="Giảm giá sốc" icon={<Whatshot color="error" />} />
    </>
  )
}

export default Home
