"use client";

import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";

type PerfilVariant = "operador" | "admin" | "fiscal" | "ex";
type StatusVariant = "ativo" | "online" | "licenca" | "revogado";
type ActionIcon =
  | "history"
  | "edit"
  | "ban"
  | "sliders"
  | "doc"
  | "restore"
  | "userSearch";

type Servidor = {
  iniciais: string;
  avatarBg: string;
  avatarText: string;
  avatarW: number;
  nome: string[];
  voce?: boolean;
  tachado?: boolean;
  matricula: string;
  lotacaoIcon: string;
  lotacaoIconSize: { w: number; h: number };
  lotacao: string[];
  lotacaoSub: string[];
  perfil: PerfilVariant;
  status: StatusVariant;
  acessoTop: string[];
  acessoSub: string[];
  acoes: ActionIcon[];
  dimmed?: boolean;
};

const SERVIDORES: Servidor[] = [
  {
    iniciais: "AS",
    avatarBg: "#aed6fe",
    avatarText: "#396285",
    avatarW: 30.67,
    nome: ["Ana Beatriz Souza"],
    matricula: "Matrícula: PMM-884.19",
    lotacaoIcon: "/icons/serv-pin.svg",
    lotacaoIconSize: { w: 10.667, h: 13.333 },
    lotacao: ["CAT 01 - Centro", "Histórico"],
    lotacaoSub: ["Largo de São Sebastião"],
    perfil: "operador",
    status: "ativo",
    acessoTop: ["Hoje, às 14:52"],
    acessoSub: ["IP: 10.12.44.18", "(Terminal 01)"],
    acoes: ["history", "edit", "ban"],
  },
  {
    iniciais: "CR",
    avatarBg: "#0d472b",
    avatarText: "#ffffff",
    avatarW: 26.88,
    nome: ["Carlos", "Eduardo", "Ramos"],
    voce: true,
    matricula: "Matrícula: PMM-402.11",
    lotacaoIcon: "/icons/serv-building.svg",
    lotacaoIconSize: { w: 13.333, h: 13.333 },
    lotacao: ["Sede Central", "Manauscult"],
    lotacaoSub: ["Av. André Araújo, Aleixo"],
    perfil: "admin",
    status: "online",
    acessoTop: ["Sessão Atual"],
    acessoSub: ["IP: 10.10.1.102", "(Intranet)"],
    acoes: ["sliders", "history"],
  },
  {
    iniciais: "JN",
    avatarBg: "#cee5ff",
    avatarText: "#001d32",
    avatarW: 30.67,
    nome: ["Jean Lima Nogueira"],
    matricula: "Matrícula: PMM-619.55",
    lotacaoIcon: "/icons/serv-plane.svg",
    lotacaoIconSize: { w: 13.333, h: 13.333 },
    lotacao: ["CAT 02 -", "Aeroporto"],
    lotacaoSub: ["Terminal Eduardo", "Gomes"],
    perfil: "operador",
    status: "ativo",
    acessoTop: ["Hoje, às 13:10"],
    acessoSub: ["IP: 10.12.82.04", "(Terminal 02)"],
    acoes: ["history", "edit", "ban"],
  },
  {
    iniciais: "VC",
    avatarBg: "#d2d9f4",
    avatarText: "#131b2e",
    avatarW: 30.34,
    nome: ["Valéria Pontes", "Castro"],
    matricula: "Matrícula: PMM-772.03",
    lotacaoIcon: "/icons/serv-waves.svg",
    lotacaoIconSize: { w: 13.333, h: 11.133 },
    lotacao: ["CAT 03 - Ponta", "Negra"],
    lotacaoSub: ["Calçadão da Orla"],
    perfil: "operador",
    status: "ativo",
    acessoTop: ["Hoje, às 09:44"],
    acessoSub: ["IP: 10.12.19.11", "(Terminal 01)"],
    acoes: ["history", "edit", "ban"],
  },
  {
    iniciais: "RT",
    avatarBg: "rgba(255,183,125,0.4)",
    avatarText: "#411f00",
    avatarW: 30.63,
    nome: ["Rodrigo Tavares", "Melo"],
    matricula: "Matrícula: PMM-339.81",
    lotacaoIcon: "/icons/serv-fiscal.svg",
    lotacaoIconSize: { w: 12, h: 12 },
    lotacao: ["Fiscalização", "Externa"],
    lotacaoSub: ["Equipe de Roteiros", "Náuticos"],
    perfil: "fiscal",
    status: "licenca",
    acessoTop: ["12/03/2025 às 17:05"],
    acessoSub: ["IP: 187.64.91.200", "(Tablet Móvel)"],
    acoes: ["doc", "history"],
  },
  {
    iniciais: "PF",
    avatarBg: "#ffdad6",
    avatarText: "#ba1a1a",
    avatarW: 30.33,
    nome: ["Priscila Fernandes", "Braga"],
    tachado: true,
    matricula: "Matrícula: PMM-901.44",
    lotacaoIcon: "/icons/serv-boat.svg",
    lotacaoIconSize: { w: 12.297, h: 13.333 },
    lotacao: ["CAT 04 - Porto", "de Manaus"],
    lotacaoSub: ["Terminal Flutuante", "Roadway"],
    perfil: "ex",
    status: "revogado",
    acessoTop: ["Desligamento:", "28/02/2025"],
    acessoSub: ["Revogado por Admin", "(Manauscult)"],
    acoes: ["restore", "userSearch"],
    dimmed: true,
  },
];

