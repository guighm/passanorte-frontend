"use client";

import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";

const PERIODS = ["Hoje", "7 Dias", "Mês Atual", "2024 / 2025"];

type Origin = {
  flag: string;
  label: string;
  pct: string;
  count: string;
  fill: string;
  rightInset: string;
};

const ORIGINS: Origin[] = [
  { flag: "🇧🇷", label: "Brasil (Nacional)", pct: "62%", count: "(26.443)", fill: "#0d472b", rightInset: "38%" },
  { flag: "🇺🇸", label: "Estados Unidos", pct: "14%", count: "(5.971)", fill: "#396285", rightInset: "86%" },
  { flag: "🇩🇪", label: "Alemanha", pct: "8%", count: "(3.412)", fill: "#aed6fe", rightInset: "92%" },
  { flag: "🇫🇷", label: "França", pct: "6%", count: "(2.559)", fill: "#9ad3ad", rightInset: "94%" },
  { flag: "🇯🇵", label: "Japão", pct: "4%", count: "(1.706)", fill: "#ffb77d", rightInset: "96%" },
  { flag: "🌐", label: "Demais Países", pct: "6%", count: "(2.559)", fill: "#c0c9c0", rightInset: "94%" },
];

const LEADERBOARD = [
  { pos: "1. Largo de São Sebastião", cap: "96% da Cap.", capColor: "#ba1a1a", fill: "#ba1a1a", right: "4.01%", sub: "Teatro Amazonas / Centro", flow: "1.280 pax/h" },
  { pos: "2. Adolpho Lisboa • Orla", cap: "82% da Cap.", capColor: "#f78e27", fill: "#f78e27", right: "18%", sub: "Mercado Central Municipal", flow: "890 pax/h" },
  { pos: "3. Calçadão Ponta Negra", cap: "65% da Cap.", capColor: "#396285", fill: "#396285", right: "35.01%", sub: "Orla Oeste", flow: "740 pax/h" },
  { pos: "4. Píer do Porto Flutuante", cap: "48% da Cap.", capColor: "#002f19", fill: "#0d472b", right: "52.01%", sub: "Embarques Fluviais", flow: "410 pax/h" },
];

const TOP_ATTRACTIONS = [
  { rank: "01", rankColor: "#002f19", bar: "#0d472b", barW: 6.91, name: ["Teatro", "Amazonas"], chip: ["Patrimônio", "Histórico"], chipW: 69.83, visitors: "28.400", time: ["1h", "35min"], delta: "+22.4%", deltaColor: "#002f19" },
  { rank: "02", rankColor: "#396285", bar: "#396285", barW: 4.94, name: ["Mercado", "Adolpho", "Lisboa"], chip: ["Gastronomia /", "Cultura"], chipW: 88.5, visitors: "21.150", time: ["2h", "10min"], delta: "+14.1%", deltaColor: "#002f19" },
  { rank: "03", rankColor: "#414942", bar: "#aed6fe", barW: 5.8, name: ["Praia da Ponta", "Negra"], chip: ["Lazer & Orla"], chipW: undefined, visitors: "19.820", time: ["3h", "40min"], delta: "+8.5%", deltaColor: "#002f19" },
  { rank: "04", rankColor: "#414942", bar: "#9ad3ad", barW: 4.83, name: ["Bosque da", "Ciência (INPA)"], chip: ["Ecoturismo /", "Botânica"], chipW: 80.56, visitors: "14.200", time: ["2h", "20min"], delta: "+18.0%", deltaColor: "#002f19" },
  { rank: "05", rankColor: "#414942", bar: "#717972", barW: 6.36, name: ["Palacete", "Provincial"], chip: ["Museus &", "Galerias"], chipW: 63.8, visitors: "9.840", time: ["1h 15min"], delta: "-2.1%", deltaColor: "#ba1a1a" },
];

const INTERESTS = [
  { swatch: "#0d472b", swatchW: 10.41, label: ["Cultura &", "História"], pct: "38%", pctColor: "#0d472b", mentions: "16.207 menções" },
  { swatch: "#396285", swatchW: 8.23, label: ["Natureza &", "Ecoturismo"], pct: "27%", pctColor: "#396285", mentions: "11.515 menções" },
  { swatch: "#f78e27", swatchW: 8.56, label: ["Gastronomia", "Regional"], pct: "20%", pctColor: "#f78e27", mentions: "8.530 menções" },
  { swatch: "#aed6fe", swatchW: 10.77, label: ["Lazer &", "Aventura"], pct: "15%", pctColor: "#131b2e", mentions: "6.398 menções" },
];

const FEED = [
  {
    icon: "/icons/dash-feed-lote.svg", iconW: 18.333, iconH: 19.5,
    title: "CAT Aeroporto • Lote de Passaportes Físicos", time: "Há 12 min", timeColor: "#414942", timeWeight: "font-semibold",
    desc: ["Recebimento de 2.000 novos brindes oficiais PassaNorte para", "entrega em guichê."],
  },
  {
    icon: "/icons/dash-feed-rota.svg", iconW: 15, iconH: 17,
    title: "Rota Arquitetura da Borracha", time: "Há 45 min", timeColor: "#414942", timeWeight: "font-semibold",
    desc: ["Conclusão de rota por 142 passageiros de cruzeiro atracado no Porto", "Flutuante."],
  },
  {
    icon: "/icons/dash-feed-alerta.svg", iconW: 18.333, iconH: 17.833,
    title: "Alerta de Chuva Súbita no Encontro das Águas", time: "Há 1h", timeColor: "#ba1a1a", timeWeight: "font-medium",
    desc: ["Capitania dos Portos recomendou desaceleração de lanchas rápidas", "no trecho do Solimões."],
  },
];

