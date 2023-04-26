import { Box, Button, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"

const Page404 = () => {
  const navigate = useNavigate()

  const handleBackToHome = () => navigate("/")

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      flexDirection="column"
    >
      <img src="../assets/404_page.png" alt="..." height={500} />
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
  )
}

export default Page404
