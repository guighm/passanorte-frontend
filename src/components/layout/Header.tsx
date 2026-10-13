"use client";

import { useMe } from "@/hooks/useMe";

type HeaderProps = {
  breadcrumb?: string;
  onMenuClick?: () => void;
};

const ROLE_LABELS: Record<string, string> = {
  admin: "Administrador Geral (Manauscult)",
  employee: "Operador da Rede Manauscult",
};

export function Header({
  breadcrumb = "Administração Municipal",
  onMenuClick,
}: HeaderProps) {
  const [me] = useMe();
  return (
    <header className="sticky top-0 z-10 flex h-16 w-full items-center justify-between border-b border-[#eaedff] bg-[rgba(255,255,255,0.95)] px-4 pb-px backdrop-blur-[6px] md:px-6">
      {/* Logo + breadcrumb */}
      <div className="flex min-w-0 items-center gap-2 md:gap-4">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Abrir menu de navegação"
          aria-expanded={false}
          className="-ml-1 flex shrink-0 items-center rounded-[4px] p-2 hover:bg-[#eaedff] lg:hidden"
        >
          <img src="/icons/menu.svg" alt="" className="h-4 w-4" />
        </button>
        <img
          src="/images/passanorte-logo.png"
          alt="PassaNorte"
          className="size-8 shrink-0"
        />
        <nav className="flex min-w-0 items-center gap-1">
          <span className="shrink-0 text-[12px] font-medium leading-4 tracking-[0.12px] text-[#414942]">
            PassaNorte
          </span>
          <img
            src="/icons/chevron-right.svg"
            alt=""
            className="h-[7px] w-[4.32px] shrink-0"
          />
          <span className="truncate text-[12px] font-semibold leading-4 tracking-[0.24px] text-[#131b2e]">
            {breadcrumb}
          </span>
        </nav>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 md:gap-6">
        {/* Period selector */}
        <button
          type="button"
          className="hidden shrink-0 items-center gap-1 rounded-[2px] border border-[rgba(192,201,192,0.4)] bg-[#f2f3ff] px-[9px] py-[5px] sm:flex"
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

          <div className="hidden h-6 w-px bg-[#eaedff] sm:block" />

          {/* User */}
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-full bg-[#002f19]">
              <img src="/icons/user-avatar.svg" alt="" className="size-3" />
            </div>
            <div>
              <div className="flex items-center gap-[6px]">
                <span className="text-[12px] font-semibold leading-[15px] tracking-[0.24px] text-[#131b2e]">
                  {me ? `${me.name} ${me.surname}` : "Carregando..."}
                </span>
                <span className="size-2 rounded-full bg-[#0d472b]" />
              </div>
              <p className="hidden pb-[0.75px] text-[11px] font-semibold leading-[13.75px] tracking-[0.44px] text-[#414942] md:block">
                {me ? ROLE_LABELS[me.role] || me.role : "—"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}