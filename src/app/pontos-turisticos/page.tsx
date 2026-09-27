"use client";

import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";

type Tag = { label: string; bg: string; text: string };

type Status = "open" | "closed";

type Attraction = {
  name: string;
  id: string;
  photo: string;
  region: string;
  tags: Tag[];
  status: Status;
  schedule: string;
  scheduleTone: "default" | "always" | "note";
  updatedLine1: string;
  updatedLine2: string;
};

const OPEN_TAG_STYLES: Record<string, Tag> = {
  Cultura: { label: "Cultura", bg: "#b6f0c8", text: "#002110" },
  Arte: { label: "Arte", bg: "#cee5ff", text: "#1f4a6c" },
  Arquitetura: { label: "Arquitetura", bg: "#e2e7ff", text: "#414942" },
  Gastronomia: { label: "Gastronomia", bg: "#ffdcc3", text: "#2f1500" },
  Artesanato: { label: "Artesanato", bg: "#e2e7ff", text: "#414942" },
  Lazer: { label: "Lazer", bg: "#cee5ff", text: "#001d32" },
  Natureza: { label: "Natureza", bg: "#b6f0c8", text: "#002110" },
  Esporte: { label: "Esporte", bg: "#e2e7ff", text: "#414942" },
  Ecoturismo: { label: "Ecoturismo", bg: "#b6f0c8", text: "#002110" },
  Ciência: { label: "Ciência", bg: "#e2e7ff", text: "#414942" },
  História: { label: "História", bg: "#cee5ff", text: "#001d32" },
  Museu: { label: "Museu", bg: "#e2e7ff", text: "#414942" },
};

const ATTRACTIONS: Attraction[] = [
  {
    name: "Teatro Amazonas",
    id: "ID-ATV-00124",
    photo: "/images/pontos-teatro.jpg",
    region: "Centro Histórico",
    tags: [OPEN_TAG_STYLES.Cultura, OPEN_TAG_STYLES.Arte, OPEN_TAG_STYLES.Arquitetura],
    status: "open",
    schedule: "09:00 - 17:00",
    scheduleTone: "default",
    updatedLine1: "Hoje, 08:30",
    updatedLine2: "(Automático)",
  },
  {
    name: "Mercado Municipal Adolpho Lisboa",
    id: "ID-ATV-00088",
    photo: "/images/pontos-mercado.jpg",
    region: "Centro / Orla Rio Negro",
    tags: [
      OPEN_TAG_STYLES.Gastronomia,
      OPEN_TAG_STYLES.Cultura,
      OPEN_TAG_STYLES.Artesanato,
    ],
    status: "open",
    schedule: "06:00 - 17:00",
    scheduleTone: "default",
    updatedLine1: "Ontem, 16:40",
    updatedLine2: "(Fiscal Manauscult)",
  },
  {
    name: "Complexo Turístico Ponta Negra",
    id: "ID-ATV-00302",
    photo: "/images/pontos-ponta-negra.jpg",
    region: "Ponta Negra",
    tags: [OPEN_TAG_STYLES.Lazer, OPEN_TAG_STYLES.Natureza, OPEN_TAG_STYLES.Esporte],
    status: "open",
    schedule: "24 Horas",
    scheduleTone: "always",
    updatedLine1: "20/03/2025",
    updatedLine2: "(Semcom)",
  },
  {
    name: "Bosque da Ciência (INPA)",
    id: "ID-ATV-00045",
    photo: "/images/pontos-bosque.jpg",
    region: "Coroado / Zona Leste",
    tags: [
      OPEN_TAG_STYLES.Natureza,
      OPEN_TAG_STYLES.Ecoturismo,
      OPEN_TAG_STYLES.Ciência,
    ],
    status: "closed",
    schedule: "Intervenção de Trilhas",
    scheduleTone: "note",
    updatedLine1: "18/03/2025",
    updatedLine2: "(Engenharia PMM)",
  },
  {
    name: "Palacete Provincial",
    id: "ID-ATV-00072",
    photo: "/images/pontos-palacete.jpg",
    region: "Praça da Polícia / Centro",
    tags: [OPEN_TAG_STYLES.Cultura, OPEN_TAG_STYLES.História, OPEN_TAG_STYLES.Museu],
    status: "open",
    schedule: "09:00 - 15:00",
    scheduleTone: "default",
    updatedLine1: "14/03/2025",
    updatedLine2: "(Secult/AM)",
  },
];

