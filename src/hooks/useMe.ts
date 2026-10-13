import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { clearSession, getAccessToken } from "@/lib/session";
import type { MeResponse } from "@/types/api";

// Perfil autenticado compartilhado em módulo: Header e Sidebar consomem o
// mesmo GET /me (uma chamada por carregamento) sem Context/extras.
let cached: MeResponse | null = null;
let inFlight: Promise<MeResponse | null> | null = null;

async function loadMe(): Promise<MeResponse | null> {
  inFlight ||= api
    .get<MeResponse>("/me")
    .then((me) => {
      cached = me;
      return me;
    })
    .catch(() => null)
    .finally(() => {
      inFlight = null;
    });
  return inFlight;
}

// [me, isLoading]: isolado para o guard de página distinguir "carregando" de
// "sem acesso" (evita flash do cartão de negação durante o GET /me).
export function useMe(): [MeResponse | null, boolean] {
  const [me, setMe] = useState<MeResponse | null>(cached);
  const [isLoading, setIsLoading] = useState(cached === null);

  useEffect(() => {
    if (cached) return;
    if (!getAccessToken()) {
      setIsLoading(false); // sem sessão: o proxy já redireciona
      return;
    }
    let alive = true;
    loadMe().then((value) => {
      if (!alive) return;
      setMe(value);
      setIsLoading(false); // value === null: sessão inválida (api client já limpa/redirect)
    });
    return () => {
      alive = false;
    };
  }, []);

  return [me, isLoading];
}

export function logoutAndRedirect() {
  // Logout stateless: o cliente descarta os tokens (o DELETE /session é
  // best-effort — falha de rede não deve impedir o logout local).
  api.delete("/session").catch(() => undefined);
  clearSession();
  window.location.href = "/login";
}