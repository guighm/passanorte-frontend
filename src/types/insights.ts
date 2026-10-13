// Contratos do serviço insights (agregados administrativos).

export interface HeatmapItem {
  tourist_spot_id: string;
  name: string;
  lat: number | null;
  lng: number | null;
  visit_count: number;
  weight: number;
}

export interface AccessesResponse {
  total: number;
  by_period: { period: string; start: string; count: number }[];
}

export type RankingSegment = 'day' | 'month' | 'year';

export interface RankingItem {
  tourist_spot_id: string;
  visit_count: number;
}

export interface DistributionItem {
  interest?: string;
  country_of_origin?: string;
  count: number;
  share: number;
}

export interface DistributionsResponse {
  items: DistributionItem[];
  total: number;
}

export interface TouristSpotRankingResponse {
  segment: string;
  items: RankingItem[];
}