"use client";

import { useState } from "react";
import { RoleShell } from "@/components/layout/RoleShell";
import { useDashboardData, type PeriodKey } from "@/hooks/useDashboardData";
import type { HeatmapItem } from "@/types/insights";

const PERIODS: { label: string; key: PeriodKey }[] = [
  { label: "Hoje", key: "day" },
  { label: "7 Dias", key: "week" },
  { label: "Mês Atual", key: "month" },
  { label: "Anual", key: "year" },
];

// Projeção aproximada do bbox de Manaus sobre o canvas estilizado do SVG.
// O mapa é decorativo (a geolocalização real fica no serviço insights); os
// valores do bbox cobrem o centro + região leste da cidade com clamps.
const MAP_BBOX = { minLat: -3.2, maxLat: -2.9, minLng: -60.2, maxLng: -59.78 };
const MAP_RANGE = { minX: 30, maxX: 690, minY: 30, maxY: 410 };

function projectPin(item: HeatmapItem) {
  const lat = item.lat ?? MAP_BBOX.maxLat;
  const lng = item.lng ?? MAP_BBOX.minLng;
  const nx = (lng - MAP_BBOX.minLng) / (MAP_BBOX.maxLng - MAP_BBOX.minLng);
  const ny = (MAP_BBOX.maxLat - lat) / (MAP_BBOX.maxLat - MAP_BBOX.minLat);
  return {
    left: Math.min(Math.max(MAP_RANGE.minX + nx * (MAP_RANGE.maxX - MAP_RANGE.minX), MAP_RANGE.minX), MAP_RANGE.maxX),
    top: Math.min(Math.max(MAP_RANGE.minY + ny * (MAP_RANGE.maxY - MAP_RANGE.minY), MAP_RANGE.minY), MAP_RANGE.maxY),
  };
}

// Faixas de densidade (weight já normalizado 0–1 no insights /heatmap).
function pinDensity(item: HeatmapItem) {
  if (item.weight >= 0.75) return { color: "#ba1a1a", icon: "/icons/dash-pin-critical.svg", iconW: 12.833, iconH: 11.667, halo: true, label: "Pico Extremo", labelColor: "#ba1a1a" };
  if (item.weight >= 0.5) return { color: "#f78e27", icon: "/icons/dash-pin-high.svg", iconW: 10.884, iconH: 9.75, halo: false, label: "Fluxo Alto", labelColor: "#9a3412" };
  if (item.weight >= 0.25) return { color: "#396285", icon: "/icons/dash-pin-medium.svg", iconW: 9.75, iconH: 9.764, halo: false, label: "Fluxo Médio", labelColor: "#414942" };
  return { color: "#0d472b", icon: "/icons/dash-pin-normal.svg", iconW: 9.75, iconH: 10.833, halo: false, label: "Fluxo Normal", labelColor: "#414942" };
}

type MapPin = {
  left: number;
  top: number;
  pinColor: string;
  icon: string;
  iconW: number;
  iconH: number;
  halo: boolean;
  tooltipLeft: number;
  tooltipTop: number;
  title: string;
  titleColor: string;
  detail: string;
  detailColor: string;
  detailWeight: string;
};

