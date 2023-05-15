import emailjs from "@emailjs/browser"
import { yupResolver } from "@hookform/resolvers/yup"
import { Box, Button, Divider, Grid, Typography } from "@mui/material"
import FormInputText from "components/common/FormInput/FormInputText"
import { toastConfig } from "configs/toast"
import { useState } from "react"
import { FieldValues, useForm } from "react-hook-form"
import { toast } from "react-toastify"
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
    phoneNumber: yup
      .string()
      .matches(/^[0-9]{10}$/gm, "Số điện thoại không hợp lệ")
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
      phone: data.phoneNumber,
      reply_to: data.email,
    }

    emailjs
      .send(config.service_id, config.template_id, dataToSend, config.user_id)
      .then((result) => {
        toast.success(`${result.text} - Gửi thành công!`, toastConfig)
        setTimeout
      })
      .catch((error) => {
        toast.error(error.text, toastConfig)
      })
      .finally(() => {
        toast.clearWaitingQueue()
      })
    reset()
  }

  return (
    <Box mt={2}>
      <Typography variant="subtitle1" fontWeight={600} textAlign="justify">
        Quý khách có thể gửi liên hệ tới chúng tôi bằng cách hoàn tất biểu mẫu
        dưới đây. Hân hạnh phục vụ và chân thành cảm ơn sự quan tâm, đóng góp ý
        kiến đến Phone Pro.
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
          <Grid container item spacing={2}>
            <Grid item xs={2}>
              <Typography>Họ và tên</Typography>
            </Grid>
            <Grid item xs={10}>
              <FormInputText
                name="fullName"
                label=""
                control={control}
                error={errors}
                TextFieldProps={{
                  size: "small",
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container item spacing={2}>
            <Grid item xs={2}>
              <Typography>Điện thoại</Typography>
            </Grid>
            <Grid item xs={10}>
              <FormInputText
                name="phoneNumber"
                label=""
                control={control}
                error={errors}
                TextFieldProps={{
                  size: "small",
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container item spacing={2}>
            <Grid item xs={2}>
              <Typography>Email</Typography>
            </Grid>
            <Grid item xs={10}>
              <FormInputText
                name="email"
                label=""
                control={control}
                error={errors}
                TextFieldProps={{
                  size: "small",
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container item spacing={2}>
            <Grid item xs={2}>
              <Typography>Tiêu đề</Typography>
            </Grid>
            <Grid item xs={10}>
              <FormInputText
                name="subject"
                label=""
                control={control}
                error={errors}
                TextFieldProps={{
                  size: "small",
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container item spacing={2}>
            <Grid item xs={2}>
              <Typography>Nội dung</Typography>
            </Grid>
            <Grid item xs={10}>
              <FormInputText
                name="message"
                label=""
                control={control}
                error={errors}
                TextFieldProps={{
                  multiline: true,
                  rows: 5,
                }}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button type="submit" variant="outlined" sx={{ px: 2, py: 1 }}>
            Gửi thông tin
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}

export default FormContact
