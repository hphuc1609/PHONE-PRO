import { yupResolver } from "@hookform/resolvers/yup"
import { LockOutlined, Visibility, VisibilityOff } from "@mui/icons-material"
import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Typography,
} from "@mui/material"
import { makeStyles } from "@mui/styles"
import { createComponentWithAuth } from "Firebase/firebaseConfig"
import FormInputText from "components/common/FormInput/FormInputText"
import { toastConfig } from "configs/toast"
import { useState } from "react"
import { FieldValues, useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { WrappedComponentProps } from "react-with-firebase-auth"
import { primaryDark } from "styles/config"
import * as yup from "yup"

const useStyles = makeStyles(() => ({
  icon: {
    backgroundColor: primaryDark,
    display: "flex",
    alignItems: "center",
    width: "fit-content",
    color: "white",
    borderRadius: "50%",
    margin: "0 auto",
    marginBottom: 10,
    padding: 8,
  },
}))

interface LoginForm {
  email: string
  password: string
  [key: string]: any
}

const Login = ({ signInWithEmailAndPassword }: WrappedComponentProps) => {
  const classes = useStyles()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [errorAlert, setErrorAlert] = useState("")
  const [loading, setLoading] = useState(false)

  const schema = yup.object().shape({
    email: yup
      .string()
      .required("Vui lòng nhập email")
      .email("Email không hợp lệ"),
    password: yup.string().required("Vui lòng nhập mật khẩu"),
  })

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver(schema),
    defaultValues: { email: "", password: "" },
  })

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleLogin = (data: FieldValues) => {
    const { email, password } = data as LoginForm

    if (loading) return
    try {
      const result: any = signInWithEmailAndPassword(email, password)
      setLoading(true)
      result.then((userCredential: any) => {
        if (userCredential.user) {
          toast.success("Đăng nhập thành công!", toastConfig)
          navigate("/")
        } else if (userCredential.code === "auth/user-not-found") {
          setErrorAlert("Email không tồn tại!")
        } else if (userCredential.code === "auth/wrong-password") {
          setErrorAlert("Mật khẩu không chính xác!")
        } else {
          setErrorAlert(
            "Có lỗi xảy ra, vui lòng kiểm tra kết nối mạng và thử lại!"
          )
        }
      })
    } catch (error: any) {
      toast.error(error.message, toastConfig)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box display="flex" alignItems="center" marginBottom={10}>
      <Container maxWidth="xs">
        <Paper elevation={3} component="form" noValidate sx={{ p: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} mb={1}>
              <Box textAlign="center">
                <Box className={classes.icon}>
                  <LockOutlined />
                </Box>
                <Typography variant="h5" fontWeight={500}>
                  Đăng nhập
                </Typography>
              </Box>
            </Grid>
            {errorAlert && (
              <Grid item md={12}>
                <Alert severity="error" style={{ alignItems: "center" }}>
                  {errorAlert}
                </Alert>
              </Grid>
            )}
            <Grid item xs={12}>
              <FormInputText
                name="email"
                label="Email"
                control={control}
                error={errors}
                TextFieldProps={{ autoFocus: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputText
                name="password"
                label="Mật khẩu"
                control={control}
                error={errors}
                TextFieldProps={{
                  type: showPassword ? "text" : "password",
                  InputProps: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password"
                          onClick={toggleShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                onClick={handleSubmit(handleLogin)}
                sx={{ p: "8px", bgcolor: primaryDark, mb: 2 }}
                fullWidth
                disableElevation
              >
                Đăng nhập
              </Button>

              <Link
                to="/forgot-password"
                style={{ color: "blue", textDecoration: "none" }}
              >
                Quên mật khẩu?
              </Link>
              <Typography mt={2}>
                Bạn chưa có tài khoản?
                <Link
                  to="/register"
                  style={{
                    color: "blue",
                    textDecoration: "none",
                    marginLeft: 5,
                  }}
                >
                  Đăng ký ngay
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  )
}
export default createComponentWithAuth(Login)
