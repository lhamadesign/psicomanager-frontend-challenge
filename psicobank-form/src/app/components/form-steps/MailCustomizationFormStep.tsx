import { useGlobalFormContext } from "@/app/context/GlobalFormContext"
import MailCustomizationForm from "@/app/forms/MailCustomizationForm"
import { PSICOBANK_FORM_TYPE } from "@/db/schemas"

type MailCustomizationFormStepProps = {
  onStepSuccess: () => void
  onError: (message: string) => void
  onCancel: () => void
}

export default function MailCustomizationFormStep(
  props: MailCustomizationFormStepProps
) {
  const { onStepSuccess, onError, onCancel } = props
  const { formValues, setFormValues } = useGlobalFormContext()

  const handleStepSuccess = (data: Partial<PSICOBANK_FORM_TYPE>) => {
    setFormValues({
      ...formValues,
      ...data,
    })
    onStepSuccess()
  }

  return (
    <MailCustomizationForm
      onSuccess={handleStepSuccess}
      onCancel={onCancel}
      onError={onError}
    />
  )
}
