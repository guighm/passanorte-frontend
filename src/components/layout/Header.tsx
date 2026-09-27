type HeaderProps = {
  breadcrumb?: string;
};

export function Header({ breadcrumb = "Administração Municipal" }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 flex h-16 w-full items-center justify-between border-b border-[#eaedff] bg-[rgba(255,255,255,0.95)] px-6 pb-px backdrop-blur-[6px]">
      {/* Logo + breadcrumb */}
      <div className="flex items-center gap-4">
        <img
          src="/images/passanorte-logo.png"
          alt="PassaNorte"
          className="size-8 shrink-0"
        />
        <nav className="flex items-center gap-1">
          <span className="text-[12px] font-medium leading-4 tracking-[0.12px] text-[#414942]">
            PassaNorte
          </span>
          <img src="/icons/chevron-right.svg" alt="" className="h-[7px] w-[4.32px]" />
          <span className="text-[12px] font-semibold leading-4 tracking-[0.24px] text-[#131b2e]">
            {breadcrumb}
          </span>
        </nav>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-6">
        {/* Period selector */}
        <button
          type="button"
          className="flex shrink-0 items-center gap-1 rounded-[2px] border border-[rgba(192,201,192,0.4)] bg-[#f2f3ff] px-[9px] py-[5px]"
        >
          <img src="/icons/calendar.svg" alt="" className="h-[15px] w-[13.5px]" />
          <span className="text-[12px] leading-4 tracking-[0.12px] text-[#414942]">
            Período:
          </span>
          <span className="pl-1 pr-4 text-[12px] font-semibold leading-[15px] tracking-[0.24px] text-[#131b2e]">
            Últimos 7 dias
          </span>
        </button>

        <div className="flex items-center gap-4">
          {/* Alerts */}
          <button
            type="button"
            className="relative rounded-[2px] px-[6px] pb-3 pt-[6px]"
          >
            <img src="/icons/bell.svg" alt="" className="h-[16.67px] w-[13.33px]" />
            <span className="absolute right-[4.33px] top-1 size-2 rounded-full bg-[#ba1a1a]" />
          </button>

          <div className="h-6 w-px bg-[#eaedff]" />

          {/* User */}
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-full bg-[#002f19]">
              <img src="/icons/user-avatar.svg" alt="" className="size-3" />
            </div>
            <div>
              <div className="flex items-center gap-[6px]">
                <span className="text-[12px] font-semibold leading-[15px] tracking-[0.24px] text-[#131b2e]">
                  Carlos Eduardo Ramos
                </span>
                <span className="size-2 rounded-full bg-[#0d472b]" />
              </div>
              <p className="pb-[0.75px] text-[11px] font-semibold leading-[13.75px] tracking-[0.44px] text-[#414942]">
                Coordenador de Turismo (Manauscult)
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}