import Image from "next/image"

export default function Header() {
  return (
    <header className="phone:h-[45px] tablet:h-[49px] desktop:h-[56px] flex justify-between bg-nenutral-00 px-4 py-2 border-b border-b-neutral-40">
      <div className="flex gap-5">
        <button className="tablet:hidden pr-6" type="button">
          <Image
            src="/assets/menu.png"
            width={0}
            height={0}
            alt="Toggle Sidemenu"
            className="w-[16px] h-[16px]"
          />
        </button>
        <div className="flex items-center phone:hidden tablet:block border-r border-r-neutral-10 px-4 py-1.5">
          <Image
            src="/assets/Logo PsicoManager.svg"
            width={0}
            height={0}
            alt="Logo PsicoManager"
            className="w-[137px] h-[22px]"
          />
        </div>

        <div className="flex items-center phone:px-2 phone:py-2 phone:border-2 gap-2 px-4  py-1 border border-neutral-60 rounded-lg bg-neutral-00">
          <Image
            src="/assets/search_icon.svg"
            width={0}
            height={0}
            alt="search icon"
            className="text-neutral-60 w-[16px] h-[16px]"
          />
          <span className="phone:hidden md:block text-neutral-60 text-body-1">
            Buscar cliente
          </span>
          <Image
            src="/assets/caret-down.svg"
            width={0}
            height={0}
            alt="dropdown"
            className="text-neutral-60 w-[14px] h-[14px]"
          />
        </div>
      </div>

      <div className="flex gap-6">
        <Image
          src="/assets/camera.svg"
          width={0}
          height={0}
          alt="camera icon"
          className="text-primary-40 w-[21px] h-[auto]"
        />
        <div className="relative flex items-center">
          <Image
            src="/assets/bell.svg"
            width={0}
            height={0}
            alt="notifications icon"
            className="text-primary-40 w-[21px] h-[auto]"
          />
          <span className="absolute text-center top-0 -right-2 w-4 h-4 rounded-full flex justify-center items-center bg-context-error-medium text-[9px] text-neutral-00">
            <span className="">01</span>
          </span>
        </div>

        <div className="flex items-center gap-1">
          <span className="w-[30px] h-[30px] rounded-full flex justify-center items-center bg-neutral-60">
            <span className="text-neutral-00 text-body-1 font-bold">LD</span>
          </span>
          <Image
            src="/assets/caret-down.svg"
            width={0}
            height={0}
            alt="dropdown"
            className="text-neutral-80 w-[10px] h-[auto]"
          />
        </div>
      </div>
    </header>
  )
}
