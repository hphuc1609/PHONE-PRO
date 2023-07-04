import { Box, Grid, Typography } from "@mui/material"
import type { INewsItem } from "models/news"
import { Link } from "react-router-dom"
import { borderColor } from "styles/config"

interface Props {
  detail: INewsItem
}

const NewsRow = ({ detail }: Props) => {
  const generateRandomDate = () => {
    return new Date(+new Date() - Math.floor(Math.random() * 10000000000))
  }

  const date = generateRandomDate().toLocaleDateString()

  return (
    <Grid
      container
      columnGap={2}
      border={`1px solid ${borderColor}`}
      position="relative"
    >
      <Grid item xs={3}>
        <Link to={detail.path} target="_blank">
          <img src={detail.photoLink} alt="..." width="100%" height="100%" />
        </Link>
      </Grid>
      <Grid item xs={8}>
        <Link
          to={detail.path}
          target="_blank"
          style={{
            textDecoration: "none",
            color: "black",
            fontWeight: 400,
            fontSize: "1.4rem",
            marginBottom: "0.5rem",
            marginTop: "0.5rem",
            display: "block",
          }}
        >
          {detail.name}
        </Link>
        <Box display="flex">
          <Typography variant="body2" color="gray">
            {detail.category}
          </Typography>
          <Typography variant="body2" color="gray" ml={2}>
            {date}
          </Typography>
        </Box>
      </Grid>
      <Typography
        component="a"
        variant="body1"
        color="gray"
        height="fit-content"
        position="absolute"
        bottom={10}
        right={20}
        sx={{ textDecoration: "none" }}
        href={detail.path}
        target="_blank"
      >
        Xem thêm
      </Typography>
    </Grid>
  )
}

export default NewsRow
