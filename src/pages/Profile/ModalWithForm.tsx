import { Grid } from "@mui/material"
import FormInputText from "components/common/FormInput/FormInputText"
import { Control, FieldErrors, FieldValues } from "react-hook-form"

interface Props {
  control: Control<FieldValues>
  error: FieldErrors<FieldValues>
}

const ModalProfileForm = ({ control, error }: Props) => {
  return (
    <Grid container rowSpacing={2} pt={1} component="form" autoComplete="off">
      <Grid item xs={12}>
        <FormInputText
          name="newPassword"
          label="Mật khẩu mới"
          control={control}
          error={error}
          TextFieldProps={{
            size: "small",
            required: true,
            type: "password",
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <FormInputText
          name="newPasswordConfirm"
          label="Nhập lại mật khẩu mới"
          control={control}
          error={error}
          TextFieldProps={{
            size: "small",
            required: true,
            type: "password",
          }}
        />
      </Grid>
    </Grid>
  )
}

export default ModalProfileForm
