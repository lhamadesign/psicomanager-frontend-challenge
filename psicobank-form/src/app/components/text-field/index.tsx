import { useEffect, useState } from "react"
import { useFormContext, Controller } from "react-hook-form"

export type TextFieldProps = React.InputHTMLAttributes<
  HTMLInputElement | HTMLTextAreaElement
> & {
  name: string
  label: string
  defaultValue?: string
  multipleRows?: number
  isRequired?: boolean
}

export default function TextField({
  name,
  label,
  defaultValue,
  multipleRows,
  isRequired,
  ...rest
}: TextFieldProps) {
  const {
    control,
    getFieldState,
    getValues,
    formState: { errors },
  } = useFormContext()

  const [isInvalid, setIsInvalid] = useState(getFieldState(name).invalid)

  useEffect(() => {
    setIsInvalid(getFieldState(name).invalid)
  }, [errors])

  const inputClassNames = [
    "w-full",
    "min-h-[32px]",
    "py-1",
    "px-2",
    "border",
    "border-neutral-30",
    "rounded-[4px]",
    "text-neutral-60",
    "hover:border-neutral-90",
    "active:border-primary-00",
    "active:text-neutral-70",
    "focus:border-primary-00",
    "focus:text-neutral-70",
    "aria-active:border-primary-00",
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
        defaultValue={defaultValue || ""}
        aria-active={getValues(name) !== ""}
        render={({ field }) => {
          if (multipleRows && multipleRows > 1) {
            return (
              <textarea
                placeholder="Digite aqui"
                className={inputClassNames}
                {...field}
                {...rest}
                data-invalid={isInvalid}
                rows={multipleRows}
              />
            )
          }
          return (
            <input
              placeholder="Digite aqui"
              className={inputClassNames}
              {...field}
              {...rest}
              data-invalid={isInvalid}
              type={multipleRows && multipleRows > 1 ? "textarea" : "text"}
            />
          )
        }}
      />
    </div>
  )
}
