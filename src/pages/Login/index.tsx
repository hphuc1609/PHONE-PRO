import { yupResolver } from "@hookform/resolvers/yup"
import { LockOutlined, Visibility, VisibilityOff } from "@mui/icons-material"
import {
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
import FormInputText from "components/common/FormInput/FormInputText"
import { toastConfig } from "configs/toast"
import { createComponentWithAuth } from "Firebase/firebaseConfig"
import { useEffect, useState } from "react"
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

const Login = ({ signInWithEmailAndPassword }: WrappedComponentProps) => {
  const classes = useStyles()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  // const [isShrink, setIsShrink] = useState(false)

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
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  })

  // const watchFieldPassword = watch("password")
  // useEffect(() => {
  //   if (watchFieldPassword !== "") {
  //     setIsShrink(true)
  //   } else {
  //     setIsShrink(false)
  //   }
  // }, [watchFieldPassword])

  const toogleShowPassword = () => {
    if (showPassword) {
      setShowPassword(false)
    } else {
      setShowPassword(true)
    }
  }

  const signIn = (email: string, password: string) => {
    try {
      const res: any = signInWithEmailAndPassword(email, password)

      res.then((userCredential: any) => {
        if (userCredential.user) {
          toast.success("Đăng nhập thành công", toastConfig)
          navigate("/")
        } else {
          toast.error(
            "Email hoặc mật khẩu không đúng, vui lòng thử lại !",
            toastConfig
          )
        }
      })
    } catch (error: any) {
      toast.error(error.message, toastConfig)
    }
  }

  const onSubmit = (data: FieldValues) => {
    const email = data.email
    const password = data.password

    signIn(email, password)
  }

  return (
    <Box display="flex" alignItems="center">
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

            <Grid item xs={12}>
              <FormInputText
                name="email"
                label="Tài khoản"
                control={control}
                error={errors}
                TextFieldProps={{
                  autoFocus: true,
                  placeholder: "Nhập vào email",
                }}
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
                  // InputLabelProps: { shrink: isShrink },
                  InputProps: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password"
                          onClick={toogleShowPassword}
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
                onClick={handleSubmit(onSubmit)}
                sx={{ p: "8px", bgcolor: primaryDark, mb: 2 }}
                fullWidth
                disableElevation
              >
                Đăng nhập
              </Button>
              <Typography mt={2}>
                Chưa có tài khoản?{" "}
                <Link
                  to="/register"
                  style={{ color: "blue", textDecoration: "none" }}
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
