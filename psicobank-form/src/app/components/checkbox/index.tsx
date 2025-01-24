import Image from "next/image"
import { useFormContext, Controller } from "react-hook-form"

export type CheckboxProps = {
  name: string
  label: string
  value: string
}

export default function Checkbox({
  name,
  label,
  value,
  ...rest
}: CheckboxProps) {
  const { control } = useFormContext()

  return (
    <div className="w-full flex gap-4 items-center relative">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <>
            <input
              type="checkbox"
              id={`${name}-${value}`}
              className="peer relative appearance-none w-4 h-4 border border-neutral-50 rounded-sm bg-neutral-00 focus:outline-none focus:ring-offset-0 focus:ring-1 focus:ring-primary-00 checked:bg-primary-00 checked:border-0"
              {...field}
              {...rest}
            />
            <Image
              src="/assets/checked.svg"
              alt="Checked icon"
              width={0}
              height={0}
              className="w-[11px] h-[8px] absolute ml-0.5 pointer-events-none hidden peer-checked:block stroke-neutral-00 outline-none"
            />
          </>
        )}
      />
      <label
        className="text-neutral-90 text-body-1"
        htmlFor={`${name}-${value}`}
      >
        {label}
      </label>
    </div>
  )
}
