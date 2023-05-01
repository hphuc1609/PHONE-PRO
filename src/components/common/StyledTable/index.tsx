import { TableCell, TableRow } from "@mui/material"
import { withStyles } from "@mui/styles"

export const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#333",
    color: theme.palette.common.white,
    fontSize: 15,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell)

export const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(even)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  },
}))(TableRow)
