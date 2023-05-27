import { yupResolver } from "@hookform/resolvers/yup"
import {
  EditOutlined,
  HeadsetMic,
  LocalShipping,
  Loop,
  VerifiedUser,
} from "@mui/icons-material"
import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Typography,
} from "@mui/material"
import { makeStyles } from "@mui/styles"
import { createComponentWithAuth } from "Firebase/firebaseConfig"
import AlertDialog from "components/common/Dialog"
import NumberFormat from "components/common/NumberFormat"
import firebase from "firebase"
import { useState } from "react"
import { FieldValues, useForm } from "react-hook-form"
import { WrappedComponentProps } from "react-with-firebase-auth"
import * as yup from "yup"
import ModalProfileForm from "./ModalWithForm"
import { toast } from "react-toastify"
import { toastConfig } from "configs/toast"

const useStyles = makeStyles(() => ({
  row: {
    display: "flex",
    alignItems: "center",
    marginBottom: 5,
  },
  title: {
    fontWeight: 500,
  },

  ensured: {
    height: 100,
    display: "flex",
    justifyContent: "space-around",
    borderTop: "1px solid gray",
    background: "#F1F6F9",
    margin: "64px -40px -40px",
    padding: 40,
  },
  text: {
    display: "flex",
    alignItems: "center",
    gap: 20,
  },
}))

const Profile = ({ user }: WrappedComponentProps) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)

  const getTotalItems = localStorage.getItem("TotalCart")
  const getTotalPrice = localStorage.getItem("TotalPrice")
  const totalPriceTemp = JSON.parse(getTotalPrice)

  const schema = yup.object().shape({
    newPassword: yup.string().required("Vui lòng điền vào trường này"),
    newPasswordConfirm: yup
      .string()
      .required("Vui lòng điền vào trường này")
      .oneOf([yup.ref("newPassword"), null], "Mật khẩu không khớp"),
  })

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  })

  const handleClose = () => {
    setOpen(false)
    reset()
  }

  const handleUpdatePassword = async (data: FieldValues) => {
    const user = firebase.auth().currentUser
    user
      .updatePassword(data.newPassword)
      .then(() => {
        toast.success("Cập nhật mật khẩu thành công!", toastConfig)
        setOpen(false)
        reset()
      })
      .catch((error) => {
        toast.error("Mật khẩu ít nhất có 6 kí tự", toastConfig)
      })
  }

  return (
    <>
      <Container maxWidth="xs">
        <Paper elevation={0} sx={{ bgcolor: "#f8f8f8", p: 3 }}>
          <Typography
            variant="h5"
            textAlign="center"
            fontWeight={600}
            textTransform="uppercase"
            mb={2}
          >
            Thông tin khách hàng
          </Typography>
          {user?.displayName && (
            <Box className={classes.row}>
              <Typography className={classes.title}>Họ tên:</Typography>
              <Typography ml={1}>{user?.displayName}</Typography>
            </Box>
          )}
          <Box className={classes.row}>
            <Typography className={classes.title}>Tài khoản:</Typography>
            <Typography ml={1}>{user?.email}</Typography>
          </Box>
          <Box className={classes.row}>
            <Typography className={classes.title}>Mật khẩu:</Typography>
            <Box className={classes.row}>
              <Button
                color="inherit"
                sx={{ textTransform: "inherit", p: 0, ml: 1 }}
                onClick={() => setOpen(true)}
              >
                <EditOutlined fontSize="small" />
                <Typography>Đổi mật khẩu</Typography>
              </Button>
            </Box>
          </Box>
          <Divider />

          <Box className={classes.row} mt={2}>
            <Typography className={classes.title}>Tổng tiền đã mua:</Typography>
            <NumberFormat TextProps={{ ml: 1 }} value={totalPriceTemp} />
          </Box>
          <Box className={classes.row}>
            <Typography className={classes.title}>
              Số lượng sản phẩm đã mua:
            </Typography>
            <Typography ml={1}>{getTotalItems || 0}</Typography>
          </Box>
        </Paper>
      </Container>

      <Box className={classes.ensured}>
        <Box className={classes.text}>
          <LocalShipping fontSize="large" color="secondary" />
          Giao hàng hỏa tốc trong 1 giờ
        </Box>
        <Box className={classes.text}>
          <VerifiedUser fontSize="large" color="secondary" />
          Hàng chính hãng 100%
        </Box>
        <Box className={classes.text}>
          <HeadsetMic fontSize="large" color="secondary" />
          Hotline hỗ trợ 1234.5678
        </Box>
        <Box className={classes.text}>
          <Loop fontSize="large" color="secondary" />
          Thủ tục đổi trả dễ dàng
        </Box>
      </Box>

      <AlertDialog
        open={open}
        title="Cập nhật mật khẩu"
        content={<ModalProfileForm control={control} error={errors} />}
        handleClose={handleClose}
        leftButton="Đóng"
        onClickLeftButton={handleClose}
        rightButton="Xác nhận"
        onClickRightButton={handleSubmit(handleUpdatePassword)}
      />
    </>
  )
}

export default createComponentWithAuth(Profile)
