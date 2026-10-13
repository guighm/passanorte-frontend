"use client";

import { type FormEvent, useEffect, useMemo, useState } from "react";
import { RoleShell } from "@/components/layout/RoleShell";
import { api } from "@/lib/api";
import { Category, TouristSpot, TouristSpotsResponse } from "@/types/catalog";

const COL_WIDTHS = [6.58, 10.83, 12.68, 13.08, 19.46, 10.93, 13.12, 13.32];
const PAGE_SIZE = 20;

const TAG_STYLES: Record<string, { bg: string; text: string }> = {
  Cultura: { bg: "#b6f0c8", text: "#002110" },
  Arte: { bg: "#cee5ff", text: "#1f4a6c" },
  Arquitetura: { bg: "#e2e7ff", text: "#414942" },
  Gastronomia: { bg: "#ffdcc3", text: "#2f1500" },
  Artesanato: { bg: "#e2e7ff", text: "#414942" },
  Lazer: { bg: "#cee5ff", text: "#001d32" },
  Natureza: { bg: "#b6f0c8", text: "#002110" },
  Esporte: { bg: "#e2e7ff", text: "#414942" },
  Ecoturismo: { bg: "#b6f0c8", text: "#002110" },
  Ciência: { bg: "#e2e7ff", text: "#414942" },
  História: { bg: "#cee5ff", text: "#001d32" },
  Museu: { bg: "#e2e7ff", text: "#414942" },
};

const DEFAULT_TAG_STYLE = { bg: "#e2e7ff", text: "#414942" };

