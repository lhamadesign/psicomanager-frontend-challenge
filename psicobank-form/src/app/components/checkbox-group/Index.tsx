import Image from "next/image"
import { useEffect, useState } from "react"
import { useFormContext } from "react-hook-form"

type CheckboxGroupProps = {
  name: string
  label: string
  options: readonly string[]
}

export default function CheckboxGroup(props: CheckboxGroupProps) {
  const { name, label, options } = props
  const { setValue } = useFormContext()
  const [selectedValues, setSelectedValues] = useState<string[]>([])

  const handleChange = (value: string) => {
    setSelectedValues((previousValues) => {
      const newValues = [...previousValues]
      const valueIndex = newValues.findIndex((item) => item === value)
      if (valueIndex === -1) {
        newValues.push(value)
      } else {
        newValues.splice(valueIndex, 1)
      }
      return newValues
    })
  }

  useEffect(() => {
    setValue(name, selectedValues)
  }, [selectedValues])

  return (
    <div>
      <label htmlFor={name} className="text-body-1 text-neutral-80 font-bold">
        {label} <span className="text-context-error-medium">*</span>
      </label>

      {options.map((option, index) => (
        <div key={index} className="w-full flex gap-4 items-center relative">
          <input
            type="checkbox"
            id={`checkbox-${option}`}
            checked={selectedValues.includes(option)}
            onChange={() => handleChange(option)}
            className="peer relative appearance-none w-4 h-4 border border-neutral-50 rounded-sm bg-neutral-00 focus:outline-none focus:ring-offset-0 focus:ring-1 focus:ring-primary-00 checked:bg-primary-00 checked:border-0"
          />
          <Image
            src="/assets/checked.svg"
            alt="Checked icon"
            width={0}
            height={0}
            className="w-[11px] h-[8px] absolute ml-0.5 pointer-events-none hidden peer-checked:block stroke-neutral-00 outline-none"
          />
          <label
            className="text-neutral-90 text-body-1"
            htmlFor={`checkbox-${option}`}
          >
            {option}
          </label>
        </div>
      ))}
    </div>
  )
}
