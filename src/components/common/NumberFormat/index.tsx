import { Typography, TypographyProps } from "@mui/material"

interface NumberFormatProps {
  value: number
  locale?: string
  color?: string
  TextProps?: TypographyProps
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
