import { yupResolver } from "@hookform/resolvers/yup"
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
import { toastConfig } from "configs/toast"
import { Dispatch, SetStateAction } from "react"
import { FieldValues, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useCart } from "react-use-cart"
import { WrappedComponentProps } from "react-with-firebase-auth"
import * as yup from "yup"

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
  setOrderCode: Dispatch<SetStateAction<string>>
  user: WrappedComponentProps["user"]
}

const PaymentForm = ({ setOrderCode, user }: Props) => {
  const navigate = useNavigate()
  const { cartTotal, emptyCart, totalItems } = useCart()

  const schema = yup.object().shape({
    fullName: yup.string().required("Vui lòng điền vào trường này"),
    phone: yup
      .string()
      .matches(/^[0-9]{10}$/gm, "Số điện thoại không hợp lệ")
      .required("Vui lòng điền vào trường này"),
    address: yup.string().required("Vui lòng điền vào trường này"),
    payment: yup.string().required("Vui lòng chọn phương thức thanh toán"),
  })

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const handleCancelPayment = () => {
    navigate("/")
    window.scrollTo(0, 0)
  }

  const handlePayment = (data: FieldValues) => {
    const totalPrice = cartTotal
    const newTotalPrice = totalPrice * 2

    if (!newTotalPrice) {
      localStorage.setItem("TotalPrice", JSON.stringify(totalPrice))
    } else {
      localStorage.setItem("TotalPrice", JSON.stringify(newTotalPrice))
    }

    if (totalItems) {
      if (totalItems > 1) {
        const newTotalItems = totalItems + totalItems
        localStorage.setItem("TotalCart", JSON.stringify(newTotalItems))
      }
    } else {
      const newTotalItems = totalItems
      localStorage.setItem("TotalCart", JSON.stringify(newTotalItems))
    }

    if (user) {
      // Tạo mã ngẫu nhiên
      const randomNumber = Math.floor(Math.random() * 10000)
      const code = `#${randomNumber}`
      setOrderCode(code)

      toast.success("Thanh toán thành công", toastConfig)
      emptyCart()

      if (data.payment === "vnpay") {
        // const vnpayUrl = import.meta.env.VITE_VNPAY_URL
        // const merchant = import.meta.env.VITE_VNPAY_MERCHANT // Mã merchant tại VNPay
        // const code = import.meta.env.VITE_VNPAY_CODE // Mã website tại VNPay
        // const returnUrl = "http://127.0.0.1:5173/" // URL để VNPay redirect sau khi thanh toán thành công
        // const amount = cartTotal // Số tiền thanh toán
        // const orderInfo = "Thanh toán qua VNPay"
        // const version = "2.1.0"
        // const payload: any = {
        //   vnp_Amount: amount,
        //   vnp_OrderInfo: orderInfo,
        //   vnp_ReturnUrl: returnUrl,
        //   vnp_TmnCode: code,
        //   vnp_Version: version,
        //   vnp_Merchant: merchant,
        // }
        // const vnpUrl = new URL(vnpayUrl)
        // Object.keys(payload).forEach((key) =>
        //   vnpUrl.searchParams.append(key, payload[key])
        // )
        // window.location.href = vnpUrl.toString()
      }
    }
  }

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
          onClick={handleSubmit(handlePayment)}
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
