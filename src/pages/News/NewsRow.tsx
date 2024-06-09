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
    <Grid container border={`1px solid ${borderColor}`} position="relative">
      <Grid item xs={3}>
        <Link to={detail.path} target="_blank">
          <img
            src={detail.photoLink}
            alt="IMG..."
            width="100%"
            height="100%"
            style={{ objectFit: "cover", flexShrink: 0 }}
          />
        </Link>
      </Grid>
      <Grid
        item
        sx={{
          height: 180,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "0.5rem 1rem",
        }}
      >
        <Link
          to={detail.path}
          target="_blank"
          style={{
            textDecoration: "none",
            color: "black",
            fontWeight: 400,
            marginBottom: "0.5rem",
            marginTop: "0.5rem",
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "1rem", sm: "1.5rem" },
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
            }}
          >
            {detail.name}
          </Typography>
        </Link>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 1,
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <Typography variant="body2" color="gray">
              {detail.category}
            </Typography>
            <Typography variant="body2" color="gray">
              {date}
            </Typography>
          </Box>
          <Typography
            component="a"
            variant="body1"
            color="gray"
            height="fit-content"
            sx={{ textDecoration: "none" }}
            href={detail.path}
            target="_blank"
          >
            Xem thêm
          </Typography>
        </div>
      </Grid>
    </Grid>
  )
}

export default NewsRow