export default function DashboardPage() {
  const [period, setPeriod] = useState<PeriodKey>("month");
  const { data, isLoading, error } = useDashboardData(period);
  const [originMode, setOriginMode] = useState<"total" | "inter">("total");

  const pins: MapPin[] = (data?.heatmap ?? [])
    .filter((item) => item.visit_count > 0)
    .slice(0, 12) // top-12 do ranking; tooltip só nos 4 maiores (fidelidade ao layout)
    .map((item, idx) => {
      const density = pinDensity(item);
      const { left, top } = projectPin(item);
      const showTooltip = idx < 4;
      return {
        left,
        top,
        pinColor: density.color,
        icon: density.icon,
        iconW: density.iconW,
        iconH: density.iconH,
        halo: density.halo,
        tooltipLeft: showTooltip ? -70 : 0,
        tooltipTop: showTooltip ? -52 : 0,
        title: item.name,
        titleColor: idx === 0 ? "#002f19" : "#131b2e",
        detail: `${item.visit_count.toLocaleString()} visitas • ${density.label}`,
        detailColor: idx === 0 ? density.labelColor : "#414942",
        detailWeight: idx === 0 ? "font-medium" : "font-normal",
      };
    });

  const hasData = pins.length > 0;

  if (error) {
    return (
      <RoleShell breadcrumb="Dashboard">
        <div className="flex h-full flex-col items-center justify-center text-center">
          <p className="text-red-600 font-semibold">Erro ao carregar dados: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 rounded bg-[#0d472b] px-4 py-2 text-white text-sm"
          >
            Tentar Novamente
          </button>
        </div>
      </RoleShell>
    );
  }

  return (
    <RoleShell breadcrumb="Dashboard">
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
                    key={p.key}
                    type="button"
                    onClick={() => setPeriod(p.key)}
                    className={`flex shrink-0 flex-col items-center justify-center rounded-[2px] px-2 py-1 ${
                      p.key === period
                        ? "bg-[#002f19] shadow-[0px_1px_1px_rgba(0,0,0,0.05)]"
                        : ""
                    }`}
                  >
                    <span
                      className={`text-center text-[11px] font-semibold leading-[14px] tracking-[0.44px] ${
                        p.key === period ? "text-white" : "text-[#414942]"
                      }`}
                    >
                      {p.label}
                    </span>
                  </button>
                ))}
              </div>
              <div className="absolute left-[274.34px] top-[calc(50%-20px)] h-6 w-px -translate-y-1/2 bg-[#dae2fd]" />
              <button
                type="button"
                onClick={() => window.location.reload()}
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
                    <p className="text-[32px] font-bold leading-10 tracking-[-0.8px] text-[#131b2e]">
                      {isLoading ? "..." : data?.stats.checkins.toLocaleString()}
                    </p>
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
                <p className="text-[12px] leading-4 tracking-[0.12px] text-[#414942]">vs. ciclo anterior</p>
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
                    {/* TODO: backend não agrega turistas únicos ainda */}
                    <p className="text-[32px] font-bold leading-10 tracking-[-0.8px] text-[#131b2e]">—</p>
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
                    {/* TODO: backend não agrega turistas únicos ainda */}
                    <span className="text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#396285]">—</span>
                  </div>
                  <p className="text-[13px] font-medium leading-[18px] tracking-[0.26px] text-[#414942]">Passaportes digitais validados</p>
                </div>
              </div>
              <div className="flex w-full shrink-0 flex-col items-start pt-[6px]">
                <p className="text-[12px] leading-4 tracking-[0.12px] text-[#414942]">Dados consolidados</p>
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
                    {/* TODO: backend não agrega resgates ainda */}
                    <p className="text-[32px] font-bold leading-10 tracking-[-0.8px] text-[#131b2e]">—</p>
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
                      {/* TODO: backend não agrega resgates ainda */}
                      <p className="text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#1f4a6c]">—</p>
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
                      <span className="text-[32px] font-bold leading-10 tracking-[-0.8px] text-[#131b2e]">
                        {isLoading ? "..." : data?.stats.monitoredAttractions.total}&nbsp;
                      </span>
                      <span className="text-[14px] leading-5 text-[#414942]">
                        / {isLoading ? "..." : data?.stats.monitoredAttractions.total}
                      </span>
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
                    <span className="text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#0d472b]">
                      {isLoading ? "..." : data?.stats.monitoredAttractions.operating} Operando
                    </span>
                  </div>
                  <p className="text-[11px] font-medium leading-[14px] tracking-[0.44px] text-[#ba1a1a]">
                    {isLoading ? "..." : data?.stats.monitoredAttractions.restricted} c/ restrição
                  </p>
                </div>
              </div>
              <div className="flex w-full shrink-0 flex-col items-start pt-[6px]">
                <p className="text-[12px] leading-4 tracking-[0.12px] text-[#414942]">Disponibilidade de rede</p>
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
                {hasData ? (
                  pins.map((pin, idx) => (
                    <div
                      key={`${pin.title}-${idx}`}
                      className="absolute flex flex-col items-start"
                      style={{ left: pin.left, top: pin.top }}
                    >
                      <div className="flex shrink-0 items-center justify-center">
                        {pin.halo && (
                          <div className="absolute -left-2 -top-2 size-10 rounded-[12px] bg-[rgba(186,26,26,0.4)]" />
                        )}
                        <div
                          className="relative flex shrink-0 items-center justify-center rounded-[12px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]"
                          style={{ width: 20, height: 20, backgroundColor: pin.pinColor }}
                        >
                          <img
                            alt=""
                            src={pin.icon}
                            className="relative block max-w-none"
                            style={{ width: pin.iconW, height: pin.iconH }}
                          />
                        </div>
                      </div>
                      {idx < 4 && (
                        <div
                          className="absolute flex flex-col items-start gap-[5.5px] rounded-[2px] bg-white px-2 py-1 shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]"
                          style={{ left: pin.tooltipLeft, top: pin.tooltipTop, width: 165 }}
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
                      )}
                    </div>
                  ))
                ) : (
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-[2px] bg-[rgba(0,47,25,0.9)] px-3 py-[6px] backdrop-blur-[2px]">
                    <p className="text-[12px] leading-4 tracking-[0.12px] text-[#b6f0c8]">
                      Sem visitas validadas no período ainda
                    </p>
                  </div>
                )}

                {/* HUD Cartographic Info Strip */}
                <div className="absolute bottom-3 left-3 flex items-center gap-3 rounded-[2px] bg-[rgba(0,47,25,0.9)] px-3 py-[6px] backdrop-blur-[2px]">
                  <div className="flex shrink-0 items-center gap-[6px]">
                    <div className="size-2 shrink-0 rounded-[12px] bg-[#b6f0c8]" />
                    <p className="text-[11px] font-semibold uppercase leading-[14px] tracking-[0.44px] text-[#b6f0c8]">
                      Atrativos no mapa: {pins.length}
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
                  {data?.leaderboard.map((item, idx) => (
                    <div key={item.id} className="flex w-full shrink-0 flex-col items-start gap-1 rounded-[4px] bg-[#f2f3ff] p-2">
                      <div className="flex w-full shrink-0 items-center justify-between">
                        <p className="text-[12px] font-semibold leading-4 tracking-[0.24px] text-[#131b2e]">{item.name}</p>
                        <p className="text-[11px] font-bold leading-[14px] tracking-[0.44px]" style={{ color: idx === 0 ? "#ba1a1a" : "#414942" }}>
                          {item.percentage}% do líder
                        </p>
                      </div>
                      <div className="relative h-[6px] w-full shrink-0 overflow-clip rounded-[12px] bg-[#dae2fd]">
                        <div
                          className="absolute left-0 top-0 h-[6px] rounded-[12px]"
                          style={{ right: `${100 - item.percentage}%`, backgroundColor: idx === 0 ? "#ba1a1a" : "#0d472b" }}
                        />
                      </div>
                      <div className="flex w-full shrink-0 items-center justify-between">
                        <p className="text-[12px] leading-4 tracking-[0.12px] text-[#414942]">{item.subtext || "Ponto Turístico"}</p>
                        <p className="text-[12px] leading-4 tracking-[0.12px] text-[#414942]">{item.flow || "0 visitas"}</p>
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
                      Acompanhamento de demanda em tempo real nos postos.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Deep Analytics Grid: Top Attractions Table & Demographic Insights */}
        <section className="grid w-full shrink-0 grid-cols-[repeat(12,minmax(0,1fr))] grid-rows-[556px] gap-4">
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
                      Share do
                      <br />
                      Candidato
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
                  {data?.topAttractions.map((row, idx) => (
                    <div
                      key={row.id}
                      className="mb-[-1px] flex w-full shrink-0 items-center justify-center border-t border-solid border-[rgba(0,0,0,0)] pt-px"
                    >
                      <div className="flex w-[49.03px] shrink-0 flex-col items-start px-3 py-[27.5px]">
                        <p
                          className="text-[13px] font-bold leading-[18px] tracking-[0.26px]"
                          style={{ color: idx < 3 ? "#002f19" : "#414942" }}
                        >
                          {idx + 1}
                        </p>
                      </div>
                      <div className="flex w-[117.38px] shrink-0 items-center gap-2 pl-3">
                        <div
                          className="h-2 shrink-0 rounded-[12px]"
                          style={{ width: `${Math.max(row.percentage, 8)}%`, backgroundColor: "#0d472b" }}
                        />
                        <div className="flex shrink-0 flex-col items-start">
                          <p className="text-[12px] font-semibold leading-4 tracking-[0.24px] text-[#131b2e]">
                            {row.name}
                          </p>
                        </div>
                      </div>
                      <div className="flex w-[134.53px] shrink-0 flex-col items-start pb-[13.5px] pl-6 pr-3 pt-[17.5px]">
                        <div className="flex shrink-0 items-start rounded-[2px] bg-[#eaedff] px-2 py-[2px]">
                          <p className="text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#414942]">
                            {row.subtext || "Geral"}
                          </p>
                        </div>
                      </div>
                      <div className="flex w-[81.52px] shrink-0 flex-col items-end px-3 py-[27.5px]">
                        <p className="text-right text-[13px] font-bold leading-[18px] tracking-[0.26px] text-[#131b2e]">
                          {row.value.toLocaleString()}
                        </p>
                      </div>
                      <div className="flex w-[73.8px] shrink-0 flex-col items-end px-3 py-[20px]">
                        <p className="text-right text-[12px] leading-4 tracking-[0.12px] text-[#414942]">
                          {row.flow || "N/A"}
                        </p>
                      </div>
                      <div className="flex w-[74.41px] shrink-0 flex-col items-end px-3 py-[29px]">
                        <p
                          className="text-right text-[11px] font-semibold leading-[14px] tracking-[0.44px]"
                          style={{ color: row.percentage > 50 ? "#002f19" : "#ba1a1a" }}
                        >
                          {row.percentage > 50 ? "+↑" : "↓"} {row.percentage}%
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
                {data?.origins.map((o) => (
                  <div key={o.label} className="flex w-full shrink-0 flex-col items-start gap-1">
                    <div className="flex w-full shrink-0 items-center justify-between">
                      <div className="flex shrink-0 items-center gap-[5.99px]">
                        <p className="text-[16px] font-semibold leading-4 tracking-[0.44px] text-[#131b2e]">🌐</p>
                        <p className="text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#131b2e]">
                          {o.label}
                        </p>
                      </div>
                      <p className="text-[13px] font-bold tracking-[0.26px] text-[#131b2e]">
                        {o.percentage}&nbsp;
                        <span className="font-normal text-[#414942]">({o.count})</span>
                      </p>
                    </div>
                    <div className="relative h-2 w-full shrink-0 overflow-clip rounded-[12px] bg-[#eaedff]">
                      <div
                        className="absolute left-0 top-0 h-2 rounded-[12px]"
                        style={{ right: `${100 - parseFloat(o.percentage)}%`, backgroundColor: o.color || "#0d472b" }}
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
                {data?.interests.map((item) => (
                  <div
                    key={item.label}
                    className="flex flex-col items-start self-start rounded-[4px] bg-[#f2f3ff] p-2"
                  >
                    <div className="flex w-full shrink-0 flex-col items-start pb-1">
                      <div className="flex w-full shrink-0 items-center gap-[6px]">
                        <div
                          className="h-3 shrink-0 rounded-[2px]"
                          style={{ width: "10px", backgroundColor: item.color || "#0d472b" }}
                        />
                        <div className="flex shrink-0 flex-col items-start">
                          <p className="text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#131b2e]">
                            {item.label}
                          </p>
                        </div>
                      </div>
                    </div>
                    <p className="text-[16px] font-bold leading-6" style={{ color: item.color || "#0d472b" }}>
                      {item.percentage}
                    </p>
                    <p className="text-[12px] leading-4 tracking-[0.12px] text-[#414942]">{item.count} menções</p>
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
              </div>

              <div className="flex w-full shrink-0 flex-col items-start gap-2">
                {/* O feed de notificações do backend é do app do turista (service notifications,
                    role tourist); o painel aguarda um feed administrativo dedicado. */}
                {data?.leaderboard.length
                  ? data.leaderboard.slice(0, 3).map((item) => (
                      <div key={item.id} className="flex w-full shrink-0 items-start gap-2 rounded-[4px] bg-[#f2f3ff] p-2">
                        <div className="relative shrink-0" style={{ width: 18, height: 18 }}>
                          <img alt="" src="/icons/dash-feed-rota.svg" className="absolute inset-0 block size-full" />
                        </div>
                        <div className="relative flex min-w-px flex-[1_0_0] flex-col items-start">
                          <p className="text-[12px] font-semibold leading-4 tracking-[0.24px] text-[#131b2e]">{item.name}</p>
                          <p className="text-[12px] leading-4 tracking-[0.12px] text-[#414942]">
                            {item.value.toLocaleString()} visitas registradas no período selecionado.
                          </p>
                        </div>
                      </div>
                    ))
                  : null}
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
    </RoleShell>
  );
}