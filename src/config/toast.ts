import type { ToastOptions } from "react-toastify"
import { toast } from "react-toastify"

export const toastConfig: ToastOptions = {
  position: toast.POSITION.TOP_RIGHT,
  theme: "colored",
  pauseOnHover: false,
  draggable: false,
  autoClose: 3000,
  progress: 0,
  hideProgressBar: true,
}
