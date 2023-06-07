import { createComponentWithAuth } from "Firebase/firebaseConfig"
import { useRef, useState } from "react"
import { Helmet } from "react-helmet"
import { useReactToPrint } from "react-to-print"
import { WrappedComponentProps } from "react-with-firebase-auth"
import PaymentForm from "./PaymentForm"
import Invoice from "./PaymentInvoice"

const Payment = ({ user }: WrappedComponentProps) => {
  const componentRef = useRef(null)
  const [orderCode, setOrderCode] = useState("")
  const [isShow, setIsShow] = useState(true)

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })

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
          />
        </div>
      ) : (
        <PaymentForm user={user} setOrderCode={setOrderCode} />
      )}
    </>
  )
}

export default createComponentWithAuth(Payment)
