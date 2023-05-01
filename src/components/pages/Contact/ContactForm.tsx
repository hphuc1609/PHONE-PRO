import { yupResolver } from "@hookform/resolvers/yup"
import { Box, Button, Divider, Grid, Typography } from "@mui/material"
import FormInputText from "components/common/FormInput/FormInputText"
import { useForm } from "react-hook-form"
import * as yup from "yup"

const FormContact = () => {
  const schema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required(),
  })

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  return (
    <Box mt={2}>
      <Typography variant="subtitle1" fontWeight={600} textAlign="justify">
        Quý khách có thể gửi liên hệ tới chúng tôi bằng cách hoàn tất biểu mẫu
        dưới đây. Hân hạnh phục vụ và chân thành cảm ơn sự quan tâm, đóng góp ý
        kiến đến Phone Pro.
      </Typography>
      <Divider />

      <Grid container spacing={2} mt={2}>
        <Grid item xs={12}>
          <Grid container item spacing={2}>
            <Grid item xs={2}>
              <Typography>Họ và tên</Typography>
            </Grid>
            <Grid item xs={10}>
              <FormInputText
                name="fullname"
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
                name="phone"
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
