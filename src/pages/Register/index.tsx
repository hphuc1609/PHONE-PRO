import { yupResolver } from "@hookform/resolvers/yup"
import { LockOpen, Visibility, VisibilityOff } from "@mui/icons-material"
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Theme,
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
import * as yup from "yup"

const useStyles = makeStyles((theme: Theme) => ({
  icon: {
    backgroundColor: theme.palette.secondary.main,
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

const Register = ({
  createUserWithEmailAndPassword,
}: WrappedComponentProps) => {
  const classes = useStyles()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)

  const schema = yup.object().shape({
    email: yup
      .string()
      .required("Vui lòng nhập email")
      .email("Email không hợp lệ"),
    password: yup.string().required("Vui lòng nhập mật khẩu"),
    confirmPassword: yup
      .string()
      .required("Vui lòng nhập lại mật khẩu")
      .oneOf([yup.ref("password"), null], "Mật khẩu không khớp"),
  })

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const toogleShowPassword = () => {
    if (showPassword) {
      setShowPassword(false)
    } else {
      setShowPassword(true)
    }
  }

  const toogleShowPasswordConfirm = () => {
    if (showPasswordConfirm) {
      setShowPasswordConfirm(false)
    } else {
      setShowPasswordConfirm(true)
    }
  }

  const signUp = (email: string, password: string) => {
    try {
      const res: any = createUserWithEmailAndPassword(email, password)

      res.then((userCredential: any) => {
        if (userCredential.user) {
          toast.success("Đăng ký thành công", toastConfig)
          navigate("/")
        } else {
          toast.error(
            "Tài khoản đã tồn tại, vui lòng đăng ký lại !",
            toastConfig
          )
        }
      })
    } catch (error: any) {
      toast.error(error.message, toastConfig)
    }
  }

  const handleRegister = (data: FieldValues) => {
    const email = data.email
    const password = data.password

    signUp(email, password)
  }

  return (
    <Box display="flex" alignItems="center" marginBottom={10}>
      <Container maxWidth="xs">
        <Paper elevation={3} component="form" noValidate sx={{ p: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} mb={1}>
              <Box textAlign="center">
                <Box className={classes.icon}>
                  <LockOpen />
                </Box>
                <Typography variant="h5" fontWeight={500}>
                  Đăng ký miễn phí
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <FormInputText
                name="email"
                label="Email"
                control={control}
                error={errors}
                TextFieldProps={{
                  color: "secondary",
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
                  color: "secondary",
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
              <FormInputText
                name="confirmPassword"
                label="Xác nhận mật khẩu"
                control={control}
                error={errors}
                TextFieldProps={{
                  type: showPasswordConfirm ? "text" : "password",
                  color: "secondary",
                  InputProps: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password"
                          onClick={toogleShowPasswordConfirm}
                          edge="end"
                        >
                          {showPasswordConfirm ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
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
                color="secondary"
                onClick={handleSubmit(handleRegister)}
                sx={{
                  p: "8px",
                  color: "white",
                }}
                fullWidth
                disableElevation
              >
                Tạo tài khoản
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Typography mt={2}>
                Bạn đã có tài khoản?{" "}
                <Link
                  to="/login"
                  style={{ color: "blue", textDecoration: "none" }}
                >
                  Đăng nhập
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  )
}

export default createComponentWithAuth(Register)
