import { yupResolver } from "@hookform/resolvers/yup"
import { createComponentWithAuth } from "Firebase/firebaseConfig"
import { toastConfig } from "configs/toast"
import { useRef, useState } from "react"
import { Helmet } from "react-helmet"
import { FieldValues, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useReactToPrint } from "react-to-print"
import { toast } from "react-toastify"
import { useCart } from "react-use-cart"
import { WrappedComponentProps } from "react-with-firebase-auth"
import * as yup from "yup"
import PaymentForm from "./PaymentForm"
import Invoice from "./PaymentInvoice"

const Payment = ({ user }: WrappedComponentProps) => {
  const navigate = useNavigate()
  const componentRef = useRef(null)
  const { items, cartTotal, emptyCart, totalItems } = useCart()

  const [orderCode, setOrderCode] = useState("")
  const [isShow, setIsShow] = useState(true)

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

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })

  const handleCancelPayment = () => {
    navigate("/")
  }

  const handlePayment = (data: FieldValues) => {
    if (user && cartTotal) {
      // Tạo mã ngẫu nhiên 10 số
      const orderCode = Math.floor(1000000000 + Math.random() * 9000000000)
      const code = `#${orderCode}`
      setOrderCode(code)

      // Local storage
      localStorage.setItem("FullName", data.fullName)
      localStorage.setItem("Phone", data.phone)
      localStorage.setItem("Address", data.address)
      localStorage.setItem("Items", JSON.stringify(items))
      localStorage.setItem("Total", JSON.stringify(cartTotal))
      localStorage.setItem("MyCart", JSON.stringify(totalItems))

      toast.success("Thanh toán thành công", toastConfig)
      emptyCart()
    }
  }

  return (
    <>
      <Helmet>
        <title>Phone Pro - Thanh toán </title>
        <meta name="description" content="Description of Payment ... " />
      </Helmet>

      {orderCode ? (
        <div ref={componentRef}>
          <Invoice
            orderCode={orderCode}
            handlePrint={handlePrint}
            showButton={isShow}
            setIsShow={setIsShow}
            user={user}
          />
        </div>
      ) : (
        <PaymentForm
          control={control}
          errors={errors}
          cartTotal={cartTotal}
          handleCancelPayment={handleCancelPayment}
          handlePayment={handleSubmit(handlePayment)}
        />
      )}
    </>
  )
}

export default createComponentWithAuth(Payment)
