import { toast } from "react-toastify";

const successToast = (msg) => {
  toast.success(msg, {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export { successToast };
