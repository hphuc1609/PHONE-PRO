interface NumberFormatProps {
  value: number
  locale?: string
}

const NumberFormat = ({ value, locale = "vi-VN" }: NumberFormatProps) => {
  const formattedValue = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "VND",
  }).format(value)

  return <>{formattedValue}</>
}

export default NumberFormat
