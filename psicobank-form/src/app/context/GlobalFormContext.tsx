import { createContext, useContext, useState, useEffect } from "react"
import { PSICOBANK_FORM_TYPE } from "@/db/schemas"

type GlobalFormContextType = {
  currentStep: number
  formValues: PSICOBANK_FORM_TYPE
  isModalOpen: boolean

  setStep: (step: number) => void
  setFormValues: (values: PSICOBANK_FORM_TYPE) => void
  onCancelRegistration: () => void
  onStartRegistration: () => void
  onFinishRegistration: () => void
}

const initialStep = 0
const initialFormValues: PSICOBANK_FORM_TYPE = {
  account: {
    bankName: undefined,
    accountType: undefined,
    branch: "",
    accountNumber: "",
  },
  customer: {
    customerType: "Pessoa Física",
    cpf: "",
    phone: "",
    fullname: "",
    address: {
      cepCode: "",
      state: undefined,
      city: "",
      addressLine: "",
      addressNumber: "",
    },
  },
  emailBody: "",
  paymentMethod: [],
  interest: {
    chargeInterest: false,
    finePercentageValue: 0,
    chargeDailyInterest: false,
  },
}

const globalFormContext = createContext<GlobalFormContextType>({
  currentStep: initialStep,
  formValues: initialFormValues,
  isModalOpen: false,
  setStep: () => {},
  setFormValues: () => {},
  onCancelRegistration: () => {},
  onStartRegistration: () => {},
  onFinishRegistration: () => {},
})

import { ReactNode } from "react"

export default function FormContextProvider({
  children,
}: {
  children: ReactNode
}) {
  const [currentStep, setCurrentStep] = useState(initialStep)
  const [formValues, setFormCurrentValues] = useState(initialFormValues)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const onStartRegistration = () => {
    setIsModalOpen(true)
  }

  const onCancelRegistration = () => {
    setFormValues(initialFormValues)
    setIsModalOpen(false)
  }

  const onFinishRegistration = () => {
    setIsModalOpen(false)
    setCurrentStep(0)
  }

  const setStep = (step: number) => setCurrentStep(step)
  const setFormValues = (values: PSICOBANK_FORM_TYPE) =>
    setFormCurrentValues(values)

  return (
    <globalFormContext.Provider
      value={{
        currentStep,
        formValues,
        isModalOpen,
        onStartRegistration,
        onCancelRegistration,
        setStep,
        setFormValues,
        onFinishRegistration,
      }}
    >
      {children}
    </globalFormContext.Provider>
  )
}

export const useGlobalFormContext = () => useContext(globalFormContext)
