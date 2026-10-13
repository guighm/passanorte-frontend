// Contratos do serviço catalog (pontos turísticos, categorias e eventos).

export type SpotStatus = 'open' | 'closed' | 'permanently_closed' | 'high_demand';

export interface Category {
  id: string;
  name: string;
}

export interface TouristSpot {
  id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  status: string;
  categories: Category[];
}

export interface TouristSpotsResponse {
  items: TouristSpot[];
  total: number;
}

export interface TouristSpotDetail extends TouristSpot {
  tolerance_radius_m: number;
  schedule: { day_of_week: number; opens_at: string; closes_at: string }[];
  events: EventApi[];
}

export type EventApi = {
  id: string;
  tourist_spot_id: string;
  title: string;
  description: string;
  occurs_at: string;
  ticket_price: number;
};