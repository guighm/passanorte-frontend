"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AppShell } from "./AppShell";
import { useMe } from "@/hooks/useMe";
import { canAccess, homeFor } from "@/lib/rbac";

type RoleShellProps = {
  breadcrumb?: string;
  children: ReactNode;
};

// Guard de página por papel: bloqueia rotas que o backend recusaria de
// qualquer forma (require_role por endpoint) com a mesma granularidade.
export function RoleShell({ breadcrumb, children }: RoleShellProps) {
  const pathname = usePathname();
  const [me, isLoading] = useMe();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f8ff]">
        <p className="text-[14px] font-medium text-[#414942]">Carregando...</p>
      </div>
    );
  }

  if (!me || !canAccess(pathname, me.role)) {
    return (
      <AppShell breadcrumb="Acesso Restrito">
        <div className="flex min-h-[400px] flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-[#c0c9c0] bg-white p-8 text-center">
          <h1 className="text-xl font-semibold text-[#131b2e]">Acesso restrito</h1>
          <p className="max-w-md text-sm leading-5 text-[#414942]">
            Este painel não está disponível para o seu perfil de acesso. Se
            acreditar que é um erro, procure o administrador geral da
            Manauscult/PMM.
          </p>
          <Link
            href={homeFor(me?.role ?? null)}
            className="mt-2 rounded-[4px] bg-[#0d472b] px-4 py-2 text-[14px] font-semibold text-white"
          >
            Voltar ao início
          </Link>
        </div>
      </AppShell>
    );
  }

  return <AppShell breadcrumb={breadcrumb}>{children}</AppShell>;
}