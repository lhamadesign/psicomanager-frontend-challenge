import { useEffect, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "react-toastify"
import DICTIONARY from "@/db/dictionary"
import { PSICOBANK_FORM_SCHEMA, BankAccountFormType } from "@/db/schemas"
import TextField from "@/app/components/text-field"
import DropDownList from "@/app/components/dropdown-list"
import Button from "@/app/components/button"

type BankAccountFormProps = {
  onSuccess: (data: BankAccountFormType) => void
  onError: (message: string) => void
  onCancel: () => void
}

export default function BankAccountForm(props: BankAccountFormProps) {
  const { onSuccess, onCancel, onError } = props
  const methods = useForm<BankAccountFormType>({
    resolver: zodResolver(PSICOBANK_FORM_SCHEMA.bankAccount),
  })

  const [showCnpjFields, setShowCnpjFields] = useState(false)
  useEffect(() => {
    const customerTypeSubscription = methods.watch((value) => {
      setShowCnpjFields(value.customer?.customerType === "Pessoa Jurídica")
    })
    return () => customerTypeSubscription.unsubscribe()
  }, [methods])

  const onSubmitError = (error: any) => {
    onError("Preencha corretamente os campos obrigatórios")
  }

  return (
    <div className="flex flex-1 flex-col w-full gap-5">
      <div className="w-full bg-context-warning-light p-[10px] rounded">
        <span className="text-body-2 font-bold text-context-warning-dark">
          Atenção!!! Verifique atentamente a cada dado preenchido no cadastro de
          sua conta.
        </span>
        <ul className="list-disc list-outside ml-3">
          <li className="list-item text-body-2 font-normal text-context-warning-dark">
            Caso queira cadastrar uma conta de banco CNPJ, verifique se a sua
            conta corrente é CNPJ e preencha o CPF correto do responsável da
            conta.
          </li>
          <li className="list-item text-body-2 font-normal text-context-warning-dark">
            O preenchimento incorreto das informações pode trazer transtornos no
            momento da transferência do valor para essa conta corrente.
          </li>
          <li className="list-item text-body-2 font-normal text-context-warning-dark">
            Se possível preencha com calma para não ocorrer erros.
          </li>
        </ul>
      </div>
      <FormProvider {...methods}>
        <form
          style={{ display: "flex", justifyContent: "center", flex: "1" }}
          onSubmit={methods.handleSubmit(onSuccess, onSubmitError)}
        >
          <div className="flex flex-col gap-5 w-full">
            <div className="flex flex-col gap-1 w-full">
              <label
                htmlFor="user"
                className="text-body-1 font-normal text-neutral-90"
              >
                Profissional{" "}
                <span className="text-context-error-medium">*</span>
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

            <div className="flex phone:flex-col tablet:flex-row gap-[20px]">
              <DropDownList
                name="account.bankName"
                label="Banco:"
                isRequired={true}
                options={DICTIONARY.BANK_NAMES}
              />

              <DropDownList
                name="account.accountType"
                label="Tipo de conta:"
                isRequired={true}
                options={DICTIONARY.ACCOUNT_TYPES}
              />
            </div>

            <div className="flex phone:flex-col tablet:flex-row gap-[20px]">
              <TextField
                name="account.branch"
                label="Agência:"
                isRequired={true}
              />

              <TextField
                name="account.accountNumber"
                label="Número da conta com dígito:"
                isRequired={true}
              />
            </div>

            <div className="flex phone:flex-col tablet:flex-row gap-[20px]">
              <DropDownList
                name="customer.customerType"
                label="Tipo de pessoa:"
                options={DICTIONARY.CUSTOMER_TYPES}
                isRequired={true}
              />

              {!showCnpjFields && (
                <>
                  <TextField
                    name="customer.cpf"
                    label="CPF:"
                    isRequired={true}
                    placeholder="___.___.___-__"
                  />
                  <TextField
                    name="customer.phone"
                    label="Telefone:"
                    placeholder="(__)_____-____"
                    isRequired={true}
                  />
                </>
              )}

              {showCnpjFields && (
                <>
                  <TextField
                    name="customer.cnpj"
                    label="CNPJ:"
                    isRequired={true}
                    placeholder="__.___.___/____-__"
                  />
                  <TextField
                    name="customer.phone"
                    label="Telefone:"
                    placeholder="(__)_____-____"
                    isRequired={true}
                  />
                </>
              )}
            </div>

            {!showCnpjFields && (
              <TextField
                name="customer.fullname"
                label="Nome completo:"
                isRequired={true}
              />
            )}

            {showCnpjFields && (
              <div className="flex phone:flex-col tablet:flex-row gap-[20px]">
                <TextField
                  name="customer.ownerName"
                  label="Nome do responsável pela conta:"
                  isRequired={true}
                />
                <TextField
                  name="customer.ownerCpf"
                  label="CPF do responsável pela conta:"
                  placeholder="___.___.___-__"
                  isRequired={true}
                />
              </div>
            )}

            {showCnpjFields && (
              <div className="flex flex-1">
                <TextField
                  name="customer.companyPublicName"
                  label="Razão Social:"
                  isRequired={true}
                />
              </div>
            )}

            <div className="flex phone:flex-col tablet:flex-row gap-[20px]">
              <TextField
                name="customer.address.cepCode"
                label="CEP:"
                isRequired={true}
                placeholder="_____-___"
              />

              <DropDownList
                name="customer.address.state"
                label="Estado"
                options={DICTIONARY.BRAZILIAN_UF_LIST}
                isRequired={true}
              />

              <TextField
                name="customer.address.city"
                label="Cidade:"
                isRequired={true}
              />
            </div>

            {!showCnpjFields && (
              <div className="flex phone:flex-col tablet:flex-row gap-[20px]">
                <TextField
                  name="customer.address.addressLine"
                  label="Endereço:"
                  isRequired={true}
                />

                <TextField
                  name="customer.address.addressNumber"
                  label="Número:"
                  type="text"
                  isRequired={true}
                />
              </div>
            )}

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
