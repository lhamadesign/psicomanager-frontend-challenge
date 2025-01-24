import { z } from "zod"
import DICTIONARY from "@/db/dictionary"

const BANK_ACCOUNT_SCHEMA = z.object({
  account: z.object({
    // allowing .nullish() to be able to define a default initial value, but not validate if the value is undefined
    bankName: z.enum(DICTIONARY.BANK_NAMES).nullish().refine((value) => {
      if (value === undefined) {
        return false
      }
      return true
    }),
    accountType: z.enum(DICTIONARY.ACCOUNT_TYPES).nullish().refine((value) => {
      if (value === undefined) {
        return false
      }
      return true
    }),
    branch: z
      .string()
      .regex(/^\d{4}$/, "Invalid branch format.")
      .nonempty(),
    accountNumber: z
      .string()
      .regex(/^\d{4,5}-\d{1}$/, "Invalid account number format.")
      .nonempty(),
  }),
  customer: z.discriminatedUnion("customerType", [
    z.object({
      customerType: z.literal(DICTIONARY.CUSTOMER_TYPES[0]), // IN CASE OF "PESSOA FÍSICA"
      cpf: z
        .string()
        .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "Invalid cpf number format.")
        .nonempty(),
      phone: z
        .string()
        .regex(/^\(\d{2}\) \d{5}-\d{4}$/, "Invalid phone number format.")
        .nonempty(),
      fullname: z.string().nonempty(),
      address: z.object({
        cepCode: z
          .string()
          .regex(/^\d{5}-\d{3}$/, "Invalid CEP format")
          .nonempty(),
        state: z.enum(DICTIONARY.BRAZILIAN_UF_LIST).nullish().refine((value) => {
          if (value === undefined) {
            return false
          }
          return true
        }),
        city: z.string().nonempty(),
        addressLine: z.string().nonempty(),
        addressNumber: z.string().nonempty(),
      }),
    }),
    z.object({
      customerType: z.literal(DICTIONARY.CUSTOMER_TYPES[1]), // IN CASE OF "PESSOA JURÍDICA"
      cnpj: z
        .string()
        .regex(
          /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/,
          "Invalid CNPJ number format."
        )
        .nonempty(),
      phone: z
        .string()
        .regex(/^\(\d{2}\) \d{5}-\d{4}$/, "Invalid phone number format.")
        .nonempty(),
      ownerName: z.string().nonempty(),
      ownerCpf: z
        .string()
        .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "Invalid cpf number format.")
        .nonempty(),
      companyPublicName: z.string().nonempty(),
      address: z.object({
        cepCode: z
          .string()
          .regex(/^\d{5}-\d{3}$/, "Invalid CEP format")
          .nonempty(),
        state: z.enum(DICTIONARY.BRAZILIAN_UF_LIST).nullish().refine((value) => {
          if (value === undefined) {
            return false
          }
          return true
        }),
        city: z.string().nonempty(),
      }),
    }),
  ]),
})

export const MAIL_CUSTOMIZATION_SCHEMA = z.object({
  emailBody: z.string().nonempty(),
})

export const BILLING_OPTIONS_SCHEMA = z.object({
  paymentMethod: z.array(z.enum(DICTIONARY.PAYMENT_METHODS)).min(1),
  interest: z.object({
    chargeInterest: z.boolean().optional(),
    finePercentageValue: z.coerce.number().min(0).optional(),
    chargeDailyInterest: z.boolean().optional(),
  }).optional(),
})

export const PSICOBANK_FORM_SCHEMA = {
  bankAccount: BANK_ACCOUNT_SCHEMA,
  mailCustomization: MAIL_CUSTOMIZATION_SCHEMA,
  billingOptions: BILLING_OPTIONS_SCHEMA,
}

export type PSICOBANK_FORM_TYPE = z.infer<
    typeof PSICOBANK_FORM_SCHEMA.bankAccount &
    typeof PSICOBANK_FORM_SCHEMA.mailCustomization &
    typeof PSICOBANK_FORM_SCHEMA.billingOptions
>

export type BankAccountFormType = z.infer<typeof PSICOBANK_FORM_SCHEMA.bankAccount>
export type MailCustomizationFormType = z.infer<typeof PSICOBANK_FORM_SCHEMA.mailCustomization>
export type BillingOptionsFormType = z.infer<typeof BILLING_OPTIONS_SCHEMA>