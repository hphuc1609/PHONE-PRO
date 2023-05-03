import type { ToastOptions } from "react-toastify"
import { toast } from "react-toastify"

export const toastConfig: ToastOptions = {
  position: toast.POSITION.BOTTOM_RIGHT,
  theme: "colored",
  pauseOnHover: false,
  draggable: false,
  autoClose: 2500,
  progress: 0,
  hideProgressBar: true,
}
