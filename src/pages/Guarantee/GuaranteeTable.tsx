import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material"
import { StyledTableCell, StyledTableRow } from "components/common/StyledTable"
import { storeApi } from "data/storeApi"

const TableDetail = () => {
  const handleClick = (value: string) => {
    window.open(`https://maps.google.com/maps?q=${value}`, "_blank")
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Num</StyledTableCell>
              <StyledTableCell align="center">Địa chỉ</StyledTableCell>
              <StyledTableCell align="center">Điện thoại</StyledTableCell>
              <StyledTableCell align="center">Thời gian</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {storeApi.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell align="center">{index + 1}</StyledTableCell>
                <StyledTableCell
                  align="center"
                  onClick={() => handleClick(row[0])}
                  sx={{
                    "&:hover": {
                      cursor: "pointer",
                      color: (theme) => theme.palette.error.light,
                    },
                  }}
                >
                  {row[0]}
                </StyledTableCell>
                <StyledTableCell align="center">{row[1]}</StyledTableCell>
                <StyledTableCell align="center">{row[2]}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default TableDetail
