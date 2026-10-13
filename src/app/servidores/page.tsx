"use client";

import { type FormEvent, useEffect, useMemo, useState } from "react";
import { RoleShell } from "@/components/layout/RoleShell";
import { api } from "@/lib/api";
import { Employee } from "@/types/api";

const PAGE_SIZE = 6;
const GRID_COLS =
  "grid grid-cols-[166.39fr_187.33fr_164.22fr_135.66fr_171.47fr_150.93fr]";

const AVATAR_STYLES = [
  { bg: "#aed6fe", text: "#396285" },
  { bg: "#0d472b", text: "#ffffff" },
  { bg: "#cee5ff", text: "#001d32" },
  { bg: "#d2d9f4", text: "#131b2e" },
  { bg: "rgba(255,183,125,0.4)", text: "#411f00" },
  { bg: "#ffdad6", text: "#ba1a1a" },
];

function initialsOf(name: string): string {
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] || "") + (parts[parts.length - 1]?.[0] || "")).toUpperCase() || "?";
}

function PerfilBadge({ role }: { role: string }) {
  if (role === "admin") {
    return (
      <div className="flex items-center gap-1 rounded-[12px] bg-[#0d472b] py-[2px] pl-2 pr-[27px]">
        <img src="/icons/serv-admin-badge.svg" alt="" className="h-[10.5px] w-[11px]" />
        <span className="whitespace-nowrap text-[11px] font-semibold uppercase leading-[14px] tracking-[0.44px] text-white">
          Administrador
          <br />
          Geral
        </span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-1 rounded-[12px] bg-[#e2e7ff] py-[2px] pl-2 pr-[35px]">
      <span className="h-[6px] w-[4.69px] rounded-[12px] bg-[#396285]" />
      <span className="whitespace-nowrap text-[11px] font-semibold uppercase leading-[14px] tracking-[0.44px] text-[#131b2e]">
        Operador
        <br />
        (Restrito)
      </span>
    </div>
  );
}

function StatusBadge({ isActive }: { isActive: boolean }) {
  if (isActive) {
    return (
      <div className="flex items-center gap-[6px] rounded-[12px] bg-[rgba(182,240,200,0.6)] px-2 py-[2px]">
        <span className="size-2 rounded-[12px] bg-[#0d472b]" />
        <span className="whitespace-nowrap text-[11px] font-semibold uppercase leading-[14px] tracking-[0.44px] text-[#002f19]">
          Ativo
        </span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-[6px] rounded-[12px] bg-[#ffdad6] py-[2px] pl-2 pr-[27px]">
      <span className="h-2 w-[5.94px] rounded-[12px] bg-[#ba1a1a]" />
      <span className="whitespace-nowrap text-[11px] font-semibold uppercase leading-[14px] tracking-[0.44px] text-[#ba1a1a]">
        Acesso
        <br />
        Revogado
      </span>
    </div>
  );
}

function MetricCard({
  label,
  icon,
  iconSize,
  iconBg,
  children,
}: {
  label: string;
  icon: string;
  iconSize: { w: number; h: number };
  iconBg: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 flex-col justify-between rounded-[8px] bg-white p-4 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
      <div className="flex w-full items-center justify-between">
        <span className="text-[12px] font-semibold leading-4 tracking-[0.24px] text-[#414942]">
          {label}
        </span>
        <div
          className="flex size-8 items-center justify-center rounded-[4px]"
          style={{ backgroundColor: iconBg }}
        >
          <img src={icon} alt="" style={{ width: iconSize.w, height: iconSize.h }} />
        </div>
      </div>
      <div className="flex w-full flex-col gap-1 pt-4">{children}</div>
    </div>
  );
}

export default function ServidoresPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [busca, setBusca] = useState("");
  const [perfil, setPerfil] = useState("todos");
  const [status, setStatus] = useState("todos");
  const [pagina, setPagina] = useState(1);
  const [cadastroOpen, setCadastroOpen] = useState(false);

  const loadEmployees = async () => {
    setIsLoading(true);
    try {
      const response = await api.get<{ items: Employee[] }>("/employees");
      setEmployees(response.items);
    } catch (error) {
      console.error("Erro ao carregar servidores:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const response = await api.get<{ items: Employee[] }>("/employees");
        if (alive) setEmployees(response.items);
      } catch (error) {
        console.error("Erro ao carregar servidores:", error);
      } finally {
        if (alive) setIsLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const filtered = useMemo(() => {
    return employees.filter((employee) => {
      const query = busca.trim().toLowerCase();
      if (query && !`${employee.name} ${employee.surname} ${employee.email}`.toLowerCase().includes(query)) return false;
      if (perfil !== "todos" && employee.role !== perfil) return false;
      if (status === "ativo" && !employee.is_active) return false;
      if (status === "revogado" && employee.is_active) return false;
      return true;
    });
  }, [employees, busca, perfil, status]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(pagina, totalPages);
  const rows = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const activeCount = employees.filter((employee) => employee.is_active).length;
  const adminCount = employees.filter((employee) => employee.role === "admin").length;

  async function handleRevoke(employee: Employee) {
    if (!confirm(`Revogar o acesso de ${employee.name} ${employee.surname}?`)) return;
    try {
      await api.delete(`/employees/${employee.id}`);
      await loadEmployees();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Erro ao revogar servidor.");
    }
  }

  async function handleEdit(employee: Employee) {
    const name = prompt("Nome:", employee.name);
    if (!name) return;
    const surname = prompt("Sobrenome:", employee.surname) || employee.surname;
    const email = prompt("E-mail:", employee.email) || employee.email;
    try {
      await api.patch(`/employees/${employee.id}`, { name, surname, email });
      await loadEmployees();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Erro ao editar servidor.");
    }
  }

  async function handleCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    try {
      await api.post("/employees", {
        name: formData.get("name"),
        surname: formData.get("surname"),
        email: formData.get("email"),
        password: formData.get("password"),
      });
      setCadastroOpen(false);
      await loadEmployees();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Erro ao cadastrar servidor.");
    }
  }

  const filtros = (
    onSelect: (value: string) => void,
    value: string,
    label: string,
    options: { value: string; label: string }[],
    width: number,
  ) => (
    <select
      value={value}
      onChange={(event) => onSelect(event.target.value)}
      aria-label={label}
      style={{ width }}
      className="h-10 appearance-none rounded-[4px] bg-white py-px pl-3 pr-6 text-[12px] font-semibold leading-[15px] tracking-[0.24px] text-[#131b2e] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] focus:outline-2 focus:outline-[#0d472b]"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );

  return (
    <RoleShell breadcrumb="Servidores & Acessos">
      <div className="flex w-full flex-col pb-8">
        {/* 1. Cabeçalho da página */}
        <header className="flex w-full items-center justify-between py-6">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1">
              <img src="/icons/serv-shield.svg" alt="" className="h-[12.5px] w-[10px]" />
              <p className="uppercase leading-[24px] tracking-[0.8px] text-[#396285]">
                Sistema &amp; Segurança
                <br />
                Institucional
              </p>
              <p className="px-2 uppercase leading-[24px] tracking-[0.8px] text-[#c0c9c0]">•</p>
              <p className="uppercase leading-[24px] tracking-[0.8px] text-[#396285]">
                Gestão de Recursos Humanos
                <br />e Acessos
              </p>
            </div>
            <h1 className="text-[32px] font-bold leading-[40px] tracking-[-0.8px] text-[#131b2e]">
              Servidores &amp; Controle de Acessos
            </h1>
            <p className="max-w-[768px] text-[14px] leading-5 text-[#414942]">
              Administração de operadores credenciados, fiscais de campo e
              atendentes dos Centros de Atendimento ao Turista (CATs) do
              Município de Manaus.
            </p>
          </div>
          <div className="flex flex-col items-start justify-center gap-2 pr-[123.83px]">
            <button
              type="button"
              className="flex items-center gap-1 rounded-[4px] bg-[#e2e7ff] px-4 py-2 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]"
            >
              <img src="/icons/serv-export.svg" alt="" className="size-3" />
              <span className="whitespace-nowrap text-[12px] font-semibold leading-4 tracking-[0.24px] text-[#131b2e]">
                Exportar Auditoria (PDF/CSV)
              </span>
            </button>
            <button
              type="button"
              onClick={() => setCadastroOpen(true)}
              className="flex items-center gap-1 rounded-[4px] bg-[#002f19] px-4 py-2 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]"
            >
              <img src="/icons/serv-users-plus.svg" alt="" className="h-3 w-[16.5px]" />
              <span className="whitespace-nowrap text-[12px] font-semibold leading-4 tracking-[0.24px] text-white">
                + Cadastrar Novo Servidor
              </span>
            </button>
          </div>
        </header>

        {/* 2. Painel de indicadores */}
        <section className="flex w-full items-start justify-center gap-4 pb-6">
          <MetricCard
            label="Total Servidores Ativos"
            icon="/icons/serv-card-badge.svg"
            iconSize={{ w: 16.667, h: 16.667 }}
            iconBg="#f2f3ff"
          >
            <p className="text-[32px] font-bold leading-8 tracking-[-0.64px] text-[#131b2e]">
              {isLoading ? "..." : activeCount}
            </p>
            <div className="flex items-center gap-1">
              <p className="text-[11px] font-semibold uppercase leading-[14px] tracking-[0.44px] text-[#0d472b]">
                {employees.length ? Math.round((activeCount / employees.length) * 100) : 100}%
                <br />
                Ativos
              </p>
              <p className="pl-[10px] text-[12px] leading-4 tracking-[0.12px] text-[#414942]">
                de {employees.length} credenciados
                <br />
                no sistema
              </p>
            </div>
          </MetricCard>
          <MetricCard
            label="Operadores Credenciados"
            icon="/icons/serv-card-atendente.svg"
            iconSize={{ w: 16.667, h: 15 }}
            iconBg="rgba(174,214,254,0.4)"
          >
            <p className="text-[32px] font-bold leading-8 tracking-[-0.64px] text-[#131b2e]">
              {isLoading ? "..." : employees.filter((employee) => employee.role === "employee").length}
            </p>
            <div className="flex items-center gap-1">
              <div className="rounded-[2px] bg-[#e2e7ff] px-[6px] py-[2px]">
                <p className="text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#396285]">
                  Perfil
                  <br />
                  Restrito
                </p>
              </div>
              <p className="pl-[10px] text-[12px] leading-4 tracking-[0.12px] text-[#414942]">
                Benefícios /
                <br />
                Validação
              </p>
            </div>
          </MetricCard>
          <MetricCard
            label="Administradores Gerais"
            icon="/icons/serv-card-admin.svg"
            iconSize={{ w: 15, h: 16.667 }}
            iconBg="rgba(154,211,173,0.3)"
          >
            <p className="text-[32px] font-bold leading-8 tracking-[-0.64px] text-[#131b2e]">
              {isLoading ? "..." : adminCount}
            </p>
            <div className="flex items-center gap-1">
              <p className="text-[11px] font-medium uppercase leading-[14px] tracking-[0.44px] text-[#131b2e]">
                Permissão
                <br />
                Master
              </p>
              <p className="pl-[10px] text-[12px] leading-4 tracking-[0.12px] text-[#414942]">
                CTI /
                <br />
                Manauscult
              </p>
            </div>
          </MetricCard>
          <MetricCard
            label="Sessões Conectadas Hoje"
            icon="/icons/serv-card-sessions.svg"
            iconSize={{ w: 15, h: 16.667 }}
            iconBg="#eaedff"
          >
            <div className="flex items-center gap-1">
              {/* TODO: sem endpoint de sessões por terminal no backend */}
              <p className="text-[32px] font-bold leading-8 tracking-[-0.64px] text-[#131b2e]">—</p>
              <span className="size-2 rounded-[12px] bg-[#0d472b]" />
              <span className="text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#0d472b]">
                Terminais ativos
              </span>
            </div>
            <p className="w-full text-[12px] leading-4 tracking-[0.12px] text-[#414942]">
              Via VPN GovManaus / Intranet
            </p>
          </MetricCard>
        </section>

        {/* 4. Tabela de listagem de servidores & acessos */}
        <section className="w-full overflow-clip rounded-[8px] bg-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
          {/* Barra de filtros e busca */}
          <div className="flex w-full items-center justify-between bg-[#f2f3ff] p-4">
            <div className="relative w-[360px]">
              <input
                type="text"
                value={busca}
                onChange={(event) => setBusca(event.target.value)}
                placeholder="Buscar por nome ou e-mail..."
                aria-label="Buscar servidor"
                className="h-10 w-full rounded-[4px] bg-white py-[11.5px] pl-9 pr-3 text-[14px] text-[#131b2e] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] placeholder:text-[rgba(65,73,66,0.7)] focus:outline-2 focus:outline-[#0d472b]"
              />
              <img
                src="/icons/serv-search.svg"
                alt=""
                className="absolute left-[14px] top-1/2 size-[13.5px] -translate-y-1/2"
              />
            </div>
            <div className="flex w-[568px] flex-col items-start gap-2">
              <div className="flex items-start gap-7">
                {filtros(
                  setPerfil,
                  perfil,
                  "Filtrar por perfil",
                  [
                    { value: "todos", label: "Perfil: Todos os Acessos" },
                    { value: "admin", label: "Perfil: Administrador Geral" },
                    { value: "employee", label: "Perfil: Operador" },
                  ],
                  208,
                )}
              </div>
              {filtros(
                setStatus,
                status,
                "Filtrar por status",
                [
                  { value: "todos", label: "Status: Todos" },
                  { value: "ativo", label: "Status: Ativo" },
                  { value: "revogado", label: "Status: Acesso Revogado" },
                ],
                130,
              )}
            </div>
          </div>

          {/* Tabela responsiva */}
          <div className="w-full">
            {/* Header */}
            <div className={`${GRID_COLS} w-full items-start bg-[rgba(226,231,255,0.6)]`}>
              <div className="px-4 py-3">
                <p className="text-[11px] font-bold uppercase leading-[14px] tracking-[0.55px] text-[#414942]">
                  Servidor &amp;
                  <br />
                  Identificação
                </p>
              </div>
              <div className="px-4 py-3">
                <p className="text-[11px] font-bold uppercase leading-[14px] tracking-[0.55px] text-[#414942]">
                  E-mail
                  <br />
                  Institucional
                </p>
              </div>
              <div className="px-4 py-[19px]">
                <p className="text-[11px] font-bold uppercase leading-[14px] tracking-[0.55px] text-[#414942]">
                  Perfil de Privilégio
                </p>
              </div>
              <div className="px-4 py-[19px]">
                <p className="text-[11px] font-bold uppercase leading-[14px] tracking-[0.55px] text-[#414942]">
                  Status
                </p>
              </div>
              <div className="px-4 py-3">
                <p className="text-[11px] font-bold uppercase leading-[14px] tracking-[0.55px] text-[#414942]">
                  Último Acesso /
                  <br />
                  Terminal
                </p>
              </div>
              <div className="flex flex-col items-end px-4 py-3">
                <p className="text-right text-[11px] font-bold uppercase leading-[14px] tracking-[0.55px] text-[#414942]">
                  Ações de
                  <br />
                  Gestão
                </p>
              </div>
            </div>

            {/* Body */}
            <div className="flex w-full flex-col">
              {isLoading ? (
                <div className="py-10 text-center text-[14px] text-[#414942]">Carregando servidores...</div>
              ) : rows.length === 0 ? (
                <div className="py-10 text-center text-[14px] text-[#414942]">
                  Nenhum servidor encontrado.
                </div>
              ) : (
                rows.map((employee, index) => {
                  const avatar = AVATAR_STYLES[index % AVATAR_STYLES.length];
                  const fullName = `${employee.name} ${employee.surname}`;
                  return (
                    <div
                      key={employee.id}
                      className={`${GRID_COLS} w-full items-center border-[#e2e7ff] pt-px ${
                        index > 0 ? "border-t" : ""
                      } ${employee.is_active ? "" : "opacity-75"}`}
                    >
                      {/* Servidor & identificação */}
                      <div className="flex items-center gap-2 px-4 py-[10px]">
                        <div
                          className="flex h-9 shrink-0 items-center justify-center rounded-[12px]"
                          style={{ backgroundColor: avatar.bg, width: 30.67 }}
                        >
                          <span
                            className="text-[12px] font-bold leading-4 tracking-[0.24px]"
                            style={{ color: avatar.text }}
                          >
                            {initialsOf(fullName)}
                          </span>
                        </div>
                        <div className="flex min-w-0 flex-col">
                          <div className="flex items-center gap-1">
                            <p
                              className={`text-[12px] font-semibold leading-4 tracking-[0.24px] text-[#131b2e] ${
                                employee.is_active ? "" : "line-through"
                              }`}
                            >
                              {fullName}
                            </p>
                          </div>
                          <p className="truncate whitespace-nowrap text-[13px] font-medium leading-[18px] tracking-[0.26px] text-[#414942]">
                            Matrícula: {employee.id.slice(0, 8).toUpperCase()}
                          </p>
                        </div>
                      </div>

                      {/* E-mail institucional */}
                      <div className="flex flex-col gap-[5.5px] py-[10px] pl-8 pr-4">
                        <div className="flex items-center gap-[6px]">
                          <img src="/icons/serv-building.svg" alt="" style={{ width: 13.333, height: 13.333 }} />
                          <p className="min-w-max truncate text-[14px] leading-5 text-[#131b2e]">{employee.email}</p>
                        </div>
                      </div>

                      {/* Perfil de privilégio */}
                      <div className="flex flex-col items-start px-4 py-[10px]">
                        <PerfilBadge role={employee.role} />
                      </div>

                      {/* Status */}
                      <div className="flex flex-col items-start px-4 py-[10px]">
                        <StatusBadge isActive={employee.is_active} />
                      </div>

                      {/* Último acesso / terminal */}
                      <div className="flex flex-col px-4 py-[10px]">
                        {/* TODO: sem rastreio de último acesso por servidor no backend */}
                        <p className="text-[12px] leading-4 tracking-[0.12px] text-[#131b2e]">—</p>
                        <p className="min-w-max text-[13px] font-medium leading-[18px] tracking-[0.26px] text-[#414942]">
                          Sem registro
                        </p>
                      </div>

                      {/* Ações de gestão */}
                      <div className="flex items-center justify-end gap-1 py-[10px] pl-4 pr-4">
                        <button
                          type="button"
                          aria-label={`Editar ${fullName}`}
                          onClick={() => handleEdit(employee)}
                          className="flex items-center justify-center rounded-[2px] px-[6px] py-[6px] hover:bg-[rgba(0,0,0,0.05)]"
                        >
                          <img src="/icons/serv-act-edit.svg" alt="" style={{ width: 13.5, height: 13.5 }} />
                        </button>
                        {employee.is_active && (
                          <button
                            type="button"
                            aria-label={`Revogar ${fullName}`}
                            onClick={() => handleRevoke(employee)}
                            className="flex items-center justify-center rounded-[2px] px-[6px] py-[6px] hover:bg-[rgba(0,0,0,0.05)]"
                          >
                            <img src="/icons/serv-act-ban.svg" alt="" style={{ width: 15, height: 15 }} />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Paginação & rodapé de controle */}
          <div className="flex w-full items-center justify-between bg-[#f2f3ff] px-4 py-4">
            <p className="text-[12px] leading-4 tracking-[0.12px] text-[#414942]">
              Mostrando <span className="text-[#131b2e]">{rows.length}</span> de{" "}
              <span className="text-[#131b2e]">{filtered.length}</span> servidores credenciados
            </p>
            <div className="flex items-center gap-1">
              <button
                type="button"
                aria-label="Página anterior"
                disabled={currentPage === 1}
                onClick={() => setPagina((value) => Math.max(1, value - 1))}
                className={`flex items-center justify-center rounded-[2px] bg-white px-[6px] py-[6px] ${
                  currentPage === 1 ? "opacity-40" : ""
                }`}
              >
                <img src="/icons/serv-chev-left.svg" alt="" className="h-[9px] w-[5.55px]" />
              </button>
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((numero) => (
                <button
                  key={numero}
                  type="button"
                  onClick={() => setPagina(numero)}
                  className={`rounded-[2px] px-3 py-1 text-[11px] font-semibold leading-[14px] tracking-[0.44px] ${
                    numero === currentPage ? "bg-[#002f19] text-white" : "bg-white text-[#131b2e]"
                  }`}
                >
                  {numero}
                </button>
              ))}
              <button
                type="button"
                aria-label="Próxima página"
                disabled={currentPage === totalPages}
                onClick={() => setPagina((value) => Math.min(totalPages, value + 1))}
                className={`flex items-center justify-center rounded-[2px] bg-white px-[6px] py-[6px] ${
                  currentPage === totalPages ? "opacity-40" : ""
                }`}
              >
                <img src="/icons/serv-chev-right.svg" alt="" className="h-[9px] w-[5.55px]" />
              </button>
            </div>
          </div>
        </section>

        {/* Cadastro de servidor */}
        {cadastroOpen && (
          <div className="fixed inset-0 z-20 flex items-center justify-center bg-[rgba(19,27,46,0.4)] px-4">
            <form
              onSubmit={handleCreate}
              className="flex w-full max-w-[480px] flex-col gap-4 rounded-[8px] bg-white p-6 shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1)]"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-[16px] font-semibold leading-6 text-[#131b2e]">Cadastrar Servidor</h2>
                <button type="button" onClick={() => setCadastroOpen(false)} className="text-[12px] font-semibold text-[#396285]">
                  Fechar ✕
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input name="name" required placeholder="Nome" className="rounded-[4px] bg-[#f2f3ff] px-3 py-2 text-[14px] text-[#131b2e] focus:outline-2 focus:outline-[#0d472b]" />
                <input name="surname" required placeholder="Sobrenome" className="rounded-[4px] bg-[#f2f3ff] px-3 py-2 text-[14px] text-[#131b2e] focus:outline-2 focus:outline-[#0d472b]" />
              </div>
              <input name="email" type="email" required placeholder="E-mail institucional" className="rounded-[4px] bg-[#f2f3ff] px-3 py-2 text-[14px] text-[#131b2e] focus:outline-2 focus:outline-[#0d472b]" />
              <input name="password" type="password" required minLength={8} placeholder="Senha inicial (mín. 8 caracteres)" className="rounded-[4px] bg-[#f2f3ff] px-3 py-2 text-[14px] text-[#131b2e] focus:outline-2 focus:outline-[#0d472b]" />
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setCadastroOpen(false)} className="rounded-[4px] bg-[#eaedff] px-4 py-2 text-[12px] font-semibold text-[#131b2e]">
                  Cancelar
                </button>
                <button type="submit" className="rounded-[4px] bg-[#002f19] px-4 py-2 text-[12px] font-semibold text-white">
                  Cadastrar
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </RoleShell>
  );
}