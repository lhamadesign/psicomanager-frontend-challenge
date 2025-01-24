import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "react-toastify"
import DICTIONARY from "@/db/dictionary"
import { BILLING_OPTIONS_SCHEMA, BillingOptionsFormType } from "@/db/schemas"
import TextField from "@/app/components/text-field"
import Button from "@/app/components/button"
import Checkbox from "@/app/components/checkbox"
import CheckboxGroup from "@/app/components/checkbox-group/Index"
import { useEffect, useState } from "react"

type BillingOptionsFormProps = {
  onSuccess: (data: BillingOptionsFormType) => void
  onError: (message: string) => void
  onCancel: () => void
}

export default function BillingOptionsForm(props: BillingOptionsFormProps) {
  const { onSuccess, onError, onCancel } = props
  const methods = useForm<BillingOptionsFormType>({
    resolver: zodResolver(BILLING_OPTIONS_SCHEMA),
  })

  const onSubmitError = (error: any) => {
    onError("Preencha corretamente os campos obrigatórios")
  }

  const [isInterestFieldDisabled, setisInterestFieldDisabled] =
    useState<boolean>(true)
  useEffect(() => {
    const hasInterestSubscription = methods.watch((value) => {
      if (value.interest && value.interest.chargeInterest) {
        setisInterestFieldDisabled(false)
      } else {
        setisInterestFieldDisabled(true)
      }
    })
    return () => hasInterestSubscription.unsubscribe()
  }, [methods])

  return (
    <div className="flex flex-1 flex-col w-full gap-[20px]">
      <div className="flex flex-col gap-1 w-full mt-[20px]">
        <label
          htmlFor="user"
          className="text-body-1 font-normal text-neutral-90"
        >
          Profissional <span className="text-context-error-medium">*</span>
        </label>
        <select
          disabled={true}
          className="py-1 px-2 border rounded-[4px] text-neutral-60 bg-neutral-10 border-neutral-30"
        >
          <option key="0" value={"Lhama Design"}>
            Lhama Design
          </option>
        </select>
      </div>

      <h2 className="text-heading-3 font-bold text-neutral-80">
        Forma de pagamento da cobrança
      </h2>

      <div className="w-full bg-context-information-light p-[10px] rounded">
        <span className="text-body-2 text-context-information-medium">
          Escolha quais as opções de pagamento que estarão disponíveis para o
          seu cliente no link das mensagens de cobrança;
        </span>
      </div>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSuccess, onSubmitError)}>
          <div className="flex flex-col gap-[20px]">
            <CheckboxGroup
              name="paymentMethod"
              label="Disponibilizar meio de pagamento:"
              options={DICTIONARY.PAYMENT_METHODS}
            />

            <hr />

            <h3 className="text-body-1 text-neutral-80 font-bold">
              Definir multas e juros para todos os boletos após o vencimento
            </h3>

            <Checkbox
              name="interest.chargeInterest"
              label={"Cobrar multa"}
              value="multa"
            />

            <div className="max-w-[160px]">
              <TextField
                name="interest.finePercentageValue"
                label="Valor da multa em %"
                type="number"
                disabled={isInterestFieldDisabled}
              />
            </div>

            <Checkbox
              name="interest.chargeDailyInterest"
              label={"Cobrar juros por dia de atraso (valor 1% ao mês)"}
              value={"dailyInterest"}
            />

            <div className="flex gap-4 self-end">
              <Button context="tertiary" type="reset" onClick={onCancel}>
                Cancelar
              </Button>
              <Button context="primary" type="submit">
                Enviar
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}
