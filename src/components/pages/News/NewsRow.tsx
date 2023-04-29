import { Box, Grid, Typography } from "@mui/material"
import type { INewsItem } from "models/news"

interface Props {
  detail: INewsItem
}

const NewsRow = ({ detail }: Props) => {
  const generateRandomDate = () => {
    return new Date(+new Date() - Math.floor(Math.random() * 10000000000))
  }

  var date = generateRandomDate().toLocaleDateString("en-US")

  return (
    <Grid container border="1px solid #cccc">
      <Grid item xs={3}>
        <Box component="a" href={detail.path}>
          <img
            src={detail.photoLink}
            alt="..."
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        </Box>
      </Grid>
      <Grid item ml={2}>
        <Typography
          component="a"
          href={detail.path}
          variant="h6"
          sx={{ textDecoration: "none" }}
          color="inherit"
          gutterBottom
        >
          {detail.name}
        </Typography>
        <Box display="flex">
          <Typography variant="body2" color="gray">
            {detail.category}
          </Typography>
          <Typography variant="body2" color="gray" ml={2}>
            {date}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  )
}

export default NewsRow
