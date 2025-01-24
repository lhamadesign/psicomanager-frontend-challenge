import { useGlobalFormContext } from "@/app/context/GlobalFormContext"
import BankAccountForm from "@/app/forms/BankAccountForm"
import { PSICOBANK_FORM_TYPE } from "@/db/schemas"

type BankAccountFormStepProps = {
  onStepSuccess: () => void
  onError: (message: string) => void
  onCancel: () => void
}

export default function BankAccountFormStep(props: BankAccountFormStepProps) {
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
    <BankAccountForm
      onSuccess={handleStepSuccess}
      onError={onError}
      onCancel={onCancel}
    />
  )
}
