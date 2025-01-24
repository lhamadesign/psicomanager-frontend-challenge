import { useGlobalFormContext } from "@/app/context/GlobalFormContext"
import BillingOptionsForm from "@/app/forms/BillingOptionsForm"
import { PSICOBANK_FORM_TYPE } from "@/db/schemas"

type BillingOptionsFormStepProps = {
  onStepSuccess: () => void
  onError: (message: string) => void
  onCancel: () => void
}

export default function BillingOptionsFormStep(
  props: BillingOptionsFormStepProps
) {
  const { onStepSuccess, onError, onCancel } = props
  const { formValues, setFormValues } = useGlobalFormContext()

  const handleStepSuccess = (data: Partial<PSICOBANK_FORM_TYPE>) => {
    const finalValues = { ...formValues, ...data }
    setFormValues(finalValues)
    console.log("Form Data:", finalValues)
    onStepSuccess()
  }

  return (
    <BillingOptionsForm
      onSuccess={handleStepSuccess}
      onCancel={onCancel}
      onError={onError}
    />
  )
}