/* Column widths from the Figma table, as percentages of the 976px content width */
const COL_WIDTHS = [
  6.58, // foto
  10.83, // nome & id
  12.68, // região / bairro
  13.08, // categorias
  19.46, // status operacional
  10.93, // horário de hoje
  13.12, // última atualização
  13.32, // ações
];

const PAGES = ["1", "2", "3", "8"];

function StatusBadge({ status }: { status: Status }) {
  if (status === "open") {
    return (
      <span className="inline-flex items-center gap-[6px] rounded-[12px] bg-[#e8f5e9] px-[10px] py-[4px]">
        <span className="size-2 rounded-[12px] bg-[#0d472b]" />
        <span className="text-[12px] font-semibold leading-4 text-[#0d472b]">
          Aberto ao Público
        </span>
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-[6px] rounded-[12px] bg-[#fef3c7] py-[4px] pl-[10px] pr-[17.68px]">
      <span className="h-2 w-[5.67px] rounded-[12px] bg-[#92400e]" />
      <span className="text-[12px] font-semibold leading-4 text-[#92400e]">
        Temporariamente Fechado
      </span>
    </span>
  );
}

export default function PontosTuristicosPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("todas");
  const [status, setStatus] = useState("todos");
  const [page, setPage] = useState("1");

  const query = search.trim().toLowerCase();
  const rows = ATTRACTIONS.filter((item) => {
    const matchesQuery =
      query.length === 0 ||
      item.name.toLowerCase().includes(query) ||
      item.id.toLowerCase().includes(query) ||
      item.region.toLowerCase().includes(query);
    const matchesStatus =
      status === "todos" ||
      (status === "abertos" && item.status === "open") ||
      (status === "fechados" && item.status === "closed");
    return matchesQuery && matchesStatus;
  });

  return (
    <AppShell breadcrumb="Pontos Turísticos">
      <div className="flex w-full flex-col items-start pb-[64px]">
        {/* Top indicator */}
        <div className="flex w-full flex-col gap-4 border-b border-[#eaedff] pb-[17px] pt-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-[4px] bg-[#0d472b] shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
              <img
                src="/icons/pontos-header.svg"
                alt=""
                className="h-[17.42px] w-[16.5px]"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-[24px] font-semibold leading-[30px] tracking-[-0.6px] text-[#131b2e]">
                Gerenciamento de Pontos Turísticos
              </h1>
              <p className="text-[12px] leading-4 tracking-[0.12px] text-[#414942]">
                Cadastre, monitore e atualize atrações turísticas, horários e
                geolocalização no município de Manaus
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-[4px] bg-[#f2f3ff] px-3 py-[6px]">
              <span className="size-2 rounded-[12px] bg-[#0d472b]" />
              <span className="text-[12px] font-semibold leading-4 tracking-[0.24px] text-[#414942]">
                Base Oficial Ativa:
              </span>
              <span className="text-[12px] font-semibold leading-4 tracking-[0.24px] text-[#131b2e]">
                38 Atrativos Catalogados
              </span>
            </div>
            <button
              type="button"
              className="flex items-center gap-2 rounded-[4px] bg-[#0d472b] px-4 py-2 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]"
            >
              <img
                src="/icons/pontos-plus.svg"
                alt=""
                className="h-[16.5px] w-[14.25px]"
              />
              <span className="text-center text-[14px] font-semibold leading-5 tracking-[0.14px] text-white">
                + Novo Ponto Turístico
              </span>
            </button>
          </div>
        </div>

        {/* Filter strip */}
        <div className="mt-6 flex w-full rounded-[8px] bg-white p-4 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
          <div className="grid w-full grid-cols-12 items-center gap-3">
            {/* Search */}
            <div className="col-span-4">
              <div className="relative">
                <img
                  src="/icons/pontos-search.svg"
                  alt=""
                  className="absolute left-3 top-1/2 size-[15px] -translate-y-1/2"
                />
                <input
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Buscar por atrativo, bairro ou ID..."
                  className="w-full rounded-[4px] bg-[#f2f3ff] py-[9px] pl-10 pr-4 text-[14px] text-[#131b2e] placeholder:text-[rgba(65,73,66,0.7)] focus:outline-2 focus:outline-[#0d472b]"
                />
              </div>
            </div>
            {/* Category filter */}
            <div className="col-span-3">
              <div className="relative">
                <select
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  className="w-full appearance-none rounded-[4px] bg-[#f2f3ff] py-2 pl-3 pr-8 text-[12px] font-semibold leading-4 tracking-[0.24px] text-[#131b2e] focus:outline-2 focus:outline-[#0d472b]"
                >
                  <option value="todas">Categorias: Todas (12)</option>
                  <option value="cultura">Categorias: Cultura</option>
                  <option value="natureza">Categorias: Natureza</option>
                  <option value="gastronomia">Categorias: Gastronomia</option>
                </select>
                <img
                  src="/icons/pontos-chevron-down.svg"
                  alt=""
                  className="absolute right-[10px] top-1/2 h-[5.55px] w-[9px] -translate-y-1/2"
                />
              </div>
            </div>
            {/* Status filter */}
            <div className="col-span-3">
              <div className="relative">
                <select
                  value={status}
                  onChange={(event) => setStatus(event.target.value)}
                  className="w-full appearance-none rounded-[4px] bg-[#f2f3ff] py-2 pl-3 pr-8 text-[12px] font-semibold leading-4 tracking-[0.24px] text-[#131b2e] focus:outline-2 focus:outline-[#0d472b]"
                >
                  <option value="todos">Status: Todos</option>
                  <option value="abertos">Status: Abertos</option>
                  <option value="fechados">Status: Fechados</option>
                </select>
                <img
                  src="/icons/pontos-sliders.svg"
                  alt=""
                  className="absolute right-[10px] top-1/2 size-[13.5px] -translate-y-1/2"
                />
              </div>
            </div>
            {/* Export */}
            <div className="col-span-2 flex h-[34px] items-center justify-end">
              <button
                type="button"
                className="flex w-full min-w-0 items-center justify-center gap-[6px] rounded-[4px] bg-[#eaedff] px-3 py-2"
              >
                <img src="/icons/pontos-export.svg" alt="" className="size-3" />
                <span className="text-center text-[12px] font-semibold leading-4 tracking-[0.24px] text-[#131b2e]">
                  Exportar CSV
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Main table */}
        <div className="mt-6 flex w-full flex-col overflow-clip rounded-[8px] bg-white shadow-[0px_1px_2px_rgba(0,0,0,0.05)]">
          <div className="w-full overflow-auto">
            <table className="w-full table-fixed border-collapse">
              <colgroup>
                {COL_WIDTHS.map((width) => (
                  <col key={width} style={{ width: `${width}%` }} />
                ))}
              </colgroup>
              <thead>
                <tr className="bg-[#f2f3ff] text-left">
                  <th className="px-4 py-[19px] text-[11px] font-bold uppercase leading-[14px] tracking-[0.55px] text-[#414942]">
                    Foto
                  </th>
                  <th className="px-4 py-3 text-[11px] font-bold uppercase leading-[14px] tracking-[0.55px] text-[#414942]">
                    Nome da atração &amp; ID
                  </th>
                  <th className="px-4 py-3 text-[11px] font-bold uppercase leading-[14px] tracking-[0.55px] text-[#414942]">
                    Região / bairro
                  </th>
                  <th className="px-4 py-[19px] text-[11px] font-bold uppercase leading-[14px] tracking-[0.55px] text-[#414942]">
                    Categorias
                  </th>
                  <th className="px-4 py-[19px] text-[11px] font-bold uppercase leading-[14px] tracking-[0.55px] text-[#414942]">
                    Status operacional
                  </th>
                  <th className="px-4 py-3 text-[11px] font-bold uppercase leading-[14px] tracking-[0.55px] text-[#414942]">
                    Horário de hoje
                  </th>
                  <th className="px-4 py-3 text-[11px] font-bold uppercase leading-[14px] tracking-[0.55px] text-[#414942]">
                    Última atualização
                  </th>
                  <th className="px-4 py-[19px] text-right text-[11px] font-bold uppercase leading-[14px] tracking-[0.55px] text-[#414942]">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((item) => (
                  <tr
                    key={item.id}
                    className={`border-t border-[#f2f3ff] align-middle ${
                      item.status === "closed" ? "bg-[rgba(242,243,255,0.2)]" : "bg-white"
                    }`}
                  >
                    <td className="px-4 py-[28px]">
                      <div className="h-12 w-[32.25px] overflow-hidden rounded-[4px] bg-[#e2e7ff] shadow-[0px_1px_2px_rgba(0,0,0,0.05)]">
                        <img
                          src={item.photo}
                          alt=""
                          className="size-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="py-[28px] pl-4 pr-4">
                      <p className="text-[14px] font-semibold leading-5 tracking-[0.14px] text-[#131b2e]">
                        {item.name}
                      </p>
                      <p className="text-[13px] font-medium leading-[18px] tracking-[0.26px] text-[#414942]">
                        {item.id}
                      </p>
                    </td>
                    <td className="py-[28px] pl-8 pr-4">
                      <div className="flex items-center gap-[6px]">
                        <img
                          src="/icons/pontos-pin.svg"
                          alt=""
                          className="h-[13.33px] w-[9.33px] shrink-0"
                        />
                        <span className="text-[14px] leading-5 text-[#131b2e]">
                          {item.region}
                        </span>
                      </div>
                    </td>
                    <td className="py-[28px] pl-8 pr-4">
                      <div className="flex max-w-[200px] flex-col items-start gap-1">
                        {item.tags.map((tag) => (
                          <span
                            key={tag.label}
                            className="inline-flex h-6 items-center rounded-[2px] px-2 py-[2px]"
                            style={{ backgroundColor: tag.bg }}
                          >
                            <span
                              className="text-[11px] font-semibold leading-5"
                              style={{ color: tag.text }}
                            >
                              {tag.label}
                            </span>
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-[28px] pl-8 pr-4">
                      <StatusBadge status={item.status} />
                    </td>
                    <td className="px-4 py-[28px]">
                      {item.scheduleTone === "note" ? (
                        <p className="text-[12px] italic leading-4 tracking-[0.12px] text-[#414942]">
                          {item.schedule}
                        </p>
                      ) : (
                        <p
                          className={`text-[13px] font-medium leading-[18px] tracking-[0.26px] ${
                            item.scheduleTone === "always"
                              ? "text-[#002f19]"
                              : "text-[#131b2e]"
                          }`}
                        >
                          {item.schedule}
                        </p>
                      )}
                    </td>
                    <td className="px-4 py-[28px]">
                      <p className="text-[12px] leading-4 tracking-[0.12px] text-[#414942]">
                        {item.updatedLine1}
                      </p>
                      <p className="text-[12px] leading-4 tracking-[0.12px] text-[#414942]">
                        {item.updatedLine2}
                      </p>
                    </td>
                    <td className="px-4 py-[28px]">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          aria-label={`Visualizar ${item.name}`}
                          className="rounded-[4px] p-[6px] hover:bg-[#f2f3ff]"
                        >
                          <img
                            src="/icons/pontos-eye.svg"
                            alt=""
                            className="h-[11.25px] w-[16.5px]"
                          />
                        </button>
                        <button
                          type="button"
                          aria-label={`Editar ${item.name}`}
                          className="rounded-[4px] p-[6px] hover:bg-[#f2f3ff]"
                        >
                          <img
                            src="/icons/pontos-edit.svg"
                            alt=""
                            className="size-[13.5px]"
                          />
                        </button>
                        <button
                          type="button"
                          aria-label={`Excluir ${item.name}`}
                          className="rounded-[4px] p-[6px] hover:bg-[#f2f3ff]"
                        >
                          <img
                            src="/icons/pontos-trash.svg"
                            alt=""
                            className="h-[13.5px] w-3"
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination footer */}
          <div className="flex items-center justify-between bg-[rgba(242,243,255,0.6)] p-4">
            <div className="flex items-center gap-2">
              <p className="text-[12px] tracking-[0.12px] text-[#414942]">
                Exibindo <span className="font-normal">1-5</span> de{" "}
                <span className="font-normal">38</span> registros cadastrados
              </p>
              <span className="text-[12px] tracking-[0.12px] text-[#c0c9c0]">•</span>
              <span className="text-[12px] tracking-[0.12px] text-[#414942]">
                Manaus/AM
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                className="rounded-[2px] bg-[#eaedff] px-3 py-[6px] text-[12px] font-semibold leading-4 tracking-[0.24px] text-[#c0c9c0]"
              >
                Anterior
              </button>
              {PAGES.map((value, index) => (
                <span key={value} className="contents">
                  {index === PAGES.length - 1 && (
                    <span className="px-1 text-[16px] leading-6 text-[#414942]">
                      ...
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => setPage(value)}
                    className={`size-8 rounded-[2px] pt-[7.5px] pb-[8.5px] text-center text-[12px] font-semibold leading-4 tracking-[0.24px] ${
                      page === value
                        ? "bg-[#0d472b] text-white"
                        : "bg-[#eaedff] text-[#131b2e]"
                    }`}
                  >
                    {value}
                  </button>
                </span>
              ))}
              <button
                type="button"
                className="rounded-[2px] bg-[#eaedff] px-3 py-[6px] text-[12px] font-semibold leading-4 tracking-[0.24px] text-[#131b2e]"
              >
                Próximo
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}