import emailjs from "@emailjs/browser"
import { yupResolver } from "@hookform/resolvers/yup"
import { CheckCircleOutline } from "@mui/icons-material"
import { Box, Button, Divider, Grid, Typography } from "@mui/material"
import AlertDialog from "components/common/Dialog"
import FormInputText from "components/common/FormInput/FormInputText"
import { useState } from "react"
import { FieldValues, useForm } from "react-hook-form"
import * as yup from "yup"

const config = {
  service_id: import.meta.env.VITE_SERVICE_ID,
  template_id: import.meta.env.VITE_TEMPLATE_ID,
  user_id: import.meta.env.VITE_EMAIL_KEY,
}

const FormContact = () => {
  const [open, setOpen] = useState(false)

  const schema = yup.object().shape({
    fullName: yup.string().required("Vui lòng điền vào trường này"),
    phone: yup
      .string()
      .matches(/^[0-9]{10}$/gm, "Số điện thoại ít nhất 10 số")
      .required("Vui lòng điền vào trường này"),
    email: yup
      .string()
      .required("Vui lòng điền vào trường này")
      .email("Email không hợp lệ"),
    subject: yup.string().required("Vui lòng điền vào trường này"),
    message: yup.string().required("Vui lòng điền vào trường này"),
  })

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = (data: FieldValues) => {
    const dataToSend = {
      from_name: data.fullName,
      subject: data.subject,
      message: data.message,
      phone: data.phone,
      reply_to: data.email,
    }
    emailjs.send(
      config.service_id,
      config.template_id,
      dataToSend,
      config.user_id
    )
    setOpen(true)
    reset()
  }

  return (
    <Box mt={2}>
      <Typography variant="subtitle1" fontWeight={500}>
        Hân hạnh phục vụ và chân thành cảm ơn sự quan tâm, đóng góp ý kiến đến
        PhonePro.
      </Typography>
      <Divider />
      <Grid
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        container
        spacing={2}
        mt={2}
      >
        <Grid item xs={12}>
          <Box display="flex" alignItems="center">
            <Typography width={100}>Họ tên</Typography>
            <Box flex={1}>
              <FormInputText
                name="fullName"
                control={control}
                error={errors}
                TextFieldProps={{ size: "small" }}
              />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" alignItems="center">
            <Typography width={100}>Điện thoại</Typography>
            <Box flex={1}>
              <FormInputText
                name="phone"
                control={control}
                error={errors}
                TextFieldProps={{ size: "small", type: "number" }}
              />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" alignItems="center">
            <Typography width={100}>Email</Typography>
            <Box flex={1}>
              <FormInputText
                name="email"
                control={control}
                error={errors}
                TextFieldProps={{ size: "small" }}
              />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" alignItems="center">
            <Typography width={100}>Tiêu đề</Typography>
            <Box flex={1}>
              <FormInputText
                name="subject"
                control={control}
                error={errors}
                TextFieldProps={{ size: "small" }}
              />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" alignItems="center">
            <Typography width={100}>Nội dung</Typography>
            <Box flex={1}>
              <FormInputText
                name="message"
                control={control}
                error={errors}
                TextFieldProps={{
                  multiline: true,
                  rows: 5,
                }}
              />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button type="submit" variant="outlined" sx={{ px: 2, py: 1 }}>
            Gửi thông tin
          </Button>
        </Grid>
      </Grid>

      <AlertDialog
        open={open}
        content={
          <>
            <Typography
              variant="h5"
              alignItems="center"
              display="flex"
              justifyContent="center"
              gap={1}
              gutterBottom
            >
              <CheckCircleOutline color="secondary" fontSize="large" />
              Gửi thành công
            </Typography>
            <Typography variant="subtitle1">
              Cảm ơn quý khách đã gửi thông tin, chúng tôi sẽ phản hồi sớm cho
              bạn!
            </Typography>
          </>
        }
        handleClose={() => setOpen(false)}
      />
    </Box>
  )
}

export default FormContact
