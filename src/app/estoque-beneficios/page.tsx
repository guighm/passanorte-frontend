"use client";

import { useMemo, useState, type FormEvent } from "react";
import { AppShell } from "@/components/layout/AppShell";

type StatusKind = "seguro" | "baixo" | "transito";

type InventoryItem = {
  name: string[];
  sku: string[];
  image: string;
  rota: string[];
  almox: string;
  postos: string;
  postosNote: string[];
  saldo: string;
  saldoColor: string;
  barColor: string;
  barFill: string;
  status: StatusKind;
  statusLabel: string[];
};

type AuditKind = "resgate" | "transferencia" | "licitacao";

type AuditEntry = {
  date: string;
  time: string;
  kind: AuditKind;
  item: string;
  qty: string;
  qtyColor: string;
  route: string;
  server: string;
  serverNote: string;
};

const INVENTORY: InventoryItem[] = [
  {
    name: ["Kit", "Souvenir", "Amazônia", "Viva"],
    sku: ["SKU-AMZ-", "2024-001"],
    image: "/icons/estoque-kit.png",
    rota: ["Rota", "Histórica &", "Cultural"],
    almox: "1.840",
    postos: "960",
    postosNote: ["8 CATs", "atendidos"],
    saldo: "2.800",
    saldoColor: "#002f19",
    barColor: "#0d472b",
    barFill: "22.01%",
    status: "seguro",
    statusLabel: ["Nível", "Seguro"],
  },
  {
    name: ["Pin", "Esmaltado", "Cúpula", "Teatro"],
    sku: ["SKU-COL-", "2024-042"],
    image: "/icons/estoque-pin.png",
    rota: ["Belle Époque", "Manaus"],
    almox: "95",
    postos: "135",
    postosNote: ["Concentrado", "CAT 01"],
    saldo: "230",
    saldoColor: "#603100",
    barColor: "#603100",
    barFill: "85%",
    status: "baixo",
    statusLabel: ["Estoque", "Baixo"],
  },
  {
    name: ["Garrafa", "Térmica", "Sustentável", "500ml"],
    sku: ["SKU-ECO-", "2024-108"],
    image: "/icons/estoque-garrafa.png",
    rota: ["Trilhas do", "Encontro das", "Águas"],
    almox: "1.450",
    postos: "780",
    postosNote: ["Distribuído 6", "CATs"],
    saldo: "2.230",
    saldoColor: "#002f19",
    barColor: "#0d472b",
    barFill: "35%",
    status: "seguro",
    statusLabel: ["Nível", "Seguro"],
  },
  {
    name: ["Voucher", "Degustação", "Floresta"],
    sku: ["SKU-GAS-", "2024-009"],
    image: "/icons/estoque-voucher.png",
    rota: ["Circuito", "Manaus", "Raízes"],
    almox: "80",
    postos: "110",
    postosNote: ["Mercado", "Adolpho", "Lisboa"],
    saldo: "190",
    saldoColor: "#603100",
    barColor: "#603100",
    barFill: "88%",
    status: "baixo",
    statusLabel: ["Estoque", "Baixo"],
  },
  {
    name: ["Medalha", "Oficial", "PassaNorte"],
    sku: ["SKU-MED-", "2024-990"],
    image: "/icons/estoque-medalha.png",
    rota: ["Grande", "Conquistador", "Manaós"],
    almox: "2.100",
    postos: "900",
    postosNote: ["Lote em", "Trânsito", "(+500)"],
    saldo: "3.000",
    saldoColor: "#002f19",
    barColor: "#aed6fe",
    barFill: "10%",
    status: "transito",
    statusLabel: ["Em", "Trânsito"],
  },
];

const STATUS_BADGES: Record<StatusKind, { bg: string; dot: string; text: string }> = {
  seguro: { bg: "rgba(182,240,200,0.4)", dot: "#0d472b", text: "#195033" },
  baixo: { bg: "#ffdcc3", dot: "#603100", text: "#6e3900" },
  transito: { bg: "#cee5ff", dot: "#396285", text: "#1f4a6c" },
};

const AUDIT_BADGES: Record<AuditKind, { bg: string; text: string; icon: string; iconW: number; iconH: number; label: string[] }> = {
  resgate: { bg: "rgba(182,240,200,0.4)", text: "#195033", icon: "/icons/estoque-badge-resgate.svg", iconW: 11.083, iconH: 10.5, label: ["Baixa por Resgate"] },
  transferencia: { bg: "#cee5ff", text: "#1f4a6c", icon: "/icons/estoque-badge-transfer.svg", iconW: 11.667, iconH: 10.5, label: ["Transferência", "Interna"] },
  licitacao: { bg: "#b6f0c8", text: "#002110", icon: "/icons/estoque-badge-licitacao.svg", iconW: 10.5, iconH: 10.5, label: ["Entrada por", "Licitação"] },
};

const CAT_DISTRIBUTION = [
  { label: "CAT 01 - Centro Histórico", value: "1.420 unid. (45%)", fill: "45%" },
  { label: "CAT 02 - Aeroporto Intl.", value: "850 unid. (27%)", fill: "73%" },
  { label: "CAT 03 - Ponta Negra", value: "510 unid. (16%)", fill: "84%" },
];

