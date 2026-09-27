"use client";

import { useState, type ReactNode } from "react";
import { AppShell } from "@/components/layout/AppShell";

/* ---------------------------------- Header --------------------------------- */

function SectionHeader() {
  return (
    <div className="flex flex-col pb-6">
      <div className="flex items-end justify-between pt-2">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <span className="text-[11px] font-semibold uppercase leading-[14px] tracking-[0.55px] text-[#0d472b]">
              Gestão Turística &amp; Cultural
            </span>
            <span className="text-[16px] leading-6 text-[#c0c9c0]">•</span>
            <span className="text-[11px] font-semibold uppercase leading-[14px] tracking-[0.55px] text-[#396285]">
              Manauscult
            </span>
            <span className="text-[16px] leading-6 text-[#c0c9c0]">•</span>
            <span className="text-[11px] font-semibold uppercase leading-[14px] tracking-[0.55px] text-[#414942]">
              Prefeitura de Manaus
            </span>
          </div>
          <h1 className="text-[32px] font-bold leading-10 tracking-[-0.8px] text-[#131b2e]">
            Gerenciamento de Eventos &amp;
            <br />
            Programação Cultural
          </h1>
          <p className="max-w-[468px] text-[14px] leading-5 text-[#414942]">
            Agenda oficial integrada aos pontos turísticos de Manaus. Controle
            municipal de datas, cotas de lotação, bilhetagem gratuita ou
            tarifada e sincronização em tempo real com o aplicativo cidadão
            PassaNorte.
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            className="flex items-center gap-1 rounded-[4px] bg-[#f2f3ff] px-4 py-2 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]"
          >
            <img src="/icons/eventos-icon-export.svg" alt="" className="h-[15px] w-[13.5px]" />
            <span className="text-[12px] font-semibold leading-4 tracking-[0.24px] text-[#131b2e]">
              Exportar Calendário (PDF/ICS)
            </span>
          </button>
          <button
            type="button"
            className="flex items-center gap-1 rounded-[4px] bg-[#0d472b] px-4 py-2 shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]"
          >
            <img src="/icons/eventos-icon-plus.svg" alt="" className="size-[15px]" />
            <span className="text-[12px] font-semibold leading-4 tracking-[0.24px] text-white">
              + Cadastrar Novo Evento
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------- KPIs ---------------------------------- */

function KpiCards() {
  return (
    <div className="flex flex-col pb-6">
      <div className="flex w-full items-start gap-4">
        {/* Card 1 */}
        <div className="flex min-w-0 flex-1 flex-col justify-between rounded-lg bg-white p-4 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
          <div className="flex w-full items-start justify-between">
            <div className="flex flex-col">
              <p className="text-[11px] font-semibold uppercase leading-[14px] tracking-[0.55px] text-[#414942]">
                Eventos Ativos /
                <br />
                Programados
              </p>
              <div className="mt-[10px] flex items-baseline gap-2">
                <span className="text-[32px] font-bold leading-10 tracking-[-0.8px] text-[#131b2e]">
                  28
                </span>
                <span className="text-[11px] font-semibold tracking-[0.44px] text-[#414942]">
                  oficiais
                </span>
              </div>
            </div>
            <div className="flex h-10 w-[32.19px] shrink-0 items-center justify-center rounded-[4px] bg-[rgba(182,240,200,0.4)]">
              <img src="/icons/eventos-kpi-calendar.svg" alt="" className="h-[18.333px] w-[16.5px]" />
            </div>
          </div>
          <div className="flex w-full flex-col pt-4">
            <div className="flex w-full items-center gap-[6px] pt-1">
              <div className="flex shrink-0 items-center rounded-[2px] bg-[#b6f0c8] py-[2px] pl-[6px] pr-[14px]">
                <span className="text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#195033]">
                  12 este
                  <br />
                  mês
                </span>
              </div>
              <p className="text-[12px] leading-4 tracking-[0.12px] text-[#414942]">
                Ciclo de Abril/Maio
                <br />
                2025
              </p>
            </div>
          </div>
        </div>
        {/* Card 2 */}
        <div className="flex min-w-0 flex-1 flex-col justify-between rounded-lg bg-white p-4 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
          <div className="flex w-full items-start justify-between">
            <div className="flex min-w-0 flex-col">
              <p className="text-[11px] font-semibold uppercase leading-[14px] tracking-[0.55px] text-[#414942]">
                Maior Ocupação de
                <br />
                Ponto
              </p>
              <p className="mt-[10px] truncate text-[24px] font-bold leading-8 tracking-[-0.24px] text-[#131b2e]">
                Teatro Amazonas
              </p>
            </div>
            <div className="flex h-10 w-[30px] shrink-0 items-center justify-center rounded-[4px] bg-[rgba(206,229,255,0.5)]">
              <img src="/icons/eventos-kpi-ponto.svg" alt="" className="h-[18.333px] w-[20.167px]" />
            </div>
          </div>
          <div className="flex w-full flex-col pt-4">
            <div className="flex w-full items-center gap-[6px] pt-1">
              <p className="text-[12px] font-semibold leading-4 tracking-[0.12px] text-[#396285]">
                8 eventos em
                <br />
                cartaz
              </p>
              <p className="text-[12px] leading-4 tracking-[0.12px] text-[#414942]">
                • 94% lotação
                <br />
                média
              </p>
            </div>
          </div>
        </div>
        {/* Card 3 */}
        <div className="flex min-w-0 flex-1 flex-col justify-between rounded-lg bg-white p-4 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
          <div className="flex w-full items-start justify-between">
            <div className="flex flex-col">
              <p className="text-[11px] font-semibold uppercase leading-[14px] tracking-[0.55px] text-[#414942]">
                Turistas / Ingressos
                <br />
                Previstos
              </p>
              <span className="mt-[10px] text-[32px] font-bold leading-10 tracking-[-0.8px] text-[#131b2e]">
                34.500
              </span>
            </div>
            <div className="flex h-10 w-[32.27px] shrink-0 items-center justify-center rounded-[4px] bg-[#e2e7ff]">
              <img src="/icons/eventos-kpi-users.svg" alt="" className="h-[14.667px] w-[20.167px]" />
            </div>
          </div>
          <div className="flex w-full flex-col pt-4">
            <div className="flex w-full items-center gap-1 pt-1">
              <img src="/icons/eventos-kpi-trend.svg" alt="" className="h-2 w-[13.333px]" />
              <span className="text-[12px] font-semibold leading-4 tracking-[0.12px] text-[#195033]">
                +22.4%
              </span>
              <span className="text-[12px] leading-4 tracking-[0.12px] text-[#414942]">
                vs ciclo anterior
              </span>
            </div>
          </div>
        </div>
        {/* Card 4 */}
        <div className="flex min-w-0 flex-1 flex-col justify-between rounded-lg bg-white p-4 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
          <div className="flex w-full items-start justify-between">
            <div className="flex flex-col gap-[7px] pt-[7px]">
              <p className="text-[11px] font-semibold uppercase leading-[14px] tracking-[0.55px] text-[#414942]">
                Matriz de Cobrança
              </p>
              <div className="flex h-12 items-center">
                <span className="text-[32px] font-bold leading-10 tracking-[-0.8px] text-[#131b2e]">
                  75%
                </span>
                <span className="pl-3 text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#414942]">
                  Acesso
                  <br />
                  Gratuito
                </span>
              </div>
            </div>
            <div className="flex h-10 w-[38.45px] shrink-0 items-center justify-center rounded-[4px] bg-[rgba(255,220,195,0.6)]">
              <img src="/icons/eventos-kpi-ticket.svg" alt="" className="h-[14.667px] w-[18.333px]" />
            </div>
          </div>
          <div className="flex w-full flex-col pt-4">
            <div className="flex w-full items-center justify-between pt-1">
              <div className="flex h-[6px] min-w-0 flex-1 overflow-hidden rounded-full bg-[#dae2fd]">
                <div className="h-full w-[86.02px] shrink-0 bg-[#0d472b]" />
                <div className="h-full w-[28.67px] shrink-0 bg-[#396285]" />
              </div>
              <span className="pl-2 text-[11px] leading-4 tracking-[0.12px] text-[#414942]">
                25% Tarifados
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------- Form ---------------------------------- */

function FormField({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="flex w-full flex-col gap-1">
      <label className="text-[12px] font-semibold leading-4 tracking-[0.24px] text-[#131b2e]">
        {label}
        {required ? <span className="font-normal text-[#ba1a1a]"> *</span> : null}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  "h-10 w-full rounded-[4px] bg-white px-2 py-[11.5px] text-[14px] leading-[17px] text-[#131b2e] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] outline-none border border-transparent focus:border-[#0d472b]";

function RegistrationForm() {
  const [open, setOpen] = useState(true);
  const [policy, setPolicy] = useState<"gratuito" | "tarifado">("tarifado");

  return (
    <div className="flex flex-col pb-6">
      <div className="flex w-full flex-col items-center gap-6 overflow-hidden rounded-lg bg-white pb-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
        {/* Top header bar */}
        <div className="flex w-full items-center justify-between bg-[#0d472b] px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-[4px] bg-[rgba(255,255,255,0.1)]">
              <img src="/icons/eventos-form-icon.svg" alt="" className="size-[16.667px]" />
            </div>
            <div className="flex flex-col">
              <p className="text-[16px] font-semibold leading-5 text-white">
                Cadastro de Novo Evento Cultural / Institucional
              </p>
              <p className="text-[12px] leading-4 tracking-[0.12px] text-[#9ad3ad]">
                Publicação direta no catálogo unificado de Manaus e credenciamento para turistas no PassaNorte
              </p>
            </div>
          </div>
          <button
            type="button"
            aria-label={open ? "Recolher formulário" : "Expandir formulário"}
            onClick={() => setOpen((value) => !value)}
            className="rounded-md px-1 pb-[10px] pt-1"
          >
            <img
              src="/icons/eventos-chevron-up.svg"
              alt=""
              className={`h-[6.167px] w-[10px] transition-transform ${open ? "" : "rotate-180"}`}
            />
          </button>
        </div>

        {open ? (
          <div className="grid w-[928px] max-w-full grid-cols-12 gap-6">
            {/* Columns 1 & 2 */}
            <div className="col-span-8 flex flex-col items-start gap-4">
              <FormField label="Nome Oficial do Evento" required>
                <input
                  type="text"
                  defaultValue="Festival Amazonas de Ópera 2025 - Noite de Gala Carlos Gomes"
                  className={inputClass}
                />
              </FormField>

              <div className="flex w-full items-start gap-4">
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <FormField label="Ponto Turístico Vinculado" required>
                    <div className="relative flex w-full">
                      <select
                        defaultValue="teatro"
                        className={`${inputClass} appearance-none pr-8 leading-5`}
                      >
                        <option value="teatro">Teatro Amazonas (Centro Histórico)</option>
                      </select>
                      <img
                        src="/icons/eventos-chevron-select.svg"
                        alt=""
                        className="pointer-events-none absolute right-[10px] top-[10px] h-[3.75px] w-[7.5px]"
                      />
                    </div>
                  </FormField>
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <FormField label="Categoria Cultural / Eixo">
                    <div className="relative flex w-full">
                      <select
                        defaultValue="musica"
                        className={`${inputClass} appearance-none pr-8 leading-5`}
                      >
                        <option value="musica">Música Clássica &amp; Ópera</option>
                      </select>
                      <img
                        src="/icons/eventos-chevron-select.svg"
                        alt=""
                        className="pointer-events-none absolute right-[10px] top-[10px] h-[3.75px] w-[7.5px]"
                      />
                    </div>
                  </FormField>
                </div>
              </div>

              <div className="flex w-full items-start gap-4">
                <div className="flex w-[192.88px] flex-col gap-1">
                  <FormField label="Período (Início e Término)">
                    <input
                      type="text"
                      defaultValue="25/04/2025 a 30/04/2025"
                      className={inputClass}
                    />
                  </FormField>
                </div>
                <div className="flex w-[192.89px] flex-col gap-1">
                  <FormField label="Sessões / Horários">
                    <input type="text" defaultValue="19:00 e 21:15" className={inputClass} />
                  </FormField>
                </div>
                <div className="flex flex-1 flex-col gap-1">
                  <FormField label="Lotação Máxima (Lugares)">
                    <div className="relative flex w-full">
                      <input type="text" defaultValue="700" className={`${inputClass} pr-[68px]`} />
                      <span className="pointer-events-none absolute right-[10px] top-[13px] text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#414942]">
                        assentos
                      </span>
                    </div>
                  </FormField>
                </div>
              </div>

              {/* Pricing policy */}
              <div className="flex w-full flex-col gap-2 rounded-lg bg-[#f2f3ff] p-4">
                <p className="text-[12px] font-semibold leading-4 tracking-[0.24px] text-[#131b2e]">
                  Política de Acesso &amp; Bilhetagem PassaNorte
                </p>
                <div className="flex w-full flex-col gap-6">
                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="radio"
                      name="politica-acesso"
                      checked={policy === "gratuito"}
                      onChange={() => setPolicy("gratuito")}
                      className="size-4 shrink-0 appearance-none rounded-full border border-[#767676] bg-white checked:border-[#0075ff] checked:border-[4px]"
                    />
                    <span
                      className={`text-[14px] leading-5 ${policy === "gratuito" ? "font-semibold text-[#0d472b]" : "text-[#131b2e]"}`}
                    >
                      Gratuito (Entrada Franca / Portaria Municipal)
                    </span>
                  </label>
                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="radio"
                      name="politica-acesso"
                      checked={policy === "tarifado"}
                      onChange={() => setPolicy("tarifado")}
                      className="size-4 shrink-0 appearance-none rounded-full border border-[#0075ff] bg-white checked:border-[4px]"
                    />
                    <span
                      className={`text-[14px] leading-5 ${policy === "tarifado" ? "font-semibold text-[#0d472b]" : "text-[#131b2e]"}`}
                    >
                      Ingresso Tarifado / Bilheteria Cultural
                    </span>
                  </label>
                </div>
                <div className="flex w-full items-start gap-4 pt-1">
                  <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <label className="text-[11px] font-medium leading-[14px] tracking-[0.44px] text-[#414942]">
                      Valor Inteira
                    </label>
                    <div className="relative flex w-full">
                      <input
                        type="text"
                        defaultValue="50,00"
                        className="h-9 w-full rounded-[2px] bg-white py-[9.5px] pl-8 pr-2 text-[14px] text-[#131b2e] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] outline-none border border-transparent focus:border-[#0d472b]"
                      />
                      <span className="pointer-events-none absolute left-[10px] top-[11px] text-[11px] font-semibold tracking-[0.44px] text-[#414942]">
                        R$
                      </span>
                    </div>
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <label className="text-[11px] font-medium leading-[14px] tracking-[0.44px] text-[#414942]">
                      Meia-Entrada / Estudante
                    </label>
                    <div className="relative flex w-full">
                      <input
                        type="text"
                        defaultValue="25,00"
                        className="h-9 w-full rounded-[2px] bg-white py-[9.5px] pl-8 pr-2 text-[14px] text-[#131b2e] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] outline-none border border-transparent focus:border-[#0d472b]"
                      />
                      <span className="pointer-events-none absolute left-[10px] top-[11px] text-[11px] font-semibold tracking-[0.44px] text-[#414942]">
                        R$
                      </span>
                    </div>
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <label className="text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#0d472b]">
                      Benefício PassaNorte
                    </label>
                    <div className="relative flex w-full">
                      <input
                        type="text"
                        defaultValue="20,00 (-60%)"
                        className="h-9 w-full rounded-[2px] bg-white py-[10.5px] pl-8 pr-2 text-[12px] font-semibold tracking-[0.24px] text-[#0d472b] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] outline-none border border-transparent focus:border-[#0d472b]"
                      />
                      <span className="pointer-events-none absolute left-[10px] top-[12px] text-[11px] font-semibold tracking-[0.44px] text-[#414942]">
                        R$
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex w-full flex-col gap-1 pb-[6px]">
                <label className="text-[12px] font-semibold leading-4 tracking-[0.24px] text-[#131b2e]">
                  Descrição Institucional &amp; Sinopse (Exibida no Aplicativo)
                </label>
                <textarea
                  rows={3}
                  defaultValue={
                    "Abertura oficial da 27ª edição do prestigiado Festival Amazonas de Ópera no emblemático Teatro Amazonas. Apresentação da Orquestra Amazonas Filarmônica com o Coral do Amazonas em repertório histórico da Belle Époque cabocla."
                  }
                  className="w-full resize-none rounded-[4px] bg-white p-2 text-[14px] leading-5 text-[#131b2e] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] outline-none border border-transparent focus:border-[#0d472b]"
                />
              </div>
            </div>

            {/* Column 3 */}
            <div className="col-span-4 flex flex-col justify-between">
              <div className="flex w-full flex-col gap-1">
                <label className="text-[12px] font-semibold leading-4 tracking-[0.24px] text-[#131b2e]">
                  Banner Oficial do Evento
                </label>
                <div className="relative flex h-48 w-full flex-col overflow-hidden rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
                  <img
                    src="/images/eventos-banner.jpg"
                    alt="Banner do Festival Amazonas de Ópera"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-[rgba(0,47,25,0.8)] via-[rgba(0,47,25,0)] to-[rgba(0,47,25,0)] p-2">
                    <div className="flex w-full items-center justify-between">
                      <div className="flex flex-col rounded-[2px] bg-[rgba(13,71,43,0.8)] px-2 py-[2px] backdrop-blur-[2px]">
                        <span className="text-[11px] font-medium leading-[14px] tracking-[0.44px] text-white">
                          1200 x 600 px • JPG/PNG
                        </span>
                      </div>
                      <button
                        type="button"
                        aria-label="Editar banner"
                        className="flex flex-col items-center justify-center rounded-[2px] bg-[rgba(255,255,255,0.9)] px-1 pb-[10px] pt-[6px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
                      >
                        <img src="/icons/eventos-icon-camera.svg" alt="" className="h-3 w-[13.333px]" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex w-full items-center gap-1 pt-1">
                  <button
                    type="button"
                    className="flex min-w-0 flex-1 items-center justify-center rounded-[4px] bg-[#f2f3ff] px-2 py-[6px]"
                  >
                    <span className="text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#131b2e]">
                      Substituir Imagem
                    </span>
                  </button>
                  <button
                    type="button"
                    aria-label="Remover imagem"
                    className="flex shrink-0 flex-col items-center justify-center rounded-[4px] bg-[#f2f3ff] px-2 pb-[9px] pt-[6px]"
                  >
                    <img src="/icons/eventos-icon-trash.svg" alt="" className="h-3 w-[10.667px]" />
                  </button>
                </div>
              </div>

              <div className="flex w-full flex-col pt-4">
                <div className="flex w-full flex-col gap-2 rounded-lg bg-[rgba(226,231,255,0.6)] p-4">
                  <div className="flex w-full items-center gap-2">
                    <img src="/icons/eventos-icon-sync.svg" alt="" className="h-[15px] w-[16.667px]" />
                    <span className="text-[12px] font-semibold leading-4 tracking-[0.24px] text-[#0d472b]">
                      Sincronização em Rede
                    </span>
                  </div>
                  <p className="text-[12px] leading-4 tracking-[0.12px] text-[#414942]">
                    Ao publicar, o evento gera automaticamente QR Codes de bilheteria e envia
                    notificação de push para{" "}
                    <span className="text-[#131b2e]">18.420 turistas</span> com interesse cultural
                    cadastrado na capital.
                  </p>
                </div>
              </div>

              <div className="flex w-full flex-col pt-4">
                <div className="flex w-full items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    className="flex shrink-0 flex-col items-center justify-center rounded-[4px] bg-[#f2f3ff] px-[24.43px] py-2"
                  >
                    <span className="text-[12px] font-semibold leading-4 tracking-[0.24px] text-[#131b2e]">
                      Salvar
                      <br />
                      Rascunho
                    </span>
                  </button>
                  <button
                    type="button"
                    className="flex shrink-0 items-center gap-[10.65px] rounded-[4px] bg-[#0d472b] py-2 pl-6 pr-[28.66px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]"
                  >
                    <img src="/icons/eventos-icon-publish.svg" alt="" className="size-3" />
                    <span className="text-[12px] font-semibold leading-4 tracking-[0.24px] text-white">
                      Publicar no App
                      <br />
                      &amp; Portal
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

/* ---------------------------------- Filters -------------------------------- */

function FiltersSection() {
  const [view, setView] = useState<"tabela" | "agenda">("tabela");
  const [tags, setTags] = useState([
    { id: "ano", label: "Ano: 2025" },
    { id: "regiao", label: "Região: Polo Manaus Centro & Oeste" },
  ]);

  return (
    <div className="flex flex-col pb-4">
      <div className="flex w-full flex-col gap-4 rounded-lg bg-white p-4 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
        <div className="flex w-full items-center justify-between">
          <div className="relative h-10 w-[72px] shrink-0">
            <div className="h-10 w-full rounded-[4px] bg-[#f2f3ff]" />
            <img
              src="/icons/eventos-icon-search.svg"
              alt=""
              className="absolute left-[14.5px] top-[12.5px] size-[15px]"
            />
          </div>
          <div className="flex h-20 w-[872px] max-w-full flex-col">
            <div className="flex items-start gap-2">
              {[
                { label: "Todos os Pontos Turísticos", w: 252 },
                { label: "Acesso: Todos", w: 243 },
                { label: "Status: Confirmados & Ativos", w: 216.59 },
              ].map((filter) => (
                <div key={filter.label} className="relative" style={{ width: filter.w }}>
                  <button
                    type="button"
                    className="flex h-10 w-full items-center rounded-[4px] bg-[#f2f3ff] py-2 pl-2 pr-8 text-left"
                  >
                    <span className="whitespace-nowrap text-[12px] font-semibold leading-4 tracking-[0.24px] text-[#131b2e]">
                      {filter.label}
                    </span>
                  </button>
                  <img
                    src="/icons/eventos-chevron-select2.svg"
                    alt=""
                    className="pointer-events-none absolute right-2 top-[18px] h-[3.75px] w-[7.5px]"
                  />
                </div>
              ))}
            </div>
            <div className="mt-[9px] flex w-fit items-center gap-0 rounded-[4px] bg-[#f2f3ff] p-[2px]">
              <button
                type="button"
                onClick={() => setView("tabela")}
                className={`flex items-center gap-1 rounded-md px-[10px] py-[6px] ${view === "tabela" ? "bg-white shadow-[0px_1px_1px_rgba(0,0,0,0.05)]" : ""}`}
              >
                <img src="/icons/eventos-icon-table.svg" alt="" className="h-[10.667px] w-[13.333px]" />
                <span
                  className={`text-[11px] font-semibold leading-[14px] tracking-[0.44px] ${view === "tabela" ? "text-[#0d472b]" : "text-[#414942]"}`}
                >
                  Tabela
                </span>
              </button>
              <button
                type="button"
                onClick={() => setView("agenda")}
                className={`flex items-center gap-1 rounded-md px-[10px] py-[6px] ${view === "agenda" ? "bg-white shadow-[0px_1px_1px_rgba(0,0,0,0.05)]" : ""}`}
              >
                <img src="/icons/eventos-icon-agenda.svg" alt="" className="h-[10.667px] w-[13.333px]" />
                <span
                  className={`text-[11px] font-semibold leading-[14px] tracking-[0.44px] ${view === "agenda" ? "text-[#0d472b]" : "text-[#414942]"}`}
                >
                  Agenda
                </span>
              </button>
            </div>
          </div>
        </div>
        <div className="flex w-full items-center gap-1 pt-1">
          <span className="text-[12px] leading-4 tracking-[0.12px] text-[#414942]">
            Filtros ativos:
          </span>
          {tags.map((tag) => (
            <div
              key={tag.id}
              className="flex shrink-0 items-center gap-1 rounded-full bg-[#eaedff] px-2 py-[2px]"
            >
              <span className="text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#131b2e]">
                {tag.label}
              </span>
              <button
                type="button"
                aria-label={`Remover filtro ${tag.label}`}
                onClick={() => setTags((current) => current.filter((t) => t.id !== tag.id))}
                className="flex pb-[3px]"
              >
                <img src="/icons/eventos-icon-x.svg" alt="" className="size-[8.167px]" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setTags([])}
            className="pl-1 text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#396285]"
          >
            Limpar todos
          </button>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------- Table --------------------------------- */

type EventRow = {
  id: string;
  badge: { bg: string; month: string; monthColor: string; day: string; dayColor: string };
  dateLabel: ReactNode;
  timeLabel: ReactNode;
  title: string;
  tags: { label: ReactNode; bg: string; color: string }[];
  venueIcon: { src: string; w: number; h: number };
  venueName: ReactNode;
  venueAddress: ReactNode;
  access: ReactNode;
  occupancy: ReactNode;
  status: ReactNode;
};

const editActions = (
  <div className="flex items-center justify-end gap-1">
    <button type="button" aria-label="Editar" className="flex flex-col items-center justify-center rounded-[2px] px-[6px] pb-3 pt-[6px]">
      <img src="/icons/eventos-icon-edit.svg" alt="" className="size-[13.5px]" />
    </button>
    <button type="button" aria-label="Duplicar" className="flex flex-col items-center justify-center rounded-[2px] px-[6px] pb-3 pt-[6px]">
      <img src="/icons/eventos-icon-copy.svg" alt="" className="h-[15px] w-[12.75px]" />
    </button>
    <button type="button" aria-label="Desativar" className="flex flex-col items-center justify-center rounded-[2px] px-[6px] pb-3 pt-[6px]">
      <img src="/icons/eventos-icon-block.svg" alt="" className="size-[15px]" />
    </button>
  </div>
);

const ROWS: EventRow[] = [
  {
    id: "teatro",
    badge: { bg: "bg-[rgba(182,240,200,0.4)]", month: "ABR", monthColor: "text-[#0d472b]", day: "25", dayColor: "text-[#0d472b]" },
    dateLabel: <>25 a 30<br />Abr</>,
    timeLabel: <>19:00 e<br />21:15</>,
    title: "Festival Amazonas de Ópera - Noite Carlos Gomes",
    tags: [
      { label: <>Música<br />Clássica</>, bg: "bg-[#eaedff]", color: "text-[#414942]" },
      { label: <>Selo<br />Destaque<br />App</>, bg: "bg-[rgba(182,240,200,0.6)]", color: "text-[#195033]" },
    ],
    venueIcon: { src: "/icons/eventos-icon-pin.svg", w: 12, h: 15 },
    venueName: <>Teatro<br />Amazonas</>,
    venueAddress: <>Largo de São Sebastião, Centro</>,
    access: (
      <>
        <p className="text-[12px] font-bold leading-4 tracking-[0.24px] text-[#131b2e]">R$ 50,00</p>
        <p className="text-[12px] leading-4 tracking-[0.12px] text-[#414942]">PassaNorte: R$ 20,00</p>
      </>
    ),
    occupancy: (
      <div className="flex w-[144px] flex-col gap-1">
        <div className="flex w-full items-start justify-between">
          <span className="text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#131b2e]">645 / 700</span>
          <span className="text-[11px] font-bold leading-[14px] tracking-[0.44px] text-[#0d472b]">92%</span>
        </div>
        <div className="h-[6px] w-full overflow-hidden rounded-full bg-[#dae2fd]">
          <div className="h-full w-[92%] rounded-full bg-[#0d472b]" />
        </div>
      </div>
    ),
    status: (
      <div className="flex items-center gap-1 rounded-full bg-[#e8f5e9] px-[10px] py-1">
        <span className="size-[6px] rounded-full bg-[#0d472b]" />
        <span className="text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#0d472b]">Confirmado</span>
      </div>
    ),
  },
  {
    id: "mercado",
    badge: { bg: "bg-[#eaedff]", month: "SÁB", monthColor: "text-[#414942]", day: "REC", dayColor: "text-[#414942]" },
    dateLabel: <>Todo<br />Sábado</>,
    timeLabel: <>07:00<br />às<br />15:00</>,
    title: "Feira Gastronômica & Artesanal Raízes do Rio Negro",
    tags: [
      { label: <>Gastronomia<br />&amp; Feira</>, bg: "bg-[#eaedff]", color: "text-[#414942]" },
      { label: <>Semanal</>, bg: "bg-[#cee5ff]", color: "text-[#1f4a6c]" },
    ],
    venueIcon: { src: "/icons/eventos-icon-market.svg", w: 15.07, h: 13.5 },
    venueName: <>Mercado<br />Adolpho<br />Lisboa</>,
    venueAddress: <>Orla da Manaus Moderna</>,
    access: (
      <div className="flex items-center rounded-[2px] bg-[rgba(182,240,200,0.5)] py-[2px] pl-2 pr-[9.8px]">
        <span className="text-[11px] font-bold leading-[14px] tracking-[0.44px] text-[#195033]">Gratuito / Aberto</span>
      </div>
    ),
    occupancy: (
      <div className="flex items-center gap-1">
        <img src="/icons/eventos-icon-infinity.svg" alt="" className="h-[7.333px] w-4" />
        <span className="text-[12px] leading-4 tracking-[0.12px] text-[#414942]">Fluxo Livre Contínuo</span>
      </div>
    ),
    status: (
      <div className="flex items-center gap-1 rounded-full bg-[#e1f0f7] py-1 pl-[10px] pr-[13.29px]">
        <span className="h-[6px] w-[4.8px] rounded-full bg-[#396285]" />
        <span className="text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#0b3c5d]">Em<br />Andamento</span>
      </div>
    ),
  },
  {
    id: "palacete",
    badge: { bg: "bg-[rgba(182,240,200,0.4)]", month: "ABR", monthColor: "text-[#0d472b]", day: "18", dayColor: "text-[#0d472b]" },
    dateLabel: <>18 de<br />Abril</>,
    timeLabel: <>18:00<br />às<br />21:00</>,
    title: "Sarau Noturno na Belle Époque: Poesia & Cordas",
    tags: [{ label: <>Patrimônio &amp; Literatura</>, bg: "bg-[#eaedff]", color: "text-[#414942]" }],
    venueIcon: { src: "/icons/eventos-icon-house.svg", w: 15, h: 15 },
    venueName: <>Palacete<br />Provincial</>,
    venueAddress: <>Praça Heliodoro Balbi</>,
    access: (
      <>
        <p className="text-[12px] font-bold leading-4 tracking-[0.24px] text-[#0d472b]">Gratuito</p>
        <p className="text-[12px] leading-4 tracking-[0.12px] text-[#414942]">Check-in PassaNorte</p>
      </>
    ),
    occupancy: (
      <div className="flex w-[144px] flex-col gap-1">
        <div className="flex w-full items-start justify-between">
          <span className="text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#131b2e]">180 / 200</span>
          <span className="text-[11px] font-bold leading-[14px] tracking-[0.44px] text-[#603100]">90%</span>
        </div>
        <div className="h-[6px] w-full overflow-hidden rounded-full bg-[#dae2fd]">
          <div className="h-full w-[90%] rounded-full bg-[#0d472b]" />
        </div>
      </div>
    ),
    status: (
      <div className="flex items-center gap-1 rounded-full bg-[#fef3c7] py-1 pl-[10px] pr-[42.8px]">
        <span className="h-[6px] w-[5.64px] rounded-full bg-[#411f00]" />
        <span className="text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#92400e]">Vagas<br />Finais</span>
      </div>
    ),
  },
  {
    id: "ponta-negra",
    badge: { bg: "bg-[#eaedff]", month: "ABR", monthColor: "text-[#131b2e]", day: "22", dayColor: "text-[#131b2e]" },
    dateLabel: <>22 de<br />Abril</>,
    timeLabel: <>19:30<br />às<br />23:00</>,
    title: "Luau Cultural Ponta Negra - Toadas & Beiradão",
    tags: [{ label: <>Folclore &amp; Música<br />Popular</>, bg: "bg-[#eaedff]", color: "text-[#414942]" }],
    venueIcon: { src: "/icons/eventos-icon-waves.svg", w: 15, h: 12.525 },
    venueName: <>Complexo<br />Ponta<br />Negra</>,
    venueAddress: <>Anfiteatro da Orla</>,
    access: (
      <div className="flex items-center rounded-[2px] bg-[rgba(182,240,200,0.5)] px-2 py-[2px]">
        <span className="text-[11px] font-bold leading-[14px] tracking-[0.44px] text-[#195033]">Gratuito</span>
      </div>
    ),
    occupancy: (
      <div className="flex items-center gap-1">
        <img src="/icons/eventos-icon-people.svg" alt="" className="h-2 w-4" />
        <span className="text-[12px] leading-4 tracking-[0.12px] text-[#414942]">Capacidade: 3.500</span>
      </div>
    ),
    status: (
      <div className="flex items-center gap-1 rounded-full bg-[#e8f5e9] px-[10px] py-1">
        <span className="size-[6px] rounded-full bg-[#0d472b]" />
        <span className="text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#0d472b]">Confirmado</span>
      </div>
    ),
  },
  {
    id: "bosque",
    badge: { bg: "bg-[#eaedff]", month: "MAI", monthColor: "text-[#131b2e]", day: "03", dayColor: "text-[#131b2e]" },
    dateLabel: <>03 a 05<br />Mai</>,
    timeLabel: <>09:00<br />às<br />16:30</>,
    title: "Circuito Fotográfico Fauna & Flora Amazônica",
    tags: [{ label: <>Ecoturismo &amp; Foto</>, bg: "bg-[#eaedff]", color: "text-[#414942]" }],
    venueIcon: { src: "/icons/eventos-icon-tree.svg", w: 13.5, h: 15 },
    venueName: <>Bosque<br />da<br />Ciência</>,
    venueAddress: <>Campus INPA Petrópolis</>,
    access: (
      <>
        <p className="text-[12px] font-bold leading-4 tracking-[0.24px] text-[#131b2e]">R$ 15,00</p>
        <p className="text-[12px] font-semibold leading-4 tracking-[0.12px] text-[#0d472b]">PassaNorte: Grátis</p>
      </>
    ),
    occupancy: (
      <div className="flex w-[144px] flex-col gap-1">
        <div className="flex w-full items-start justify-between">
          <span className="text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#131b2e]">320 / 600</span>
          <span className="text-[11px] font-bold leading-[14px] tracking-[0.44px] text-[#396285]">53%</span>
        </div>
        <div className="h-[6px] w-full overflow-hidden rounded-full bg-[#dae2fd]">
          <div className="h-full w-[53%] rounded-full bg-[#396285]" />
        </div>
      </div>
    ),
    status: (
      <div className="flex items-center gap-1 rounded-full bg-[#e1f0f7] py-1 pl-[10px] pr-[20.12px]">
        <span className="h-[6px] w-[3.88px] rounded-full bg-[#396285]" />
        <span className="text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#0b3c5d]">Inscrições<br />Abertas</span>
      </div>
    ),
  },
];

const TABLE_GRID =
  "grid grid-cols-[133.58px_183.61px_118.61px_104.58px_176px_129.58px_minmax(0,1fr)]";

function EventsTable() {
  return (
    <div className="flex flex-col pb-6">
      <div className="flex w-full flex-col overflow-hidden rounded-lg bg-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
        {/* Header row */}
        <div className={`${TABLE_GRID} w-full items-start bg-[#f2f3ff]`}>
          <div className="flex flex-col px-4 py-[26px]">
            <span className="text-[11px] font-semibold uppercase leading-[14px] tracking-[0.55px] text-[#414942]">
              Data &amp; Horário
            </span>
          </div>
          <div className="flex flex-col px-4 py-[26px]">
            <span className="text-[11px] font-semibold uppercase leading-[14px] tracking-[0.55px] text-[#414942]">
              Evento &amp; Categoria
            </span>
          </div>
          <div className="flex flex-col px-4 py-3">
            <span className="text-[11px] font-semibold uppercase leading-[14px] tracking-[0.55px] text-[#414942]">
              Ponto<br />Turístico<br />Vinculado
            </span>
          </div>
          <div className="flex flex-col px-4 py-[19px]">
            <span className="text-[11px] font-semibold uppercase leading-[14px] tracking-[0.55px] text-[#414942]">
              Acesso /<br />Ingresso
            </span>
          </div>
          <div className="flex flex-col px-4 py-[26px]">
            <span className="text-[11px] font-semibold uppercase leading-[14px] tracking-[0.55px] text-[#414942]">
              Ocupação / Vagas
            </span>
          </div>
          <div className="flex flex-col px-4 py-[26px]">
            <span className="text-[11px] font-semibold uppercase leading-[14px] tracking-[0.55px] text-[#414942]">
              Status
            </span>
          </div>
          <div className="flex flex-col items-end px-4 py-[26px]">
            <span className="text-right text-[11px] font-semibold uppercase leading-[14px] tracking-[0.55px] text-[#414942]">
              Ações
            </span>
          </div>
        </div>
        {/* Body */}
        <div className="flex w-full flex-col">
          {ROWS.map((row, index) => (
            <div
              key={row.id}
              className={`${TABLE_GRID} w-full items-center border-t border-[#eaedff] ${index === 0 ? "border-t-0" : ""}`}
            >
              {/* Date & time */}
              <div className="flex items-center gap-2 px-4 py-4">
                <div
                  className={`flex size-12 shrink-0 flex-col items-center justify-center rounded-[4px] ${row.badge.bg}`}
                >
                  <span className={`text-[11px] font-bold uppercase leading-[11px] tracking-[0.44px] ${row.badge.monthColor}`}>
                    {row.badge.month}
                  </span>
                  <span className={`pt-[2px] text-[16px] font-extrabold leading-4 ${row.badge.dayColor}`}>
                    {row.badge.day}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[12px] font-semibold leading-4 tracking-[0.24px] text-[#131b2e]">
                    {row.dateLabel}
                  </span>
                  <span className="text-[12px] leading-4 tracking-[0.12px] text-[#414942]">
                    {row.timeLabel}
                  </span>
                </div>
              </div>
              {/* Event & category */}
              <div className="flex flex-col px-4 py-4">
                <span className="text-[12px] font-semibold leading-4 tracking-[0.24px] text-[#131b2e]">
                  {row.title}
                </span>
                <div className="flex items-center gap-[6px] pt-1">
                  {row.tags.map((tag, tagIndex) => (
                    <div
                      key={tagIndex}
                      className={`flex flex-col rounded-[2px] px-[6px] py-[7px] ${tag.bg}`}
                    >
                      <span className={`text-[11px] font-semibold leading-[14px] tracking-[0.44px] ${tag.color}`}>
                        {tag.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Venue */}
              <div className="flex items-center gap-[6px] px-4 py-4">
                <img
                  src={row.venueIcon.src}
                  alt=""
                  style={{ width: row.venueIcon.w, height: row.venueIcon.h }}
                  className="shrink-0"
                />
                <div className="flex flex-col">
                  <span className="text-[12px] font-medium leading-4 tracking-[0.24px] text-[#131b2e]">
                    {row.venueName}
                  </span>
                  <span className="text-[12px] leading-4 tracking-[0.12px] text-[#414942]">
                    {row.venueAddress}
                  </span>
                </div>
              </div>
              {/* Access */}
              <div className="flex flex-col px-4 py-4">{row.access}</div>
              {/* Occupancy */}
              <div className="flex flex-col px-4 py-4">{row.occupancy}</div>
              {/* Status */}
              <div className="flex flex-col px-4 py-4">{row.status}</div>
              {/* Actions */}
              <div className="flex justify-end px-4 py-4">{editActions}</div>
            </div>
          ))}
        </div>
        {/* Pagination footer */}
        <div className="flex w-full items-center justify-between bg-[#f2f3ff] px-4 py-3">
          <p className="text-[12px] leading-4 tracking-[0.12px] text-[#414942]">
            Exibindo <span className="text-[#131b2e]">1 a 5</span> de{" "}
            <span className="text-[#131b2e]">28</span> eventos cadastrados no calendário oficial
          </p>
          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label="Página anterior"
              className="flex flex-col items-center justify-center rounded-[2px] bg-[#eaedff] px-[6px] pb-3 pt-[6px]"
            >
              <img src="/icons/eventos-chevron-left.svg" alt="" className="h-2 w-[5.55px]" />
            </button>
            <button
              type="button"
              className="flex size-7 items-center justify-center rounded-[2px] bg-[#0d472b]"
            >
              <span className="text-[11px] font-bold tracking-[0.44px] text-white">1</span>
            </button>
            <button
              type="button"
              className="flex size-7 items-center justify-center rounded-[2px]"
            >
              <span className="text-[11px] font-semibold tracking-[0.44px] text-[#131b2e]">2</span>
            </button>
            <button
              type="button"
              className="flex size-7 items-center justify-center rounded-[2px]"
            >
              <span className="text-[11px] font-semibold tracking-[0.44px] text-[#131b2e]">3</span>
            </button>
            <button
              type="button"
              aria-label="Próxima página"
              className="flex flex-col items-center justify-center rounded-[2px] bg-white px-[6px] pb-3 pt-[6px] shadow-[0px_1px_1px_rgba(0,0,0,0.05)]"
            >
              <img src="/icons/eventos-chevron-right2.svg" alt="" className="h-2 w-[5.55px]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------- Mini cards ------------------------------- */

function MiniCards() {
  const cards = [
    {
      icon: "/icons/eventos-mini-check.svg",
      iconSize: { w: 22, h: 21 },
      iconBg: "bg-[rgba(182,240,200,0.5)]",
      title: "Validação de Portaria Manauscult",
      text: (
        <>
          Sincronização com catracas eletrônicas e QR Code dos postos de atendimento ativos.
        </>
      ),
    },
    {
      icon: "/icons/eventos-mini-bell.svg",
      iconSize: { w: 20, h: 20.05 },
      iconBg: "bg-[rgba(206,229,255,0.5)]",
      title: "Alerta de Lotação Crítica",
      text: (
        <>
          Teatro Amazonas atingiu 92% para ópera de abertura; fila de espera automática no app.
        </>
      ),
    },
    {
      icon: "/icons/eventos-mini-access.svg",
      iconSize: { w: 18, h: 20 },
      iconBg: "bg-[rgba(255,220,195,0.6)]",
      title: "Cota de Inclusão Municipal",
      text: (
        <>
          100% dos eventos possuem cota reservada para PcD e assentos prioritários garantidos.
        </>
      ),
    },
  ];

  return (
    <div className="flex flex-col pb-6">
      <div className="flex w-full items-start gap-4">
        {cards.map((card) => (
          <div
            key={card.title}
            className="flex w-[314.66px] flex-1 items-center gap-4 rounded-lg bg-white p-4 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]"
          >
            <div
              className={`flex size-12 shrink-0 items-center justify-center rounded-lg ${card.iconBg}`}
            >
              <img
                src={card.icon}
                alt=""
                style={{ width: card.iconSize.w, height: card.iconSize.h }}
              />
            </div>
            <div className="flex min-w-0 flex-col">
              <p className="text-[12px] font-semibold leading-4 tracking-[0.24px] text-[#131b2e]">
                {card.title}
              </p>
              <p className="text-[12px] leading-4 tracking-[0.12px] text-[#414942]">{card.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------- Footer --------------------------------- */

function AuditFooter() {
  return (
    <div className="flex w-full items-center justify-between pt-4">
      <div className="flex flex-col gap-[2px]">
        <p className="text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#131b2e]">
          Prefeitura de Manaus • Manauscult - Fundação Municipal de Cultura, Turismo e Eventos
        </p>
        <p className="text-[12px] leading-4 tracking-[0.12px] text-[#414942]">
          Sistema Integrado PassaNorte • Marco Regulatório de Eventos Públicos Municipais (Lei
          Municipal nº 2.450/2021)
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <p className="pr-4 text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#414942]">
          Versão: 2.4.0-gov
        </p>
        <span className="text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#414942]">
          •
        </span>
        <div className="flex items-center gap-1">
          <span className="h-2 w-[7.61px] rounded-full bg-[#0d472b]" />
          <p className="text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#0d472b]">
            Servidor Conectado: Sede Manauscult
          </p>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------- Page ---------------------------------- */

export default function EventosPage() {
  return (
    <AppShell breadcrumb="Gerenciamento de Eventos">
      <SectionHeader />
      <KpiCards />
      <RegistrationForm />
      <FiltersSection />
      <EventsTable />
      <MiniCards />
      <AuditFooter />
    </AppShell>
  );
}