type MapPin = {
  left: number;
  top: number;
  pinColor?: string;
  pinSize: number;
  icon: string;
  iconW: number;
  iconH: number;
  halo?: boolean;
  tooltipLeft: number;
  tooltipTop: number;
  tooltipW: number;
  title: string;
  titleColor: string;
  detail: string;
  detailColor: string;
  detailWeight: string;
};

const MAP_PINS: MapPin[] = [
  {
    left: 438, top: 228, pinColor: "#ba1a1a", pinSize: 24, halo: true,
    icon: "/icons/dash-pin-critical.svg", iconW: 12.833, iconH: 11.667,
    tooltipLeft: -70.6, tooltipTop: -52, tooltipW: 165.2,
    title: "Teatro Amazonas", titleColor: "#002f19",
    detail: "Fluxo Crítico: 1.280 pax/h", detailColor: "#ba1a1a", detailWeight: "font-medium",
  },
  {
    left: 430, top: 320, pinColor: "#f78e27", pinSize: 20,
    icon: "/icons/dash-pin-high.svg", iconW: 10.884, iconH: 9.75,
    tooltipLeft: -69.62, tooltipTop: 26, tooltipW: 159.23,
    title: "Mercado Adolpho Lisboa", titleColor: "#131b2e",
    detail: "890 pax/h • Alto", detailColor: "#414942", detailWeight: "font-normal",
  },
  {
    left: 190, top: 205, pinColor: "#396285", pinSize: 20,
    icon: "/icons/dash-pin-medium.svg", iconW: 9.75, iconH: 9.764,
    tooltipLeft: -58.51, tooltipTop: -52, tooltipW: 137.02,
    title: "Praia de Ponta Negra", titleColor: "#131b2e",
    detail: "740 pax/h • Médio", detailColor: "#414942", detailWeight: "font-normal",
  },
  {
    left: 560, top: 165, pinColor: "#0d472b", pinSize: 20,
    icon: "/icons/dash-pin-normal.svg", iconW: 9.75, iconH: 10.833,
    tooltipLeft: -71.48, tooltipTop: -52, tooltipW: 162.97,
    title: "Bosque da Ciência (INPA)", titleColor: "#131b2e",
    detail: "510 pax/h • Normal", detailColor: "#414942", detailWeight: "font-normal",
  },
];

