import { MenuItem, TextField, TextFieldProps } from "@mui/material"

interface OptionsProps {
  label: string
  value: string
}

interface Props {
  label: string
  name: string
  options: OptionsProps[]
  value?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  TextFieldProps?: TextFieldProps
}

const FormInputDropDown = ({
  label,
  name,
  value,
  onChange,
  options,
  TextFieldProps,
}: Props) => {
  const generateSelectOptions = () =>
    options.map((option) => (
      <MenuItem key={option.value} value={option.value}>
        {option.label}
      </MenuItem>
    ))

  return (
    <TextField
      select
      variant="outlined"
      name={name}
      label={label}
      size="small"
      value={value || ""}
      onChange={onChange}
      fullWidth
      {...TextFieldProps}
    >
      {generateSelectOptions()}
    </TextField>
  )
}

export default FormInputDropDown
