import type { TextFieldProps } from "@mui/material/TextField"
import TextField from "@mui/material/TextField"
import type { Control, FieldErrors, FieldValues } from "react-hook-form"
import { Controller } from "react-hook-form"

interface Props {
  name: string
  label: string
  control: Control<FieldValues>
  errors: FieldErrors<FieldValues>
  TextFieldProps?: TextFieldProps
}

const FormInputText = ({
  name,
  label,
  control,
  errors,
  TextFieldProps,
}: Props) => (
  <Controller
    name={name}
    control={control}
    render={({ field: { onChange, value } }) => (
      <TextField
        fullWidth
        error={errors[name] !== undefined}
        helperText={errors[name] ? `${errors[name]?.message}` : undefined}
        label={label}
        variant="outlined"
        onChange={onChange}
        name={name}
        value={value || ""}
        {...TextFieldProps}
      />
    )}
  />
)

export default FormInputText