export default function DashboardPage() {
  const [period, setPeriod] = useState("Mês Atual");
  const [originMode, setOriginMode] = useState<"total" | "inter">("total");

  return (
    <AppShell breadcrumb="Dashboard">
      <div className="flex w-full flex-col items-start pb-8">
        {/* Top Operational Control Bar & Sub-Header */}
        <section className="flex w-full shrink-0 flex-col pb-4">
          <div className="flex w-full shrink-0 items-center justify-between py-4">
            <div className="flex shrink-0 flex-col items-start">
              <div className="flex w-full flex-col pb-1">
                <div className="flex w-full items-center gap-1">
                  <div className="relative size-[13.5px] shrink-0">
                    <img alt="" src="/icons/dash-eyebrow.svg" className="absolute inset-0 block size-full" />
                  </div>
                  <p className="text-[11px] font-semibold uppercase leading-[14px] tracking-[0.55px] text-[#396285]">
                    Observatório Municipal de Turismo
                  </p>
                </div>
              </div>
              <h1 className="text-[24px] font-semibold leading-8 tracking-[-0.24px] text-[#131b2e]">
                Painel Executivo de Inteligência
                <br />
                Turística
              </h1>
              <p className="text-[12px] leading-4 tracking-[0.12px] text-[#414942]">
                Manauscult • Dados georreferenciados e fluxo de visitação em tempo real
              </p>
            </div>

            <div className="relative h-[72px] w-[525.14px] shrink-0">
              {/* Quick filters + refresh */}
              <div className="absolute left-0 top-[calc(50%-20px)] flex -translate-y-1/2 items-start gap-[2px] rounded-[4px] bg-[#e2e7ff] p-1">
                {PERIODS.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPeriod(p)}
                    className={`flex shrink-0 flex-col items-center justify-center rounded-[2px] px-2 py-1 ${
                      p === period
                        ? "bg-[#002f19] shadow-[0px_1px_1px_rgba(0,0,0,0.05)]"
                        : ""
                    }`}
                  >
                    <span
                      className={`text-center text-[11px] font-semibold leading-[14px] tracking-[0.44px] ${
                        p === period ? "text-white" : "text-[#414942]"
                      }`}
                    >
                      {p}
                    </span>
                  </button>
                ))}
              </div>
              <div className="absolute left-[274.34px] top-[calc(50%-20px)] h-6 w-px -translate-y-1/2 bg-[#dae2fd]" />
              <button
                type="button"
                className="absolute left-[283.34px] top-[calc(50%-20px)] flex -translate-y-1/2 items-center gap-[6px] rounded-[4px] bg-white p-2 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]"
              >
                <div className="relative h-[14.667px] w-[10.667px] shrink-0">
                  <img alt="" src="/icons/dash-refresh.svg" className="absolute inset-0 block size-full" />
                </div>
                <span className="text-center text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#131b2e]">
                  Atualizar
                </span>
              </button>
              {/* Export */}
              <button
                type="button"
                className="absolute left-0 top-[calc(50%+20px)] flex items-center gap-[6px] rounded-[4px] bg-[#0d472b] px-4 py-2 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]"
              >
                <div className="relative size-[10.667px] shrink-0">
                  <img alt="" src="/icons/dash-export.svg" className="absolute inset-0 block size-full" />
                </div>
                <span className="text-center text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-white">
                  Exportar Relatório
                </span>
                <div className="relative h-[4.317px] w-[7px] shrink-0">
                  <img alt="" src="/icons/dash-chevron-down.svg" className="absolute inset-0 block size-full" />
                </div>
              </button>
            </div>
          </div>
        </section>

        {/* Metric / KPI Bento Ribbon */}
        <section className="flex w-full shrink-0 flex-col pb-6">
          <div className="flex w-full shrink-0 items-start justify-center gap-4">
            {/* KPI 1 */}
            <div className="flex min-w-px flex-[1_0_0] flex-col items-start justify-between rounded-[8px] bg-white p-4 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
              <div className="flex w-full shrink-0 items-start justify-between">
                <div className="flex shrink-0 flex-col items-start">
                  <p className="text-[11px] font-semibold uppercase leading-[14px] tracking-[0.44px] text-[#414942]">
                    Check-ins &amp; Acessos
                  </p>
                  <div className="flex w-full flex-col items-start pt-1">
                    <p className="text-[32px] font-bold leading-10 tracking-[-0.8px] text-[#131b2e]">148.920</p>
                  </div>
                </div>
                <div className="flex size-10 shrink-0 items-center justify-center rounded-[4px] bg-[#f2f3ff]">
                  <div className="relative size-[18.333px] shrink-0">
                    <img alt="" src="/icons/dash-kpi-checkins.svg" className="absolute inset-0 block size-full" />
                  </div>
                </div>
              </div>
              <div className="flex w-full shrink-0 flex-col items-start pt-4">
                <div className="flex w-full items-center justify-between pt-1">
                  <div className="flex shrink-0 items-center gap-1 rounded-[2px] bg-[#e2e7ff] px-[6px] py-[2px]">
                    <div className="relative h-[7px] w-[11.667px] shrink-0">
                      <img alt="" src="/icons/dash-trend-up.svg" className="absolute inset-0 block size-full" />
                    </div>
                    <span className="text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#0d472b]">+18.4%</span>
                  </div>
                  <div className="relative h-6 w-24 shrink-0">
                    <img alt="" src="/icons/dash-sparkline.svg" className="absolute inset-0 block size-full" />
                  </div>
                </div>
              </div>
              <div className="flex w-full shrink-0 flex-col items-start pt-[6px]">
                <p className="text-[12px] leading-4 tracking-[0.12px] text-[#414942]">vs. 125.750 no ciclo anterior</p>
              </div>
            </div>

            {/* KPI 2 */}
            <div className="flex min-w-px flex-[1_0_0] flex-col items-start justify-between rounded-[8px] bg-white p-4 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
              <div className="flex w-full shrink-0 items-start justify-between">
                <div className="flex shrink-0 flex-col items-start">
                  <p className="text-[11px] font-semibold uppercase leading-[14px] tracking-[0.44px] text-[#414942]">
                    Turistas Únicos
                  </p>
                  <div className="flex w-full flex-col items-start pt-1">
                    <p className="text-[32px] font-bold leading-10 tracking-[-0.8px] text-[#131b2e]">42.650</p>
                  </div>
                </div>
                <div className="flex size-10 shrink-0 items-center justify-center rounded-[4px] bg-[#f2f3ff]">
                  <div className="relative h-[18.333px] w-[18.792px] shrink-0">
                    <img alt="" src="/icons/dash-kpi-tourists.svg" className="absolute inset-0 block size-full" />
                  </div>
                </div>
              </div>
              <div className="flex w-full shrink-0 flex-col items-start pt-4">
                <div className="flex w-full items-center justify-between pt-1">
                  <div className="flex shrink-0 items-center gap-1 rounded-[2px] bg-[#e2e7ff] px-[6px] py-[2px]">
                    <div className="relative h-[9.333px] w-[12.833px] shrink-0">
                      <img alt="" src="/icons/dash-trend-up-2.svg" className="absolute inset-0 block size-full" />
                    </div>
                    <span className="text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#396285]">+9.2%</span>
                  </div>
                  <p className="text-[13px] font-medium leading-[18px] tracking-[0.26px] text-[#414942]">8.420 ativos hoje</p>
                </div>
              </div>
              <div className="flex w-full shrink-0 flex-col items-start pt-[6px]">
                <p className="text-[12px] leading-4 tracking-[0.12px] text-[#414942]">Passaportes digitais validados</p>
              </div>
            </div>

            {/* KPI 3 */}
            <div className="flex min-w-px flex-[1_0_0] flex-col items-start justify-between rounded-[8px] bg-white p-4 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
              <div className="flex w-full shrink-0 items-start justify-between">
                <div className="flex shrink-0 flex-col items-start">
                  <p className="text-[11px] font-semibold uppercase leading-[14px] tracking-[0.44px] text-[#414942]">
                    Benefícios Concedidos
                  </p>
                  <div className="flex w-full flex-col items-start pt-1">
                    <p className="text-[32px] font-bold leading-10 tracking-[-0.8px] text-[#131b2e]">3.812</p>
                  </div>
                </div>
                <div className="flex size-10 shrink-0 items-center justify-center rounded-[4px] bg-[#f2f3ff]">
                  <div className="relative h-[17.417px] w-[18.333px] shrink-0">
                    <img alt="" src="/icons/dash-kpi-benefits.svg" className="absolute inset-0 block size-full" />
                  </div>
                </div>
              </div>
              <div className="flex w-full shrink-0 flex-col items-start pt-4">
                <div className="flex w-full items-center justify-between pt-1">
                  <div className="flex shrink-0 items-center gap-1 rounded-[2px] bg-[#cee5ff] px-[6px] py-[2px]">
                    <div className="relative size-[11.667px] shrink-0">
                      <img alt="" src="/icons/dash-trend-conv.svg" className="absolute inset-0 block size-full" />
                    </div>
                    <div className="flex shrink-0 flex-col items-start pr-[18.8px]">
                      <p className="text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#1f4a6c]">74%</p>
                      <p className="text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#1f4a6c]">conv.</p>
                    </div>
                  </div>
                  <div className="flex shrink-0 flex-col items-start pr-[52.81px]">
                    <p className="text-[12px] leading-4 tracking-[0.12px] text-[#414942]">Postos CAT</p>
                    <p className="text-[12px] leading-4 tracking-[0.12px] text-[#414942]">Manauscult</p>
                  </div>
                </div>
              </div>
              <div className="flex w-full shrink-0 flex-col items-start pt-[6px]">
                <p className="text-[12px] leading-4 tracking-[0.12px] text-[#414942]">Taxa de rotas finalizadas</p>
              </div>
            </div>

            {/* KPI 4 */}
            <div className="flex min-w-px flex-[1_0_0] flex-col items-start justify-between rounded-[8px] bg-white p-4 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
              <div className="flex w-full shrink-0 items-start justify-between">
                <div className="flex shrink-0 flex-col items-start">
                  <p className="text-[11px] font-semibold uppercase leading-[14px] tracking-[0.44px] text-[#414942]">
                    Atrativos Monitorados
                  </p>
                  <div className="flex w-full flex-col items-start pt-1">
                    <div className="flex h-10 items-center">
                      <span className="text-[32px] font-bold leading-10 tracking-[-0.8px] text-[#131b2e]">38&nbsp;</span>
                      <span className="text-[14px] leading-5 text-[#414942]">/ 38</span>
                    </div>
                  </div>
                </div>
                <div className="flex size-10 shrink-0 items-center justify-center rounded-[4px] bg-[#f2f3ff]">
                  <div className="relative h-[14.667px] w-[18.333px] shrink-0">
                    <img alt="" src="/icons/dash-kpi-attractions.svg" className="absolute inset-0 block size-full" />
                  </div>
                </div>
              </div>
              <div className="flex w-full shrink-0 flex-col items-start pt-4">
                <div className="flex w-full items-center justify-between pt-1">
                  <div className="flex shrink-0 items-center gap-1 rounded-[2px] bg-[#e2e7ff] px-[6px] py-[2px]">
                    <div className="size-2 shrink-0 rounded-[12px] bg-[#0d472b]" />
                    <span className="text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#0d472b]">35 Operando</span>
                  </div>
                  <p className="text-[11px] font-medium leading-[14px] tracking-[0.44px] text-[#ba1a1a]">3 c/ restrição</p>
                </div>
              </div>
              <div className="flex w-full shrink-0 flex-col items-start pt-[6px]">
                <p className="text-[12px] leading-4 tracking-[0.12px] text-[#414942]">92.1% disponibilidade de rede</p>
              </div>
            </div>
          </div>
        </section>

        {/* Main Map & Heatmap Geospatial Section */}
        <section className="flex w-full shrink-0 flex-col pb-6">
          <div className="grid w-full shrink-0 grid-cols-[repeat(12,minmax(0,1fr))] grid-rows-[554px] gap-4">
            {/* Interactive Styled Heatmap Canvas */}
            <div className="col-[1/span_8] row-1 flex flex-col items-start self-start overflow-clip rounded-[8px] bg-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
              <div className="flex w-full shrink-0 flex-col items-start justify-center gap-2 bg-white p-4">
                <div className="flex shrink-0 items-center gap-2">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-[4px] bg-[#f2f3ff]">
                    <div className="relative size-[15px] shrink-0">
                      <img alt="" src="/icons/dash-map.svg" className="absolute inset-0 block size-full" />
                    </div>
                  </div>
                  <div className="flex shrink-0 flex-col items-start gap-[5.5px] pb-[2.5px]">
                    <p className="text-[16px] font-semibold leading-6 text-[#131b2e]">
                      Cartografia Operacional • Mapa de Calor de Manaus
                    </p>
                    <p className="text-[12px] leading-4 tracking-[0.12px] text-[#414942]">
                      Densidade de fluxo georreferenciada via GPS &amp; QR Beacons
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-2 rounded-[4px] bg-[#f2f3ff] px-2 py-[6px]">
                  <p className="text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#414942]">Densidade:</p>
                  <div className="flex shrink-0 items-center gap-1">
                    <div className="h-[10px] w-6 rounded-[2px] bg-[#b6f0c8]" />
                    <div className="h-[10px] w-6 rounded-[2px] bg-[#cee5ff]" />
                    <div className="h-[10px] w-6 rounded-[2px] bg-[#f78e27]" />
                    <div className="h-[10px] w-6 rounded-[2px] bg-[#ba1a1a]" />
                  </div>
                  <p className="text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#131b2e]">Pico Extremo</p>
                </div>
              </div>

              {/* Stylized Vector Map of Manaus */}
              <div className="relative h-[440px] w-full shrink-0 overflow-clip bg-[#1a2e26]">
                <img
                  alt=""
                  src="/images/dash-manaus-map.svg"
                  className="absolute inset-0 block size-full max-w-none"
                />
                {MAP_PINS.map((pin) => (
                  <div
                    key={pin.title}
                    className="absolute flex flex-col items-start"
                    style={{ left: pin.left, top: pin.top }}
                  >
                    <div className="flex shrink-0 items-center justify-center">
                      {pin.halo && (
                        <div className="absolute -left-2 -top-2 size-10 rounded-[12px] bg-[rgba(186,26,26,0.4)]" />
                      )}
                      <div
                        className="relative flex shrink-0 items-center justify-center rounded-[12px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]"
                        style={{ width: pin.pinSize, height: pin.pinSize, backgroundColor: pin.pinColor }}
                      >
                        <img
                          alt=""
                          src={pin.icon}
                          className="relative block max-w-none"
                          style={{ width: pin.iconW, height: pin.iconH }}
                        />
                      </div>
                    </div>
                    <div
                      className="absolute flex flex-col items-start gap-[5.5px] rounded-[2px] bg-white px-2 py-1 shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]"
                      style={{ left: pin.tooltipLeft, top: pin.tooltipTop, width: pin.tooltipW }}
                    >
                      <p
                        className="w-full text-[11px] font-bold leading-[14px] tracking-[0.44px]"
                        style={{ color: pin.titleColor }}
                      >
                        {pin.title}
                      </p>
                      <p
                        className={`text-[12px] leading-4 tracking-[0.12px] ${pin.detailWeight}`}
                        style={{ color: pin.detailColor }}
                      >
                        {pin.detail}
                      </p>
                    </div>
                  </div>
                ))}
                {/* 5. Encontro das Águas — tooltip only */}
                <div
                  className="absolute flex flex-col items-start gap-[5.5px] rounded-[2px] bg-white px-2 pb-[6.5px] pt-1 shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]"
                  style={{ left: 631.16, top: 348, width: 167.69 }}
                >
                  <p className="text-[11px] font-bold leading-[14px] tracking-[0.44px] text-[#131b2e]">Encontro das Águas</p>
                  <p className="text-[12px] leading-4 tracking-[0.12px] text-[#414942]">Embarcações: 28 no setor</p>
                </div>

                {/* HUD Cartographic Info Strip */}
                <div className="absolute bottom-3 left-3 flex items-center gap-3 rounded-[2px] bg-[rgba(0,47,25,0.9)] px-3 py-[6px] backdrop-blur-[2px]">
                  <div className="flex shrink-0 items-center gap-[6px]">
                    <div className="size-2 shrink-0 rounded-[12px] bg-[#b6f0c8]" />
                    <p className="text-[11px] font-semibold uppercase leading-[14px] tracking-[0.44px] text-[#b6f0c8]">
                      Antenas Ativas: 42
                    </p>
                  </div>
                  <p className="text-[12px] leading-4 tracking-[0.12px] text-[#7db591]">•</p>
                  <p className="text-[13px] font-medium leading-[18px] tracking-[0.26px] text-[#eef0ff]">
                    3° 8&apos; 22&quot; S, 60° 1&apos; 26&quot; W
                  </p>
                </div>
              </div>
            </div>

            {/* Map Lateral Panel: Realtime Density Leaderboard & CAT Status */}
            <div className="col-[9/span_4] row-1 flex flex-col items-start justify-between self-start rounded-[8px] bg-white p-4 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
              <div className="flex w-full shrink-0 flex-col items-start gap-2">
                <div className="flex w-full shrink-0 items-center justify-between pb-2">
                  <div className="flex shrink-0 items-center gap-2">
                    <div className="relative h-[15.833px] w-[13.333px] shrink-0">
                      <img alt="" src="/icons/dash-leaderboard.svg" className="absolute inset-0 block size-full" />
                    </div>
                    <p className="text-[16px] font-semibold leading-6 text-[#131b2e]">Maior Fluxo Agora</p>
                  </div>
                  <div className="flex shrink-0 flex-col items-start rounded-[12px] bg-[#e2e7ff] px-2 py-[2px]">
                    <p className="text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#002f19]">Tempo Real</p>
                  </div>
                </div>
                <div className="flex w-full shrink-0 flex-col items-start gap-2">
                  {LEADERBOARD.map((item) => (
                    <div key={item.pos} className="flex w-full shrink-0 flex-col items-start gap-1 rounded-[4px] bg-[#f2f3ff] p-2">
                      <div className="flex w-full shrink-0 items-center justify-between">
                        <p className="text-[12px] font-semibold leading-4 tracking-[0.24px] text-[#131b2e]">{item.pos}</p>
                        <p className="text-[11px] font-bold leading-[14px] tracking-[0.44px]" style={{ color: item.capColor }}>
                          {item.cap}
                        </p>
                      </div>
                      <div className="relative h-[6px] w-full shrink-0 overflow-clip rounded-[12px] bg-[#dae2fd]">
                        <div
                          className="absolute left-0 top-0 h-[6px] rounded-[12px]"
                          style={{ right: item.right, backgroundColor: item.fill }}
                        />
                      </div>
                      <div className="flex w-full shrink-0 items-center justify-between">
                        <p className="text-[12px] leading-4 tracking-[0.12px] text-[#414942]">{item.sub}</p>
                        <p className="text-[12px] leading-4 tracking-[0.12px] text-[#414942]">{item.flow}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex w-full shrink-0 flex-col items-start pt-4">
                <div className="flex w-full shrink-0 items-start gap-2 rounded-[4px] bg-[#eaedff] p-2">
                  <div className="relative h-[18.667px] w-[16.667px] shrink-0">
                    <img alt="" src="/icons/dash-cat-alert.svg" className="absolute inset-0 block size-full" />
                  </div>
                  <div className="flex shrink-0 flex-col items-start">
                    <p className="text-[12px] font-semibold leading-4 tracking-[0.24px] text-[#131b2e]">Postos CAT Manauscult</p>
                    <p className="text-[12px] leading-4 tracking-[0.12px] text-[#414942]">
                      Posto Aeroporto Eduardo Gomes com
                      <br />
                      alta demanda de carimbos digitais
                      <br />
                      PassaNorte.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Deep Analytics Grid: Top Attractions Table & Demographic Insights */}
        <section className="flex w-full shrink-0 flex-col pb-6">
          <div className="grid w-full shrink-0 grid-cols-[repeat(12,minmax(0,1fr))] grid-rows-[556px] gap-4">
            {/* Top 5 Visited Attractions Table */}
            <div className="col-[1/span_7] row-1 flex flex-col items-start justify-between self-start rounded-[8px] bg-white p-4 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
              <div className="flex w-full shrink-0 flex-col items-start gap-4">
                <div className="flex w-full shrink-0 items-center justify-between">
                  <div className="flex shrink-0 items-center gap-2">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-[4px] bg-[#f2f3ff]">
                      <div className="relative h-[16.667px] w-[15px] shrink-0">
                        <img alt="" src="/icons/dash-top5.svg" className="absolute inset-0 block size-full" />
                      </div>
                    </div>
                    <div className="flex shrink-0 flex-col items-start gap-[5.5px] pb-[2.5px]">
                      <p className="text-[16px] font-semibold leading-6 text-[#131b2e]">Top 5 Atrativos Mais Visitados</p>
                      <p className="text-[12px] leading-4 tracking-[0.12px] text-[#414942]">
                        Validações consolidadas no ciclo corrente
                      </p>
                    </div>
                  </div>
                  <button type="button" className="flex shrink-0 items-center gap-1">
                    <span className="text-center text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#002f19]">
                      Ver ranking completo
                    </span>
                    <div className="relative size-[9.333px] shrink-0">
                      <img alt="" src="/icons/dash-arrow-right.svg" className="absolute inset-0 block size-full" />
                    </div>
                  </button>
                </div>

                {/* Table */}
                <div className="flex w-full shrink-0 flex-col items-start overflow-auto">
                  {/* Header row */}
                  <div className="flex w-full shrink-0 items-start justify-center rounded-t-[2px] bg-[#f2f3ff]">
                    <div className="flex w-[49.03px] shrink-0 flex-col items-start px-3 py-[17px]">
                      <p className="text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#414942]">Pos.</p>
                    </div>
                    <div className="flex w-[129.38px] shrink-0 flex-col items-start px-3 py-[17px]">
                      <p className="text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#414942]">Ponto Turístico</p>
                    </div>
                    <div className="flex w-[122.53px] shrink-0 flex-col items-start px-3 py-[17px]">
                      <p className="text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#414942]">Categoria</p>
                    </div>
                    <div className="flex w-[81.52px] shrink-0 flex-col items-end px-3 py-[17px]">
                      <p className="text-right text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#414942]">
                        Visitantes
                      </p>
                    </div>
                    <div className="flex w-[73.8px] shrink-0 flex-col items-end px-3 py-[10px]">
                      <p className="text-right text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#414942]">
                        Tempo
                        <br />
                        Médio
                      </p>
                    </div>
                    <div className="flex w-[74.41px] shrink-0 flex-col items-end rounded-br-[2px] rounded-tr-[2px] px-3 py-[17px]">
                      <p className="text-right text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#414942]">
                        Variação
                      </p>
                    </div>
                  </div>
                  {/* Body */}
                  <div className="flex w-full shrink-0 flex-col items-start">
                    {TOP_ATTRACTIONS.map((row) => (
                      <div
                        key={row.rank}
                        className="mb-[-1px] flex w-full shrink-0 items-center justify-center border-t border-solid border-[rgba(0,0,0,0)] pt-px"
                      >
                        <div className="flex w-[49.03px] shrink-0 flex-col items-start px-3 py-[27.5px]">
                          <p
                            className="text-[13px] font-bold leading-[18px] tracking-[0.26px]"
                            style={{ color: row.rankColor }}
                          >
                            {row.rank}
                          </p>
                        </div>
                        <div className="flex w-[117.38px] shrink-0 items-center gap-2 pl-3">
                          <div
                            className="h-2 shrink-0 rounded-[12px]"
                            style={{ width: row.barW, backgroundColor: row.bar }}
                          />
                          <div className="flex shrink-0 flex-col items-start">
                            {row.name.map((line) => (
                              <p
                                key={line}
                                className="text-[12px] font-semibold leading-4 tracking-[0.24px] text-[#131b2e]"
                              >
                                {line}
                              </p>
                            ))}
                          </div>
                        </div>
                        <div className="flex w-[134.53px] shrink-0 flex-col items-start pb-[13.5px] pl-6 pr-3 pt-[17.5px]">
                          {row.chipW !== undefined ? (
                            <div
                              className="flex shrink-0 flex-col justify-center rounded-[2px] bg-[#eaedff] px-2 py-[3px]"
                              style={{ width: row.chipW }}
                            >
                              <p className="text-[11px] font-semibold leading-[18px] tracking-[0.44px] text-[#414942]">
                                {row.chip[0]}
                              </p>
                              <p className="text-[11px] font-semibold leading-[18px] tracking-[0.44px] text-[#414942]">
                                {row.chip[1]}
                              </p>
                            </div>
                          ) : (
                            <div className="flex shrink-0 items-start rounded-[2px] bg-[#eaedff] px-2 py-[2px]">
                              <p className="text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#414942]">
                                {row.chip[0]}
                              </p>
                            </div>
                          )}
                        </div>
                        <div className="flex w-[81.52px] shrink-0 flex-col items-end px-3 py-[27.5px]">
                          <p className="text-right text-[13px] font-bold leading-[18px] tracking-[0.26px] text-[#131b2e]">
                            {row.visitors}
                          </p>
                        </div>
                        <div className="flex w-[73.8px] shrink-0 flex-col items-end px-3 py-[20px]">
                          {row.time.map((line) => (
                            <p key={line} className="text-right text-[12px] leading-4 tracking-[0.12px] text-[#414942]">
                              {line}
                            </p>
                          ))}
                        </div>
                        <div className="flex w-[74.41px] shrink-0 flex-col items-end px-3 py-[29px]">
                          <p
                            className="text-right text-[11px] font-semibold leading-[14px] tracking-[0.44px]"
                            style={{ color: row.deltaColor }}
                          >
                            {row.delta}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Capacity footer */}
              <div className="flex w-full shrink-0 flex-col items-start pt-4">
                <div className="flex w-full shrink-0 items-center justify-between rounded-[4px] bg-[#f2f3ff] py-2 pl-2 pr-[8.01px]">
                  <div className="flex shrink-0 flex-col items-start pr-[34.17px]">
                    <p className="text-[12px] leading-4 tracking-[0.12px] text-[#414942]">
                      Capacidade total somada dos atrativos monitorados:
                      <br />
                      85.000 pax/dia
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-col items-start pr-3">
                    <p className="text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#002f19]">
                      Operação Dentro da Margem
                      <br />
                      Segura
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Country of Origin Distribution */}
            <div className="col-[8/span_5] row-1 flex flex-col items-start justify-between self-start rounded-[8px] bg-white p-4 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
              <div className="flex w-full shrink-0 flex-col items-start gap-4">
                <div className="flex w-full shrink-0 items-center justify-between">
                  <div className="flex shrink-0 items-center gap-2">
                    <div className="flex h-8 w-[30.73px] shrink-0 items-center justify-center rounded-[4px] bg-[#f2f3ff]">
                      <div className="relative size-[16.667px] shrink-0">
                        <img alt="" src="/icons/dash-origin.svg" className="absolute inset-0 block size-full" />
                      </div>
                    </div>
                    <div className="h-[72px] w-[232.27px] shrink-0">
                      <p className="text-[16px] font-semibold leading-6 text-[#131b2e]">Origem dos Viajantes</p>
                      <p className="pt-[13.5px] text-[12px] leading-4 tracking-[0.12px] text-[#414942]">
                        Distribuição geográfica por
                        <br />
                        nacionalidade
                      </p>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-start rounded-[2px] bg-[#e2e7ff] p-[2px]">
                    <button
                      type="button"
                      onClick={() => setOriginMode("total")}
                      className={`mr-[-0.01px] flex shrink-0 flex-col items-center justify-center rounded-[2px] px-2 py-[2px] ${
                        originMode === "total" ? "bg-white" : ""
                      }`}
                    >
                      <span className="text-center text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#131b2e]">
                        Total
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setOriginMode("inter")}
                      className={`flex shrink-0 flex-col items-center justify-center rounded-[2px] px-2 py-[2px] ${
                        originMode === "inter" ? "bg-white" : ""
                      }`}
                    >
                      <span className="text-center text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#414942]">
                        Inter.
                      </span>
                    </button>
                  </div>
                </div>

                {/* Horizontal Country Flow Bars */}
                <div className="flex w-full shrink-0 flex-col items-start gap-2">
                  {ORIGINS.map((o) => (
                    <div key={o.label} className="flex w-full shrink-0 flex-col items-start gap-1">
                      <div className="flex w-full shrink-0 items-center justify-between">
                        <div className="flex shrink-0 items-center gap-[5.99px]">
                          <p className="text-[16px] font-semibold leading-4 tracking-[0.44px] text-[#131b2e]">{o.flag}</p>
                          <p className="text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#131b2e]">
                            {o.label}
                          </p>
                        </div>
                        <p className="text-[13px] font-bold tracking-[0.26px] text-[#131b2e]">
                          {o.pct}&nbsp;
                          <span className="font-normal text-[#414942]">{o.count}</span>
                        </p>
                      </div>
                      <div className="relative h-2 w-full shrink-0 overflow-clip rounded-[12px] bg-[#eaedff]">
                        <div
                          className="absolute left-0 top-0 h-2 rounded-[12px]"
                          style={{ right: o.rightInset, backgroundColor: o.fill }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex w-full shrink-0 flex-col items-start pt-4">
                <div className="flex w-full shrink-0 items-center justify-between rounded-[4px] bg-[#f2f3ff] py-2 pl-2 pr-[8.01px]">
                  <div className="flex shrink-0 flex-col items-start pr-[64.02px]">
                    <p className="text-[12px] leading-4 tracking-[0.12px] text-[#414942]">
                      Turismo Emissivo
                      <br />
                      Doméstico Líder:
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-col items-start pr-[41.03px]">
                    <p className="text-[11px] font-bold leading-[14px] tracking-[0.44px] text-[#131b2e]">
                      São Paulo (34%) • Rio de
                      <br />
                      Janeiro (19%)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Analytics: Tourist Interests Donut + Institutional Actions Quick Bar */}
        <section className="grid w-full shrink-0 grid-cols-[repeat(12,minmax(0,1fr))] grid-rows-[382px] gap-4">
          {/* Categories of Interest / Thematic Preferences */}
          <div className="col-[1/span_6] row-1 flex flex-col items-start gap-4 self-start rounded-[8px] bg-white px-4 pb-[118px] pt-4 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
            <div className="flex w-full shrink-0 items-center gap-2">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-[4px] bg-[#f2f3ff]">
                <div className="relative size-[16.667px] shrink-0">
                  <img alt="" src="/icons/dash-interests.svg" className="absolute inset-0 block size-full" />
                </div>
              </div>
              <div className="flex shrink-0 flex-col items-start gap-[5.5px] pb-[2.5px]">
                <p className="text-[16px] font-semibold leading-6 text-[#131b2e]">Categorias de Interesse Declaradas</p>
                <p className="text-[12px] leading-4 tracking-[0.12px] text-[#414942]">
                  Preferências no cadastro do app PassaNorte
                </p>
              </div>
            </div>
            <div className="flex w-full shrink-0 items-center gap-6">
              {/* Donut Chart SVG */}
              <div className="relative flex size-[176px] shrink-0 items-center justify-center">
                <div
                  className="relative flex h-[176px] min-w-px flex-[1_0_0] items-center justify-center"
                  style={{ containerType: "size" }}
                >
                  <div className="-rotate-90 h-[100cqw] flex-none">
                    <div className="relative h-full w-[176px] overflow-clip">
                      <div className="absolute inset-[5.79%]">
                        <div className="absolute inset-[-7.07%]">
                          <img alt="" src="/icons/dash-donut-1.svg" className="block size-full max-w-none" />
                        </div>
                      </div>
                      <div className="absolute bottom-[17.78%] left-1/2 right-[5.79%] top-[5.79%]">
                        <div className="absolute inset-[-8.18%_-14.14%_-5.89%_-0.17%]">
                          <img alt="" src="/icons/dash-donut-2.svg" className="block size-full max-w-none" />
                        </div>
                      </div>
                      <div className="absolute inset-[76.01%_19.73%_5.79%_14.24%]">
                        <div className="absolute inset-[-20.64%_-6.4%_-34.34%_-7.56%]">
                          <img alt="" src="/icons/dash-donut-3.svg" className="block size-full max-w-none" />
                        </div>
                      </div>
                      <div className="absolute inset-[24.04%_85.76%_23.99%_5.79%]">
                        <div className="absolute inset-[-6.94%_-60.35%_-6.95%_-73.96%]">
                          <img alt="" src="/icons/dash-donut-4.svg" className="block size-full max-w-none" />
                        </div>
                      </div>
                      <div className="absolute inset-[5.79%_50.04%_75.96%_14.21%]">
                        <div className="absolute inset-[-34.25%_-0.22%_-20.46%_-14.02%]">
                          <img alt="" src="/icons/dash-donut-5.svg" className="block size-full max-w-none" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-center text-[16px] font-bold leading-6 text-[#131b2e]">100%</p>
                  <p className="text-center text-[11px] font-semibold uppercase leading-[14px] tracking-[0.44px] text-[#414942]">
                    Segmentação
                  </p>
                </div>
              </div>

              {/* Legend and Percent Breakdown */}
              <div className="relative grid h-[184px] min-w-px flex-[1_0_0] grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[88px_88px] gap-2">
                {INTERESTS.map((item) => (
                  <div
                    key={item.pct}
                    className="flex flex-col items-start self-start rounded-[4px] bg-[#f2f3ff] p-2"
                  >
                    <div className="flex w-full shrink-0 flex-col items-start pb-1">
                      <div className="flex w-full shrink-0 items-center gap-[6px]">
                        <div
                          className="h-3 shrink-0 rounded-[2px]"
                          style={{ width: item.swatchW, backgroundColor: item.swatch }}
                        />
                        <div className="flex shrink-0 flex-col items-start">
                          {item.label.map((line) => (
                            <p
                              key={line}
                              className="text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#131b2e]"
                            >
                              {line}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-[16px] font-bold leading-6" style={{ color: item.pctColor }}>
                      {item.pct}
                    </p>
                    <p className="text-[12px] leading-4 tracking-[0.12px] text-[#414942]">{item.mentions}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Administrative Quick Dispatch & Operational Feed */}
          <div className="col-[7/span_6] row-1 flex flex-col items-start justify-between self-start rounded-[8px] bg-white p-4 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
            <div className="flex w-full shrink-0 flex-col items-start gap-4">
              <div className="flex w-full shrink-0 items-center justify-between">
                <div className="flex shrink-0 items-center gap-2">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-[4px] bg-[#f2f3ff]">
                    <div className="relative h-[16.708px] w-[16.667px] shrink-0">
                      <img alt="" src="/icons/dash-plantao.svg" className="absolute inset-0 block size-full" />
                    </div>
                  </div>
                  <div className="flex shrink-0 flex-col items-start gap-[5.5px] pb-[2.5px]">
                    <p className="text-[16px] font-semibold leading-6 text-[#131b2e]">
                      Plantão Integrado • Ocorrências em Campo
                    </p>
                    <p className="text-[12px] leading-4 tracking-[0.12px] text-[#414942]">
                      Despachos dos fiscais e postos de apoio aos turistas
                    </p>
                  </div>
                </div>
                <p className="text-[13px] font-medium leading-[18px] tracking-[0.26px] text-[#414942]">Hoje, 16:42</p>
              </div>

              <div className="flex w-full shrink-0 flex-col items-start gap-2">
                {FEED.map((item) => (
                  <div key={item.title} className="flex w-full shrink-0 items-start gap-2 rounded-[4px] bg-[#f2f3ff] p-2">
                    <div
                      className="relative shrink-0"
                      style={{ width: item.iconW, height: item.iconH }}
                    >
                      <img alt="" src={item.icon} className="absolute inset-0 block size-full" />
                    </div>
                    <div className="relative flex min-w-px flex-[1_0_0] flex-col items-start">
                      <div className="flex w-full shrink-0 items-center justify-between">
                        <p className="text-[12px] font-semibold leading-4 tracking-[0.24px] text-[#131b2e]">{item.title}</p>
                        <p
                          className={`text-[11px] leading-[14px] tracking-[0.44px] ${item.timeWeight}`}
                          style={{ color: item.timeColor }}
                        >
                          {item.time}
                        </p>
                      </div>
                      <p className="text-[12px] leading-4 tracking-[0.12px] text-[#414942]">
                        {item.desc[0]}
                        <br />
                        {item.desc[1]}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex w-full shrink-0 flex-col items-start pt-4">
              <div className="flex w-full shrink-0 flex-col items-start justify-center gap-2 pt-2">
                <p className="text-[12px] leading-4 tracking-[0.12px] text-[#414942]">
                  Central de Atendimento ao Cidadão e Turista: Ramal 194
                </p>
                <button
                  type="button"
                  className="flex shrink-0 flex-col items-center justify-center rounded-[4px] bg-[#eaedff] px-4 py-2"
                >
                  <span className="text-center text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#131b2e]">
                    Abrir Central de Despacho
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}