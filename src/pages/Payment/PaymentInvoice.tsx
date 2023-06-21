import { ExpandLess, ExpandMore, MailOutline } from "@mui/icons-material"
import {
  Box,
  Button,
  Collapse,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Theme,
  Typography,
} from "@mui/material"
import { makeStyles } from "@mui/styles"
import NumberFormat from "components/common/NumberFormat"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { WrappedComponentProps } from "react-with-firebase-auth"

const useStyles = makeStyles((theme: Theme) => ({
  text: {
    padding: theme.spacing(0.3, 2),
    color: theme.palette.text.secondary,
  },
  background: {
    height: 100,
    backgroundImage:
      "url(https://www.npd.com/wp-content/uploads/2021/05/mobile-banner-1440x480.jpeg)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    mt: 2,
  },
}))

interface InvoiceProps {
  orderCode: string
  handlePrint: () => void
  showButton: boolean
  setIsShow: Dispatch<SetStateAction<boolean>>
  user: WrappedComponentProps["user"]
}

const Invoice = ({
  orderCode,
  handlePrint,
  showButton,
  setIsShow,
  user,
}: InvoiceProps) => {
  const classes = useStyles()
  const navigate = useNavigate()

  const [open, setOpen] = useState(true)
  const [fullName, setFullName] = useState<string>()
  const [phone, setPhone] = useState<string>()
  const [address, setAddress] = useState<string>()
  const [detail, setDetail] = useState<any>()
  const [totalPrice, setTotalPrice] = useState<number>(0)

  useEffect(() => {
    setFullName(localStorage.getItem("FullName"))
    setPhone(localStorage.getItem("Phone"))
    setAddress(localStorage.getItem("Address"))
    setDetail(JSON.parse(localStorage.getItem("Items")))
    setTotalPrice(JSON.parse(localStorage.getItem("Total")))

    return () => {
      setFullName("")
      setPhone("")
      setAddress("")
      setDetail([])
      setTotalPrice(0)
    }
  }, [])

  const handleClickPrint = () => {
    setIsShow(false)

    setTimeout(() => {
      handlePrint()
    }, 200)
    setTimeout(() => {
      setIsShow(true)
    }, 1300)
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={0} sx={{ border: "1px solid #cccc", p: 2 }}>
        <Typography
          textAlign="center"
          fontWeight={500}
          variant="h6"
          color="GrayText"
          gutterBottom
        >
          Cảm ơn bạn vì đã lựa chọn chúng tôi !
        </Typography>

        <Box className={classes.background}>
          <Box>
            <Typography
              variant="h6"
              color="yellowgreen"
              fontWeight={400}
              textAlign="center"
            >
              Hân hạnh được phục vụ
            </Typography>
            <Typography
              variant="h6"
              color="#ccc"
              fontWeight={300}
              textAlign="center"
            >
              Hẹn sớm gặp lại bạn
            </Typography>
          </Box>
        </Box>

        <Typography mt={2}>Thông tin đơn hàng</Typography>
        <Divider />
        <List>
          <ListItem className={classes.text}>Mã đơn hàng {orderCode}</ListItem>
          <ListItem className={classes.text}>
            Người nhận: {fullName || user?.displayName}
          </ListItem>
          <ListItem className={classes.text}>Số điện thoại: {phone}</ListItem>
          <ListItem className={classes.text}>Địa chỉ: {address}</ListItem>

          {/* Đơn hàng */}
          <ListItemButton sx={{ py: 0 }} onClick={() => setOpen(!open)}>
            <ListItemText sx={{ color: "GrayText" }} primary="Đơn hàng" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              sx={{
                display: "flex",
                justifyContent: "space-around",
                bgcolor: "#f5f5f5",
              }}
            >
              <Grid container>
                {detail?.map((item: any) => (
                  <Grid item xs={12}>
                    <ListItem key={item.id} divider>
                      <ListItemText
                        sx={{ textAlign: "center" }}
                        primary={item.title}
                      />
                      <ListItemText
                        primary={`x${item.quantity}`}
                        sx={{ textAlign: "end" }}
                      />
                      <ListItemText
                        sx={{ textAlign: "end" }}
                        primary={<NumberFormat value={item.price} />}
                      />
                    </ListItem>
                  </Grid>
                ))}
              </Grid>
            </List>
          </Collapse>

          <ListItem className={classes.text}>
            <ListItemText primary="Tổng tiền" />
            <ListItemText
              sx={{ textAlign: "end" }}
              primary={<NumberFormat value={totalPrice} />}
            />
          </ListItem>
          <ListItem className={classes.text}>
            <ListItemText primary="Thanh toán" />
            <ListItemText
              sx={{ textAlign: "end" }}
              primary={<NumberFormat value={totalPrice} />}
            />
          </ListItem>
        </List>

        <Typography>Phương thức thanh toán</Typography>
        <Divider />
        <Box display="flex" alignItems="center">
          <img src="../assets/PayCash.png" alt="" width={35} />
          <Typography fontWeight={300} color="GrayText">
            Thanh toán khi nhận hàng
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" columnGap={1}>
          <MailOutline color="action" />
          <Typography variant="body2" color="GrayText" fontWeight={300}>
            Chúng tôi sẽ gửi tin nhắn xác nhận qua email: {user?.email}
          </Typography>
        </Box>

        {showButton && (
          <>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              disableElevation
              sx={{ p: 1, mt: 3 }}
              onClick={() => navigate("/")}
            >
              Tiếp tục mua hàng
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              disableElevation
              sx={{ p: 1, mt: 1 }}
              onClick={handleClickPrint}
            >
              Xuất hóa đơn
            </Button>
          </>
        )}
      </Paper>
    </Container>
  )
}

export default Invoice
