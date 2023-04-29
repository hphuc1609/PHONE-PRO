import type { TextFieldProps } from "@mui/material/TextField"
import TextField from "@mui/material/TextField"
import type { Control, FieldErrors, FieldValues } from "react-hook-form"
import { Controller } from "react-hook-form"

interface Props {
  name: string
  label: string
  control: Control<FieldValues>
  error: FieldErrors<FieldValues>
  className?: string
  TextFieldProps?: TextFieldProps
}

const FormInputText = ({
  name,
  label,
  control,
  error,
  className,
  TextFieldProps,
}: Props) => (
  <Controller
    name={name}
    control={control}
    render={({ field: { onChange, value } }) => (
      <TextField
        fullWidth
        error={error[name] !== undefined}
        helperText={error[name] ? `${error[name]?.message}` : undefined}
        label={label}
        variant="outlined"
        onChange={onChange}
        name={name}
        value={value || ""}
        className={className}
        {...TextFieldProps}
      />
    )}
  />
)

export default FormInputText