function StatusBadge({ status }: { status: string }) {
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
  if (status === "permanently_closed") {
    return (
      <span className="inline-flex items-center gap-[6px] rounded-[12px] bg-[#ffe9e4] py-[4px] pl-[10px] pr-[17.68px]">
        <span className="h-2 w-[5.67px] rounded-[12px] bg-[#ba1a1a]" />
        <span className="text-[12px] font-semibold leading-4 text-[#ba1a1a]">
          Encerrado
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
  const [spots, setSpots] = useState<TouristSpot[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("todas");
  const [status, setStatus] = useState("todos");
  const [page, setPage] = useState(1);
  const [createOpen, setCreateOpen] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const [spotsRes, categoriesRes] = await Promise.all([
          api.get<TouristSpotsResponse>("/tourist-spots"),
          api.get<{ items: Category[] }>("/categories"),
        ]);
        if (alive) {
          setSpots(spotsRes.items);
          setCategories(categoriesRes.items);
        }
      } catch (error) {
        console.error("Erro ao carregar pontos turísticos:", error);
      } finally {
        if (alive) setIsLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const loadSpots = async () => {
    setIsLoading(true);
    try {
      const response = await api.get<TouristSpotsResponse>("/tourist-spots");
      setSpots(response.items);
    } catch (error) {
      console.error("Erro ao carregar pontos turísticos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filtered = useMemo(() => {
    return spots.filter((spot) => {
      const query = search.trim().toLowerCase();
      if (query && !`${spot.name} ${spot.id}`.toLowerCase().includes(query)) return false;
      if (category !== "todas" && !spot.categories.some((c) => c.id === category)) return false;
      if (status !== "todos" && spot.status !== status) return false;
      return true;
    });
  }, [spots, search, category, status]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const rows = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  async function handleCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    try {
      const categoryIds = (formData.get("category_id") as string)
        ? [formData.get("category_id") as string]
        : [];
      await api.post("/tourist-spots", {
        name: formData.get("name"),
        description: formData.get("description"),
        latitude: Number(formData.get("latitude")),
        longitude: Number(formData.get("longitude")),
        category_ids: categoryIds,
      });
      setCreateOpen(false);
      await loadSpots();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Erro ao criar ponto turístico.");
    }
  }

  return (
    <RoleShell breadcrumb="Pontos Turísticos">
      <div className="flex w-full flex-col items-start pb-[64px]">
        {/* Top indicator */}
        <div className="flex w-full flex-col gap-4 border-b border-[#eaedff] pb-[17px] pt-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-[4px] bg-[#0d472b] shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
              <img src="/icons/pontos-header.svg" alt="" className="h-[17.42px] w-[16.5px]" />
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
                {spots.length} Atrativos Catalogados
              </span>
            </div>
            <button
              type="button"
              onClick={() => setCreateOpen(true)}
              className="flex items-center gap-2 rounded-[4px] bg-[#0d472b] px-4 py-2 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]"
            >
              <img src="/icons/pontos-plus.svg" alt="" className="h-[16.5px] w-[14.25px]" />
              <span className="text-center text-[14px] font-semibold leading-5 tracking-[0.14px] text-white">
                + Novo Ponto Turístico
              </span>
            </button>
          </div>
        </div>

        {/* Filter strip */}
        <div className="mt-6 flex w-full rounded-[8px] bg-white p-4 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
          <div className="grid w-full grid-cols-12 items-center gap-3">
            <div className="col-span-4">
              <div className="relative">
                <img src="/icons/pontos-search.svg" alt="" className="absolute left-3 top-1/2 size-[15px] -translate-y-1/2" />
                <input
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Buscar por atrativo ou ID..."
                  className="w-full rounded-[4px] bg-[#f2f3ff] py-[9px] pl-10 pr-4 text-[14px] text-[#131b2e] placeholder:text-[rgba(65,73,66,0.7)] focus:outline-2 focus:outline-[#0d472b]"
                />
              </div>
            </div>
            <div className="col-span-3">
              <div className="relative">
                <select
                  value={category}
                  onChange={(event) => { setCategory(event.target.value); setPage(1); }}
                  className="w-full appearance-none rounded-[4px] bg-[#f2f3ff] py-2 pl-3 pr-8 text-[12px] font-semibold leading-4 tracking-[0.24px] text-[#131b2e] focus:outline-2 focus:outline-[#0d472b]"
                >
                  <option value="todas">Categorias: Todas</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>Categorias: {c.name}</option>
                  ))}
                </select>
                <img src="/icons/pontos-chevron-down.svg" alt="" className="absolute right-[10px] top-1/2 h-[5.55px] w-[9px] -translate-y-1/2" />
              </div>
            </div>
            <div className="col-span-3">
              <div className="relative">
                <select
                  value={status}
                  onChange={(event) => { setStatus(event.target.value); setPage(1); }}
                  className="w-full appearance-none rounded-[4px] bg-[#f2f3ff] py-2 pl-3 pr-8 text-[12px] font-semibold leading-4 tracking-[0.24px] text-[#131b2e] focus:outline-2 focus:outline-[#0d472b]"
                >
                  <option value="todos">Status: Todos</option>
                  <option value="open">Status: Abertos</option>
                  <option value="closed">Status: Fechados</option>
                </select>
                <img src="/icons/pontos-sliders.svg" alt="" className="absolute right-[10px] top-1/2 size-[13.5px] -translate-y-1/2" />
              </div>
            </div>
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
              <thead className="bg-[#f2f3ff] text-left">
                <tr>
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
                {isLoading ? (
                  <tr>
                    <td colSpan={8} className="py-10 text-center text-[#414942]">Carregando dados...</td>
                  </tr>
                ) : rows.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-10 text-center text-[#414942]">
                      Nenhum ponto turístico cadastrado.
                    </td>
                  </tr>
                ) : rows.map((item) => (
                  <tr
                    key={item.id}
                    className={`border-t border-[#f2f3ff] align-middle ${
                      item.status !== "open" ? "bg-[rgba(242,243,255,0.2)]" : "bg-white"
                    }`}
                  >
                    <td className="px-4 py-[28px]">
                      <div className="flex h-12 w-[32.25px] items-center justify-center overflow-hidden rounded-[4px] bg-[#e2e7ff] shadow-[0px_1px_2px_rgba(0,0,0,0.05)]">
                        <img src="/icons/pontos-pin.svg" alt="" className="h-5 w-[14px]" />
                      </div>
                    </td>
                    <td className="py-[28px] pl-4 pr-4">
                      <p className="truncate text-[14px] font-semibold leading-5 tracking-[0.14px] text-[#131b2e]" title={item.name}>
                        {item.name}
                      </p>
                      <p className="truncate text-[13px] font-medium leading-[18px] tracking-[0.26px] text-[#414942]" title={item.id}>
                        {item.id}
                      </p>
                    </td>
                    <td className="py-[28px] pl-8 pr-4">
                      <div className="flex items-center gap-[6px]">
                        <img src="/icons/pontos-pin.svg" alt="" className="h-[13.33px] w-[9.33px] shrink-0" />
                        <span className="text-[14px] leading-5 text-[#131b2e]">Manaus</span>
                      </div>
                    </td>
                    <td className="py-[28px] pl-8 pr-4">
                      <div className="flex max-w-[200px] flex-col items-start gap-1">
                        {item.categories.length === 0 ? (
                          <span className="text-[12px] leading-4 text-[#414942]">—</span>
                        ) : (
                          item.categories.map((cat) => {
                            const style = TAG_STYLES[cat.name] || DEFAULT_TAG_STYLE;
                            return (
                              <span
                                key={cat.id}
                                className="inline-flex h-6 items-center rounded-[2px] px-2 py-[2px]"
                                style={{ backgroundColor: style.bg }}
                              >
                                <span className="text-[11px] font-semibold leading-5" style={{ color: style.text }}>
                                  {cat.name}
                                </span>
                              </span>
                            );
                          })
                        )}
                      </div>
                    </td>
                    <td className="py-[28px] pl-8 pr-4">
                      <StatusBadge status={item.status} />
                    </td>
                    <td className="px-4 py-[28px]">
                      <p className="text-[13px] font-medium leading-[18px] tracking-[0.26px] text-[#131b2e]">—</p>
                    </td>
                    <td className="px-4 py-[28px]">
                      <p className="truncate text-[12px] leading-4 tracking-[0.12px] text-[#414942]" title={item.description}>
                        {item.description ? `${item.description.slice(0, 40)}${item.description.length > 40 ? "..." : ""}` : "—"}
                      </p>
                      <p className="text-[12px] font-semibold leading-4 tracking-[0.12px] text-[#131b2e]">
                        {item.latitude.toFixed(4)}, {item.longitude.toFixed(4)}
                      </p>
                    </td>
                    <td className="px-4 py-[28px]">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          aria-label={`Visualizar ${item.name}`}
                          className="rounded-[4px] p-[6px] hover:bg-[#f2f3ff]"
                        >
                          <img src="/icons/pontos-eye.svg" alt="" className="h-[11.25px] w-[16.5px]" />
                        </button>
                        <button
                          type="button"
                          aria-label={`Editar ${item.name}`}
                          className="rounded-[4px] p-[6px] hover:bg-[#f2f3ff]"
                        >
                          <img src="/icons/pontos-edit.svg" alt="" className="size-[13.5px]" />
                        </button>
                        <button
                          type="button"
                          aria-label={`Excluir ${item.name}`}
                          onClick={async () => {
                            if (!confirm(`Remover "${item.name}" do catálogo?`)) return;
                            try {
                              await api.delete(`/tourist-spots/${item.id}`);
                              await loadSpots();
                            } catch (error) {
                              alert(error instanceof Error ? error.message : "Erro ao remover ponto.");
                            }
                          }}
                          className="rounded-[4px] p-[6px] hover:bg-[#f2f3ff]"
                        >
                          <img src="/icons/pontos-sliders.svg" alt="" className="size-[13.5px]" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination footer */}
        <div className="flex items-center justify-between bg-[rgba(242,243,255,0.6)] p-4">
          <div className="flex items-center gap-2">
            <p className="text-[12px] tracking-[0.12px] text-[#414942]">
              Exibindo <span className="font-normal">{rows.length}</span> de{" "}
              <span className="font-normal">{filtered.length}</span> registros cadastrados
            </p>
            <span className="text-[12px] tracking-[0.12px] text-[#c0c9c0]">•</span>
            <span className="text-[12px] tracking-[0.12px] text-[#414942]">Manaus/AM</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              className={`rounded-[2px] bg-[#eaedff] px-3 py-[6px] text-[12px] font-semibold leading-4 tracking-[0.24px] ${
                currentPage === 1 ? "text-[#c0c9c0]" : "text-[#131b2e]"
              }`}
              onClick={() => setCurrentSafePage(currentPage - 1, setPage, totalPages)}
            >
              Anterior
            </button>
            <div className="flex items-center gap-1">
              <button
                type="button"
                className={`size-8 rounded-[2px] pt-[7.5px] pb-[8.5px] text-center text-[12px] font-semibold leading-4 tracking-[0.24px] ${
                  currentPage === 1 ? "bg-[#0d472b] text-white" : "bg-[#eaedff] text-[#131b2e]"
                }`}
              >
                {currentPage}
              </button>
            </div>
            <button
              type="button"
              className={`rounded-[2px] bg-[#eaedff] px-3 py-[6px] text-[12px] font-semibold leading-4 tracking-[0.24px] ${
                currentPage >= totalPages ? "text-[#c0c9c0]" : "text-[#131b2e]"
              }`}
              onClick={() => setCurrentSafePage(currentPage + 1, setPage, totalPages)}
            >
              Próximo
            </button>
          </div>
        </div>

        {/* Create form modal */}
        {createOpen && (
          <div className="fixed inset-0 z-20 flex items-center justify-center bg-[rgba(19,27,46,0.4)] px-4">
            <form
              onSubmit={handleCreate}
              className="flex w-full max-w-[520px] flex-col gap-4 rounded-[8px] bg-white p-6 shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1)]"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-[16px] font-semibold leading-6 text-[#131b2e]">Novo Ponto Turístico</h2>
                <button type="button" onClick={() => setCreateOpen(false)} className="text-[12px] font-semibold text-[#396285]">
                  Fechar ✕
                </button>
              </div>
              <input name="name" required placeholder="Nome do atrativo" className="rounded-[4px] bg-[#f2f3ff] px-3 py-2 text-[14px] text-[#131b2e] focus:outline-2 focus:outline-[#0d472b]" />
              <textarea name="description" required placeholder="Descrição do atrativo" className="rounded-[4px] bg-[#f2f3ff] px-3 py-2 text-[14px] text-[#131b2e] focus:outline-2 focus:outline-[#0d472b]" />
              <div className="grid grid-cols-2 gap-3">
                <input name="latitude" type="number" step="any" required min={-90} max={90} placeholder="Latitude" className="rounded-[4px] bg-[#f2f3ff] px-3 py-2 text-[14px] text-[#131b2e] focus:outline-2 focus:outline-[#0d472b]" />
                <input name="longitude" type="number" step="any" required min={-180} max={180} placeholder="Longitude" className="rounded-[4px] bg-[#f2f3ff] px-3 py-2 text-[14px] text-[#131b2e] focus:outline-2 focus:outline-[#0d472b]" />
              </div>
              <select name="category_id" defaultValue="" className="rounded-[4px] bg-[#f2f3ff] px-3 py-2 text-[14px] text-[#131b2e] focus:outline-2 focus:outline-[#0d472b]">
                <option value="">Sem categoria</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setCreateOpen(false)} className="rounded-[4px] bg-[#eaedff] px-4 py-2 text-[12px] font-semibold text-[#131b2e]">
                  Cancelar
                </button>
                <button type="submit" className="rounded-[4px] bg-[#0d472b] px-4 py-2 text-[12px] font-semibold text-white">
                  Cadastrar
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </RoleShell>
  );
}

function setCurrentSafePage(next: number, setPage: (p: number) => void, totalPages: number) {
  setPage(Math.min(Math.max(next, 1), totalPages));
}