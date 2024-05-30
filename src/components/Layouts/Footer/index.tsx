import { Box, Theme, Typography } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { Link } from "react-router-dom"

const useStyles = makeStyles((theme: Theme) => ({
  textLink: {
    color: theme.palette.text.secondary,
    textDecoration: "none",

    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
}))

const Footer = () => {
  const classes = useStyles()
  return (
    <Box
      component={"footer"}
      textAlign="center"
      p={2}
      bgcolor="#f0f0f0"
      display="flex"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
    >
      <p
        style={{ display: "flex", gap: 20, color: "#1119", margin: "0 0 10px" }}
      >
        <Link to="/gioi-thieu" className={classes.textLink}>
          Về Chúng Tôi
        </Link>{" "}
        |
        <Link to="/" className={classes.textLink}>
          Chính Sách Bảo Mật
        </Link>{" "}
        |
        <Link to="/" className={classes.textLink}>
          Điều Khoản Sử Dụng
        </Link>{" "}
        |
        <Link to="/lien-he" className={classes.textLink}>
          Liên Hệ
        </Link>
      </p>
      <Typography
        color="inherit"
        display="flex"
        gap={0.5}
        variant="body2"
        alignItems={"center"}
      >
        © {new Date().getFullYear()}
        <span className={classes.textLink} style={{ color: "inherit" }}>
          PhonePro.
        </span>
        <span>Bảo lưu mọi quyền. Thiết kế bởi Phúc Lưu</span>
      </Typography>
    </Box>
  )
}

export default Footer
