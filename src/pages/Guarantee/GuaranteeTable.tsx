import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material"
import { StyledTableCell, StyledTableRow } from "components/common/StyledTable"
import { guarantee } from "utils/guarantee"

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
              <StyledTableCell align="center">STT</StyledTableCell>
              <StyledTableCell align="center">Địa chỉ</StyledTableCell>
              <StyledTableCell align="left">Điện thoại</StyledTableCell>
              <StyledTableCell align="center">Thời gian</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {guarantee.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell align="center">{index + 1}</StyledTableCell>
                <StyledTableCell
                  align="left"
                  onClick={() => handleClick(row[0])}
                  sx={{
                    "&:hover": {
                      cursor: "pointer",
                      color: (theme) => theme.palette.primary.main,
                    },
                  }}
                >
                  {row[0]}
                </StyledTableCell>
                <StyledTableCell align="left">{row[1]}</StyledTableCell>
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
