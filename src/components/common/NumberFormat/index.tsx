import { Typography } from "@mui/material"

interface NumberFormatProps {
  value: number
  locale?: string
  color?: string
  TextProps?: object
}

const NumberFormat = ({
  value,
  locale = "vi-VN",
  color,
  TextProps,
}: NumberFormatProps) => {
  const formattedValue = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "VND",
  }).format(value)

  return (
    <Typography color={color} {...TextProps}>
      {formattedValue}
    </Typography>
  )
}

export default NumberFormat
