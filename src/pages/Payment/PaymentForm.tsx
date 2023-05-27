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
import { FieldValues, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useCart } from "react-use-cart"
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
      gap={2}
      p={1}
      border="1px solid #cccc"
      borderRadius={2}
      width={350}
    >
      <Box width={40} height={40}>
        <img
          src={image}
          alt="..."
          width="100%"
          height="100%"
          style={{ objectFit: "cover" }}
        />
      </Box>
      <Typography>{content}</Typography>
    </Box>
  )
}

const paymentOptions = [
  {
    value: "payCash",
    label: (
      <RenderPayments
        content="Thanh toán khi nhận hàng"
        image={"../assets/PayCash.png"}
      />
    ),
  },
  {
    value: "vnPayment",
    label: <RenderPayments content="Ví VNPAY" image={"../assets/Vnpay.png"} />,
  },
]

interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  user: any
}

const PaymentForm = ({ setOpen, user }: Props) => {
  const navigate = useNavigate()
  const { cartTotal, emptyCart, totalItems } = useCart()

  const schema = yup.object().shape({
    fullName: yup.string().required("Vui lòng điền vào trường này"),
    phone: yup
      .string()
      .matches(/^[0-9]{10}$/gm, "Số điện thoại không hợp lệ")
      .required("Vui lòng điền vào trường này"),
    address: yup.string().required("Vui lòng điền vào trường này"),
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
    emptyCart()

    window.scrollTo(0, 0)
  }

  const handlePayment = (data: FieldValues) => {
    // console.log(data)
    const totalPrice = cartTotal
    const newTotalPrice = totalPrice * 2
    console.log(!newTotalPrice)
    if (!newTotalPrice) {
      localStorage.setItem("TotalPrice", JSON.stringify(totalPrice))
    } else {
      localStorage.setItem("TotalPrice", JSON.stringify(newTotalPrice))
    }

    if (totalItems) {
      if (totalItems > 1) {
        const newTotalItems = totalItems + totalItems
        console.log(newTotalItems)
        localStorage.setItem("TotalCart", JSON.stringify(newTotalItems))
      }
    } else {
      const newTotalItems = totalItems
      console.log(newTotalItems)
      localStorage.setItem("TotalCart", JSON.stringify(newTotalItems))
    }

    if (user) {
      alert("Thanh toán thành công")
      emptyCart()

      // const payment = new OnePayInternational({
      //   paymentGateway: import.meta.env.VITE_VNPAY_URL,
      //   merchant: "TESTONEPAY",
      //   accessCode: import.meta.env.VITE_VNPAY_CODE,
      //   secureSecret: import.meta.env.VITE_VNPAY_SECRET,
      // })

      // const payload: any = {
      //   amount: cartTotal,
      //   customerId: data.phone,
      //   currency: "VND",
      // }
      // const paymentUrl = payment.buildCheckoutUrl(payload)

      // // Redirect user to the VNPay payment page
      // window.location.href = (await paymentUrl).href
      navigate("/")
    } else {
      setOpen(true)
    }
  }

  return (
    <Container component={Paper} maxWidth="xs" elevation={5} sx={{ p: 5 }}>
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
            title="Hình thức thanh toán"
            options={paymentOptions}
            control={control}
          />
        </Grid>
      </Grid>

      <Box display="flex" alignItems="center" gap={1} mt={5} mb={1}>
        <Typography fontWeight="bold">Tổng cộng:</Typography>
        <NumberFormat value={cartTotal} locale="it-IT" />
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
          Hủy thanh toán
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          disableElevation
          fullWidth
          onClick={handleSubmit(handlePayment)}
        >
          Thanh toán
        </Button>
      </Box>
    </Container>
  )
}

export default PaymentForm
