import { Backdrop, CircularProgress, Typography } from "@mui/material"

interface Props {
  open: boolean
}

const LoadingWithBackdrop = ({ open }: Props) => {
  return (
    <Backdrop
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        display: "flex",
        flexDirection: "column",
        rowGap: 2,
      }}
      open={open}
    >
      <CircularProgress color="primary" size={60} />
      <Typography variant="body1" color="white">
        Đang tải dữ liệu...
      </Typography>
    </Backdrop>
  )
}

export default LoadingWithBackdrop
