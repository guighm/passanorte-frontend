import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { TouristSpot, TouristSpotsResponse } from "@/types/catalog";
import type {
  AccessesResponse,
  DistributionsResponse,
  HeatmapItem,
  RankingSegment,
  TouristSpotRankingResponse,
} from "@/types/insights";

export interface DashboardStats {
  checkins: number;
  uniqueTourists: number | null; // sem endpoint agregado no backend (TODO)
  benefitsGranted: number | null; // sem endpoint agregado no backend (TODO)
  monitoredAttractions: {
    total: number;
    operating: number;
    restricted: number;
  };
}

export interface RankingItemView {
  id: string;
  name: string;
  value: number;
  percentage: number; // share do visit_count do primeiro colocado (0–100)
  subtext?: string;
  flow?: string;
}

export interface DistributionView {
  label: string;
  value: number;
  percentage: string;
  count: number;
  color?: string;
}

export interface DashboardData {
  stats: DashboardStats;
  topAttractions: RankingItemView[];
  origins: DistributionView[];
  interests: DistributionView[];
  leaderboard: RankingItemView[];
  heatmap: HeatmapItem[];
}

const RANKING_COLORS = ["#0d472b", "#396285", "#f78e27", "#002f19", "#ba1a1a"];

// Mapeamento dos filtros rápidos do painel para os period/segment dos insights.
export type PeriodKey = "day" | "week" | "month" | "year";

export function useDashboardData(period: PeriodKey) {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [seenPeriod, setSeenPeriod] = useState(period);
  // Reset derivado em render (padrão React para reagir a props) — evita
  // setState síncrono no corpo do effect.
  if (seenPeriod !== period) {
    setSeenPeriod(period);
    setIsLoading(true);
    setError(null);
  }

  useEffect(() => {
    let alive = true;

    // Ranking não tem segmento "week" no backend: usa o segmento inferior (
    // day para "7 dias") — agregado aproximado dentro do recurso disponível.
    const segment: RankingSegment =
      period === "day" || period === "week" ? "day" : period;

    Promise.all([
      api.get<AccessesResponse>(`/accesses?period=${period}`),
      api.get<TouristSpotsResponse>("/tourist-spots"),
      api.get<TouristSpotRankingResponse>(`/rankings/tourist-spots?segment=${segment}`),
      api.get<DistributionsResponse>("/distributions/country-of-origin"),
      api.get<DistributionsResponse>("/distributions/interests"),
      api.get<{ items: HeatmapItem[]; total: number }>("/heatmap"),
    ])
      .then(([accesses, spotsRes, ranking, origins, interests, heatmap]) => {
        if (!alive) return;
        const spots = spotsRes.items;
        const byId = new Map(spots.map((spot) => [spot.id, spot]));
        const total = ranking.items.reduce((acc, item) => acc + item.visit_count, 0) || 1;

        const rankingView = (items: typeof ranking.items, topN: number): RankingItemView[] =>
          items.slice(0, topN).map((item, idx) => ({
            id: item.tourist_spot_id,
            name: byId.get(item.tourist_spot_id)?.name || "Ponto removido",
            value: item.visit_count,
            percentage: Math.round((item.visit_count / total) * 100),
            subtext:
              byId.get(item.tourist_spot_id)?.categories?.[0]?.name || "Geral",
            flow: idx === 0 ? "1.000" : undefined,
          }));

        const distributionView = (
          dist: DistributionsResponse,
          pickLabel: (item: { interest?: string; country_of_origin?: string }, index: number, arr: { interest?: string; country_of_origin?: string }[]) => string,
          colors: string[],
        ): DistributionView[] =>
          dist.items.map((item, idx) => ({
            label: pickLabel(item, idx, dist.items),
            value: item.count,
            percentage: `${Math.round(item.share * 100)}%`,
            count: item.count,
            color: colors[idx % colors.length],
          }));

        const top = rankingView(ranking.items, 5);
        const maxVisits = ranking.items[0]?.visit_count || 0;

        setData({
          stats: {
            checkins: accesses.total,
            uniqueTourists: null,
            benefitsGranted: null,
            monitoredAttractions: {
              total: spotsRes.total,
              operating: spots.filter((spot) => spot.status === "open").length,
              restricted: spots.filter((spot) => spot.status !== "open").length,
            },
          },
          topAttractions: top,
          origins: distributionView(
            origins,
            (item, idx, arr2) => item.country_of_origin || `Origem ${idx + 1} de ${arr2.length}`,
            RANKING_COLORS,
          ),
          interests: distributionView(
            interests,
            (item, idx, arr2) => item.interest || `Interesse ${idx + 1} de ${arr2.length}`,
            RANKING_COLORS,
          ),
          leaderboard: rankingView(ranking.items, 3).map((item) => ({
            ...item,
            percentage: maxVisits ? Math.round((item.value / maxVisits) * 100) : 0,
            subtext: item.subtext || "Ponto Turístico",
            flow: `${item.value.toLocaleString()} visitas`,
          })),
          heatmap: heatmap.items,
        });
      })
      .catch((err: { message?: string }) => {
        if (alive) setError(err.message || "Erro ao carregar dados do painel.");
      })
      .finally(() => {
        if (alive) setIsLoading(false);
      });

    return () => {
      alive = false;
    };
  }, [period]);

  return { data, isLoading, error };
}