import { FormControlLabel, TextField } from "@mui/material"

interface Props {
  label: string
  name: string
}

const FormDropDown = ({ label, name, ...item }: Props) => {
  return (
    <FormControlLabel
      label={label}
      control={<TextField name={name} {...item} />}
    />
  )
}

export default FormDropDown
