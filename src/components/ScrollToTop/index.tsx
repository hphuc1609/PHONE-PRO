import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import { Fab } from "@mui/material"
import type { Theme } from "@mui/material/styles"
import { makeStyles } from "@mui/styles"

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    transition: "all 0.5s",
  },
}))

export const ScrollToTop = () => {
  const classes = useStyles()

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <Fab
      id="scroll-top"
      className={classes.root}
      color="primary"
      onClick={handleClick}
      size="medium"
    >
      <KeyboardArrowUpIcon />
    </Fab>
  )
}
