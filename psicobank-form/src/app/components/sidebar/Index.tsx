import SpeedIcon from "@mui/icons-material/Speed"
import GroupsIcon from "@mui/icons-material/Groups"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import LocalAtmIcon from "@mui/icons-material/LocalAtm"
import DescriptionIcon from "@mui/icons-material/Description"
import CampaignIcon from "@mui/icons-material/Campaign"
import SettingsIcon from "@mui/icons-material/Settings"
import BusinessIcon from "@mui/icons-material/Business"

export default function Sidebar() {
  return (
    <div className="phone:hidden tablet:flex flex-col fixed left-0 w-[90px] h-full bg-neutral-00 border-r border-r-neutral-40 py-2 px-1">
      <div className="py-4 flex flex-col items-center w-full gap-1">
        <SpeedIcon className="text-neutral-80 w-[20px] h-[auto]" />
        <span className="text-neutral-80 text-body-4">Painel</span>
      </div>
      <div className="py-4 flex flex-col items-center w-full gap-1">
        <GroupsIcon className="text-neutral-80 w-[20px] h-[auto]" />
        <span className="text-neutral-80 text-body-4">Clientes</span>
      </div>
      <div className="py-4 flex flex-col items-center w-full gap-1">
        <CalendarMonthIcon className="text-neutral-80 w-[20px] h-[auto]" />
        <span className="text-neutral-80 text-body-4">Agenda</span>
      </div>
      <div className="py-4 flex flex-col items-center w-full gap-1 bg-primary-00 rounded-2xl">
        <LocalAtmIcon className="text-neutral-00 w-[20px] h-[auto]" />
        <span className="text-neutral-00 text-body-4">Financeiro</span>
      </div>
      <div className="py-4 flex flex-col items-center w-full gap-1">
        <DescriptionIcon className="text-neutral-80 w-[20px] h-[auto]" />
        <span className="text-neutral-80 text-body-4">Relatórios</span>
      </div>
      <div className="py-4 flex flex-col items-center w-full gap-1">
        <CampaignIcon className="text-neutral-80 w-[20px] h-[auto]" />
        <span className="text-neutral-80 text-body-4">Marketing</span>
      </div>
      <div className="py-4 flex flex-col items-center w-full gap-1">
        <SettingsIcon className="text-neutral-80 w-[20px] h-[auto]" />
        <span className="text-neutral-80 text-body-4">Configuração</span>
      </div>
      <div className="py-4 flex flex-col items-center w-full gap-1">
        <BusinessIcon className="text-neutral-80 w-[20px] h-[auto]" />
        <span className="text-neutral-80 text-body-4">Minha clínica</span>
      </div>
    </div>
  )
}
