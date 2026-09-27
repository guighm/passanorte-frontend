"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  label: string;
  href: string;
  icon: string;
  iconSize: { w: number; h: number };
};

type NavSection = {
  title: string;
  items: NavItem[];
};

const SECTIONS: NavSection[] = [
  {
    title: "Visão Geral",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: "/icons/dashboard.svg", iconSize: { w: 16.5, h: 12.75 } },
    ],
  },
  {
    title: "Gestão Turística",
    items: [
      { label: "Pontos Turísticos", href: "/pontos-turisticos", icon: "/icons/pontos-turisticos.svg", iconSize: { w: 13.5, h: 14.25 } },
      { label: "Eventos", href: "/eventos", icon: "/icons/eventos.svg", iconSize: { w: 13.5, h: 15 } },
      { label: "Rotas & Roteiros", href: "/rotas", icon: "/icons/rotas.svg", iconSize: { w: 13.5, h: 13.5 } },
    ],
  },
  {
    title: "Gamificação & Recompensas",
    items: [
      { label: "Estoque de Benefícios", href: "/estoque-beneficios", icon: "/icons/estoque.svg", iconSize: { w: 15, h: 15 } },
      { label: "Concessão de Benefícios", href: "/concessao-beneficios", icon: "/icons/concessao.svg", iconSize: { w: 15, h: 15 } },
    ],
  },
  {
    title: "Sistema",
    items: [
      { label: "Servidores & Acessos", href: "/servidores", icon: "/icons/servidores.svg", iconSize: { w: 15, h: 15 } },
      { label: "Configurações", href: "/configuracoes", icon: "/icons/configuracoes.svg", iconSize: { w: 15.08, h: 15 } },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 flex h-screen w-64 shrink-0 flex-col justify-between bg-[#002f19] shadow-[0px_1px_4px_rgba(0,0,0,0.12)]">
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
        {/* Brand */}
        <div className="flex h-16 w-full shrink-0 items-center gap-2 border-b border-[#0d472b] px-4 pb-px">
          <img
            src="/images/passanorte-logo.png"
            alt="PassaNorte"
            className="size-8 max-w-64 shrink-0"
          />
          <div className="shrink-0">
            <p className="text-[16px] font-semibold leading-4 tracking-[-0.4px] text-white">
              PassaNorte
            </p>
            <p className="text-[11px] font-semibold uppercase leading-[14px] tracking-[0.55px] text-[#9ad3ad]">
              Manauscult / PMM
            </p>
          </div>
        </div>

        {/* Environment banner */}
        <div className="flex w-full shrink-0 flex-col gap-[5.5px] border-b border-[#0d472b] bg-[rgba(13,71,43,0.6)] px-4 pb-[11.5px] pt-2">
          <p className="text-[11px] font-semibold uppercase leading-[14px] tracking-[0.44px] text-[#9ad3ad]">
            Ambiente Governamental
          </p>
          <p className="text-[12px] font-medium leading-4 tracking-[0.12px] text-white">
            Gestão Central Manaus
          </p>
        </div>

        {/* Nav */}
        <nav className="flex min-h-0 flex-1 flex-col gap-4 px-2 py-4">
          {SECTIONS.map((section) => (
            <div key={section.title}>
              <p className="mb-[7px] px-2 text-[11px] font-semibold uppercase leading-[14px] tracking-[0.55px] text-[rgba(154,211,173,0.8)]">
                {section.title}
              </p>
              <ul className="flex flex-col gap-1">
                {section.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={pathname === item.href ? "page" : undefined}
                      className={`flex items-center gap-2 rounded-[4px] p-2 text-[#eef0ff] hover:bg-[rgba(13,71,43,0.6)] ${
                        pathname === item.href ? "bg-[rgba(182,240,200,0.14)]" : ""
                      }`}
                    >
                      <img
                        src={item.icon}
                        alt=""
                        style={{
                          width: item.iconSize.w,
                          height: item.iconSize.h,
                        }}
                      />
                      <span className="text-[14px] leading-5">{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      {/* Profile footer */}
      <div className="w-full shrink-0 border-t border-[#0d472b] px-4 pb-4 pt-[17px]">
        <div className="w-full rounded-[4px] bg-[rgba(13,71,43,0.7)]">
          <div className="flex flex-col items-start gap-1 p-2">
            <div className="flex w-full items-center justify-between">
              <p className="text-[11px] font-semibold uppercase leading-[14px] tracking-[0.44px] text-[#9ad3ad]">
                Perfil de Operação
              </p>
              <span className="size-2 rounded-full bg-[#b6f0c8]" />
            </div>
            <p className="text-[12px] font-semibold leading-4 tracking-[0.24px] text-white">
              Administrador Geral
            </p>
            <div className="flex w-full items-center justify-center rounded-[2px] border border-[#c0c9c0] bg-[#002f19] py-[5px] pl-[9px] pr-[21px]">
              <p className="w-full text-[12px] leading-[15px] tracking-[0.12px] text-[#eef0ff]">
                Administrador Geral
              </p>
            </div>
          </div>
        </div>
        <button
          type="button"
          className="mt-2 flex w-full items-center justify-between rounded-[4px] p-2 hover:bg-[rgba(13,71,43,0.6)]"
        >
          <span className="text-[12px] font-semibold leading-4 tracking-[0.24px] text-[#eef0ff]">
            Sair da Sessão
          </span>
          <img src="/icons/logout.svg" alt="" className="size-[13.5px]" />
        </button>
      </div>
    </aside>
  );
}