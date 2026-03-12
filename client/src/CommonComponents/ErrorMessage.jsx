import React, { useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'

const ErrorMessage = ({showToast, msg, type}) => {
    const notify = ()=>{
        // toast.info("Login Success")
        toast[type](msg)
    }

    useEffect(()=>{
        if (showToast){
            notify()
        }
    },[showToast])
  return (
    <ToastContainer/>
  )
}

export default ErrorMessage