// Sessão do cliente: access + refresh tokens em cookies (SameSite=Lax).
// Os cookies são usados pelo proxy do Next (spd_token) e pelo api client.

const ACCESS_COOKIE = 'spd_token';
const REFRESH_COOKIE = 'spd_refresh';

function readCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function writeCookie(name: string, value: string): void {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; SameSite=Lax`;
}

// Fallback legado: sessões anteriores guardavam o token de acesso no localStorage.
function fallbackToken(): string {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem(ACCESS_COOKIE) || '';
}

export function getAccessToken(): string {
  return readCookie(ACCESS_COOKIE) || fallbackToken();
}

export function getRefreshToken(): string {
  return readCookie(REFRESH_COOKIE) || '';
}

export function setSession(accessToken: string, refreshToken: string): void {
  writeCookie(ACCESS_COOKIE, accessToken);
  writeCookie(REFRESH_COOKIE, refreshToken);
  try {
    localStorage.setItem(ACCESS_COOKIE, accessToken);
  } catch {
    // localStorage indisponível (ex.: modo privacidade) — os cookies bastam.
  }
}

// Renovação: troca apenas o access token; o refresh é reutilizado.
export function updateAccessToken(accessToken: string): void {
  writeCookie(ACCESS_COOKIE, accessToken);
  try {
    localStorage.setItem(ACCESS_COOKIE, accessToken);
  } catch {
    // idem acima
  }
}

export function clearSession(): void {
  const expired = (name: string) => {
    document.cookie = `${name}=; path=/; max-age=0`;
  };
  expired(ACCESS_COOKIE);
  expired(REFRESH_COOKIE);
  if (typeof window !== 'undefined') {
    localStorage.removeItem(ACCESS_COOKIE);
  }
}