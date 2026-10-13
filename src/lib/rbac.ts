// RBAC do painel: espelha o exigido pelo backend (require_role por endpoint).
// admin: insights/dashboard, gestão do catálogo, estoque e servidores.
// employee: operação do CAT (POST /redemptions exige role "employee" no backend).
// Leituras públicas do catálogo estão fora do mapa (todas as páginas do mapa exigem papel).

export type Role = "admin" | "employee" | "tourist";

const PAGE_ROLES: Record<string, readonly Role[]> = {
  "/dashboard": ["admin"],
  "/pontos-turisticos": ["admin"],
  "/eventos": ["admin"],
  "/rotas": ["admin"],
  "/estoque-beneficios": ["admin"],
  "/servidores": ["admin"],
  "/concessao-beneficios": ["employee"],
  "/configuracoes": ["admin", "employee"],
};

const DEFAULT_PAGE: Record<Role, string> = {
  admin: "/dashboard",
  employee: "/concessao-beneficios",
  tourist: "/login",
};

// Páginas fora do mapa (ex.: /) não são guardadas aqui.
export function canAccess(pathname: string, role: Role | null): boolean {
  const allowed = PAGE_ROLES[pathname];
  if (!allowed) return true;
  return role !== null && allowed.includes(role);
}

// Página inicial por papel (redireciona login e acesso negado).
export function homeFor(role: Role | null): string {
  return (role && DEFAULT_PAGE[role]) || "/login";
}

// Decodifica o payload do JWT (base64url) para extrair o claim role —
// evita uma chamada extra ao GET /me no primeiro carregamento.
export function roleFromToken(token: string | null | undefined): Role | null {
  if (!token) return null;
  try {
    const payload = token.split(".")[1];
    if (!payload) return null;
    const json = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    const role = (JSON.parse(json) as { role?: string }).role;
    return role === "admin" || role === "employee" || role === "tourist" ? role : null;
  } catch {
    return null;
  }
}