const ACTION_ICONS: Record<ActionIcon, { src: string; w: number; h: number }> = {
  history: { src: "/icons/serv-act-history.svg", w: 15, h: 15 },
  edit: { src: "/icons/serv-act-edit.svg", w: 13.5, h: 13.5 },
  ban: { src: "/icons/serv-act-ban.svg", w: 15, h: 15 },
  sliders: { src: "/icons/serv-act-sliders.svg", w: 13.5, h: 13.5 },
  doc: { src: "/icons/serv-act-doc.svg", w: 12, h: 15 },
  restore: { src: "/icons/serv-act-restore.svg", w: 12, h: 13.837 },
  userSearch: { src: "/icons/serv-act-user-search.svg", w: 15, h: 9.75 },
};

const GRID_COLS =
  "grid grid-cols-[166.39fr_187.33fr_164.22fr_135.66fr_171.47fr_150.93fr]";

function PerfilBadge({ variant }: { variant: PerfilVariant }) {
  if (variant === "admin") {
    return (
      <div className="flex items-center gap-1 rounded-[12px] bg-[#0d472b] py-[2px] pl-2 pr-[27px]">
        <img
          src="/icons/serv-admin-badge.svg"
          alt=""
          className="h-[10.5px] w-[11px]"
        />
        <span className="whitespace-nowrap text-[11px] font-semibold uppercase leading-[14px] tracking-[0.44px] text-white">
          Administrador
          <br />
          Geral
        </span>
      </div>
    );
  }
  if (variant === "operador") {
    return (
      <div className="flex items-center gap-1 rounded-[12px] bg-[#e2e7ff] py-[2px] pl-2 pr-[35px]">
        <span className="h-[6px] w-[4.69px] rounded-[12px] bg-[#396285]" />
        <span className="whitespace-nowrap text-[11px] font-semibold uppercase leading-[14px] tracking-[0.44px] text-[#131b2e]">
          Operador CAT
          <br />
          (Restrito)
        </span>
      </div>
    );
  }
  if (variant === "fiscal") {
    return (
      <div className="flex items-center gap-1 rounded-[12px] bg-[#e2e7ff] px-2 py-[2px]">
        <span className="size-[6px] rounded-[12px] bg-[#411f00]" />
        <span className="whitespace-nowrap text-[11px] font-semibold uppercase leading-[14px] tracking-[0.44px] text-[#131b2e]">
          Fiscal de Campo
        </span>
      </div>
    );
  }
  return (
    <div className="flex items-center rounded-[12px] bg-[#eaedff] py-[2px] pl-2 pr-[51px]">
      <span className="whitespace-nowrap text-[11px] font-semibold uppercase leading-[14px] tracking-[0.44px] text-[#414942]">
        Ex-Operador
        <br />
        Temporário
      </span>
    </div>
  );
}

