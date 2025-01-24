import { useEffect, useState } from "react"
import { useFormContext, Controller } from "react-hook-form"

export type DropDownListProps =
  React.SelectHTMLAttributes<HTMLSelectElement> & {
    name: string
    label: string
    options: readonly string[]
    isRequired?: boolean
  }

export default function DropDownList({
  name,
  label,
  options,
  isRequired,
  ...rest
}: DropDownListProps) {
  const {
    control,
    getValues,
    getFieldState,
    formState: { errors },
  } = useFormContext()

  const [isInvalid, setIsInvalid] = useState(getFieldState(name).invalid)

  useEffect(() => {
    setIsInvalid(getFieldState(name).invalid)
  }, [errors])

  const isCustomerType = name === "customer.customerType"
  const selectOptions = isCustomerType ? options : ["Selecione", ...options]

  const inputClassNames = [
    "w-full",
    "h-[32px]",
    "py-1",
    "px-2",
    "border",
    "border-neutral-30",
    "rounded-[4px]",
    "text-neutral-60",
    "hover:border-neutral-90",
    "aria-selected:border-primary-00",
    "data-[invalid=true]:border-context-error-medium",
    "disabled:bg-neutral-10",
    "disabled:border-neutral-30",
  ].join(" ")

  return (
    <div className="flex flex-col gap-1 w-full">
      <label htmlFor={name} className="text-body-1 font-normal text-neutral-90">
        {label}{" "}
        {isRequired && <span className="text-context-error-medium">*</span>}
      </label>
      <Controller
        name={name}
        control={control}
        defaultValue={selectOptions[0]}
        render={({ field }) => (
          <select
            {...field}
            {...rest}
            className={inputClassNames}
            aria-selected={options.includes(getValues(name))}
            data-invalid={isInvalid}
          >
            {selectOptions.map((option, index) => (
              <option
                key={index}
                value={option}
                disabled={!isCustomerType && index === 0}
                className="bg-neutral-00 text-body-2 font-normal text-neutral-70 hover:bg-primary-00 hover:text-neutral-00 disabled:text-neutral-40"
              >
                {option}
              </option>
            ))}
          </select>
        )}
      />
    </div>
  )
}
