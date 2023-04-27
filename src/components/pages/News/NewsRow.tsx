import { Box, Grid, Typography } from "@mui/material"
import type { INewsItem } from "models/newsItem"

interface Props {
  detail: INewsItem
}

const NewsRow = ({ detail }: Props) => {
  return (
    <Grid container columnSpacing={2}>
      <Grid item xs={3}>
        <Box>
          <img src={detail.photoLink} alt="..." />
        </Box>
      </Grid>
      <Grid item xs={9}>
        <Box>
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
          <Typography variant="body2" color="gray" gutterBottom>
            {detail.category}
          </Typography>
          <Typography variant="body2" color="gray">
            {detail.date}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  )
}

export default NewsRow
