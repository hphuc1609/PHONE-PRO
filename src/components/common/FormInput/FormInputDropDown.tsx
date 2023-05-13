import { FormControlLabel, MenuItem, TextField } from "@mui/material"

interface Props {
  label: string
  name: string
  options: any[]
}

const FormInputDropDown = ({ label, name, options, ...TextProps }: Props) => {
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
      fullWidth
      {...TextProps}
    >
      {generateSelectOptions()}
    </TextField>
  )
}

export default FormInputDropDown
