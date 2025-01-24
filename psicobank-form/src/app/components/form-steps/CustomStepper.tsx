import CheckIcon from "@mui/icons-material/Check"

export type CustomStepperProps = {
  isFirst?: boolean
  isLast?: boolean
  isMobileFriendly?: boolean
  state: "todo" | "in progress" | "done"
}

export default function CustomStepper(props: CustomStepperProps) {
  const { isFirst, isLast, state } = props

  const getStepIndicator = () => {
    switch (state) {
      case "todo":
        return (
          <div className="flex relative items-center justify-center phone:w-[20px] phone:h-[20px] tablet:w-[24px] tablet:h-[24px] bg-neutral-10 rounded-full">
            <div className="rounded-full phone:w-[10px] phone:h-[10px] w-[12px] h-[12px] bg-primary-20"></div>
          </div>
        )
      case "in progress":
        return (
          <div className="flex relative items-center justify-center phone:w-[20px] phone:h-[20px] tablet:w-[24px] tablet:h-[24px] bg-primary-20 rounded-full">
            <div className="rounded-full phone:w-[10px] phone:h-[10px] w-[12px] h-[12px] bg-neutral-10"></div>
          </div>
        )
      case "done":
        return (
          <div className="flex relative items-center justify-center phone:w-[20px] phone:h-[20px] tablet:w-[24px] tablet:h-[24px] border-2 border-primary-00 bg-primary-20 rounded-full">
            <CheckIcon className="text-primary-00 w-[80%] h-auto" />
          </div>
        )
      default:
        return <></>
    }
  }

  return <div className="w-full">{getStepIndicator()}</div>
}
