import { toast } from "react-toastify";

const errorToast = (msg) => {
  toast.error(msg, {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export { errorToast };
