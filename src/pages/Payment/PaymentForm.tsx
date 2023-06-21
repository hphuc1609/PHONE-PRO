import {
  Box,
  Button,
  Container,
  Divider,
  FormLabel,
  Grid,
  Paper,
  Typography,
} from "@mui/material"
import FormInputRadio from "components/common/FormInput/FormInputRadio"
import FormInputText from "components/common/FormInput/FormInputText"
import NumberFormat from "components/common/NumberFormat"
import { Control, FieldErrors, FieldValues } from "react-hook-form"

interface RenderPaymentsProps {
  content: string
  image: string
}

const RenderPayments = ({ content, image }: RenderPaymentsProps) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      gap={1}
      border="1px solid"
      borderColor="green"
      borderRadius={2}
      p={1}
    >
      <img
        src={image}
        alt="..."
        width={40}
        height={40}
        style={{ objectFit: "cover" }}
      />
      <Typography>{content}</Typography>
    </Box>
  )
}

const paymentOptions = [
  {
    value: "cash",
    label: (
      <RenderPayments
        content="Thanh toán khi nhận hàng"
        image={"../assets/PayCash.png"}
      />
    ),
  },
  {
    value: "vnpay",
    label: (
      <RenderPayments
        content="Thanh toán qua VNPAY"
        image={"../assets/Vnpay.png"}
      />
    ),
  },
]

interface Props {
  control: Control<FieldValues>
  errors: FieldErrors<FieldValues>
  cartTotal: number
  handleCancelPayment: () => void
  handlePayment: () => void
}

const PaymentForm = ({
  control,
  errors,
  cartTotal,
  handleCancelPayment,
  handlePayment,
}: Props) => {
  return (
    <Container
      component={Paper}
      maxWidth="sm"
      elevation={5}
      sx={{ p: 5, boxShadow: "3" }}
    >
      <Typography
        variant="h5"
        textAlign="center"
        mb={5}
        fontWeight={600}
        textTransform="uppercase"
      >
        Thanh toán
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormLabel required>Họ và tên</FormLabel>
          <FormInputText
            name="fullName"
            label=""
            control={control}
            error={errors}
            TextFieldProps={{
              size: "small",
              placeholder: "Yêu cầu họ và tên",
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <FormLabel required>Số điện thoại</FormLabel>
          <FormInputText
            name="phone"
            label=""
            control={control}
            error={errors}
            TextFieldProps={{
              size: "small",
              type: "number",
              placeholder: "Số điện thoại có ít nhất 10 số",
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <FormLabel required>Địa chỉ</FormLabel>
          <FormInputText
            name="address"
            label=""
            control={control}
            error={errors}
            TextFieldProps={{ size: "small", placeholder: "Yêu cầu địa chỉ" }}
          />
        </Grid>

        <Grid item xs={12}>
          <FormInputRadio
            name="payment"
            title="Phương thức thanh toán"
            control={control}
            error={errors}
            options={paymentOptions}
            RadioProps={{ defaultValue: "cash" }}
          />
        </Grid>
      </Grid>

      <Box display="flex" alignItems="center" gap={1} mt={5} mb={1}>
        <Typography fontWeight="bold">Tổng tiền:</Typography>
        <NumberFormat
          value={cartTotal}
          locale="it-IT"
          TextProps={{ fontWeight: "bold" }}
        />
      </Box>
      <Divider />

      <Box display="flex" alignItems="center" mt={2}>
        <Button
          variant="text"
          color="error"
          disableElevation
          fullWidth
          onClick={handleCancelPayment}
        >
          Hủy đặt hàng
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          onClick={handlePayment}
          disableElevation
          fullWidth
        >
          Đặt hàng
        </Button>
      </Box>
    </Container>
  )
}

export default PaymentForm