const INITIAL_AUDIT: AuditEntry[] = [
  {
    date: "12/03/2025",
    time: "15:42",
    kind: "resgate",
    item: "Kit Souvenir Amazônia Viva",
    qty: "-1 unid.",
    qtyColor: "#ba1a1a",
    route: "CAT 01 → Turista (Passaporte #PN-94182)",
    server: "Mariana S. Albuquerque",
    serverNote: "Matrícula 219.401-2",
  },
  {
    date: "12/03/2025",
    time: "14:15",
    kind: "transferencia",
    item: "Garrafa Térmica Sustentável 500ml",
    qty: "200 unid.",
    qtyColor: "#396285",
    route: "Almoxarifado Central → CAT 02 Aeroporto",
    server: "Carlos Eduardo Ramos",
    serverNote: "Coordenador Manauscult",
  },
  {
    date: "11/03/2025",
    time: "11:30",
    kind: "licitacao",
    item: "Medalha Oficial PassaNorte",
    qty: "+1.200 unid.",
    qtyColor: "#002f19",
    route: "Metalúrgica Rio Negro Ltda → Almoxarifado",
    server: "João Victor Fontes",
    serverNote: "Inspetor de Patrimônio",
  },
  {
    date: "11/03/2025",
    time: "09:12",
    kind: "resgate",
    item: "Pin Esmaltado Cúpula Teatro",
    qty: "-1 unid.",
    qtyColor: "#ba1a1a",
    route: "CAT 01 → Turista (Passaporte #PN-94101)",
    server: "Mariana S. Albuquerque",
    serverNote: "Matrícula 219.401-2",
  },
];

function MultiLine({
  lines,
  className,
  style,
}: {
  lines: string[];
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className={className} style={style}>
      {lines.map((line, index) => (
        <p key={index} className={index < lines.length - 1 ? "mb-0" : undefined}>
          {line}
        </p>
      ))}
    </div>
  );
}

