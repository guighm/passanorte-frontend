import { AppShell } from "@/components/layout/AppShell";

export default function ConfiguracoesPage() {
  return (
    <AppShell breadcrumb="Configurações">
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-[#c0c9c0] bg-white p-8 text-center">
        <h1 className="text-xl font-semibold text-[#131b2e]">Configurações</h1>
        <p className="max-w-md text-sm leading-5 text-[#414942]">
          Esta seção ainda não possui tela definida no projeto Figma. As
          configurações do sistema estarão disponíveis em uma próxima
          iteração.
        </p>
      </div>
    </AppShell>
  );
}