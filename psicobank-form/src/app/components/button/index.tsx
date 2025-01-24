import React from "react"

export type ButtonProps = {
  type: "submit" | "button" | "reset"
  context: "primary" | "secondary" | "tertiary"
  isDisabled?: boolean
  children: React.ReactNode
  onClick?: () => void
}

const ButtonClassNamesByContext = new Map<string, string>([
  [
    "primary",
    "bg-primary-00 border text-primary-10 border-primary-00 text-body-1 font-normal hover:bg-primary-30 hover:border-primary-30 disabled:bg-neutral-30 disabled:border-neutral-30",
  ],
  [
    "secondary",
    "bg-neutral-00 border border-primary-00 text-primary-00 text-body-1 font-normal hover:bg-primary-10 hover:border-primary-00 disabled:bg-neutral-05 disabled:border-neutral-30 disabled:text-neutral-30",
  ],
  [
    "tertiary",
    "bg-neutral-00 border border-neutral-60 text-neutral-60 text-body-1 font-normal hover:text-neutral-90 hover:bg-neutral-00 hover:border-neutral-90 disabled:text-neutral-30 disabled:bg-neutral-05 disabled:border-neutral-30",
  ],
])

const getButtonClassNames = (context: string): string => {
  const defaultButtonClasses =
    "px-[16px] py-1 rounded-[4px] flex items-center gap-2 gap-[10px] text-body-2 h-[32px]"
  const contextClasses = ButtonClassNamesByContext.get(context) || ""

  return defaultButtonClasses + " " + contextClasses
}

export default function Button({
  type,
  children,
  isDisabled,
  context,
  onClick,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={getButtonClassNames(context)}
      disabled={isDisabled}
    >
      {children}
    </button>
  )
}
