import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import DICTIONARY from "@/db/dictionary"
import {
  MAIL_CUSTOMIZATION_SCHEMA,
  MailCustomizationFormType,
} from "@/db/schemas"
import DropDownList from "@/app/components/dropdown-list"
import TextField from "@/app/components/text-field"
import Button from "@/app/components/button"
import AddIcon from "@mui/icons-material/Add"
import { useEffect, useState } from "react"

type MailCustomizationFormProps = {
  onSuccess: (data: MailCustomizationFormType) => void
  onError: (message: string) => void
  onCancel: () => void
}

export default function MailCustomizationForm(
  props: MailCustomizationFormProps
) {
  const { onSuccess, onError, onCancel } = props
  const methods = useForm<MailCustomizationFormType>({
    resolver: zodResolver(MAIL_CUSTOMIZATION_SCHEMA),
  })

  const onSubmitError = (error: any) => {
    onError("Preencha corretamente os campos obrigatórios")
  }

  type DynamicMarkupType =
    | "Nome do Cliente"
    | "CPF do Cliente"
    | "Telefone do Cliente"

  interface DynamicMarkupInfo {
    textValue: string
  }

  const dynamicMarkupKeys: Record<DynamicMarkupType, DynamicMarkupInfo> = {
    "Nome do Cliente": { textValue: "{{NOME_CLIENTE}}" },
    "CPF do Cliente": { textValue: "{{CPF_CLIENTE}}" },
    "Telefone do Cliente": { textValue: "{{TELEFONE_CLIENTE}}" },
  }

  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true)

  const onSelectMarkupKey = (value: string) => {
    if (value !== undefined) {
      setIsButtonDisabled(false)
    } else {
      setIsButtonDisabled(true)
    }
  }

  const onInsertMarkupField = () => {
    const select = document.getElementById(
      "customEmailMarkupKey"
    ) as HTMLInputElement

    if (!select || !select.value) return

    const value = select.value as DynamicMarkupType

    const selectedMarkup = dynamicMarkupKeys[value]

    const previouEmailBody = methods.getValues("emailBody")
    methods.setValue("emailBody", previouEmailBody + selectedMarkup.textValue)
    select.value = "Selecione"
    setIsButtonDisabled(true)
  }

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

      <div className="w-full bg-context-information-light p-[10px] rounded">
        <span className="text-body-2 text-context-information-medium">
          Esta é a mensagem por e-mail que seus clientes irão receber. Clique no
          campo de texto para editar o conteúdo da mensagem e depois siga para o
          próximo passo.
        </span>
      </div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSuccess, onSubmitError)}>
          <div className="flex flex-col gap-[20px]">
            <div className="flex phone:flex-col phone:items-start tablet:items-end tablet:flex-row gap-[20px]">
              <div className="flex flex-col gap-1 w-full mt-[20px]">
                <label
                  htmlFor="customEmailMarkupKey"
                  className="text-body-1 font-normal text-neutral-90"
                >
                  Marcação dinâmica
                </label>
                <select
                  defaultValue={"Selecione"}
                  onChange={(event) => onSelectMarkupKey(event.target.value)}
                  className="w-full h-[32px] py-1 px-2 border border-neutral-30 rounded-[4px] text-neutral-60 hover:border-neutral-90"
                  id="customEmailMarkupKey"
                >
                  <option key="default" value={"Selecione"} disabled>
                    Selecione
                  </option>
                  {DICTIONARY.CUSTOM_EMAIL_MARKUP_KEYS.map(
                    (markupKey, index) => (
                      <option
                        key={index}
                        value={markupKey}
                        className="bg-neutral-00 text-body-2 font-normal text-neutral-70 hover:bg-primary-00 hover:text-neutral-00"
                      >
                        {markupKey}
                      </option>
                    )
                  )}
                </select>
              </div>

              <div>
                <Button
                  type="button"
                  onClick={onInsertMarkupField}
                  context={"secondary"}
                  isDisabled={isButtonDisabled}
                >
                  <AddIcon /> Inserir
                </Button>
              </div>
            </div>

            <TextField
              name="emailBody"
              label="Conteúdo da mensagem"
              defaultValue={`Olá {{NOME_CLIENTE}}.Estou te mandando um link no qual você consegue ver a melhor forma de pagamento das nossas sessões.`}
              multipleRows={5}
              isRequired={true}
            />

            <div className="flex gap-4 self-end">
              <Button context="tertiary" type="reset" onClick={onCancel}>
                Cancelar
              </Button>
              <Button context="primary" type="submit">
                Próximo
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}
