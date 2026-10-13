// Contratos do backend SPD-PassaNorte (Kong :8000, prefixo /api/v1).

// Erro padronizado do backend: {"error": {"code", "message", "details"}}.
export interface ApiError {
  code: string;
  message: string;
  details: Record<string, unknown>;
}

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
}

export interface MeResponse {
  id: string;
  role: 'admin' | 'employee' | 'tourist';
  name: string;
  surname: string;
  email: string;
  country_of_origin: string;
}

export interface Employee {
  id: string;
  name: string;
  surname: string;
  email: string;
  role: string;
  is_active: boolean;
}