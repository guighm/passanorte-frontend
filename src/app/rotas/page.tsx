"use client";

import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";

type RouteCard = {
  id: string;
  code: string;
  title: string;
  thumb: string;
  status: "ativa" | "manutencao";
  attractCount: number;
  attractives: string;
  meta: { icon: string; iconSize: [number, number]; label: string; strong?: boolean }[];
  conclusions: string;
  rating?: string;
  seasonalLabel?: string;
  seasonalStatus?: string;
};

const ROUTES: RouteCard[] = [
  {
    id: "1",
    code: "ROT-MAO-2025-01",
    title: "Rota Histórica & Cultural de Manaus",
    thumb: "/images/rotas-thumb-1.png",
    status: "ativa",
    attractCount: 5,
    attractives:
      "Teatro Amazonas ➔ Mercado Adolpho Lisboa ➔ Palacete Provincial ➔ Igreja",
    meta: [
      { icon: "/icons/rotas-distancia.svg", iconSize: [13.333, 8], label: "4.2 km aprox." },
      { icon: "/icons/rotas-walking.svg", iconSize: [8.667, 14.333], label: "Nível: Fácil" },
      {
        icon: "/icons/rotas-gift.svg",
        iconSize: [13.333, 12.667],
        label: "Kit Souvenir Amazônia Viva",
        strong: true,
      },
    ],
    conclusions: "3.420",
    rating: "★ 4.9",
  },
  {
    id: "2",
    code: "ROT-MAO-2025-02",
    title: "Circuito Gastronômico Manaus Raízes",
    thumb: "/images/rotas-thumb-2.png",
    status: "ativa",
    attractCount: 4,
    attractives:
      "Mercado Adolpho Lisboa ➔ Feira da Panair ➔ Restaurante Flutuante ➔…",
    meta: [
      { icon: "/icons/rotas-distancia.svg", iconSize: [13.333, 8], label: "6.8 km aprox." },
      {
        icon: "/icons/rotas-transporte.svg",
        iconSize: [10.667, 12.667],
        label: "Transporte Misto",
      },
      {
        icon: "/icons/rotas-gift.svg",
        iconSize: [13.333, 12.667],
        label: "Voucher Degustação Sabores da Floresta",
        strong: true,
      },
    ],
    conclusions: "2.180",
    rating: "★ 4.8",
  },
  {
    id: "3",
    code: "ROT-MAO-2025-03",
    title: "Rota Arquitetura da Belle Époque",
    thumb: "/images/rotas-thumb-3.png",
    status: "ativa",
    attractCount: 4,
    attractives: "Teatro Amazonas ➔ Palácio Rio Negro ➔ Palácio da Justiça ➔…",
    meta: [
      { icon: "/icons/rotas-distancia.svg", iconSize: [13.333, 8], label: "3.1 km aprox." },
      { icon: "/icons/rotas-walking.svg", iconSize: [8.667, 14.333], label: "Nível: Fácil" },
      {
        icon: "/icons/rotas-gift.svg",
        iconSize: [13.333, 12.667],
        label: "Pin Esmaltado Cúpula do Teatro",
        strong: true,
      },
    ],
    conclusions: "1.940",
    rating: "★ 4.9",
  },
  {
    id: "4",
    code: "ROT-MAO-2025-04",
    title: "Rota Águas de Manaus & Pôr do Sol",
    thumb: "/images/rotas-thumb-4.png",
    status: "manutencao",
    attractCount: 3,
    attractives: "Orla da Ponta Negra ➔ Museu do Seringal ➔ Mirante Encontro das…",
    meta: [
      { icon: "/icons/rotas-distancia.svg", iconSize: [13.333, 8], label: "14.5 km" },
      {
        icon: "/icons/rotas-fluvial.svg",
        iconSize: [12.297, 13.333],
        label: "Fluvial & Veículo",
      },
      {
        icon: "/icons/rotas-gift.svg",
        iconSize: [13.333, 12.667],
        label: "Garrafa Térmica Sustentável 500ml",
        strong: true,
      },
    ],
    conclusions: "880",
    seasonalLabel: "STATUS SAZONAL",
    seasonalStatus: "Vazante dos Rios",
  },
];

