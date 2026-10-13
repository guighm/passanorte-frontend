import { ApiError } from '@/types/api';
import {
  clearSession,
  getAccessToken,
  getRefreshToken,
  updateAccessToken,
} from '@/lib/session';

class BackendError extends Error {
  code: string;
  status: number;
  details: Record<string, unknown>;

  constructor(code: string, message: string, status: number, details: Record<string, unknown> = {}) {
    super(message);
    this.code = code;
    this.status = status;
    this.details = details;
  }
}

class ApiClient {
  private baseUrl: string;
  private refreshInFlight: Promise<string | null> | null = null;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    const token = getAccessToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  async refreshSession(): Promise<string | null> {
    // Renovação com dedupe: requisições concorrentes compartilham o mesmo
    // POST /session/refresh (o refresh token é reutilizado pelo backend).
    this.refreshInFlight ||= (async () => {
      const refreshToken = getRefreshToken();
      if (!refreshToken) return null;
      try {
        const response = await fetch(`${this.baseUrl}/session/refresh`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refresh_token: refreshToken }),
        });
        if (!response.ok) return null;
        const data = (await response.json()) as { access_token: string };
        updateAccessToken(data.access_token);
        return data.access_token;
      } catch {
        return null;
      } finally {
        this.refreshInFlight = null;
      }
    })();
    return this.refreshInFlight;
  }

  private async parseError(response: Response): Promise<BackendError> {
    // Erro padronizado do backend: {"error": {"code", "message", "details"}}.
    const body = await response.json().catch(() => null);
    const error = (body as { error?: Partial<ApiError> } | null)?.error;
    const message = error?.message || response.statusText || 'Falha na requisição.';
    return new BackendError(error?.code || 'unknown', message, response.status, error?.details || {});
  }

  private async request<T>(endpoint: string, options: RequestInit = {}, retried = false): Promise<T> {
    let response: Response;
    try {
      response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers: { ...this.getHeaders(), ...options.headers },
      });
    } catch {
      throw new BackendError('network_error', 'Não foi possível conectar à API.', 0);
    }

    if (response.status === 401) {
      // Access token expirado ou inválido: tenta renovar e refaz a requisição.
      if (!retried) {
        const token = await this.refreshSession();
        if (token) {
          return this.request<T>(endpoint, options, true);
        }
      }
      clearSession();
      if (!window.location.pathname.startsWith('/login')) {
        window.location.href = '/login';
      }
      throw await this.parseError(response);
    }

    if (!response.ok) {
      throw await this.parseError(response);
    }

    if (response.status === 204) {
      return undefined as T;
    }

    return response.json();
  }

  get<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  post<T>(endpoint: string, body: unknown, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  patch<T>(endpoint: string, body: unknown, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(body),
    });
  }

  put<T>(endpoint: string, body: unknown, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(body),
    });
  }

  delete<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }
}

export const api = new ApiClient();
export { BackendError as ApiRequestError };