"use client"
import FormContextProvider from "@/app/context/GlobalFormContext"
import FormSteps from "@/app/components/form-steps/Index"
import { toast, ToastContainer } from "react-toastify"

export default function Home() {
  return (
    <>
      <FormContextProvider>
        <FormSteps />
      </FormContextProvider>
      <ToastContainer />
    </>
  )
}
