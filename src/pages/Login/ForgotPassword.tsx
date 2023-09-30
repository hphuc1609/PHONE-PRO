import { yupResolver } from "@hookform/resolvers/yup"
import {
  CheckCircleOutlined,
  KeyboardArrowLeft,
  Mail,
} from "@mui/icons-material"
import { Box, Button, Container, Paper, Typography } from "@mui/material"
import { firebaseAppAuth } from "Firebase/firebaseConfig"
import FormInputText from "components/common/FormInput/FormInputText"
import { toastConfig } from "configs/toast"
import { useState } from "react"
import { FieldValues, useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import * as yup from "yup"

const ForgotPassword = () => {
  const heightBrowser = window.innerHeight
  const [isResetPassword, setIsResetPassword] = useState(false)

  const schema = yup.object().shape({
    email: yup
      .string()
      .required("Vui lòng nhập email")
      .email("Email không hợp lệ"),
  })

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const passwordReset = (email: string) => {
    return firebaseAppAuth.sendPasswordResetEmail(email)
  }

  const onSubmit = async (data: FieldValues) => {
    try {
      await passwordReset(data.email)
      setIsResetPassword(true)
    } catch (error: any) {
      if (error.code === "auth/user-not-found") {
        toast.error("Email không tồn tại, vui lòng thử lại!", toastConfig)
      } else if (error.code === "auth/too-many-requests") {
        toast.error(
          "Bạn đã gửi quá nhiều lần, vui lòng gửi lại sau!",
          toastConfig
        )
      } else toast.error(error.message, toastConfig)
    }
  }

  return (
    <div>
      {isResetPassword ? (
        <Box
          height={`calc(${heightBrowser}px - 308px)`}
          display="flex"
          alignItems="center"
        >
          <Container maxWidth="xs">
            <Paper elevation={3} sx={{ textAlign: "center", px: 3, py: 5 }}>
              <CheckCircleOutlined fontSize="large" color="secondary" />
              <Typography textAlign="center">
                Chúng tôi đã gửi đặt lại mật khẩu về email, vui lòng kiểm tra
                hộp thư của bạn.
              </Typography>
            </Paper>
          </Container>
        </Box>
      ) : (
        <Container maxWidth="sm">
          <Paper elevation={3} sx={{ px: 8, py: 3 }}>
            <Box textAlign="center">
              <img
                src="./assets/change-password.png"
                alt=""
                width="fit-content"
                height="100"
              />
              <Typography variant="h5" fontWeight={500} gutterBottom>
                Quên mật khẩu
              </Typography>
              <Typography mb={2}>
                Vui lòng nhập email đăng ký của bạn, chúng tôi sẽ gửi cho bạn
                một email để đặt lại mật khẩu của bạn !
              </Typography>
            </Box>

            <FormInputText
              name="email"
              label=""
              control={control}
              error={errors}
              TextFieldProps={{
                placeholder: "user@gmail.com",
                size: "small",
                InputProps: {
                  startAdornment: (
                    <Box sx={{ mr: 1, display: "flex", my: "auto" }}>
                      <Mail color="action" />
                    </Box>
                  ),
                },
              }}
            />
            <Button
              variant="contained"
              type="submit"
              onClick={handleSubmit(onSubmit)}
              sx={{ mt: 2 }}
              fullWidth
            >
              Xác nhận
            </Button>
          </Paper>
        </Container>
      )}
      <Link
        to="/login"
        style={{
          textDecoration: "none",
          color: "GrayText",
          fontSize: 15,
          marginTop: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <KeyboardArrowLeft fontSize="small" />
        Trở về đăng nhập
      </Link>
    </div>
  )
}

export default ForgotPassword