export default function RotasPage() {
  const [editorOpen, setEditorOpen] = useState(true);
  const [search, setSearch] = useState("");
  const [nome, setNome] = useState("Circuito Histórico & Belle Époque Amazônica");
  const [codigo, setCodigo] = useState("ROT-MAO-2025-04");
  const [descricao, setDescricao] = useState(
    "Descubra as joias arquitetônicas do ciclo da borracha no Centro Histórico de Manaus. Faça check-in pelo app em cada monumento histórico catalogado e resgate o Kit Souvenir oficial no Centro de Atendimento ao Turista."
  );

  const normalizedSearch = search.trim().toLowerCase();
  const visibleRoutes = ROUTES.filter(
    (route) =>
      normalizedSearch === "" ||
      route.title.toLowerCase().includes(normalizedSearch) ||
      route.code.toLowerCase().includes(normalizedSearch) ||
      route.attractives.toLowerCase().includes(normalizedSearch)
  );

  return (
    <AppShell breadcrumb="Rotas & Roteiros">
      <div className="flex flex-col items-start">
        {/* Page header */}
        <div className="flex w-full flex-col pb-4 pt-4">
          <div className="flex w-full items-center justify-between">
            <div className="flex w-full flex-col gap-1">
              <div className="flex w-full items-center gap-1">
                <span className="rounded-[2px] bg-[#0d472b] px-1 py-0.5 text-[11px] font-semibold uppercase leading-[14px] tracking-[0.55px] text-white">
                  Módulo Turístico Gamificado
                </span>
                <span className="text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#414942]">
                  • Gestão Manauscult
                </span>
              </div>
              <h1 className="text-[32px] font-bold leading-[40px] tracking-[-0.8px] text-[#131b2e]">
                Rotas &amp; Roteiros Turísticos
              </h1>
              <p className="max-w-[768px] text-[14px] leading-[20px] text-[#414942]">
                Crie circuitos turísticos gamificados, defina a ordem dos atrativos
                em Manaus e vincule recompensas e benefícios municipais para quem
                concluir os roteiros.
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                className="flex items-center gap-1.5 rounded-[2px] bg-[#e2e7ff] px-4 py-2 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]"
              >
                <img src="/icons/rotas-download.svg" alt="" className="size-3" />
                <span className="text-[12px] font-semibold leading-4 tracking-[0.24px] text-[#131b2e]">
                  Exportar Relatório Geral
                </span>
              </button>
              <button
                type="button"
                onClick={() => setEditorOpen(true)}
                className="flex items-center gap-2 rounded-[2px] bg-[#002f19] px-6 py-2.5 shadow-[0px_1px_3px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]"
              >
                <img src="/icons/rotas-plus.svg" alt="" className="size-[16.667px]" />
                <span className="text-[12px] font-semibold leading-4 tracking-[0.24px] text-white">
                  + Criar Novo Roteiro
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* KPIs */}
        <div className="flex w-full flex-col pb-6">
          <div className="flex w-full items-start justify-center gap-4">
            <div className="flex min-w-0 flex-1 flex-col justify-between rounded-lg bg-white p-4 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
              <div className="flex w-full flex-col pb-2">
                <div className="flex w-full items-center justify-between">
                  <p className="text-[12px] font-semibold leading-4 tracking-[0.24px] text-[#414942]">
                    Rotas Ativas
                  </p>
                  <span className="flex size-8 items-center justify-center rounded-xl bg-[rgba(174,214,254,0.4)]">
                    <img
                      src="/icons/rotas-kpi-rotas.svg"
                      alt=""
                      style={{ width: 13.5, height: 15 }}
                    />
                  </span>
                </div>
              </div>
              <div className="flex w-full flex-col gap-1">
                <p className="text-[32px] font-bold leading-[40px] tracking-[-0.64px] text-[#131b2e]">
                  14
                </p>
                <div className="flex w-full items-center gap-1.5">
                  <img
                    src="/icons/rotas-kpi-gps.svg"
                    alt=""
                    className="size-[13.333px]"
                  />
                  <p className="text-[12px] leading-4 tracking-[0.12px] text-[#195033]">
                    100% monitoradas por GPS
                  </p>
                </div>
              </div>
            </div>

            <div className="flex min-w-0 flex-1 flex-col justify-between rounded-lg bg-white p-4 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
              <div className="flex w-full flex-col pb-2">
                <div className="flex w-full items-center justify-between">
                  <p className="text-[12px] font-semibold leading-4 tracking-[0.24px] text-[#414942]">
                    Concluídos este Mês
                  </p>
                  <span className="flex size-8 items-center justify-center rounded-xl bg-[rgba(182,240,200,0.4)]">
                    <img
                      src="/icons/rotas-kpi-trophy.svg"
                      alt=""
                      style={{ width: 7.5, height: 15 }}
                    />
                  </span>
                </div>
              </div>
              <div className="flex w-full flex-col gap-1">
                <p className="text-[32px] font-bold leading-[40px] tracking-[-0.64px] text-[#131b2e]">
                  8.420
                </p>
                <div className="flex w-full items-center gap-1.5">
                  <img
                    src="/icons/rotas-kpi-trend.svg"
                    alt=""
                    style={{ width: 13.333, height: 8 }}
                  />
                  <p className="text-[12px] font-medium leading-4 tracking-[0.12px] text-[#0d472b]">
                    +18.4% vs mês anterior
                  </p>
                </div>
              </div>
            </div>

            <div className="flex min-w-0 flex-1 flex-col justify-between rounded-lg bg-white p-4 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
              <div className="flex w-full flex-col pb-2">
                <div className="flex w-full items-center justify-between">
                  <p className="text-[12px] font-semibold leading-4 tracking-[0.24px] text-[#414942]">
                    Taxa de Satisfação
                  </p>
                  <span className="flex size-8 items-center justify-center rounded-xl bg-[rgba(255,220,195,0.6)]">
                    <img
                      src="/icons/rotas-kpi-star.svg"
                      alt=""
                      style={{ width: 16.5, height: 15.75 }}
                    />
                  </span>
                </div>
              </div>
              <div className="flex w-full flex-col gap-1">
                <p className="text-[32px] font-bold leading-[40px] tracking-[-0.64px] text-[#131b2e]">
                  92%
                </p>
                <div className="flex w-full items-center gap-1.5">
                  <div className="flex flex-col pr-[14px] text-[12px] font-medium leading-4 tracking-[0.12px] text-[#603100]">
                    <span>★</span>
                    <span>4.8</span>
                  </div>
                  <div className="flex flex-col text-[12px] leading-4 tracking-[0.12px] text-[#414942]">
                    <span>(3.140 avaliações de</span>
                    <span>turistas)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex min-w-0 flex-1 flex-col justify-between rounded-lg bg-white p-4 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
              <div className="flex w-full flex-col pb-2">
                <div className="flex w-full items-center justify-between">
                  <p className="text-[12px] font-semibold leading-4 tracking-[0.24px] text-[#414942]">
                    Brindes Concedidos
                  </p>
                  <span className="flex size-8 items-center justify-center rounded-xl bg-[rgba(206,229,255,0.5)]">
                    <img
                      src="/icons/rotas-kpi-gift.svg"
                      alt=""
                      style={{ width: 15, height: 14.25 }}
                    />
                  </span>
                </div>
              </div>
              <div className="flex w-full flex-col gap-1">
                <p className="text-[32px] font-bold leading-[40px] tracking-[-0.64px] text-[#131b2e]">
                  3.812
                </p>
                <div className="flex w-full items-center gap-1.5">
                  <img
                    src="/icons/rotas-kpi-brindes.svg"
                    alt=""
                    style={{ width: 13.333, height: 14.25 }}
                  />
                  <p className="text-[12px] leading-4 tracking-[0.12px] text-[#396285]">
                    Nos 3 CATs municipais
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Builder / Editor */}
        {editorOpen && (
          <div className="flex w-full flex-col pb-8">
            <div className="flex w-full flex-col rounded-lg bg-white p-6 shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]">
              {/* Editor header */}
              <div className="flex w-full items-center justify-between pb-4">
                <div className="flex min-w-0 items-center gap-2">
                  <span className="flex h-10 w-[28.95px] shrink-0 items-center justify-center rounded-[4px] bg-[#002f19]">
                    <img
                      src="/icons/rotas-editor.svg"
                      alt=""
                      style={{ width: 18, height: 20 }}
                    />
                  </span>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <h2 className="text-[20px] font-semibold leading-7 tracking-[-0.2px] text-[#131b2e]">
                        Editor de Roteiro Turístico
                      </h2>
                      <span className="rounded-[2px] bg-[#cee5ff] px-2 py-0.5 text-[13px] font-bold leading-[18px] tracking-[0.26px] text-[#1f4a6c]">
                        {codigo}
                      </span>
                    </div>
                    <p className="text-[12px] leading-4 tracking-[0.12px] text-[#414942]">
                      Construa o percurso sequencial, fixe regras de validação por
                      geolocalização e configure o resgate do brinde oficial.
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  <button
                    type="button"
                    className="flex flex-col items-center justify-center whitespace-nowrap rounded-[2px] bg-[#002f19] px-[13.5px] py-1.5 text-center text-[12px] font-semibold leading-4 tracking-[0.24px] text-white"
                  >
                    <span>1.</span>
                    <span>Informações</span>
                    <span>Gerais</span>
                  </button>
                  <button
                    type="button"
                    className="flex flex-col items-center justify-center whitespace-nowrap rounded-[2px] bg-[#f2f3ff] px-[11.09px] py-1.5 text-center text-[12px] font-semibold leading-4 tracking-[0.24px] text-[#414942]"
                  >
                    <span>2. Sequência de</span>
                    <span>Atrativos</span>
                  </button>
                  <button
                    type="button"
                    className="flex flex-col items-center justify-center whitespace-nowrap rounded-[2px] bg-[#f2f3ff] px-[11.02px] py-1.5 text-center text-[12px] font-semibold leading-4 tracking-[0.24px] text-[#414942]"
                  >
                    <span>3. Gamificação &amp;</span>
                    <span>Benefício</span>
                  </button>
                  <button
                    type="button"
                    aria-label="Fechar editor"
                    onClick={() => setEditorOpen(false)}
                    className="ml-2 flex items-center justify-center rounded-[2px] px-1.5 pb-3 pt-1.5"
                  >
                    <img
                      src="/icons/rotas-close.svg"
                      alt=""
                      className="size-[11.667px]"
                    />
                  </button>
                </div>
              </div>

              {/* TAB 1 grid */}
              <div className="grid w-full grid-cols-12 gap-6 pt-4">
                {/* Left form (8 cols) */}
                <div className="col-span-8 flex flex-col gap-4">
                  {/* Nome */}
                  <div className="flex w-full flex-col gap-1">
                    <label
                      htmlFor="roteiro-nome"
                      className="text-[11px] font-semibold uppercase leading-[14px] tracking-[0.44px] text-[#414942]"
                    >
                      Nome oficial do roteiro
                    </label>
                    <input
                      id="roteiro-nome"
                      value={nome}
                      onChange={(event) => setNome(event.target.value)}
                      className="w-full rounded-[2px] bg-white p-2 text-[14px] leading-5 text-[#131b2e] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] focus:outline-2 focus:outline-[#0d472b]"
                    />
                  </div>

                  {/* Código / Categoria / Dificuldade */}
                  <div className="flex w-full items-start justify-center gap-4">
                    <div className="flex w-[192.88px] flex-col gap-1 pb-px">
                      <label
                        htmlFor="roteiro-codigo"
                        className="text-[11px] font-semibold uppercase leading-[14px] tracking-[0.44px] text-[#414942]"
                      >
                        Código de identificação
                      </label>
                      <input
                        id="roteiro-codigo"
                        value={codigo}
                        onChange={(event) => setCodigo(event.target.value)}
                        className="w-full rounded-[2px] bg-white p-2 text-[13px] font-medium leading-[18px] tracking-[0.26px] text-[#131b2e] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] focus:outline-2 focus:outline-[#0d472b]"
                      />
                    </div>
                    <div className="flex w-[192.89px] flex-col gap-1">
                      <label
                        htmlFor="roteiro-categoria"
                        className="text-[11px] font-semibold uppercase leading-[14px] tracking-[0.44px] text-[#414942]"
                      >
                        Categoria
                      </label>
                      <select
                        id="roteiro-categoria"
                        defaultValue="Cultural & Histórico"
                        className="w-full appearance-none rounded-[2px] bg-white py-[9px] pl-3 pr-6 text-[14px] leading-[15px] text-[#131b2e] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] focus:outline-2 focus:outline-[#0d472b]"
                      >
                        <option>Cultural &amp; Histórico</option>
                        <option>Gastronômico</option>
                        <option>Natureza & Aventura</option>
                      </select>
                    </div>
                    <div className="flex w-[192.89px] flex-col gap-1">
                      <label
                        htmlFor="roteiro-dificuldade"
                        className="text-[11px] font-semibold uppercase leading-[14px] tracking-[0.44px] text-[#414942]"
                      >
                        Dificuldade / Modalidade
                      </label>
                      <select
                        id="roteiro-dificuldade"
                        defaultValue="Caminhada Leve (A pé)"
                        className="w-full appearance-none rounded-[2px] bg-white py-[9px] pl-3 pr-6 text-[14px] leading-[15px] text-[#131b2e] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] focus:outline-2 focus:outline-[#0d472b]"
                      >
                        <option>Caminhada Leve (A pé)</option>
                        <option>Transporte Misto</option>
                        <option>Fluvial &amp; Veículo</option>
                      </select>
                    </div>
                  </div>

                  {/* Descrição */}
                  <div className="flex w-full flex-col gap-1 pb-1.5">
                    <label
                      htmlFor="roteiro-descricao"
                      className="text-[11px] font-semibold uppercase leading-[14px] tracking-[0.44px] text-[#414942]"
                    >
                      Descrição institucional para turistas (PassaNorte App)
                    </label>
                    <textarea
                      id="roteiro-descricao"
                      value={descricao}
                      onChange={(event) => setDescricao(event.target.value)}
                      rows={4}
                      className="w-full resize-none rounded-[2px] bg-white p-2 text-[14px] leading-5 text-[#131b2e] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] focus:outline-2 focus:outline-[#0d472b]"
                    />
                  </div>

                  {/* Tempo / Extensão */}
                  <div className="flex w-full items-start justify-center gap-4">
                    <div className="flex min-w-0 flex-1 items-center justify-between rounded-[2px] bg-[#f2f3ff] px-2 py-5">
                      <div className="flex items-center gap-1">
                        <img
                          src="/icons/rotas-clock.svg"
                          alt=""
                          className="size-[16.667px]"
                        />
                        <div className="flex flex-col gap-[2.5px] pb-[1.5px]">
                          <p className="text-[11px] font-semibold uppercase leading-[14px] tracking-[0.44px] text-[#414942]">
                            Tempo médio estimado
                          </p>
                          <p className="text-[14px] leading-5 text-[#131b2e]">
                            3 horas e 30 minutos
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="text-[11px] font-semibold uppercase leading-[14px] tracking-[0.44px] text-[#396285] underline decoration-[1px] underline-offset-from-font"
                      >
                        Editar
                      </button>
                    </div>
                    <div className="flex min-w-0 flex-1 items-center justify-between rounded-[2px] bg-[#f2f3ff] px-2 py-2">
                      <div className="flex items-center gap-1">
                        <img
                          src="/icons/rotas-extensao.svg"
                          alt=""
                          className="size-[15px]"
                        />
                        <div className="flex flex-col gap-[2.5px] pb-[1.5px] pr-[37.5px]">
                          <p className="text-[11px] font-semibold uppercase leading-[14px] tracking-[0.44px] text-[#414942]">
                            Extensão prevista
                          </p>
                          <p className="text-[14px] leading-5 text-[#131b2e]">
                            4.2 km (Área Urbana Central)
                          </p>
                        </div>
                      </div>
                      <p className="text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#414942]">
                        Auto-calculado
                      </p>
                    </div>
                  </div>
                </div>

                {/* Hero preview (4 cols) */}
                <div className="col-span-4 flex flex-col justify-between rounded-lg bg-[#f2f3ff] p-4">
                  <div className="flex w-full flex-col gap-1">
                    <p className="text-[11px] font-semibold uppercase leading-[14px] tracking-[0.55px] text-[#414942]">
                      Imagem de capa (app do turista)
                    </p>
                    <div className="relative flex h-[176px] w-full flex-col justify-center overflow-hidden rounded-[4px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)]">
                      <img
                        src="/images/rotas-capa.png"
                        alt=""
                        className="absolute inset-0 size-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-end bg-gradient-to-t from-[rgba(0,47,25,0.8)] via-[rgba(0,47,25,0)] via-1/2 to-[rgba(0,47,25,0)] p-2">
                        <span className="rounded-[2px] bg-[rgba(0,47,25,0.8)] px-2 py-0.5 text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-white">
                          Resolução recomendada: 1200x675px
                        </span>
                      </div>
                    </div>
                    <p className="w-full pt-1 text-[12px] leading-4 tracking-[0.12px] text-[#414942]">
                      Esta imagem será o cartão de chamada no aplicativo cidadão
                      para quem procura passeios no Centro.
                    </p>
                  </div>
                  <div className="flex w-full flex-col pt-4">
                    <button
                      type="button"
                      className="flex w-full items-center justify-center gap-1.5 rounded-[2px] bg-[#e2e7ff] py-2"
                    >
                      <img
                        src="/icons/rotas-camera.svg"
                        alt=""
                        style={{ width: 15, height: 13.5 }}
                      />
                      <span className="text-[12px] font-semibold leading-4 tracking-[0.24px] text-[#131b2e]">
                        Alterar Fotografia de Capa
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Panel footer actions */}
              <div className="flex w-full items-center justify-between pt-10">
                <div className="flex items-center gap-1">
                  <img
                    src="/icons/rotas-history.svg"
                    alt=""
                    className="size-[13.5px]"
                  />
                  <p className="text-[12px] leading-4 tracking-[0.12px] text-[#414942]">
                    Última revisão feita por: Carlos Eduardo Ramos (Hoje, 09:42)
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="rounded-[2px] bg-[#e2e7ff] px-4 py-2 text-[12px] font-semibold leading-4 tracking-[0.24px] text-[#131b2e]"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    className="rounded-[2px] bg-[#cee5ff] px-4 py-2 text-[12px] font-semibold leading-4 tracking-[0.24px] text-[#1f4a6c]"
                  >
                    Salvar como Rascunho
                  </button>
                  <button
                    type="button"
                    className="flex items-center gap-1.5 rounded-[2px] bg-[#002f19] px-6 py-2 shadow-[0px_1px_3px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]"
                  >
                    <img src="/icons/rotas-publish.svg" alt="" className="size-3" />
                    <span className="text-[12px] font-semibold leading-4 tracking-[0.24px] text-white">
                      Publicar Rota no App PassaNorte
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filter & management toolbar */}
        <div className="flex w-full flex-col pb-4">
          <div className="flex w-full items-center justify-between">
            <div className="flex flex-col items-start gap-2">
              <div className="relative w-[320px]">
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Buscar por roteiro, ponto turístico ou código..."
                  className="w-full rounded-[4px] bg-white pb-[9px] pl-9 pr-3 pt-2 text-[12px] tracking-[0.12px] text-[#414942] placeholder:text-[#414942] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] focus:outline-2 focus:outline-[#0d472b]"
                />
                <img
                  src="/icons/rotas-search.svg"
                  alt=""
                  className="absolute left-[14.25px] top-[12.25px] size-[13.5px]"
                />
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  className="rounded-[4px] bg-white py-[8.5px] pl-4 pr-7 text-[12px] font-semibold leading-[14px] tracking-[0.24px] text-[#131b2e] shadow-[0px_1px_1px_rgba(0,0,0,0.05)]"
                >
                  Todos os Status (Ativas / Manutenção)
                </button>
                <button
                  type="button"
                  className="rounded-[4px] bg-white py-[8.5px] pl-4 pr-7 text-[12px] font-semibold leading-[14px] tracking-[0.24px] text-[#131b2e] shadow-[0px_1px_1px_rgba(0,0,0,0.05)]"
                >
                  Todas as Categorias
                </button>
              </div>
            </div>
            <p className="text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#414942]">
              Exibindo {visibleRoutes.length} roteiros de 14 cadastrados
            </p>
          </div>
        </div>

        {/* Routes list */}
        <div className="flex w-full flex-col pb-8">
          <div className="flex w-full flex-col gap-4">
            {visibleRoutes.map((route) => (
              <RouteRow key={route.id} route={route} />
            ))}
          </div>
        </div>

        {/* Civic footer */}
        <footer className="flex w-full flex-col items-center pb-1 text-center">
          <p className="text-[13px] font-medium leading-[18px] tracking-[0.26px] text-[#414942]">
            Prefeitura de Manaus • Manauscult - Fundação Municipal de Cultura,
            Turismo e Eventos
          </p>
          <p className="text-[12px] leading-4 tracking-[0.12px] text-[#717972]">
            Sistema Integrado PassaNorte • Marco Regulatório de Gamificação do
            Turismo Urbano e Fluvial • 2025
          </p>
        </footer>
      </div>
    </AppShell>
  );
}

