import { Box, Button } from "@mui/material"
import { Helmet } from "react-helmet"
import { useNavigate } from "react-router-dom"

const Page404 = () => {
  const navigate = useNavigate()

  const handleBackToHome = () => {
    navigate("/")
  }

  return (
    <>
      <Helmet>
        <title>Page 404</title>
        <meta name="description" content="Description of Page 404 ..." />
      </Helmet>

      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        flexDirection="column"
      >
        <div style={{ textAlign: "center", width: 500, height: 300 }}>
          <img
            src="../assets/404_page.png"
            alt="Not found"
            height="100%"
            width="100%"
            style={{ objectFit: "cover", flexShrink: 0 }}
            loading="lazy"
          />
        </div>
        <h1>404 - Trang không tồn tại</h1>
        <Button
          variant="contained"
          onClick={handleBackToHome}
          sx={{
            p: "0.8rem 1rem",
            borderRadius: "20rem",
            whiteSpace: "nowrap",
            width: "fit-content",
          }}
        >
          Quay lại trang chủ
        </Button>
      </Box>
    </>
  )
}

export default Page404
