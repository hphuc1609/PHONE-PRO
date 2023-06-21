import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material"
import { ReactNode } from "react"
import type { Control, FieldValues, FieldErrors } from "react-hook-form"
import { Controller } from "react-hook-form"

interface Option {
  value: string
  label: ReactNode
}

interface Props {
  name: string
  title: string
  control: Control<FieldValues>
  error: FieldErrors<FieldValues>
  options: Option[]
  RadioProps?: object
}

const FormInputRadio = ({
  name,
  title,
  control,
  error,
  options,
  RadioProps,
}: Props) => (
  <FormControl sx={{ width: "100%" }}>
    <FormLabel color="secondary" sx={{ mb: 2 }}>
      {title}
    </FormLabel>
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <RadioGroup {...field} {...RadioProps} sx={{ gap: 2 }}>
          {options.map((option) => (
            <FormControlLabel
              key={option.value}
              value={option.value}
              control={<Radio color="secondary" />}
              label={option.label}
              sx={{ "& .MuiFormControlLabel-label": { width: "100%" } }}
            />
          ))}
        </RadioGroup>
      )}
    />
    {error[name] && (
      <Typography variant="body2" color="error" mt={1}>
        {`${error[name]?.message}`}
      </Typography>
    )}
  </FormControl>
)

export default FormInputRadio