function RouteRow({ route }: { route: RouteCard }) {
  const isMaintenance = route.status === "manutencao";

  return (
    <div className="flex w-full flex-col rounded-lg bg-white p-4 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
      <div className="flex w-full items-center justify-between">
        {/* Identification */}
        <div className="flex min-w-0 flex-1 items-start gap-4">
          <div
            className={`flex size-14 shrink-0 justify-center overflow-hidden rounded-[4px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] ${
              isMaintenance ? "opacity-80" : ""
            }`}
          >
            <img
              src={route.thumb}
              alt=""
              className="size-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex w-full items-center gap-2">
              <h3 className="text-[16px] font-bold leading-6 text-[#131b2e]">
                {route.title}
              </h3>
              {isMaintenance ? (
                <span className="rounded-[2px] bg-[#ffdcc3] px-2 py-0.5 text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#2f1500]">
                  Em Manutenção / Sazonal
                </span>
              ) : (
                <span className="rounded-[2px] bg-[#b6f0c8] px-2 py-0.5 text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#002110]">
                  Ativa
                </span>
              )}
              <span className="text-[13px] font-medium leading-[18px] tracking-[0.26px] text-[#414942]">
                {route.code}
              </span>
            </div>
            <div className="flex w-full flex-col overflow-hidden">
              <p className="truncate text-[12px] leading-4 tracking-[0.12px] text-[#414942]">
                {route.attractCount} Atrativos: {route.attractives}
              </p>
            </div>
            <div className="flex w-full items-center gap-4 pt-1">
              {route.meta.map((meta) => (
                <div key={meta.label} className="flex items-center gap-1">
                  <img
                    src={meta.icon}
                    alt=""
                    style={{ width: meta.iconSize[0], height: meta.iconSize[1] }}
                  />
                  <p
                    className={`text-[12px] leading-4 tracking-[0.12px] ${
                      meta.strong
                        ? "font-medium text-[#0d472b]"
                        : "text-[#414942]"
                    }`}
                  >
                    {meta.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Telemetry stats & actions */}
        <div className="flex shrink-0 flex-col items-end justify-center gap-6 pl-6">
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-end">
              <p className="text-[11px] font-semibold uppercase leading-[14px] tracking-[0.44px] text-[#414942]">
                Conclusões
              </p>
              <p className="text-[16px] font-semibold leading-6 text-[#131b2e]">
                {route.conclusions}
              </p>
            </div>
            {route.rating ? (
              <div className="flex flex-col items-end">
                <p className="text-[11px] font-semibold uppercase leading-[14px] tracking-[0.44px] text-[#414942]">
                  Avaliação
                </p>
                <p className="text-[16px] font-semibold leading-6 text-[#603100]">
                  {route.rating}
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-end gap-[7px] pb-[3px]">
                <p className="text-[11px] font-semibold uppercase leading-[14px] tracking-[0.44px] text-[#414942]">
                  {route.seasonalLabel}
                </p>
                <p className="whitespace-nowrap text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#411f00]">
                  {route.seasonalStatus}
                </p>
              </div>
            )}
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label="Editar rota"
              className="flex items-center justify-center px-2 pb-[14px] pt-2"
            >
              <img src="/icons/rotas-edit.svg" alt="" className="size-[15px]" />
            </button>
            <button
              type="button"
              aria-label="Duplicar rota"
              className="flex items-center justify-center px-2 pb-[14px] pt-2"
            >
              <img
                src="/icons/rotas-copy.svg"
                alt=""
                style={{ width: 14.167, height: 16.667 }}
              />
            </button>
            <button
              type="button"
              aria-label={isMaintenance ? "Pré-visualizar rota" : "Visualizar rota"}
              className="flex items-center justify-center px-2 pb-[14px] pt-2"
            >
              <img
                src={isMaintenance ? "/icons/rotas-play.svg" : "/icons/rotas-eye.svg"}
                alt=""
                className="size-[16.667px]"
              />
            </button>
            <button
              type="button"
              className="flex items-center gap-1 rounded-[2px] bg-[#e2e7ff] px-2 py-1.5"
            >
              <img
                src="/icons/rotas-metricas.svg"
                alt=""
                style={{ width: 13.333, height: 14 }}
              />
              <span className="whitespace-nowrap text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#131b2e]">
                Ver Métricas
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}