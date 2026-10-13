export interface RouteMeta {
  icon: string;
  iconSize: [number, number];
  label: string;
  strong?: boolean;
}

export interface Route {
  id: string;
  code: string;
  title: string;
  thumb: string;
  status: 'ativa' | 'manutencao';
  attractCount: number;
  attractives: string;
  meta: RouteMeta[];
  conclusions: number;
  rating?: string;
  seasonalLabel?: string;
  seasonalStatus?: string;
}

export interface RoutesResponse {
  items: Route[];
  total: number;
}
