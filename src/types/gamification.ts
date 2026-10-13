// Contratos do serviço gamification (rotas, brindes e resgates).

export interface RoutePrize {
  id: string;
  name: string;
  stock_quantity: number;
}

export interface RouteApi {
  id: string;
  name: string;
  description: string | null;
  points: string[];
  prize: RoutePrize;
  is_active: boolean;
}

export interface RoutesResponse {
  items: RouteApi[];
  total: number;
}

export interface Prize {
  id: string;
  name: string;
  description: string | null;
  stock_quantity: number;
}

export interface PrizesResponse {
  items: Prize[];
  total: number;
}

export interface RedemptionResponse {
  code: string;
  status: string;
  prize_id: string;
}