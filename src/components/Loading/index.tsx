import { Backdrop, CircularProgress, Typography } from "@mui/material"
import { primaryDark } from "styles/config"

interface Props {
  open: boolean
}

const Loading = ({ open }: Props) => {
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
        Loading...
      </Typography>
      {/* <img
        width={100}
        height={100}
        src="../assets/Loading.gif"
        alt="Loading..."
      /> */}
    </Backdrop>
  )
}

export default Loading
