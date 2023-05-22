import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material"
import { ReactNode } from "react"
import type { Control, FieldValues } from "react-hook-form"
import { Controller } from "react-hook-form"

interface Option {
  value: string
  label: ReactNode
}

interface Props {
  name: string
  title: string
  control: Control<FieldValues>
  options: Option[]
}

const FormInputRadio = ({ name, title, control, options }: Props) => (
  <FormControl sx={{ width: "100%" }}>
    <FormLabel color="secondary" sx={{ mb: 2 }}>
      {title}
    </FormLabel>
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <RadioGroup {...field} sx={{ gap: 2 }}>
          {options.map((option) => (
            <FormControlLabel
              key={option.value}
              value={option.value}
              control={<Radio color="secondary" />}
              label={option.label}
            />
          ))}
        </RadioGroup>
      )}
    />
  </FormControl>
)

export default FormInputRadio
