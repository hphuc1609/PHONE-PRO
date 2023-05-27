import { createComponentWithAuth } from "Firebase/firebaseConfig"
import AlertDialog from "components/common/Dialog"
import { useState } from "react"
import { Helmet } from "react-helmet"
import { useNavigate } from "react-router-dom"
import PaymentForm from "./PaymentForm"
import { WrappedComponentProps } from "react-with-firebase-auth"
// import { OnePayInternational } from "vn-payments"

const Payment = ({ user }: WrappedComponentProps) => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  return (
    <>
      <Helmet>
        <title>Phone Pro - Cổng thanh toán </title>
        <meta name="description" content="Description of Payment ... " />
      </Helmet>

      <PaymentForm user={user} setOpen={setOpen} />

      <AlertDialog
        open={open}
        content="Vui lòng đăng nhập để thực hiện thanh toán !"
        handleClose={() => setOpen(false)}
        fullWidthButton
        leftButton="Đóng"
        onClickLeftButton={() => setOpen(false)}
        rightButton="Xác nhận"
        onClickRightButton={() => navigate("/login")}
      />
    </>
  )
}

export default createComponentWithAuth(Payment)
