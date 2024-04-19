import React from 'react'
import {ToastContainer} from "react-toastify"

function CustomToastContainer() {
  return (
    <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={
          document.querySelector("html").classList[0] === "dark"
            ? "light"
            : "dark"
        }
        transition:Bounce
      />
  )
}

export default CustomToastContainer