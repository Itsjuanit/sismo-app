import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const contextClass = {
  error: "bg-orange-100",
};

function SismoAlert({ sismos }) {
  useEffect(() => {
    const now = Date.now();
    const tenMinutesAgo = now - 10 * 60 * 1000;

    const sismoRecent = sismos.some((sismo) => {
      const sismoTime = new Date(sismo.time).getTime();
      return sismoTime >= tenMinutesAgo;
    });

    if (sismoRecent) {
      toast.error("Hubo un sismo hace menos de 10 minutos.", {
        position: "top-right",
        autoClose: 180000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [sismos]);

  return (
    <ToastContainer
      toastClassName={({ type }) =>
        contextClass[type || "default"] +
        " relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer text-[#3f4235]"
      }
    />
  );
}

export default SismoAlert;
