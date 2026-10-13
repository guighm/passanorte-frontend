"use client";

import { type FormEvent, useEffect, useMemo, useState } from "react";
import { RoleShell } from "@/components/layout/RoleShell";
import { api } from "@/lib/api";
import type { TouristSpot, TouristSpotsResponse } from "@/types/catalog";
import type { RouteApi, RoutesResponse } from "@/types/gamification";

const THUMBS = [
  "/images/rotas-thumb-1.png",
  "/images/rotas-thumb-2.png",
  "/images/rotas-thumb-3.png",
  "/images/rotas-thumb-4.png",
];

type RouteCard = RouteApi & { spotNames: string[]; thumb: string };

function toCard(route: RouteApi, spotsById: Map<string, TouristSpot>, index: number): RouteCard {
  return {
    ...route,
    spotNames: route.points.map((spotId) => spotsById.get(spotId)?.name || "Ponto removido"),
    thumb: THUMBS[index % THUMBS.length],
  };
}

export default function RotasPage() {
  const [routes, setRoutes] = useState<RouteApi[]>([]);
  const [spots, setSpots] = useState<TouristSpot[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingRoute, setEditingRoute] = useState<RouteApi | null>(null);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [brinde, setBrinde] = useState("");
  const [selectedPoints, setSelectedPoints] = useState<string[]>([]);

  const loadRoutes = async () => {
    setIsLoading(true);
    try {
      const response = await api.get<RoutesResponse>("/routes");
      // O GET /routes público só devolve rotas ativas — é a fonte de gestão
      // disponível via borda (rotas inativas saem da listagem ao desativar).
      setRoutes(response.items);
    } catch (error) {
      console.error("Erro ao carregar rotas:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const [routesRes, spotsRes] = await Promise.all([
          api.get<RoutesResponse>("/routes"),
          api.get<TouristSpotsResponse>("/tourist-spots"),
        ]);
        if (alive) {
          setRoutes(routesRes.items);
          setSpots(spotsRes.items);
        }
      } catch (error) {
        console.error("Erro ao carregar rotas:", error);
      } finally {
        if (alive) setIsLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const spotsById = useMemo(() => new Map(spots.map((spot) => [spot.id, spot])), [spots]);

  const activeCount = routes.filter((route) => route.is_active).length;
  const cards = useMemo(
    () => routes.map((route, index) => toCard(route, spotsById, index)),
    [routes, spotsById],
  );

  const normalizedSearch = search.trim().toLowerCase();
  const visibleRoutes = cards.filter(
    (route) =>
      normalizedSearch === "" ||
      route.name.toLowerCase().includes(normalizedSearch) ||
      (route.description || "").toLowerCase().includes(normalizedSearch) ||
      route.spotNames.some((name) => name.toLowerCase().includes(normalizedSearch)),
  );

  function openEditor(route: RouteApi | null) {
    setEditingRoute(route);
    setNome(route?.name || "");
    setDescricao(route?.description || "");
    setBrinde(route?.prize?.name || "");
    setSelectedPoints(route?.points || []);
    setEditorOpen(true);
  }

  async function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (selectedPoints.length === 0) {
      alert("Selecione ao menos um atrativo para a rota.");
      return;
    }
    try {
      if (editingRoute) {
        await api.patch(`/routes/${editingRoute.id}`, {
          name: nome,
          description: descricao,
          points: selectedPoints,
        });
        if (brinde && brinde !== editingRoute.prize.name) {
          alert(`O brinde "${editingRoute.prize.name}" já está vinculado; use o Estoque para ajustá-lo.`);
        }
      } else {
        // POST /routes cria o brinde vinculado (stock 0) junto com a rota.
        await api.post("/routes", {
          name: nome,
          description: descricao,
          points: selectedPoints,
          prize: { name: brinde || `Brinde da rota ${nome}` },
        });
      }
      setEditorOpen(false);
      setEditingRoute(null);
      await loadRoutes();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Erro ao salvar rota.");
    }
  }

  async function toggleActive(route: RouteApi) {
    try {
      await api.patch(`/routes/${route.id}`, { is_active: !route.is_active });
      await loadRoutes();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Erro ao alternar status da rota.");
    }
  }

  async function removeRoute(route: RouteApi) {
    if (!confirm(`Desativar a rota "${route.name}"? O progresso em andamento é preservado.`)) return;
    try {
      await api.delete(`/routes/${route.id}`);
      await loadRoutes();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Erro ao remover rota.");
    }
  }

  async function duplicateRoute(route: RouteApi) {
    try {
      await api.post("/routes", {
        name: `${route.name} (cópia)`,
        description: route.description,
        points: route.points,
        prize: { name: `${route.prize.name} (cópia)` },
      });
      await loadRoutes();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Erro ao duplicar rota.");
    }
  }

  function togglePoint(spotId: string) {
    setSelectedPoints((value) =>
      value.includes(spotId) ? value.filter((id) => id !== spotId) : [...value, spotId],
    );
  }

  return (
    <RoleShell breadcrumb="Rotas & Roteiros">
      <div className="flex flex-col items-start">
        {/* Page header */}
        <div className="flex w-full flex-col pb-4 pt-4">
          <div className="flex w-full flex-col items-start justify-between gap-4 md:flex-row md:items-center">
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
            <div className="flex flex-wrap items-center gap-2">
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
                onClick={() => openEditor(null)}
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
          <div className="grid w-full grid-cols-1 items-stretch gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="flex min-w-0 flex-col justify-between rounded-lg bg-white p-4 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
              <div className="flex w-full flex-col pb-2">
                <div className="flex w-full items-center justify-between">
                  <p className="text-[12px] font-semibold leading-4 tracking-[0.24px] text-[#414942]">
                    Rotas Ativas
                  </p>
                  <span className="flex size-8 items-center justify-center rounded-xl bg-[rgba(174,214,254,0.4)]">
                    <img src="/icons/rotas-kpi-rotas.svg" alt="" style={{ width: 13.5, height: 15 }} />
                  </span>
                </div>
              </div>
              <div className="flex w-full flex-col gap-1">
                <p className="text-[32px] font-bold leading-[40px] tracking-[-0.64px] text-[#131b2e]">
                  {isLoading ? "..." : activeCount}
                </p>
                <div className="flex w-full items-center gap-1.5">
                  <img src="/icons/rotas-kpi-gps.svg" alt="" className="size-[13.333px]" />
                  <p className="text-[12px] leading-4 tracking-[0.12px] text-[#195033]">
                    de {routes.length} cadastradas
                  </p>
                </div>
              </div>
            </div>

            <div className="flex min-w-0 flex-col justify-between rounded-lg bg-white p-4 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
              <div className="flex w-full flex-col pb-2">
                <div className="flex w-full items-center justify-between">
                  <p className="text-[12px] font-semibold leading-4 tracking-[0.24px] text-[#414942]">
                    Atrativos Catalogados
                  </p>
                  <span className="flex size-8 items-center justify-center rounded-xl bg-[rgba(182,240,200,0.4)]">
                    <img src="/icons/rotas-kpi-trophy.svg" alt="" style={{ width: 7.5, height: 15 }} />
                  </span>
                </div>
              </div>
              <div className="flex w-full flex-col gap-1">
                <p className="text-[32px] font-bold leading-[40px] tracking-[-0.64px] text-[#131b2e]">
                  {isLoading ? "..." : spots.length}
                </p>
                <div className="flex w-full items-center gap-1.5">
                  <img src="/icons/rotas-kpi-trend.svg" alt="" style={{ width: 13.333, height: 8 }} />
                  <p className="text-[12px] font-medium leading-4 tracking-[0.12px] text-[#0d472b]">
                    Disponíveis para as rotas
                  </p>
                </div>
              </div>
            </div>

            <div className="flex min-w-0 flex-col justify-between rounded-lg bg-white p-4 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
              <div className="flex w-full flex-col pb-2">
                <div className="flex w-full items-center justify-between">
                  <p className="text-[12px] font-semibold leading-4 tracking-[0.24px] text-[#414942]">
                    Estoque de Brindes
                  </p>
                  <span className="flex size-8 items-center justify-center rounded-xl bg-[rgba(255,220,195,0.6)]">
                    <img src="/icons/rotas-kpi-star.svg" alt="" style={{ width: 16.5, height: 15.75 }} />
                  </span>
                </div>
              </div>
              <div className="flex w-full flex-col gap-1">
                <p className="text-[32px] font-bold leading-[40px] tracking-[-0.64px] text-[#131b2e]">
                  {isLoading ? "..." : routes.reduce((acc, route) => acc + route.prize.stock_quantity, 0)}
                </p>
                <div className="flex w-full items-center gap-1.5">
                  <div className="flex flex-col pr-[14px] text-[12px] font-medium leading-4 tracking-[0.12px] text-[#603100]">
                    <span>unidades</span>
                  </div>
                  <div className="flex flex-col text-[12px] leading-4 tracking-[0.12px] text-[#414942]">
                    <span>vinculadas às</span>
                    <span>rotas ativas</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex min-w-0 flex-col justify-between rounded-lg bg-white p-4 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
              <div className="flex w-full flex-col pb-2">
                <div className="flex w-full items-center justify-between">
                  <p className="text-[12px] font-semibold leading-4 tracking-[0.24px] text-[#414942]">
                    Brindes Concedidos
                  </p>
                  <span className="flex size-8 items-center justify-center rounded-xl bg-[rgba(206,229,255,0.5)]">
                    <img src="/icons/rotas-kpi-gift.svg" alt="" style={{ width: 15, height: 14.25 }} />
                  </span>
                </div>
              </div>
              <div className="flex w-full flex-col gap-1">
                {/* TODO: sem agregado de resgates por período no backend */}
                <p className="text-[32px] font-bold leading-[40px] tracking-[-0.64px] text-[#131b2e]">—</p>
                <div className="flex w-full items-center gap-1.5">
                  <img src="/icons/rotas-kpi-brindes.svg" alt="" style={{ width: 13.333, height: 14.25 }} />
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
            <form
              onSubmit={handleSave}
              className="flex w-full flex-col rounded-lg bg-white p-6 shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]"
            >
              {/* Editor header */}
              <div className="flex w-full items-center justify-between pb-4">
                <div className="flex min-w-0 items-center gap-2">
                  <span className="flex h-10 w-[28.95px] shrink-0 items-center justify-center rounded-[4px] bg-[#002f19]">
                    <img src="/icons/rotas-editor.svg" alt="" style={{ width: 18, height: 20 }} />
                  </span>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <h2 className="text-[20px] font-semibold leading-7 tracking-[-0.2px] text-[#131b2e]">
                        {editingRoute ? "Editar Roteiro" : "Editor de Roteiro Turístico"}
                      </h2>
                      {editingRoute && (
                        <span className="rounded-[2px] bg-[#cee5ff] px-2 py-0.5 text-[13px] font-bold leading-[18px] tracking-[0.26px] text-[#1f4a6c]">
                          # {editingRoute.id.slice(0, 8)}
                        </span>
                      )}
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
                    aria-label="Fechar editor"
                    onClick={() => setEditorOpen(false)}
                    className="ml-2 flex items-center justify-center rounded-[2px] px-1.5 pb-3 pt-1.5"
                  >
                    <img src="/icons/rotas-close.svg" alt="" className="size-[11.667px]" />
                  </button>
                </div>
              </div>

              {/* Form */}
              <div className="grid w-full grid-cols-1 gap-6 pt-4 md:grid-cols-12">
                <div className="col-span-1 flex flex-col gap-4 md:col-span-8">
                  <div className="flex w-full flex-col gap-1">
                    <label
                      htmlFor="roteiro-nome"
                      className="text-[11px] font-semibold uppercase leading-[14px] tracking-[0.44px] text-[#414942]"
                    >
                      Nome oficial do roteiro
                    </label>
                    <input
                      id="roteiro-nome"
                      required
                      value={nome}
                      onChange={(event) => setNome(event.target.value)}
                      className="w-full rounded-[2px] bg-white p-2 text-[14px] leading-5 text-[#131b2e] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] focus:outline-2 focus:outline-[#0d472b]"
                    />
                  </div>

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

                  {/* Brinde */}
                  <div className="flex w-full flex-col gap-1">
                    <label
                      htmlFor="roteiro-brinde"
                      className="text-[11px] font-semibold uppercase leading-[14px] tracking-[0.44px] text-[#414942]"
                    >
                      Brinde concedido na conclusão
                    </label>
                    <input
                      id="roteiro-brinde"
                      value={brinde}
                      disabled={Boolean(editingRoute)}
                      onChange={(event) => setBrinde(event.target.value)}
                      placeholder="Ex.: Kit Souvenir Amazônia Viva"
                      className="w-full rounded-[2px] bg-white p-2 text-[14px] leading-5 text-[#131b2e] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] focus:outline-2 focus:outline-[#0d472b] disabled:opacity-60"
                    />
                    {editingRoute && (
                      <p className="text-[12px] leading-4 tracking-[0.12px] text-[#414942]">
                        Brinde atual: <span className="font-semibold">{editingRoute.prize.name}</span> • estoque {editingRoute.prize.stock_quantity} unid. (ajuste no Estoque de Benefícios)
                      </p>
                    )}
                  </div>

                  {/* Sequência de atrativos */}
                  <div className="flex w-full flex-col gap-1">
                    <p className="text-[11px] font-semibold uppercase leading-[14px] tracking-[0.44px] text-[#414942]">
                      Sequência de atrativos ({selectedPoints.length} selecionados — ordem de clique)
                    </p>
                    <div className="flex max-h-[220px] w-full flex-col gap-1 overflow-auto rounded-[2px] bg-[#f2f3ff] p-2">
                      {spots.length === 0 && (
                        <p className="text-[12px] text-[#414942]">Nenhum ponto turístico no catálogo.</p>
                      )}
                      {spots.map((spot) => (
                        <label key={spot.id} className="flex items-center gap-2 text-[13px] text-[#131b2e]">
                          <input
                            type="checkbox"
                            checked={selectedPoints.includes(spot.id)}
                            onChange={() => togglePoint(spot.id)}
                            className="size-4"
                          />
                          {spot.name}
                          <span className="text-[11px] text-[#414942]">
                            {spot.categories.map((category) => category.name).join(", ")}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Preview (4 cols) */}
                <div className="col-span-1 flex flex-col justify-between rounded-lg bg-[#f2f3ff] p-4 md:col-span-4">
                  <div className="flex w-full flex-col gap-1">
                    <p className="text-[11px] font-semibold uppercase leading-[14px] tracking-[0.55px] text-[#414942]">
                      Pré-visualização do percurso
                    </p>
                    <div className="flex w-full flex-col gap-1.5 rounded-[4px] bg-white p-3">
                      {selectedPoints.length === 0 ? (
                        <p className="text-[12px] leading-4 text-[#414942]">Sem atrativos selecionados ainda.</p>
                      ) : (
                        selectedPoints.map((spotId, idx) => (
                          <p key={spotId} className="text-[13px] font-medium leading-5 text-[#131b2e]">
                            {idx + 1}. {spotsById.get(spotId)?.name || spotId}
                          </p>
                        ))
                      )}
                    </div>
                  </div>
                  <div className="flex w-full flex-col gap-2 pt-4">
                    <button
                      type="button"
                      onClick={() => setSelectedPoints([])}
                      className="flex w-full items-center justify-center gap-1.5 rounded-[2px] bg-[#e2e7ff] py-2"
                    >
                      <span className="text-[12px] font-semibold leading-4 tracking-[0.24px] text-[#131b2e]">
                        Limpar seleção
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Panel footer actions */}
              <div className="flex w-full items-center justify-end gap-2 pt-10">
                <button
                  type="button"
                  onClick={() => setEditorOpen(false)}
                  className="rounded-[2px] bg-[#e2e7ff] px-4 py-2 text-[12px] font-semibold leading-4 tracking-[0.24px] text-[#131b2e]"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 rounded-[2px] bg-[#002f19] px-6 py-2 shadow-[0px_1px_3px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]"
                >
                  <img src="/icons/rotas-publish.svg" alt="" className="size-3" />
                  <span className="text-[12px] font-semibold leading-4 tracking-[0.24px] text-white">
                    {editingRoute ? "Salvar Alterações" : "Publicar Rota no App PassaNorte"}
                  </span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Filter & management toolbar */}
        <div className="flex w-full flex-col pb-4">
          <div className="flex w-full flex-col items-start justify-between gap-2 md:flex-row md:items-center">
            <div className="flex flex-col items-start gap-2">
              <div className="relative w-full sm:w-[320px]">
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Buscar por roteiro ou ponto turístico..."
                  className="w-full rounded-[4px] bg-white pb-[9px] pl-9 pr-3 pt-2 text-[12px] tracking-[0.12px] text-[#414942] placeholder:text-[#414942] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] focus:outline-2 focus:outline-[#0d472b]"
                />
                <img
                  src="/icons/rotas-search.svg"
                  alt=""
                  className="absolute left-[14.25px] top-[12.25px] size-[13.5px]"
                />
              </div>
            </div>
            <p className="text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#414942]">
              Exibindo {visibleRoutes.length} roteiros de {routes.length} cadastrados
            </p>
          </div>
        </div>

        {/* Routes list */}
        <div className="flex w-full pb-8">
          <div className="flex w-full flex-col gap-4">
            {isLoading ? (
              <div className="rounded-lg bg-white p-6 text-[14px] text-[#414942] shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
                Carregando rotas...
              </div>
            ) : visibleRoutes.length === 0 ? (
              <div className="rounded-lg bg-white p-6 text-[14px] text-[#414942] shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
                Nenhuma rota ativa cadastrada. Crie o primeiro roteiro gamificado acima.
              </div>
            ) : (
              visibleRoutes.map((route) => (
                <RouteRow
                  key={route.id}
                  route={route}
                  onEdit={() => openEditor(route)}
                  onDelete={() => removeRoute(route)}
                  onToggle={() => toggleActive(route)}
                  onDuplicate={() => duplicateRoute(route)}
                />
              ))
            )}
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
    </RoleShell>
  );
}

function RouteRow({
  route,
  onEdit,
  onDelete,
  onToggle,
  onDuplicate,
}: {
  route: RouteCard;
  onEdit: () => void;
  onDelete: () => void;
  onToggle: () => void;
  onDuplicate: () => void;
}) {
  const isInactive = !route.is_active;

  return (
    <div className="flex w-full flex-col rounded-lg bg-white p-4 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
      <div className="flex w-full flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        {/* Identification */}
        <div className="flex min-w-0 flex-1 items-start gap-4">
          <div
            className={`flex size-14 shrink-0 justify-center overflow-hidden rounded-[4px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] ${
              isInactive ? "opacity-80" : ""
            }`}
          >
            <img src={route.thumb} alt="" className="size-full object-cover" />
          </div>
          <div className="flex min-w-0 flex-col gap-1">
            <div className="flex w-full items-center gap-2">
              <h3 className="text-[16px] font-bold leading-6 text-[#131b2e]">
                {route.name}
              </h3>
              {isInactive ? (
                <span className="rounded-[2px] bg-[#ffdcc3] px-2 py-0.5 text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#2f1500]">
                  Inativa
                </span>
              ) : (
                <span className="rounded-[2px] bg-[#b6f0c8] px-2 py-0.5 text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#002110]">
                  Ativa
                </span>
              )}
              <span className="text-[13px] font-medium leading-[18px] tracking-[0.26px] text-[#414942]">
                # {route.id.slice(0, 8)}
              </span>
            </div>
            <p className="truncate text-[12px] leading-4 tracking-[0.12px] text-[#414942]">
              {route.spotNames.length} Atrativos: {route.spotNames.join(" ➔ ") || "—"}
            </p>
            <div className="flex w-full items-center gap-4 pt-1">
              <div className="flex items-center gap-1">
                <img src="/icons/rotas-gift.svg" alt="" style={{ width: 13.333, height: 12.667 }} />
                <p className="text-[12px] font-medium leading-4 tracking-[0.12px] text-[#0d472b]">
                  {route.prize.name}
                </p>
              </div>
              <p className="text-[12px] leading-4 tracking-[0.12px] text-[#414942]">
                Estoque do brinde: {route.prize.stock_quantity} unid.
              </p>
            </div>
            {route.description && (
              <p className="truncate text-[12px] leading-4 tracking-[0.12px] text-[#414942]" title={route.description}>
                {route.description}
              </p>
            )}
          </div>
        </div>

        {/* Telemetry stats & actions */}
        <div className="flex shrink-0 flex-col items-start justify-center gap-6 md:items-end md:pl-6">
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-end">
              <p className="text-[11px] font-semibold uppercase leading-[14px] tracking-[0.44px] text-[#414942]">
                Atrativos
              </p>
              <p className="text-[16px] font-semibold leading-6 text-[#131b2e]">
                {route.spotNames.length}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label="Editar rota"
              onClick={onEdit}
              className="flex items-center justify-center px-2 pb-[14px] pt-2"
            >
              <img src="/icons/rotas-edit.svg" alt="" className="size-[15px]" />
            </button>
            <button
              type="button"
              aria-label="Duplicar rota"
              onClick={onDuplicate}
              className="flex items-center justify-center px-2 pb-[14px] pt-2"
            >
              <img src="/icons/rotas-copy.svg" alt="" style={{ width: 14.167, height: 16.667 }} />
            </button>
            <button
              type="button"
              aria-label={isInactive ? "Ativar rota" : "Desativar rota"}
              onClick={onToggle}
              className="flex items-center justify-center px-2 pb-[14px] pt-2"
            >
              <img
                src={isInactive ? "/icons/rotas-play.svg" : "/icons/rotas-eye.svg"}
                alt=""
                className="size-[16.667px]"
              />
            </button>
            <button
              type="button"
              aria-label="Excluir rota"
              onClick={onDelete}
              className="flex items-center gap-1 rounded-[2px] bg-[#e2e7ff] px-2 py-1.5"
            >
              <img src="/icons/rotas-metricas.svg" alt="" style={{ width: 13.333, height: 14 }} />
              <span className="whitespace-nowrap text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#131b2e]">
                Excluir
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}