export default function EstoqueBeneficiosPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("todas");
  const [status, setStatus] = useState("todos");
  const [operation, setOperation] = useState<"entrada" | "transferencia">("entrada");
  const [brinde, setBrinde] = useState("");
  const [destino, setDestino] = useState("Almoxarifado Geral (Sede Manauscult)");
  const [quantidade, setQuantidade] = useState("");
  const [nota, setNota] = useState("");
  const [justificativa, setJustificativa] = useState("");
  const [audit, setAudit] = useState<AuditEntry[]>(INITIAL_AUDIT);

  const filtered = useMemo(() => {
    return INVENTORY.filter((item) => {
      const query = search.trim().toLowerCase();
      const matchesSearch =
        !query ||
        item.name.join(" ").toLowerCase().includes(query) ||
        item.sku.join("").toLowerCase().includes(query);
      const matchesCategory =
        category === "todas" || item.rota.join(" ").toLowerCase().includes(category);
      const matchesStatus = status === "todos" || item.status === status;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [search, category, status]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const now = new Date();
    const date = now.toLocaleDateString("pt-BR");
    const time = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    const qty = Number(quantidade.replace(/\./g, "").replace(",", ".")) || 0;
    setAudit((entries) => [
      {
        date,
        time,
        kind: operation === "entrada" ? "licitacao" : "transferencia",
        item: brinde || "Item do inventário",
        qty: `${qty >= 0 ? "+" : ""}${qty.toLocaleString("pt-BR")} unid.`,
        qtyColor: operation === "entrada" ? "#002f19" : "#396285",
        route:
          operation === "entrada"
            ? `Fornecedor → ${destino}`
            : `${destino} → ${destino}`,
        server: "Carlos Eduardo Ramos",
        serverNote: "Coordenador Manauscult",
      },
      ...entries,
    ]);
    setQuantidade("");
    setNota("");
    setJustificativa("");
  }

  return (
    <AppShell>
      <div className="flex w-full flex-col items-start pb-8">
        {/* Top Navigation Context & Action Bar */}
        <div className="flex w-full shrink-0 flex-col items-start pb-6">
          <div className="flex w-full shrink-0 items-end justify-between py-4">
            <div className="flex shrink-0 flex-col items-start gap-1">
              <div className="flex w-full shrink-0 items-center gap-1">
                <span className="whitespace-nowrap text-[16px] uppercase leading-6 tracking-[0.8px] text-[#396285]">
                  MÓDULO DE GAMIFICAÇÃO &amp; LOGÍSTICA
                </span>
                <span className="text-[16px] uppercase leading-6 tracking-[0.8px] text-[#396285]">
                  •
                </span>
                <span className="whitespace-nowrap text-[16px] uppercase leading-6 tracking-[0.8px] text-[#396285]">
                  MANAUSCULT • PREFEITURA DE MANAUS
                </span>
              </div>
              <h1 className="whitespace-nowrap text-[32px] font-bold leading-10 tracking-[-0.8px] text-[#131b2e]">
                Estoque &amp; Distribuição de Benefícios
              </h1>
              <p className="max-w-[505px] text-[14px] leading-5 text-[#414942]">
                Gestão do inventário de brindes municipais, controle de lotes licitatórios, remessas
                aos Centros de Atendimento ao Turista (CATs) e monitoramento de resgates do
                passaporte cultural.
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                className="flex h-9 shrink-0 items-center gap-1.5 rounded-[4px] bg-[#eaedff] px-4 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)]"
              >
                <img src="/icons/estoque-export.svg" alt="" className="size-3" />
                <span className="text-[12px] font-semibold leading-4 tracking-[0.24px] text-[#131b2e]">
                  Exportar Inventário
                </span>
              </button>
              <button
                type="button"
                className="flex h-9 shrink-0 items-center gap-1.5 rounded-[4px] bg-[#0d472b] px-4 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)]"
              >
                <img src="/icons/estoque-box.svg" alt="" className="size-[13.5px]" />
                <span className="text-[12px] font-semibold leading-4 tracking-[0.24px] text-white">
                  Entrada / Reposição de Lote
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* KPI Metricas Dashboard */}
        <div className="flex w-full shrink-0 flex-col items-start pb-8">
          <div className="flex w-full shrink-0 items-start justify-center gap-4">
            {/* Card 1 */}
            <div className="flex min-w-0 flex-1 flex-col items-start justify-between rounded-[8px] bg-white p-4 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
              <div className="flex w-full shrink-0 items-start justify-between">
                <span className="text-[12px] font-semibold leading-4 tracking-[0.24px] text-[#414942]">
                  Total de Itens em Estoque
                </span>
                <div className="flex size-9 shrink-0 items-center justify-center rounded-[4px] bg-[#eaedff]">
                  <img src="/icons/estoque-inventory.svg" alt="" className="size-[16.667px]" />
                </div>
              </div>
              <div className="flex w-full shrink-0 flex-col items-start pt-4">
                <div className="flex w-full shrink-0 flex-col items-start gap-1.5">
                  <div className="flex items-baseline gap-1">
                    <span className="text-[32px] font-bold leading-10 tracking-[-0.8px] text-[#131b2e]">
                      8.450
                    </span>
                    <span className="text-[12px] leading-4 tracking-[0.12px] text-[#414942]">
                      unid.
                    </span>
                  </div>
                  <div className="flex w-full shrink-0 items-center gap-1.5">
                    <img
                      src="/icons/estoque-trend-up.svg"
                      alt=""
                      className="h-2 w-[13.333px]"
                    />
                    <span className="text-[11px] font-semibold leading-3.5 tracking-[0.44px] text-[#0d472b]">
                      +1.200 recebidos esta semana
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex w-full shrink-0 flex-col items-start pt-2">
                <div className="flex w-full shrink-0 flex-col items-start pt-1">
                  <p className="w-full text-[12px] leading-4 tracking-[0.12px] text-[#414942]">
                    Consolidado: Sede Central e 8 CATs
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="flex min-w-0 flex-1 flex-col items-start justify-between rounded-[8px] bg-white p-4 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
              <div className="flex w-full shrink-0 items-start justify-between">
                <span className="text-[12px] font-semibold leading-4 tracking-[0.24px] text-[#414942]">
                  Itens Concedidos no Mês
                </span>
                <div className="flex size-9 shrink-0 items-center justify-center rounded-[4px] bg-[#eaedff]">
                  <img
                    src="/icons/estoque-bar.svg"
                    alt=""
                    className="h-[16.667px] w-[8.333px]"
                  />
                </div>
              </div>
              <div className="flex w-full shrink-0 flex-col items-start pt-4">
                <div className="flex w-full shrink-0 flex-col items-start gap-1.5">
                  <div className="flex items-baseline gap-1">
                    <span className="text-[32px] font-bold leading-10 tracking-[-0.8px] text-[#131b2e]">
                      3.812
                    </span>
                    <span className="text-[12px] leading-4 tracking-[0.12px] text-[#414942]">
                      resgates
                    </span>
                  </div>
                  <div className="flex w-full shrink-0 items-center gap-1.5">
                    <img src="/icons/estoque-growth.svg" alt="" className="size-[10.667px]" />
                    <span className="text-[11px] font-semibold leading-3.5 tracking-[0.44px] text-[#0d472b]">
                      +18.4% vs mês anterior
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex w-full shrink-0 flex-col items-start pt-2">
                <div className="flex w-full shrink-0 flex-col items-start pt-1">
                  <p className="w-full text-[12px] leading-4 tracking-[0.12px] text-[#414942]">
                    Brindes entregues pós-validação de rota
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3: Alert */}
            <div className="flex min-w-0 flex-1 flex-col items-start justify-between rounded-[8px] bg-white p-4 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
              <div className="flex w-full shrink-0 items-start justify-between">
                <span className="text-[12px] font-semibold leading-4 tracking-[0.24px] text-[#414942]">
                  Alerta de Estoque Crítico
                </span>
                <div className="flex size-9 shrink-0 items-center justify-center rounded-[4px] bg-[rgba(96,49,0,0.15)]">
                  <img
                    src="/icons/estoque-alert.svg"
                    alt=""
                    className="h-[16.667px] w-[13.333px]"
                  />
                </div>
              </div>
              <div className="flex w-full shrink-0 flex-col items-start pt-4">
                <div className="flex w-full shrink-0 flex-col items-start gap-1.5">
                  <div className="flex items-baseline gap-1">
                    <span className="text-[32px] font-bold leading-10 tracking-[-0.8px] text-[#603100]">
                      2
                    </span>
                    <span className="text-[12px] leading-4 tracking-[0.12px] text-[#603100]">
                      itens em alerta
                    </span>
                  </div>
                  <div className="flex w-full shrink-0 items-center gap-1.5">
                    <img
                      src="/icons/estoque-alert-small.svg"
                      alt=""
                      className="h-[12.667px] w-[14.667px]"
                    />
                    <span className="text-[11px] font-semibold leading-3.5 tracking-[0.44px] text-[#603100]">
                      Abaixo do ponto de reabastecimento
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex w-full shrink-0 flex-col items-start pt-2">
                <div className="flex w-full shrink-0 flex-col items-start pt-1">
                  <p className="w-full text-[12px] leading-4 tracking-[0.12px] text-[#414942]">
                    Pins Esmaltados &amp; Vouchers Gastronômicos
                  </p>
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div className="flex min-w-0 flex-1 flex-col items-start justify-between rounded-[8px] bg-white p-4 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
              <div className="flex w-full shrink-0 items-start justify-between">
                <span className="text-[12px] font-semibold leading-4 tracking-[0.24px] text-[#414942]">
                  Posto com Maior Demanda
                </span>
                <div className="flex size-9 shrink-0 items-center justify-center rounded-[4px] bg-[#eaedff]">
                  <img
                    src="/icons/estoque-pin-map.svg"
                    alt=""
                    className="h-[13.333px] w-[15px]"
                  />
                </div>
              </div>
              <div className="flex w-full shrink-0 flex-col items-start pt-[15.25px]">
                <div className="flex w-full shrink-0 flex-col items-start gap-1.5">
                  <div className="flex w-full shrink-0 flex-col items-start pb-[0.75px]">
                    <p className="w-full text-[20px] font-bold leading-[27.5px] tracking-[-0.5px] text-[#131b2e]">
                      CAT 01 - Centro Histórico
                    </p>
                  </div>
                  <div className="flex w-full shrink-0 items-center gap-1.5">
                    <img
                      src="/icons/estoque-trend.svg"
                      alt=""
                      className="h-[14px] w-[14.667px]"
                    />
                    <span className="text-[11px] font-semibold leading-3.5 tracking-[0.44px] text-[#396285]">
                      1.420 resgates (45% do fluxo total)
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex w-full shrink-0 flex-col items-start overflow-clip pt-2">
                <div className="flex w-full shrink-0 flex-col items-start overflow-hidden pt-1">
                  <p className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-[12px] leading-4 tracking-[0.12px] text-[#414942]">
                    Largo de São Sebastião, Teatro Amazonas
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid: Tabela Principal + Painel Lateral */}
        <div className="flex w-full shrink-0 flex-col items-start pb-8">
          <div className="grid w-full shrink-0 grid-cols-12 gap-6">
            {/* Coluna Esquerda: Listagem e Gestão */}
            <div className="col-span-8 flex flex-col items-start overflow-clip self-start rounded-[8px] bg-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
              {/* Header da Tabela com Filtros */}
              <div className="flex w-full shrink-0 flex-col items-start gap-2 bg-white p-4">
                <div className="flex w-full shrink-0 items-center justify-between">
                  <div className="flex shrink-0 flex-col items-start">
                    <h2 className="whitespace-nowrap text-[16px] font-semibold leading-6 text-[#131b2e]">
                      Inventário Ativo de Brindes
                    </h2>
                    <p className="text-[12px] leading-4 tracking-[0.12px] text-[#414942]">
                      Catalogo de itens de incentivo turísticos autorizados pela Portaria
                      Manauscult 08/2024
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-col items-start rounded-[2px] bg-[#eaedff] py-1 pl-2 pr-[43.41px]">
                    <span className="text-[11px] font-semibold leading-3.5 tracking-[0.44px] text-[#414942]">
                      {filtered.length} Itens
                    </span>
                    <span className="text-[11px] font-semibold leading-3.5 tracking-[0.44px] text-[#414942]">
                      Cadastrados
                    </span>
                  </div>
                </div>
                <div className="grid w-full shrink-0 grid-cols-12 gap-2 pt-1">
                  <div className="col-span-6 flex flex-col items-start self-start">
                    <div className="relative flex h-9 w-full items-center overflow-clip rounded-[4px] bg-[#f2f3ff]">
                      <input
                        type="text"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Buscar por brinde ou código SKU..."
                        className="w-full bg-transparent pb-[10.5px] pl-9 pr-3 pt-[10.5px] text-[12px] tracking-[0.12px] text-[#131b2e] placeholder:text-[#9ca3af] focus:outline-none"
                      />
                      <img
                        src="/icons/estoque-search.svg"
                        alt=""
                        className="absolute left-[12.25px] top-[10.25px] size-[13.5px]"
                      />
                    </div>
                  </div>
                  <div className="col-span-3">
                    <select
                      value={category}
                      onChange={(event) => setCategory(event.target.value)}
                      className="h-9 w-full appearance-none rounded-[4px] bg-[#f2f3ff] px-3 text-[12px] leading-[15px] tracking-[0.12px] text-[#131b2e] focus:outline-none"
                    >
                      <option value="todas">Todas Categorias</option>
                      <option value="rota histórica">Rota Histórica</option>
                      <option value="belle époque">Belle Époque</option>
                      <option value="trilhas">Trilhas</option>
                      <option value="circuito">Circuito</option>
                      <option value="conquistador">Conquistador</option>
                    </select>
                  </div>
                  <div className="col-span-3">
                    <select
                      value={status}
                      onChange={(event) => setStatus(event.target.value)}
                      className="h-9 w-full appearance-none rounded-[4px] bg-[#f2f3ff] px-3 text-[12px] leading-[15px] tracking-[0.12px] text-[#131b2e] focus:outline-none"
                    >
                      <option value="todos">Status do Saldo</option>
                      <option value="seguro">Nível Seguro</option>
                      <option value="baixo">Estoque Baixo</option>
                      <option value="transito">Em Trânsito</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Tabela Responsiva de Inventário */}
              <div className="w-full shrink-0 overflow-auto">
                <div className="flex w-[697.44px] shrink-0 flex-col items-start">
                  {/* Header Row */}
                  <div className="flex w-full shrink-0 items-start justify-center bg-[#f2f3ff]">
                    <div className="flex w-[155.5px] shrink-0 flex-col items-start px-4 py-[17px]">
                      <span className="whitespace-nowrap text-[11px] font-bold uppercase leading-3.5 tracking-[0.55px] text-[#414942]">
                        ITEM &amp; CÓDIGO SKU
                      </span>
                    </div>
                    <div className="flex w-[127.53px] shrink-0 flex-col items-start px-2 py-[17px]">
                      <span className="whitespace-nowrap text-[11px] font-bold uppercase leading-3.5 tracking-[0.55px] text-[#414942]">
                        ROTA VINCULADA
                      </span>
                    </div>
                    <div className="flex w-[63.34px] shrink-0 flex-col items-end px-2 py-[10px] text-right">
                      <span className="text-[11px] font-bold uppercase leading-3.5 tracking-[0.55px] text-[#414942]">
                        ALMOX.
                      </span>
                      <span className="text-[11px] font-bold uppercase leading-3.5 tracking-[0.55px] text-[#414942]">
                        SEDE
                      </span>
                    </div>
                    <div className="flex w-[78.19px] shrink-0 flex-col items-end px-2 py-[10px] text-right">
                      <span className="text-[11px] font-bold uppercase leading-3.5 tracking-[0.55px] text-[#414942]">
                        POSTOS
                      </span>
                      <span className="text-[11px] font-bold uppercase leading-3.5 tracking-[0.55px] text-[#414942]">
                        CAT
                      </span>
                    </div>
                    <div className="flex w-[112px] shrink-0 flex-col items-end px-4 py-[10px] text-right">
                      <span className="text-[11px] font-bold uppercase leading-3.5 tracking-[0.55px] text-[#414942]">
                        SALDO
                      </span>
                      <span className="text-[11px] font-bold uppercase leading-3.5 tracking-[0.55px] text-[#414942]">
                        TOTAL
                      </span>
                    </div>
                    <div className="flex w-[88.88px] shrink-0 flex-col items-start px-2 py-[17px]">
                      <span className="whitespace-nowrap text-[11px] font-bold uppercase leading-3.5 tracking-[0.55px] text-[#414942]">
                        STATUS
                      </span>
                    </div>
                    <div className="flex w-[72px] shrink-0 flex-col items-center px-2 py-[17px]">
                      <span className="whitespace-nowrap text-center text-[11px] font-bold uppercase leading-3.5 tracking-[0.55px] text-[#414942]">
                        AÇÕES
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="flex w-full shrink-0 flex-col items-start">
                    {filtered.map((item) => {
                      const badge = STATUS_BADGES[item.status];
                      return (
                        <div
                          key={item.sku.join("")}
                          className="flex w-full shrink-0 items-center justify-center py-3 pl-4 pr-2"
                        >
                          {/* Item & SKU */}
                          <div className="flex w-[123.5px] shrink-0 items-center gap-2">
                            <div className="relative size-10 shrink-0 overflow-hidden rounded-[4px] bg-[#eaedff]">
                              <img
                                src={item.image}
                                alt=""
                                className="absolute inset-0 size-full object-cover"
                              />
                            </div>
                            <div className="flex shrink-0 flex-col items-start">
                              <MultiLine
                                lines={item.name}
                                className="whitespace-nowrap text-[13px] font-semibold leading-[16.25px] text-[#131b2e]"
                              />
                              <MultiLine
                                lines={item.sku}
                                className="whitespace-nowrap text-[11px] font-semibold leading-3.5 tracking-[0.44px] text-[#414942]"
                              />
                            </div>
                          </div>
                          {/* Rota vinculada */}
                          <div className="flex w-[127.53px] shrink-0 flex-col items-start px-2 pl-6">
                            <div className="flex shrink-0 items-center gap-1 rounded-[2px] bg-[#eaedff] py-0.5 pl-2 pr-2">
                              <img
                                src="/icons/estoque-route.svg"
                                alt=""
                                className="size-[10.5px] shrink-0"
                              />
                              <MultiLine
                                lines={item.rota}
                                className="whitespace-nowrap text-[11px] font-semibold leading-3.5 tracking-[0.44px] text-[#414942]"
                              />
                            </div>
                          </div>
                          {/* Almox Sede */}
                          <div className="flex w-[63.34px] shrink-0 flex-col items-end px-2">
                            <span className="whitespace-nowrap text-right text-[12px] font-medium leading-4 tracking-[0.12px] text-[#131b2e]">
                              {item.almox}
                            </span>
                          </div>
                          {/* Postos CAT */}
                          <div className="flex w-[78.19px] shrink-0 flex-col items-end px-2">
                            <span className="whitespace-nowrap text-right text-[12px] font-medium leading-4 tracking-[0.12px] text-[#131b2e]">
                              {item.postos}
                            </span>
                            <MultiLine
                              lines={item.postosNote}
                              className="whitespace-nowrap text-right text-[10px] font-medium leading-5 text-[#396285]"
                            />
                          </div>
                          {/* Saldo Total */}
                          <div className="flex w-[112px] shrink-0 flex-col items-start gap-1 px-4">
                            <span
                              className="whitespace-nowrap text-right text-[16px] font-bold leading-6"
                              style={{ color: item.saldoColor }}
                            >
                              {item.saldo}
                            </span>
                            <div className="h-1.5 w-20 overflow-clip rounded-[12px] bg-[#eaedff]">
                              <div
                                className="h-full rounded-[12px]"
                                style={{
                                  backgroundColor: item.barColor,
                                  width: `calc(100% - ${item.barFill})`,
                                }}
                              />
                            </div>
                          </div>
                          {/* Status */}
                          <div className="flex w-[88.88px] shrink-0 flex-col items-start px-2">
                            <div
                              className="flex shrink-0 items-center gap-1 rounded-[2px] py-0.5 pl-2 pr-2"
                              style={{ backgroundColor: badge.bg }}
                            >
                              <span
                                className="h-1.5 w-[4px] shrink-0 rounded-[12px]"
                                style={{ backgroundColor: badge.dot }}
                              />
                              <MultiLine
                                lines={item.statusLabel}
                                className="whitespace-nowrap text-[11px] font-semibold leading-3.5 tracking-[0.44px]"
                                style={{ color: badge.text }}
                              />
                            </div>
                          </div>
                          {/* Ações */}
                          <div className="flex w-[64px] shrink-0 items-center justify-center gap-1 pl-2">
                            <button
                              type="button"
                              aria-label="Editar item"
                              className="flex shrink-0 items-center justify-center rounded-[2px] px-1 pb-[9px] pt-1 hover:bg-[#f2f3ff]"
                            >
                              <img
                                src="/icons/estoque-edit.svg"
                                alt=""
                                className="h-[13.5px] w-[15px]"
                              />
                            </button>
                            <button
                              type="button"
                              aria-label="Mais opções"
                              className="flex shrink-0 items-center justify-center rounded-[2px] px-1 pb-[9px] pt-1 hover:bg-[#f2f3ff]"
                            >
                              <img
                                src="/icons/estoque-more.svg"
                                alt=""
                                className="size-[13.5px]"
                              />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Rodapé da Tabela com Paginação */}
              <div className="flex w-full shrink-0 items-center justify-between bg-[#f2f3ff] py-2 pl-4 pr-4">
                <span className="whitespace-nowrap text-[12px] leading-4 tracking-[0.12px] text-[#414942]">
                  Exibindo {filtered.length} de {INVENTORY.length} itens registrados no inventário
                </span>
                <div className="flex shrink-0 items-center gap-1">
                  <button
                    type="button"
                    aria-label="Página anterior"
                    className="flex shrink-0 flex-col items-center justify-center rounded-[2px] px-1 pb-[10px] pt-1 opacity-50"
                  >
                    <img
                      src="/icons/estoque-chev-left.svg"
                      alt=""
                      className="h-2.25 w-[5.55px]"
                    />
                  </button>
                  <span className="whitespace-nowrap px-2 text-[11px] font-semibold leading-3.5 tracking-[0.44px] text-[#131b2e]">
                    Página 1 de 1
                  </span>
                  <button
                    type="button"
                    aria-label="Próxima página"
                    className="flex shrink-0 flex-col items-center justify-center rounded-[2px] px-1 pb-[10px] pt-1 opacity-50"
                  >
                    <img
                      src="/icons/estoque-chev-right.svg"
                      alt=""
                      className="h-2.25 w-[5.55px]"
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Coluna Direita: Painel Integrado de Entrada e Transferência */}
            <div className="col-span-4 flex flex-col items-start gap-4 self-start pb-[47.5px]">
              {/* Reposição Rápida de Estoque */}
              <form
                onSubmit={handleSubmit}
                className="flex w-full shrink-0 flex-col items-start rounded-[8px] bg-white p-6 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)]"
              >
                <div className="flex w-full shrink-0 flex-col items-start pb-2">
                  <div className="flex w-full shrink-0 items-center gap-2">
                    <div className="flex h-8 w-[31.16px] shrink-0 items-center justify-center rounded-[4px] bg-[#0d472b]">
                      <img
                        src="/icons/estoque-sync.svg"
                        alt=""
                        className="size-[13.5px]"
                      />
                    </div>
                    <div className="flex shrink-0 flex-col items-start">
                      <h2 className="whitespace-nowrap text-[16px] font-semibold leading-6 text-[#131b2e]">
                        Reposição Rápida de Estoque
                      </h2>
                      <span className="whitespace-nowrap text-[11px] font-semibold leading-3.5 tracking-[0.44px] text-[#414942]">
                        Registro imediato no inventário público
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex w-full shrink-0 flex-col items-start pt-2">
                  <div className="flex w-full shrink-0 flex-col items-start gap-2">
                    {/* Tipo de Operação */}
                    <div className="flex w-full shrink-0 flex-col items-start gap-1">
                      <span className="uppercase text-[11px] font-semibold leading-3.5 tracking-[0.55px] text-[#414942]">
                        TIPO DE OPERAÇÃO
                      </span>
                      <div className="flex w-full shrink-0 items-start justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => setOperation("entrada")}
                          className={`flex w-[126.66px] shrink-0 items-center justify-center gap-1.5 rounded-[4px] p-2 ${
                            operation === "entrada"
                              ? "bg-[#0d472b] text-white"
                              : "bg-[#eaedff] text-[#131b2e]"
                          }`}
                        >
                          <img
                            src="/icons/estoque-plus.svg"
                            alt=""
                            className="size-[13.333px]"
                          />
                          <span className="text-center text-[12px] font-semibold leading-4 tracking-[0.24px]">
                            Nova Entrada
                          </span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setOperation("transferencia")}
                          className={`flex w-[126.67px] shrink-0 items-center justify-center gap-1.5 rounded-[4px] p-2 ${
                            operation === "transferencia"
                              ? "bg-[#0d472b] text-white"
                              : "bg-[#eaedff] text-[#131b2e]"
                          }`}
                        >
                          <img
                            src="/icons/estoque-transfer.svg"
                            alt=""
                            className="h-3 w-[13.333px]"
                          />
                          <span className="text-center text-[12px] font-semibold leading-4 tracking-[0.24px]">
                            Transferência
                          </span>
                        </button>
                      </div>
                    </div>
                    {/* Seleção do Brinde */}
                    <div className="flex w-full shrink-0 flex-col items-start gap-1">
                      <label
                        htmlFor="estoque-brinde"
                        className="uppercase text-[11px] font-semibold leading-3.5 tracking-[0.55px] text-[#414942]"
                      >
                        BENEFÍCIO / SOUVENIR
                      </label>
                      <select
                        id="estoque-brinde"
                        value={brinde}
                        onChange={(event) => setBrinde(event.target.value)}
                        className="h-10 w-full appearance-none rounded-[4px] bg-[#f2f3ff] pl-4 pr-7 text-[12px] leading-[15px] tracking-[0.12px] text-[#131b2e] focus:outline-none"
                      >
                        <option value="">Selecione o brinde institucional...</option>
                        {INVENTORY.map((item) => (
                          <option key={item.sku.join("")} value={item.name.join(" ")}>
                            {item.name.join(" ")}
                          </option>
                        ))}
                      </select>
                    </div>
                    {/* Destino / Posto */}
                    <div className="flex w-full shrink-0 flex-col items-start gap-1">
                      <label
                        htmlFor="estoque-destino"
                        className="uppercase text-[11px] font-semibold leading-3.5 tracking-[0.55px] text-[#414942]"
                      >
                        POSTO DE DESTINO / ARMAZENAMENTO
                      </label>
                      <select
                        id="estoque-destino"
                        value={destino}
                        onChange={(event) => setDestino(event.target.value)}
                        className="h-10 w-full appearance-none rounded-[4px] bg-[#f2f3ff] pl-4 pr-7 text-[12px] leading-[15px] tracking-[0.12px] text-[#131b2e] focus:outline-none"
                      >
                        <option value="Almoxarifado Geral (Sede Manauscult)">
                          Almoxarifado Geral (Sede Manauscult)
                        </option>
                        <option value="CAT 01 - Centro Histórico">
                          CAT 01 - Centro Histórico
                        </option>
                        <option value="CAT 02 - Aeroporto Intl.">
                          CAT 02 - Aeroporto Intl.
                        </option>
                        <option value="CAT 03 - Ponta Negra">CAT 03 - Ponta Negra</option>
                      </select>
                    </div>
                    {/* Quantidade e Nota / Lote */}
                    <div className="flex w-full shrink-0 items-start justify-center gap-2">
                      <div className="flex w-1/2 shrink-0 flex-col items-start gap-1">
                        <label
                          htmlFor="estoque-quantidade"
                          className="uppercase text-[11px] font-semibold leading-3.5 tracking-[0.55px] text-[#414942]"
                        >
                          QUANTIDADE
                        </label>
                        <input
                          id="estoque-quantidade"
                          type="text"
                          value={quantidade}
                          onChange={(event) => setQuantidade(event.target.value)}
                          placeholder="Ex: 500"
                          className="h-10 w-full rounded-[4px] bg-[#f2f3ff] px-3 text-[12px] tracking-[0.12px] text-[#131b2e] placeholder:text-[#9ca3af] focus:outline-none"
                        />
                      </div>
                      <div className="flex w-1/2 shrink-0 flex-col items-start gap-1">
                        <label
                          htmlFor="estoque-nota"
                          className="uppercase text-[11px] font-semibold leading-3.5 tracking-[0.55px] text-[#414942]"
                        >
                          NOTA / LOTE
                        </label>
                        <input
                          id="estoque-nota"
                          type="text"
                          value={nota}
                          onChange={(event) => setNota(event.target.value)}
                          placeholder="PMM-2025-BR09"
                          className="h-10 w-full rounded-[4px] bg-[#f2f3ff] px-3 text-[12px] tracking-[0.12px] text-[#131b2e] placeholder:text-[#9ca3af] focus:outline-none"
                        />
                      </div>
                    </div>
                    {/* Observação Administrativa */}
                    <div className="flex w-full shrink-0 flex-col items-start gap-1">
                      <label
                        htmlFor="estoque-justificativa"
                        className="uppercase text-[11px] font-semibold leading-3.5 tracking-[0.55px] text-[#414942]"
                      >
                        JUSTIFICATIVA / OBSERVAÇÃO DO LOTE
                      </label>
                      <textarea
                        id="estoque-justificativa"
                        value={justificativa}
                        onChange={(event) => setJustificativa(event.target.value)}
                        placeholder="Ex: Reforço de estoque para temporada de cruzeiros internacionais..."
                        className="h-[52px] w-full resize-none rounded-[4px] bg-[#f2f3ff] p-[10px] text-[12px] tracking-[0.12px] text-[#131b2e] placeholder:text-[#9ca3af] focus:outline-none"
                      />
                    </div>
                    {/* Submit */}
                    <button
                      type="submit"
                      className="flex h-10 w-full shrink-0 items-center justify-center gap-2 rounded-[4px] bg-[#0d472b] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)]"
                    >
                      <img
                        src="/icons/estoque-register.svg"
                        alt=""
                        className="h-[15.75px] w-[16.5px]"
                      />
                      <span className="text-center text-[12px] font-semibold leading-4 tracking-[0.24px] text-white">
                        Registrar Movimentação
                      </span>
                    </button>
                  </div>
                </div>
                {/* Informação de Conformidade */}
                <div className="flex w-full shrink-0 flex-col items-start pt-4">
                  <div className="flex w-full shrink-0 items-center gap-1.5 pt-2">
                    <img
                      src="/icons/estoque-stamp.svg"
                      alt=""
                      className="h-[11.667px] w-[9.333px] shrink-0"
                    />
                    <p className="text-[11px] leading-[16.5px] text-[#414942]">
                      A movimentação gerará log rastreado com carimbo de tempo ICP-Brasil.
                    </p>
                  </div>
                </div>
              </form>

              {/* Mini Card Informativo: Status da Rede CAT */}
              <div className="flex w-full shrink-0 flex-col items-start rounded-[8px] bg-white p-4 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
                <div className="flex w-full shrink-0 flex-col items-start pb-2">
                  <div className="flex w-full shrink-0 items-center justify-between">
                    <span className="whitespace-nowrap text-[12px] font-semibold leading-4 tracking-[0.24px] text-[#131b2e]">
                      Distribuição Atual por Posto
                    </span>
                    <span className="whitespace-nowrap text-[11px] font-semibold leading-3.5 tracking-[0.44px] text-[#396285]">
                      8 CATs ativos
                    </span>
                  </div>
                </div>
                <div className="flex w-full shrink-0 flex-col items-start gap-2 pt-1">
                  {CAT_DISTRIBUTION.map((cat) => (
                    <div key={cat.label} className="flex w-full shrink-0 flex-col items-start gap-0.5">
                      <div className="flex w-full shrink-0 items-start justify-between">
                        <span className="whitespace-nowrap text-[11px] font-semibold leading-3.5 tracking-[0.44px] text-[#131b2e]">
                          {cat.label}
                        </span>
                        <span className="whitespace-nowrap text-[11px] font-medium leading-3.5 tracking-[0.44px] text-[#131b2e]">
                          {cat.value}
                        </span>
                      </div>
                      <div className="h-1.5 w-full overflow-clip rounded-[12px] bg-[#eaedff]">
                        <div
                          className="h-full rounded-[12px] bg-[#0d472b]"
                          style={{ width: `calc(100% - ${cat.fill})` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Registro Recente de Auditoria & Baixas de Lotes */}
        <div className="flex w-full shrink-0 flex-col items-start">
          <div className="flex w-full shrink-0 flex-col items-start overflow-clip rounded-[8px] bg-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
            {/* Header */}
            <div className="flex w-full shrink-0 items-center justify-between bg-white p-4">
              <div className="flex shrink-0 items-center gap-2">
                <img
                  src="/icons/estoque-audit.svg"
                  alt=""
                  className="h-[14.667px] w-[17.875px]"
                />
                <div className="flex shrink-0 flex-col items-start">
                  <h2 className="whitespace-nowrap text-[16px] font-semibold leading-6 text-[#131b2e]">
                    Auditoria de Movimentações Recentes
                  </h2>
                  <p className="whitespace-nowrap text-[12px] leading-4 tracking-[0.12px] text-[#414942]">
                    Registro em tempo real de entradas de fornecedores, baixas de resgate do turista
                    e remessas internas
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="flex shrink-0 items-center gap-1"
              >
                <span className="text-center text-[11px] font-semibold leading-3.5 tracking-[0.44px] text-[#396285]">
                  Ver histórico completo
                </span>
                <img
                  src="/icons/estoque-arrow-right.svg"
                  alt=""
                  className="size-[10.667px]"
                />
              </button>
            </div>
            {/* Table */}
            <div className="w-full shrink-0 overflow-auto">
              <div className="flex w-full shrink-0 flex-col items-start">
                {/* Header Row */}
                <div className="flex w-full shrink-0 items-start justify-center bg-[#f2f3ff]">
                  <div className="flex w-[125.06px] shrink-0 flex-col items-start px-4 py-[10px]">
                    <span className="text-[11px] font-bold uppercase leading-3.5 tracking-[0.55px] text-[#414942]">
                      DATA /
                    </span>
                    <span className="text-[11px] font-bold uppercase leading-3.5 tracking-[0.55px] text-[#414942]">
                      HORÁRIO
                    </span>
                  </div>
                  <div className="flex w-[163.06px] shrink-0 flex-col items-start px-2 py-[17px]">
                    <span className="whitespace-nowrap text-[11px] font-bold uppercase leading-3.5 tracking-[0.55px] text-[#414942]">
                      TIPO DE OPERAÇÃO
                    </span>
                  </div>
                  <div className="flex w-[196.56px] shrink-0 flex-col items-start px-2 py-[17px]">
                    <span className="whitespace-nowrap text-[11px] font-bold uppercase leading-3.5 tracking-[0.55px] text-[#414942]">
                      ITEM / BENEFÍCIO
                    </span>
                  </div>
                  <div className="flex w-[95.23px] shrink-0 flex-col items-center px-2 py-[17px]">
                    <span className="whitespace-nowrap text-center text-[11px] font-bold uppercase leading-3.5 tracking-[0.55px] text-[#414942]">
                      QUANTIDADE
                    </span>
                  </div>
                  <div className="flex w-[228.5px] shrink-0 flex-col items-start px-2 py-[17px]">
                    <span className="whitespace-nowrap text-[11px] font-bold uppercase leading-3.5 tracking-[0.55px] text-[#414942]">
                      ORIGEM → DESTINO
                    </span>
                  </div>
                  <div className="flex w-[167.58px] shrink-0 flex-col items-start px-4 py-[10px]">
                    <span className="text-[11px] font-bold uppercase leading-3.5 tracking-[0.55px] text-[#414942]">
                      SERVIDOR
                    </span>
                    <span className="text-[11px] font-bold uppercase leading-3.5 tracking-[0.55px] text-[#414942]">
                      RESPONSÁVEL
                    </span>
                  </div>
                </div>
                {/* Body */}
                <div className="flex w-full shrink-0 flex-col items-start">
                  {audit.map((entry, index) => {
                    const badge = AUDIT_BADGES[entry.kind];
                    return (
                      <div
                        key={`${entry.date}-${entry.time}-${index}`}
                        className={`flex w-full shrink-0 items-start justify-center border-t border-[#f2f3ff] pt-px first:border-t-0 first:pt-0 ${
                          index > 0 ? "-mb-px" : ""
                        }`}
                      >
                        <div className="flex w-[125.06px] shrink-0 flex-col items-start px-4 py-4">
                          <span className="text-[12px] leading-4 tracking-[0.12px] text-[#414942]">
                            {entry.date}
                          </span>
                          <span className="text-[12px] leading-4 tracking-[0.12px] text-[#414942]">
                            {entry.time}
                          </span>
                        </div>
                        <div className="flex w-[163.06px] shrink-0 flex-col items-start px-2 py-4">
                          <div
                            className="flex shrink-0 items-center gap-1 rounded-[2px] px-2 py-0.5"
                            style={{ backgroundColor: badge.bg }}
                          >
                            <img
                              src={badge.icon}
                              alt=""
                              style={{ width: badge.iconW, height: badge.iconH }}
                            />
                            <MultiLine
                              lines={badge.label}
                              className="whitespace-nowrap text-[11px] font-semibold leading-3.5 tracking-[0.44px]"
                            />
                          </div>
                        </div>
                        <div className="flex w-[196.56px] shrink-0 flex-col items-start px-2 py-4">
                          <span className="text-[12px] font-semibold leading-4 tracking-[0.24px] text-[#131b2e]">
                            {entry.item}
                          </span>
                        </div>
                        <div className="flex w-[95.23px] shrink-0 flex-col items-center px-2 py-4">
                          <span
                            className="whitespace-nowrap text-center text-[12px] font-semibold leading-4 tracking-[0.12px]"
                            style={{ color: entry.qtyColor }}
                          >
                            {entry.qty}
                          </span>
                        </div>
                        <div className="flex w-[228.5px] shrink-0 flex-col items-start px-2 py-4">
                          <span className="text-[12px] leading-4 tracking-[0.12px] text-[#414942]">
                            {entry.route}
                          </span>
                        </div>
                        <div className="flex w-[167.58px] shrink-0 flex-col items-start px-4 py-3">
                          <span className="w-full text-[12px] font-medium leading-4 tracking-[0.12px] text-[#131b2e]">
                            {entry.server}
                          </span>
                          <MultiLine
                            lines={[entry.serverNote]}
                            className="w-full text-[11px] font-semibold leading-3.5 tracking-[0.44px] text-[#414942]"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}