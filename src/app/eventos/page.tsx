"use client";

import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { RoleShell } from "@/components/layout/RoleShell";
import { api } from "@/lib/api";
import type { EventApi, TouristSpot, TouristSpotsResponse } from "@/types/catalog";

/* ---------------------------------- Header --------------------------------- */

function SectionHeader() {
  return (
    <div className="flex flex-col pb-6">
      <div className="flex flex-col items-start justify-between gap-4 pt-2 md:flex-row md:items-end">
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
        <div className="flex flex-wrap items-center gap-2">
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

function KpiCards({ events, spots }: { events: EventApi[]; spots: TouristSpot[] }) {
  const nowIso = new Date().toISOString();
  const upcoming = events.filter((event) => event.occurs_at >= nowIso).length;
  const paid = events.filter((event) => event.ticket_price > 0).length;
  const paidShare = events.length ? Math.round((paid / events.length) * 100) : 0;
  const busiestSpotName = useMemo(() => {
    const counts = new Map<string, number>();
    for (const event of events) {
      counts.set(event.tourist_spot_id, (counts.get(event.tourist_spot_id) || 0) + 1);
    }
    const [topId] = [...counts.entries()].sort((a, b) => b[1] - a[1])[0] || [];
    return topId ? spots.find((spot) => spot.id === topId)?.name || "" : "";
  }, [events, spots]);

  return (
    <div className="flex flex-col pb-6">
      <div className="grid w-full grid-cols-1 items-stretch gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Card 1 */}
        <div className="flex min-w-0 flex-col justify-between rounded-lg bg-white p-4 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
          <div className="flex w-full items-start justify-between">
            <div className="flex flex-col">
              <p className="text-[11px] font-semibold uppercase leading-[14px] tracking-[0.55px] text-[#414942]">
                Eventos Ativos /
                <br />
                Programados
              </p>
              <div className="mt-[10px] flex items-baseline gap-2">
                <span className="text-[32px] font-bold leading-10 tracking-[-0.8px] text-[#131b2e]">
                  {upcoming || events.length}
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
                  {upcoming} no
                  <br />
                  futuro
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
        <div className="flex min-w-0 flex-col justify-between rounded-lg bg-white p-4 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
          <div className="flex w-full items-start justify-between">
            <div className="flex min-w-0 flex-col">
              <p className="text-[11px] font-semibold uppercase leading-[14px] tracking-[0.55px] text-[#414942]">
                Maior Ocupação de
                <br />
                Ponto
              </p>
              <p className="mt-[10px] truncate text-[24px] font-bold leading-8 tracking-[-0.24px] text-[#131b2e]">
                {busiestSpotName || "—"}
              </p>
            </div>
            <div className="flex h-10 w-[30px] shrink-0 items-center justify-center rounded-[4px] bg-[rgba(206,229,255,0.5)]">
              <img src="/icons/eventos-kpi-ponto.svg" alt="" className="h-[18.333px] w-[20.167px]" />
            </div>
          </div>
          <div className="flex w-full flex-col pt-4">
            <div className="flex w-full items-center gap-[6px] pt-1">
              <p className="text-[12px] font-semibold leading-4 tracking-[0.12px] text-[#396285]">
                {events.length} eventos em
                <br />
                cartaz
              </p>
              {/* TODO: lotação média depende de controle de vagas, ausente no backend */}
              <p className="text-[12px] leading-4 tracking-[0.12px] text-[#414942]">
                • controle de lotação
                <br />
                no app do turista
              </p>
            </div>
          </div>
        </div>
        {/* Card 3 */}
        <div className="flex min-w-0 flex-col justify-between rounded-lg bg-white p-4 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
          <div className="flex w-full items-start justify-between">
            <div className="flex flex-col">
              <p className="text-[11px] font-semibold uppercase leading-[14px] tracking-[0.55px] text-[#414942]">
                Turistas / Ingressos
                <br />
                Previstos
              </p>
              {/* TODO: backend não projeta público/ingressos ainda */}
              <span className="mt-[10px] text-[32px] font-bold leading-10 tracking-[-0.8px] text-[#131b2e]">
                —
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
        <div className="flex min-w-0 flex-col justify-between rounded-lg bg-white p-4 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
          <div className="flex w-full items-start justify-between">
            <div className="flex flex-col gap-[7px] pt-[7px]">
              <p className="text-[11px] font-semibold uppercase leading-[14px] tracking-[0.55px] text-[#414942]">
                Matriz de Cobrança
              </p>
              <div className="flex h-12 items-center">
                <span className="text-[32px] font-bold leading-10 tracking-[-0.8px] text-[#131b2e]">
                  {100 - paidShare}%
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
                {paidShare}% Tarifados
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

function RegistrationForm({
  spots,
  onCreated,
}: {
  spots: TouristSpot[];
  onCreated: () => void;
}) {
  const [open, setOpen] = useState(true);
  const [policy, setPolicy] = useState<"gratuito" | "tarifado">("tarifado");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const occursAt = formData.get("occurs_at") as string;
    if (!occursAt) return;
    const price = policy === "gratuito" ? 0 : Number(String(formData.get("price") || "0").replace(",", ".")) || 0;
    setSaving(true);
    try {
      await api.post("/events", {
        tourist_spot_id: formData.get("spot_id"),
        title: formData.get("title"),
        description: formData.get("description"),
        occurs_at: new Date(occursAt).toISOString(),
        ticket_price: price,
      });
      (event.target as HTMLFormElement).reset();
      onCreated();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Erro ao cadastrar evento.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex flex-col pb-6">
      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col items-center gap-6 overflow-hidden rounded-lg bg-white pb-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
      >
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
          <div className="grid w-full grid-cols-12 gap-6 xl:max-w-[1104px] xl:self-center">
            {/* Columns 1 & 2 */}
            <div className="col-span-12 flex flex-col items-start gap-4">
              <FormField label="Nome Oficial do Evento" required>
                <input type="text" name="title" required defaultValue="" placeholder="Ex.: Festival Amazonas de Ópera 2025 - Noite de Gala Carlos Gomes" className={inputClass} />
              </FormField>

              <div className="flex w-full flex-col gap-1">
                <FormField label="Ponto Turístico Vinculado" required>
                  <div className="relative flex w-full">
                    <select name="spot_id" required defaultValue="" className={`${inputClass} appearance-none pr-8 leading-5`}>
                      <option value="" disabled>
                        Selecione o ponto turístico
                      </option>
                      {spots.map((spot) => (
                        <option key={spot.id} value={spot.id}>
                          {spot.name}
                        </option>
                      ))}
                    </select>
                    <img
                      src="/icons/eventos-chevron-select.svg"
                      alt=""
                      className="pointer-events-none absolute right-[10px] top-[10px] h-[3.75px] w-[7.5px]"
                    />
                  </div>
                </FormField>
              </div>

              <div className="flex w-full flex-col gap-1">
                <FormField label="Data e Hora (ocorre única)" required>
                  <input type="datetime-local" name="occurs_at" required className={inputClass} />
                </FormField>
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
                        name="price"
                        disabled={policy === "gratuito"}
                        defaultValue={policy === "tarifado" ? "50,00" : ""}
                        key={policy}
                        className="h-9 w-full rounded-[2px] bg-white py-[9.5px] pl-8 pr-2 text-[14px] text-[#131b2e] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] outline-none border border-transparent focus:border-[#0d472b] disabled:opacity-60"
                      />
                      <span className="pointer-events-none absolute left-[10px] top-[11px] text-[11px] font-semibold tracking-[0.44px] text-[#414942]">
                        R$
                      </span>
                    </div>
                  </div>
                  {/* TODO: backend grava apenas ticket_price (inteira); meia-entrada e
                  benefício PassaNorte ficam a cargo da bilheteria física. */}
                  <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <label className="text-[11px] font-medium leading-[14px] tracking-[0.44px] text-[#414942]">
                      Meia-Entrada / Estudante (informativo)
                    </label>
                    <input disabled defaultValue="" className="h-9 w-full rounded-[2px] bg-white py-[9.5px] pl-8 pr-2 text-[14px] text-[#414942] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] outline-none border border-transparent disabled:opacity-60" />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <label className="text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#0d472b]">
                      Benefício PassaNorte (informativo)
                    </label>
                    <input disabled defaultValue="" className="h-9 w-full rounded-[2px] bg-white py-[10.5px] pl-8 pr-2 text-[12px] font-semibold tracking-[0.24px] text-[#131b2e] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] outline-none border border-transparent disabled:opacity-60" />
                  </div>
                </div>
              </div>

              <div className="flex w-full flex-col gap-1 pb-[6px]">
                <label className="text-[12px] font-semibold leading-4 tracking-[0.24px] text-[#131b2e]">
                  Descrição Institucional &amp; Sinopse (Exibida no Aplicativo)
                </label>
                <textarea
                  name="description"
                  rows={3}
                  required
                  className="w-full resize-none rounded-[4px] bg-white p-2 text-[14px] leading-5 text-[#131b2e] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] outline-none border border-transparent focus:border-[#0d472b]"
                />
              </div>
            </div>
          </div>
        ) : null}

        {open ? (
          <div className="flex w-full items-center justify-end gap-2 px-6">
            <button
              type="submit"
              disabled={saving || spots.length === 0}
              className="flex shrink-0 items-center gap-[10.65px] rounded-[4px] bg-[#0d472b] py-2 pl-6 pr-[28.66px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] disabled:opacity-50"
            >
              <img src="/icons/eventos-icon-publish.svg" alt="" className="size-3" />
              <span className="text-[12px] font-semibold leading-4 tracking-[0.24px] text-white">
                {saving ? "Publicando..." : "Publicar no App PassaNorte"}
              </span>
            </button>
          </div>
        ) : null}
      </form>
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
        <div className="flex w-full flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div className="relative h-10 w-[72px] shrink-0">
            <div className="h-10 w-full rounded-[4px] bg-[#f2f3ff]" />
            <img
              src="/icons/eventos-icon-search.svg"
              alt=""
              className="absolute left-[14.5px] top-[12.5px] size-[15px]"
            />
          </div>
          <div className="flex w-full flex-col">
            <div className="flex flex-wrap items-start gap-2">
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
        <div className="flex w-full flex-wrap items-center gap-1 pt-1">
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

const MONTHS_PT = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];
const TABLE_GRID =
  "grid w-full min-w-[900px] grid-cols-[133.58fr_183.61fr_118.61fr_104.58fr_176fr_129.58fr_minmax(0,1fr)]";

function toEventRow(event: EventApi, spot: TouristSpot | undefined, nowIso: string): EventRow {
  const occurs = new Date(event.occurs_at);
  const isFuture = event.occurs_at >= nowIso;
  const day = occurs.getUTCDate().toString().padStart(2, "0");
  const month = MONTHS_PT[occurs.getUTCMonth()];
  const time = `${occurs.getUTCHours().toString().padStart(2, "0")}:${occurs.getUTCMinutes().toString().padStart(2, "0")}`;
  const paid = event.ticket_price > 0;

  return {
    id: event.id,
    badge: {
      bg: isFuture ? "bg-[rgba(182,240,200,0.4)]" : "bg-[#eaedff]",
      month,
      monthColor: "text-[#0d472b]",
      day,
      dayColor: "text-[#0d472b]",
    },
    dateLabel: <>{day} de<br />{month}</>,
    timeLabel: <>{time}<br />{"h"}<br /></>,
    title: event.title,
    tags: (spot?.categories || []).slice(0, 2).map((category) => ({
      label: <>{category.name}</>,
      bg: "bg-[#eaedff]",
      color: "text-[#414942]",
    })),
    venueIcon: { src: "/icons/eventos-icon-pin.svg", w: 12, h: 15 },
    venueName: <>{spot?.name || "Ponto removido"}</>,
    venueAddress: <>Manaus, AM</>,
    access: paid ? (
      <>
        <p className="text-[12px] font-bold leading-4 tracking-[0.24px] text-[#131b2e]">
          {event.ticket_price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
        </p>
        <p className="text-[12px] leading-4 tracking-[0.12px] text-[#414942]">Bilheteria Cultural</p>
      </>
    ) : (
      <div className="flex items-center rounded-[2px] bg-[rgba(182,240,200,0.5)] py-[2px] pl-2 pr-[9.8px]">
        <span className="text-[11px] font-bold leading-[14px] tracking-[0.44px] text-[#195033]">Gratuito / Aberto</span>
      </div>
    ),
    occupancy: (
      <p className="text-[12px] leading-4 tracking-[0.12px] text-[#414942]">
        Fluxo registrado no app (sem lotação)
      </p>
    ),
    status: isFuture ? (
      <div className="flex items-center gap-1 rounded-full bg-[#e8f5e9] px-[10px] py-1">
        <span className="size-[6px] rounded-full bg-[#0d472b]" />
        <span className="text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#0d472b]">Confirmado</span>
      </div>
    ) : (
      <div className="flex items-center gap-1 rounded-full bg-[#eaedff] px-[10px] py-1">
        <span className="size-[6px] rounded-full bg-[#414942]" />
        <span className="text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#414942]">Encerrado</span>
      </div>
    ),
  };
}

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

const editActions = (onEdit: () => void, onDelete: () => void) => (
  <div className="flex items-center justify-end gap-1">
    <button type="button" aria-label="Editar" onClick={onEdit} className="flex flex-col items-center justify-center rounded-[2px] px-[6px] pb-3 pt-[6px]">
      <img src="/icons/eventos-icon-edit.svg" alt="" className="size-[13.5px]" />
    </button>
    <button type="button" aria-label="Desativar" onClick={onDelete} className="flex flex-col items-center justify-center rounded-[2px] px-[6px] pb-3 pt-[6px]">
      <img src="/icons/eventos-icon-block.svg" alt="" className="size-[15px]" />
    </button>
  </div>
);

function EventsTable({
  rows,
  total,
  onEdit,
  onDelete,
  isLoading,
}: {
  rows: EventRow[];
  total: number;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  isLoading: boolean;
}) {
  return (
    <div className="flex flex-col pb-6">
      <div className="flex w-full flex-col overflow-hidden rounded-lg bg-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
        <div className="w-full overflow-x-auto">
        {/* Header row */}
        <div className={`${TABLE_GRID} items-start bg-[#f2f3ff]`}>
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
          {isLoading ? (
            <div className="py-10 text-center text-[14px] text-[#414942]">Carregando eventos...</div>
          ) : rows.length === 0 ? (
            <div className="py-10 text-center text-[14px] text-[#414942]">
              Nenhum evento cadastrado. Publique o primeiro no formulário acima.
            </div>
          ) : (
            rows.map((row, index) => (
              <div
                key={row.id}
                className={`${TABLE_GRID} items-center border-t border-[#eaedff] ${index === 0 ? "border-t-0" : ""}`}
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
                <div className="flex justify-end px-4 py-4">
                  {editActions(() => onEdit(row.id), () => onDelete(row.id))}
                </div>
              </div>
            ))
          )}
        </div>
        </div>
        {/* Pagination footer */}
        <div className="flex w-full items-center justify-between bg-[#f2f3ff] px-4 py-3">
          <p className="text-[12px] leading-4 tracking-[0.12px] text-[#414942]">
            Exibindo <span className="text-[#131b2e]">{rows.length}</span> de{" "}
            <span className="text-[#131b2e]">{total}</span> eventos cadastrados no calendário oficial
          </p>
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
      <div className="grid w-full grid-cols-1 items-stretch gap-4 md:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.title}
            className="flex min-w-0 items-center gap-4 rounded-lg bg-white p-4 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]"
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
    <div className="flex w-full flex-col items-start gap-2 pt-4 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-col gap-[2px]">
        <p className="text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#131b2e]">
          Prefeitura de Manaus • Manauscult - Fundação Municipal de Cultura, Turismo e Eventos
        </p>
        <p className="text-[12px] leading-4 tracking-[0.12px] text-[#414942]">
          Sistema Integrado PassaNorte • Marco Regulatório de Eventos Públicos Municipais (Lei
          Municipal nº 2.450/2021)
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
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
  const [events, setEvents] = useState<EventApi[]>([]);
  const [spots, setSpots] = useState<TouristSpot[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const load = async () => {
    setIsLoading(true);
    try {
      const [eventsRes, spotsRes] = await Promise.all([
        api.get<{ items: EventApi[] }>("/events"),
        api.get<TouristSpotsResponse>("/tourist-spots"),
      ]);
      setEvents(eventsRes.items);
      setSpots(spotsRes.items);
    } catch (error) {
      console.error("Erro ao carregar eventos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const [eventsRes, spotsRes] = await Promise.all([
          api.get<{ items: EventApi[] }>("/events"),
          api.get<TouristSpotsResponse>("/tourist-spots"),
        ]);
        if (alive) {
          setEvents(eventsRes.items);
          setSpots(spotsRes.items);
        }
      } catch (error) {
        console.error("Erro ao carregar eventos:", error);
      } finally {
        if (alive) setIsLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const spotsById = useMemo(() => new Map(spots.map((spot) => [spot.id, spot])), [spots]);
  const nowIso = new Date().toISOString();
  const eventRows = events.map((event) => toEventRow(event, spotsById.get(event.tourist_spot_id), nowIso));

  async function handleEdit(id: string) {
    const event = events.find((item) => item.id === id);
    if (!event) return;
    const title = prompt("Título:", event.title);
    if (!title) return;
    const priceText = prompt("Preço (R$, 0 = gratuito):", String(event.ticket_price));
    if (priceText === null) return;
    const ticketPrice = Number(priceText.replace(",", ".")) || 0;
    try {
      await api.patch(`/events/${id}`, { title, ticket_price: ticketPrice });
      await load();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Erro ao editar evento.");
    }
  }

  async function handleDelete(id: string) {
    const event = events.find((item) => item.id === id);
    if (!event || !confirm(`Excluir o evento "${event.title}"?`)) return;
    try {
      await api.delete(`/events/${id}`);
      await load();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Erro ao excluir evento.");
    }
  }

  return (
    <RoleShell breadcrumb="Gerenciamento de Eventos">
      <SectionHeader />
      <KpiCards events={events} spots={spots} />
      <RegistrationForm spots={spots} onCreated={load} />
      <FiltersSection />
      <EventsTable rows={eventRows} total={events.length} onEdit={handleEdit} onDelete={handleDelete} isLoading={isLoading} />
      <MiniCards />
      <AuditFooter />
    </RoleShell>
  );
}