function StatusBadge({ variant }: { variant: StatusVariant }) {
  if (variant === "ativo") {
    return (
      <div className="flex items-center gap-[6px] rounded-[12px] bg-[rgba(182,240,200,0.6)] px-2 py-[2px]">
        <span className="size-2 rounded-[12px] bg-[#0d472b]" />
        <span className="whitespace-nowrap text-[11px] font-semibold uppercase leading-[14px] tracking-[0.44px] text-[#002f19]">
          Ativo
        </span>
      </div>
    );
  }
  if (variant === "online") {
    return (
      <div className="flex items-center gap-[6px] rounded-[12px] bg-[rgba(182,240,200,0.6)] py-[2px] pl-2 pr-[45px]">
        <span className="h-2 w-[7.94px] rounded-[12px] bg-[#0d472b]" />
        <span className="whitespace-nowrap text-[11px] font-semibold uppercase leading-[14px] tracking-[0.44px] text-[#002f19]">
          Online
          <br />
          Agora
        </span>
      </div>
    );
  }
  if (variant === "licenca") {
    return (
      <div className="flex items-center gap-[6px] rounded-[12px] bg-[#ffdcc3] py-[2px] pl-2 pr-[38px]">
        <span className="h-2 w-[6.69px] rounded-[12px] bg-[#411f00]" />
        <span className="whitespace-nowrap text-[11px] font-semibold uppercase leading-[14px] tracking-[0.44px] text-[#411f00]">
          Licença
          <br />
          Médica
        </span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-[6px] rounded-[12px] bg-[#ffdad6] py-[2px] pl-2 pr-[27px]">
      <span className="h-2 w-[5.94px] rounded-[12px] bg-[#ba1a1a]" />
      <span className="whitespace-nowrap text-[11px] font-semibold uppercase leading-[14px] tracking-[0.44px] text-[#ba1a1a]">
        Acesso
        <br />
        Revogado
      </span>
    </div>
  );
}

function MetricCard({
  label,
  icon,
  iconSize,
  iconBg,
  children,
}: {
  label: string;
  icon: string;
  iconSize: { w: number; h: number };
  iconBg: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 flex-col justify-between rounded-[8px] bg-white p-4 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
      <div className="flex w-full items-center justify-between">
        <span className="text-[12px] font-semibold leading-4 tracking-[0.24px] text-[#414942]">
          {label}
        </span>
        <div
          className="flex size-8 items-center justify-center rounded-[4px]"
          style={{ backgroundColor: iconBg }}
        >
          <img
            src={icon}
            alt=""
            style={{ width: iconSize.w, height: iconSize.h }}
          />
        </div>
      </div>
      <div className="flex w-full flex-col gap-1 pt-4">{children}</div>
    </div>
  );
}

export default function ServidoresPage() {
  const [busca, setBusca] = useState("");
  const [lotacao, setLotacao] = useState("todos");
  const [perfil, setPerfil] = useState("todos");
  const [status, setStatus] = useState("todos");
  const [pagina, setPagina] = useState(1);

  const filtros = (
    onSelect: (value: string) => void,
    value: string,
    label: string,
    options: { value: string; label: string }[],
    width: number,
  ) => (
    <select
      value={value}
      onChange={(event) => onSelect(event.target.value)}
      aria-label={label}
      style={{ width }}
      className="h-10 appearance-none rounded-[4px] bg-white py-px pl-3 pr-6 text-[12px] font-semibold leading-[15px] tracking-[0.24px] text-[#131b2e] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] focus:outline-2 focus:outline-[#0d472b]"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );

  return (
    <AppShell breadcrumb="Servidores & Acessos">
      <div className="flex w-full flex-col pb-8">
        {/* 1. Cabeçalho da página */}
        <header className="flex w-full items-center justify-between py-6">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1">
              <img
                src="/icons/serv-shield.svg"
                alt=""
                className="h-[12.5px] w-[10px]"
              />
              <p className="uppercase leading-[24px] tracking-[0.8px] text-[#396285]">
                Sistema &amp; Segurança
                <br />
                Institucional
              </p>
              <p className="px-2 uppercase leading-[24px] tracking-[0.8px] text-[#c0c9c0]">
                •
              </p>
              <p className="uppercase leading-[24px] tracking-[0.8px] text-[#396285]">
                Gestão de Recursos Humanos
                <br />e Acessos
              </p>
            </div>
            <h1 className="text-[32px] font-bold leading-[40px] tracking-[-0.8px] text-[#131b2e]">
              Servidores &amp; Controle de Acessos
            </h1>
            <p className="max-w-[768px] text-[14px] leading-5 text-[#414942]">
              Administração de operadores credenciados, fiscais de campo e
              atendentes dos Centros de Atendimento ao Turista (CATs) do
              Município de Manaus.
            </p>
          </div>
          <div className="flex flex-col items-start justify-center gap-2 pr-[123.83px]">
            <button
              type="button"
              className="flex items-center gap-1 rounded-[4px] bg-[#e2e7ff] px-4 py-2 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]"
            >
              <img src="/icons/serv-export.svg" alt="" className="size-3" />
              <span className="whitespace-nowrap text-[12px] font-semibold leading-4 tracking-[0.24px] text-[#131b2e]">
                Exportar Auditoria (PDF/CSV)
              </span>
            </button>
            <button
              type="button"
              className="flex items-center gap-1 rounded-[4px] bg-[#002f19] px-4 py-2 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]"
            >
              <img
                src="/icons/serv-users-plus.svg"
                alt=""
                className="h-3 w-[16.5px]"
              />
              <span className="whitespace-nowrap text-[12px] font-semibold leading-4 tracking-[0.24px] text-white">
                + Cadastrar Novo Servidor
              </span>
            </button>
          </div>
        </header>

        {/* 2. Painel de indicadores */}
        <section className="flex w-full items-start justify-center gap-4 pb-6">
          <MetricCard
            label="Total Servidores Ativos"
            icon="/icons/serv-card-badge.svg"
            iconSize={{ w: 16.667, h: 16.667 }}
            iconBg="#f2f3ff"
          >
            <p className="text-[32px] font-bold leading-8 tracking-[-0.64px] text-[#131b2e]">
              48
            </p>
            <div className="flex items-center gap-1">
              <p className="text-[11px] font-semibold uppercase leading-[14px] tracking-[0.44px] text-[#0d472b]">
                100%
                <br />
                Homologados
              </p>
              <p className="pl-[10px] text-[12px] leading-4 tracking-[0.12px] text-[#414942]">
                em 8 postos
                <br />
                municipais
              </p>
            </div>
          </MetricCard>
          <MetricCard
            label="Atendentes nos CATs"
            icon="/icons/serv-card-atendente.svg"
            iconSize={{ w: 16.667, h: 15 }}
            iconBg="rgba(174,214,254,0.4)"
          >
            <p className="text-[32px] font-bold leading-8 tracking-[-0.64px] text-[#131b2e]">
              32
            </p>
            <div className="flex items-center gap-1">
              <div className="rounded-[2px] bg-[#e2e7ff] px-[6px] py-[2px]">
                <p className="text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#396285]">
                  Perfil
                  <br />
                  Restrito
                </p>
              </div>
              <p className="pl-[10px] text-[12px] leading-4 tracking-[0.12px] text-[#414942]">
                Benefícios /
                <br />
                Validação
              </p>
            </div>
          </MetricCard>
          <MetricCard
            label="Administradores Gerais"
            icon="/icons/serv-card-admin.svg"
            iconSize={{ w: 15, h: 16.667 }}
            iconBg="rgba(154,211,173,0.3)"
          >
            <p className="text-[32px] font-bold leading-8 tracking-[-0.64px] text-[#131b2e]">
              04
            </p>
            <div className="flex items-center gap-1">
              <p className="text-[11px] font-medium uppercase leading-[14px] tracking-[0.44px] text-[#131b2e]">
                Permissão
                <br />
                Master
              </p>
              <p className="pl-[10px] text-[12px] leading-4 tracking-[0.12px] text-[#414942]">
                CTI /
                <br />
                Manauscult
              </p>
            </div>
          </MetricCard>
          <MetricCard
            label="Sessões Conectadas Hoje"
            icon="/icons/serv-card-sessions.svg"
            iconSize={{ w: 15, h: 16.667 }}
            iconBg="#eaedff"
          >
            <div className="flex items-center gap-1">
              <p className="text-[32px] font-bold leading-8 tracking-[-0.64px] text-[#131b2e]">
                29
              </p>
              <span className="size-2 rounded-[12px] bg-[#0d472b]" />
              <span className="text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#0d472b]">
                Terminais ativos
              </span>
            </div>
            <p className="w-full text-[12px] leading-4 tracking-[0.12px] text-[#414942]">
              Via VPN GovManaus / Intranet
            </p>
          </MetricCard>
        </section>

        {/* 4. Tabela de listagem de servidores & acessos */}
        <section className="w-full overflow-clip rounded-[8px] bg-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
          {/* Barra de filtros e busca */}
          <div className="flex w-full items-center justify-between bg-[#f2f3ff] p-4">
            <div className="relative w-[360px]">
              <input
                type="text"
                value={busca}
                onChange={(event) => setBusca(event.target.value)}
                placeholder="Buscar por nome, matrícula ou e-mail..."
                aria-label="Buscar servidor"
                className="h-10 w-full rounded-[4px] bg-white py-[11.5px] pl-9 pr-3 text-[14px] text-[#131b2e] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] placeholder:text-[rgba(65,73,66,0.7)] focus:outline-2 focus:outline-[#0d472b]"
              />
              <img
                src="/icons/serv-search.svg"
                alt=""
                className="absolute left-[14px] top-1/2 size-[13.5px] -translate-y-1/2"
              />
            </div>
            <div className="flex w-[568px] flex-col items-start gap-2">
              <div className="flex items-start gap-7">
                {filtros(
                  setLotacao,
                  lotacao,
                  "Filtrar por lotação",
                  [
                    { value: "todos", label: "Lotação: Todos os Postos" },
                    { value: "cat01", label: "Lotação: CAT 01 - Centro" },
                    { value: "cat02", label: "Lotação: CAT 02 - Aeroporto" },
                    { value: "cat03", label: "Lotação: CAT 03 - Ponta Negra" },
                    { value: "cat04", label: "Lotação: CAT 04 - Porto" },
                    { value: "sede", label: "Lotação: Sede Central" },
                    { value: "fiscal", label: "Lotação: Fiscalização Externa" },
                  ],
                  232,
                )}
                {filtros(
                  setPerfil,
                  perfil,
                  "Filtrar por perfil",
                  [
                    { value: "todos", label: "Perfil: Todos os Acessos" },
                    { value: "admin", label: "Perfil: Administrador Geral" },
                    { value: "operador", label: "Perfil: Operador CAT" },
                    { value: "fiscal", label: "Perfil: Fiscal de Campo" },
                  ],
                  208,
                )}
              </div>
              {filtros(
                setStatus,
                status,
                "Filtrar por status",
                [
                  { value: "todos", label: "Status: Todos" },
                  { value: "ativo", label: "Status: Ativo" },
                  { value: "licenca", label: "Status: Licença Médica" },
                  { value: "revogado", label: "Status: Acesso Revogado" },
                ],
                130,
              )}
            </div>
          </div>

          {/* Tabela responsiva */}
          <div className="w-full">
            {/* Header */}
            <div
              className={`${GRID_COLS} w-full items-start bg-[rgba(226,231,255,0.6)]`}
            >
              <div className="px-4 py-3">
                <p className="text-[11px] font-bold uppercase leading-[14px] tracking-[0.55px] text-[#414942]">
                  Servidor &amp;
                  <br />
                  Identificação
                </p>
              </div>
              <div className="px-4 py-3">
                <p className="text-[11px] font-bold uppercase leading-[14px] tracking-[0.55px] text-[#414942]">
                  Lotação / Posto
                  <br />
                  Designado
                </p>
              </div>
              <div className="px-4 py-[19px]">
                <p className="text-[11px] font-bold uppercase leading-[14px] tracking-[0.55px] text-[#414942]">
                  Perfil de Privilégio
                </p>
              </div>
              <div className="px-4 py-[19px]">
                <p className="text-[11px] font-bold uppercase leading-[14px] tracking-[0.55px] text-[#414942]">
                  Status
                </p>
              </div>
              <div className="px-4 py-3">
                <p className="text-[11px] font-bold uppercase leading-[14px] tracking-[0.55px] text-[#414942]">
                  Último Acesso /
                  <br />
                  Terminal
                </p>
              </div>
              <div className="flex flex-col items-end px-4 py-3">
                <p className="text-right text-[11px] font-bold uppercase leading-[14px] tracking-[0.55px] text-[#414942]">
                  Ações de
                  <br />
                  Gestão
                </p>
              </div>
            </div>

            {/* Body */}
            <div className="flex w-full flex-col">
              {SERVIDORES.map((servidor, index) => (
                <div
                  key={servidor.iniciais}
                  className={`${GRID_COLS} w-full items-center border-[#e2e7ff] pt-px ${
                    index > 0 ? "border-t" : ""
                  } ${servidor.dimmed ? "opacity-75" : ""}`}
                >
                  {/* Servidor & identificação */}
                  <div className="flex items-center gap-2 px-4 py-[10px]">
                    <div
                      className="flex h-9 shrink-0 items-center justify-center rounded-[12px]"
                      style={{
                        backgroundColor: servidor.avatarBg,
                        width: servidor.avatarW,
                      }}
                    >
                      <span
                        className="text-[12px] font-bold leading-4 tracking-[0.24px]"
                        style={{ color: servidor.avatarText }}
                      >
                        {servidor.iniciais}
                      </span>
                    </div>
                    <div className="flex min-w-0 flex-col">
                      <div className="flex items-center gap-1">
                        <p
                          className={`text-[12px] font-semibold leading-4 tracking-[0.24px] text-[#131b2e] ${
                            servidor.tachado
                              ? "decoration-solid decoration-from-font line-through"
                              : ""
                          }`}
                        >
                          {servidor.nome.map((linha, linhaIndex) => (
                            <span key={linhaIndex} className="block">
                              {linha}
                            </span>
                          ))}
                        </p>
                        {servidor.voce && (
                          <span className="rounded-[2px] bg-[#eaedff] px-[6px] text-[10px] leading-[15px] text-[#002f19]">
                            Você
                          </span>
                        )}
                      </div>
                      <p className="whitespace-nowrap text-[13px] font-medium leading-[18px] tracking-[0.26px] text-[#414942]">
                        {servidor.matricula}
                      </p>
                    </div>
                  </div>

                  {/* Lotação / posto designado */}
                  <div className="flex flex-col gap-[5.5px] py-[10px] pl-8 pr-4">
                    <div className="flex items-center gap-[6px]">
                      <img
                        src={servidor.lotacaoIcon}
                        alt=""
                        style={{
                          width: servidor.lotacaoIconSize.w,
                          height: servidor.lotacaoIconSize.h,
                        }}
                      />
                      <p className="min-w-max text-[14px] leading-5 text-[#131b2e]">
                        {servidor.lotacao.map((linha, linhaIndex) => (
                          <span key={linhaIndex} className="block">
                            {linha}
                          </span>
                        ))}
                      </p>
                    </div>
                    <p className="min-w-max text-[12px] leading-4 tracking-[0.12px] text-[#414942]">
                      {servidor.lotacaoSub.map((linha, linhaIndex) => (
                        <span key={linhaIndex} className="block">
                          {linha}
                        </span>
                      ))}
                    </p>
                  </div>

                  {/* Perfil de privilégio */}
                  <div className="flex flex-col items-start px-4 py-[10px]">
                    <PerfilBadge variant={servidor.perfil} />
                  </div>

                  {/* Status */}
                  <div className="flex flex-col items-start px-4 py-[10px]">
                    <StatusBadge variant={servidor.status} />
                  </div>

                  {/* Último acesso / terminal */}
                  <div className="flex flex-col px-4 py-[10px]">
                    <p className="text-[12px] leading-4 tracking-[0.12px] text-[#131b2e]">
                      {servidor.acessoTop.map((linha, linhaIndex) => (
                        <span key={linhaIndex} className="block">
                          {linha}
                        </span>
                      ))}
                    </p>
                    <p className="min-w-max text-[13px] font-medium leading-[18px] tracking-[0.26px] text-[#414942]">
                      {servidor.acessoSub.map((linha, linhaIndex) => (
                        <span key={linhaIndex} className="block">
                          {linha}
                        </span>
                      ))}
                    </p>
                  </div>

                  {/* Ações de gestão */}
                  <div className="flex items-center justify-end gap-1 py-[10px] pl-4 pr-4">
                    {servidor.acoes.map((acao, acaoIndex) => {
                      const icon = ACTION_ICONS[acao];
                      return (
                        <button
                          key={`${servidor.iniciais}-${acaoIndex}`}
                          type="button"
                          aria-label="Ação de gestão"
                          className="flex items-center justify-center rounded-[2px] px-[6px] py-[6px]"
                        >
                          <img
                            src={icon.src}
                            alt=""
                            style={{ width: icon.w, height: icon.h }}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Paginação & rodapé de controle */}
          <div className="flex w-full items-center justify-between bg-[#f2f3ff] px-4 py-4">
            <p className="text-[12px] leading-4 tracking-[0.12px] text-[#414942]">
              Mostrando <span className="text-[#131b2e]">6</span> de{" "}
              <span className="text-[#131b2e]">48</span> servidores
              credenciados
            </p>
            <div className="flex items-center gap-1">
              <button
                type="button"
                aria-label="Página anterior"
                disabled={pagina === 1}
                onClick={() => setPagina((value) => Math.max(1, value - 1))}
                className={`flex items-center justify-center rounded-[2px] bg-white px-[6px] py-[6px] ${
                  pagina === 1 ? "opacity-40" : ""
                }`}
              >
                <img
                  src="/icons/serv-chev-left.svg"
                  alt=""
                  className="h-[9px] w-[5.55px]"
                />
              </button>
              {[1, 2, 3, 4].map((numero) => (
                <button
                  key={numero}
                  type="button"
                  onClick={() => setPagina(numero)}
                  className={`rounded-[2px] px-3 py-1 text-[11px] font-semibold leading-[14px] tracking-[0.44px] ${
                    numero === pagina
                      ? "bg-[#002f19] text-white"
                      : "bg-white text-[#131b2e]"
                  }`}
                >
                  {numero}
                </button>
              ))}
              <button
                type="button"
                aria-label="Próxima página"
                disabled={pagina === 4}
                onClick={() => setPagina((value) => Math.min(4, value + 1))}
                className={`flex items-center justify-center rounded-[2px] bg-white px-[6px] py-[6px] ${
                  pagina === 4 ? "opacity-40" : ""
                }`}
              >
                <img
                  src="/icons/serv-chev-right.svg"
                  alt=""
                  className="h-[9px] w-[5.55px]"
                />
              </button>
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}