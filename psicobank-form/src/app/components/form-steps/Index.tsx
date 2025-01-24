import BankAccountFormStep from "@/app/components/form-steps/BankAccountFormStep"
import BillingOptionsFormStep from "@/app/components/form-steps/BillingOptionsFormStep"
import MailCustomizationFormStep from "@/app/components/form-steps/MailCustomizationFormStep"
import { useGlobalFormContext } from "@/app/context/GlobalFormContext"
import { toast } from "react-toastify"
import Image from "next/image"
import Dialog from "@mui/material/Dialog"
import { DialogContent, DialogTitle } from "@mui/material"
import CustomStepper from "@/app/components/form-steps/CustomStepper"
import Step from "@mui/joy/Step"
import Stepper from "@mui/joy/Stepper"
import IconButton from "@mui/material/IconButton"
import CloseIcon from "@mui/icons-material/Close"

export default function FormSteps() {
  const {
    currentStep,
    isModalOpen,
    onStartRegistration,
    onCancelRegistration,
    onFinishRegistration,
    setStep,
  } = useGlobalFormContext()

  const stepLabels = [
    "Cadastrar uma conta",
    "Canais de envio e Mensagem de cobrança",
    "Forma de pagamento da cobrança",
  ]

  const onStepSuccess = () => {
    if (currentStep === 2) {
      onFinishRegistration()
      toast.success(
        "Sucesso! Seus dados foram enviados. Verifique o console...",
        {
          position: "top-right",
          autoClose: 5000,
          closeOnClick: true,
          pauseOnHover: true,
        }
      )
    } else {
      setStep(currentStep + 1)
    }
  }

  const onJumpStart = (event: React.MouseEvent<HTMLButtonElement>) => {
    const buttonElement = event.target as HTMLButtonElement
    buttonElement.blur() // remove the focus from the trigger element before opening modal. This prevents the focused element from being in the 'aria-hidden=true' ancestor.
    onStartRegistration()
  }

  const onFormError = (message: string) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      closeOnClick: true,
      pauseOnHover: false,
    })
  }

  const renderStepForm = (step: number) => {
    switch (step) {
      case 0:
        return (
          <BankAccountFormStep
            onStepSuccess={onStepSuccess}
            onError={onFormError}
            onCancel={onCancelRegistration}
          />
        )

      case 1:
        return (
          <MailCustomizationFormStep
            onStepSuccess={onStepSuccess}
            onError={onFormError}
            onCancel={onCancelRegistration}
          />
        )

      case 2:
        return (
          <BillingOptionsFormStep
            onStepSuccess={onStepSuccess}
            onError={onFormError}
            onCancel={onCancelRegistration}
          />
        )

      default:
        return (
          <BankAccountFormStep
            onStepSuccess={onStepSuccess}
            onError={onFormError}
            onCancel={onCancelRegistration}
          />
        )
    }
  }

  return (
    <>
      <div className="flex flex-col justify-center w-full h-full items-center">
        <Image
          src="/assets/PSICO-IAGO.svg"
          width={0}
          height={0}
          alt="Psico Iago"
          className="w-[200px] h-[200px]"
        />
        <div className="flex flex-col gap-3 max-w-52">
          <span className="text-body-2 font-bold text-center">Olá!</span>
          <p className="text-body-2 text-center">
            Clique no botão para começar a usar os benefícios financeiros do
            PsicoManager!
          </p>
          <button
            onClick={onJumpStart}
            className="bg-primary-00 text-neutral-00 text-body-1 font-bold px-3 py-2 rounded-xl"
          >
            Ativar o PsicoBank
          </button>
        </div>

        <Dialog
          open={isModalOpen}
          scroll="paper"
          maxWidth={"md"}
          fullWidth={true}
        >
          <DialogTitle className="text-heading-2 font-bold text-neutral-90">
            Ativar o PsicoBank
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={onCancelRegistration}
            sx={(theme) => ({
              position: "absolute",
              right: 8,
              top: 8,
              color: theme.palette.grey[500],
            })}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent>
            <div className="flex flex-col gap-[20px]">
              <Stepper
                sx={{
                  width: "100%",
                  "--Step-connectorThickness": "4px",
                  "--Step-connectorBg": "rgba(239, 240, 240, 1)",
                }}
              >
                {stepLabels.map((label, index) => {
                  const state =
                    index === currentStep
                      ? "in progress"
                      : index > currentStep
                      ? "todo"
                      : "done"
                  return (
                    <Step
                      active={index === currentStep}
                      completed={index < currentStep}
                      orientation="vertical"
                      key={index}
                      indicator={
                        <CustomStepper
                          isFirst={index === 0}
                          isLast={index === stepLabels.length - 1}
                          state={
                            index === currentStep
                              ? "in progress"
                              : index > currentStep
                              ? "todo"
                              : "done"
                          }
                        />
                      }
                    >
                      <span
                        className={`text-body-4 text-center ${
                          state === "todo"
                            ? "text-neutral-40"
                            : state === "in progress"
                            ? "text-neutral-90"
                            : "text-primary-00"
                        }`}
                      >
                        {label}
                      </span>
                    </Step>
                  )
                })}
              </Stepper>
              <h3 className="text-heading-3 leading-6 font-bold text-neutral-90">
                Preencha os itens a seguir para configurar o PsicoBank
              </h3>
              {renderStepForm(currentStep)}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  )
}
