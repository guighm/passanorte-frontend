"use client";

import { type FormEvent, useState } from "react";
import { RoleShell } from "../../components/layout/RoleShell";
import { api } from "@/lib/api";
import { useMe } from "@/hooks/useMe";
import { RedemptionResponse } from "@/types/gamification";

const TABLE_COLS = [
  { w: 73.3, label: ["HORÁRIO"] },
  { w: 98.02, label: ["CÓDIGO", "VOUCHER"] },
  { w: 148.06, label: ["PRIZE ID"] },
  { w: 160.23, label: ["STATUS", "DO VOUCHER"] },
  { w: 199.11, label: ["RESULTADO"] },
  { w: 155.97, label: ["OPERADOR", "RESPONSÁVEL"] },
  { w: 109.31, label: ["COMPROVANTE"], align: "right" as const },
];

type ShiftRedemption = {
  time: string;
  code: string;
  prizeId: string;
  status: string;
  result: string;
  operator: string;
};

function Lines({ lines }: { lines: string[] }) {
  return (
    <>
      {lines.map((line, index) => (
        <p key={line} className={index === 0 ? "mb-0" : undefined}>
          {line}
        </p>
      ))}
    </>
  );
}

export default function ConcessaoBeneficiosPage() {
  const [me] = useMe();
  const [voucher, setVoucher] = useState("");
  const [validated, setValidated] = useState<{ code: string; prizeId: string } | null>(null);
  const [validating, setValidating] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [checkDoc, setCheckDoc] = useState(true);
  const [checkKit, setCheckKit] = useState(true);
  const [toastVisible, setToastVisible] = useState(false);
  const [history, setHistory] = useState<ShiftRedemption[]>([]);

  const operatorName = me ? `${me.name} ${me.surname}` : "—";

  async function handleValidate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const code = voucher.trim().toUpperCase();
    if (!code) return;
    setValidating(true);
    setErrorMessage(null);
    setValidated(null);
    try {
      const result = await api.post<RedemptionResponse>("/redemptions", { code });
      // O POST /redemptions já efetua a baixa issued→redeemed e decrementa o
      // estoque de forma transacional no serviço gamification.
      setValidated({ code: result.code, prizeId: result.prize_id });
      setVoucher("");
      setToastVisible(true);
      setHistory((current) => [
        {
          time: new Date().toLocaleTimeString("pt-BR"),
          code: result.code,
          prizeId: result.prize_id.slice(0, 8) + "...",
          status: result.status,
          result: "Baixa no estoque registrada",
          operator: operatorName,
        },
        ...current,
      ]);
    } catch (error) {
      const messages: Record<string, string> = {
        code_not_found: "Código não encontrado. Confira com o turista.",
        code_already_used: "Este código já foi resgatado.",
        prize_out_of_stock: "Brinde sem estoque no momento.",
        forbidden: "Concessão exige login de operador (funcionário), não de administrador.",
      };
      const backendCode = error instanceof Error ? (error as unknown as { code?: string }).code : undefined;
      const message = error instanceof Error ? error.message : undefined;
      setErrorMessage(messages[backendCode || ""] || message || "Erro ao validar código.");
    } finally {
      setValidating(false);
    }
  }

  return (
    <RoleShell breadcrumb="Concessão de Benefícios">
      <div className="flex w-full flex-col pb-8">
        {/* Operational Sub-Header / CAT Terminal Banner */}
        <div className="flex w-full flex-col items-start justify-between gap-4 rounded-lg bg-[#f2f3ff] p-4 shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05)] md:flex-row md:items-center">
          <div className="flex items-center gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-[#002f19] shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05)]">
              <img src="/icons/concessao-terminal.svg" alt="" className="size-[21.67px]" />
            </div>
            <div className="flex flex-col items-start">
              <div className="flex flex-wrap items-center gap-2">
                <div className="rounded-[2px] bg-[#0d472b] px-2 py-[2px]">
                  <span className="text-[11px] font-semibold uppercase leading-[14px] tracking-[0.55px] text-[#9ad3ad]">
                    Terminal Ativo CAT
                  </span>
                </div>
                <div className="flex items-center gap-1.5 rounded-xl bg-[#eaedff] px-[10px] py-[2px]">
                  <span className="size-2 rounded-full bg-[#10b981]" />
                  <span className="text-[12px] font-semibold leading-4 tracking-[0.24px] text-[#131b2e]">
                    Terminal Online • Sincronizado à Base Geral
                  </span>
                </div>
              </div>
              <h1 className="pt-[2px] text-2xl font-semibold leading-8 tracking-[-0.24px] text-[#131b2e]">
                Concessão de Benefícios • Posto em Operação
              </h1>
              <div className="flex h-8 items-center gap-1">
                <img src="/icons/concessao-operator.svg" alt="" className="size-[12.5px] shrink-0" />
                <p className="whitespace-nowrap text-[12px] leading-4 tracking-[0.12px] text-[#414942]">
                  Atendente
                  <br />
                  Operador:
                </p>
                <p className="ml-[89px] whitespace-nowrap text-[12px] font-bold leading-4 tracking-[0.12px] text-[#131b2e]">
                  {me ? operatorName : "—"}
                </p>
                {me && (
                  <p className="ml-[73px] whitespace-nowrap text-[12px] leading-4 tracking-[0.12px] text-[#414942]">
                    (Sessão autenticada • Papel:
                    <br />
                    {me.role === "admin" ? "administrador" : "operador"})
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Quick stats of shift */}
          <div className="flex shrink-0 items-center gap-4">
            <div className="flex flex-col items-end rounded-[4px] bg-white px-4 py-2 shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05)]">
              <span className="text-[11px] font-semibold uppercase leading-[14px] tracking-[0.44px] text-[#414942]">
                Resgates Neste Terminal
              </span>
              <span className="text-[20px] font-bold leading-7 tracking-[-0.2px] text-[#002f19]">
                {history.length}
              </span>
            </div>
            <div className="flex h-[58px] w-[165px] flex-col items-end justify-between rounded-[4px] bg-white px-4 py-2 shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05)]">
              <span className="whitespace-nowrap text-[11px] font-semibold uppercase leading-[14px] tracking-[0.44px] text-[#414942]">
                Último Resgate
              </span>
              <span className="text-[13px] font-bold leading-4 tracking-[0.12px] text-[#396285]">
                {history[0]?.time || "—"}
              </span>
            </div>
          </div>
        </div>

        {/* Main Split Operation Zone */}
        <div className="mt-6 grid w-full grid-cols-1 gap-6 md:grid-cols-12">
          {/* Left Column: Scanner & Input */}
          <div className="col-span-1 flex flex-col gap-4 md:col-span-5">
            {/* Manual Code Entry Module */}
            <div className="flex w-full flex-col gap-2 rounded-lg bg-white p-4 shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05)]">
              <div className="flex w-full items-center gap-2">
                <img src="/icons/concessao-entry.svg" alt="" className="h-[18.33px] w-[13.33px]" />
                <h3 className="text-base font-semibold leading-6 text-[#131b2e]">
                  Entrada do Voucher
                </h3>
              </div>
              <p className="text-[12px] leading-4 tracking-[0.12px] text-[#414942]">
                Informe o código (PN-...) emitido no aplicativo PassaNorte do
                turista ao concluir o roteiro municipal:
              </p>
              <form
                className="flex w-full items-start gap-2"
                onSubmit={handleValidate}
              >
                <div className="relative min-w-0 flex-1">
                  <input
                    type="text"
                    value={voucher}
                    onChange={(event) => setVoucher(event.target.value)}
                    placeholder="PN-XXXXXXXXXXXXXXXX"
                    className="h-11 w-full rounded-[4px] bg-[#faf8ff] px-3 py-[14px] text-[13px] font-medium uppercase leading-[normal] tracking-[1.3px] text-[#131b2e] shadow-[inset_0px_2px_4px_0px_rgba(0,0,0,0.05)] focus:outline-2 focus:outline-[#0d472b]"
                  />
                  <button
                    type="button"
                    aria-label="Limpar código"
                    onClick={() => setVoucher("")}
                    className="absolute right-[10px] top-[10px] p-[6px] pb-1.5"
                  >
                    <img src="/icons/concessao-clear.svg" alt="" className="size-[10.5px]" />
                  </button>
                </div>
                <button
                  type="submit"
                  disabled={validating}
                  className="flex h-11 shrink-0 items-center justify-center gap-2 rounded-[4px] bg-[#0d472b] px-4 pt-[11.5px] pb-[12.5px] shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05)] disabled:opacity-60"
                >
                  <img src="/icons/concessao-validate.svg" alt="" className="size-[15px]" />
                  <span className="whitespace-nowrap text-[14px] font-semibold leading-5 tracking-[0.14px] text-white">
                    {validating ? "Validando..." : "Validar Código"}
                  </span>
                </button>
              </form>
              {errorMessage && (
                <p className="text-[12px] font-semibold text-[#ba1a1a]">{errorMessage}</p>
              )}
            </div>

            {/* Quick Guidance Notes */}
            <div className="flex w-full items-start gap-2 rounded-lg bg-[#f2f3ff] p-4">
              <img src="/icons/concessao-guidance.svg" alt="" className="h-[20.33px] w-[14.67px] shrink-0" />
              <div className="flex flex-col gap-1">
                <p className="text-[12px] font-semibold leading-4 tracking-[0.24px] text-[#131b2e]">
                  Diretriz PMM / Portaria Manauscult nº 14/2024
                </p>
                <p className="text-[12px] leading-4 tracking-[0.12px] text-[#414942]">
                  A entrega física do brinde requer obrigatoriamente a conferência
                  de documento original com foto (RG, CNH ou Passaporte) para
                  evitar duplo resgate municipal.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Verification & Redemption Execution Panel */}
          <div className="col-span-1 md:col-span-7">
            <div className="relative w-full overflow-clip rounded-lg bg-white px-6 pb-6 shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]">
              <div className="flex w-full flex-col items-center gap-4 pb-6">
                {/* Status Chip Header */}
                <div className="-mx-6 flex w-[calc(100%+48px)] items-center justify-between px-6 py-4"
                  style={{ backgroundColor: validated ? "#ecfdf5" : "#f2f3ff" }}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="flex size-9 shrink-0 items-center justify-center rounded-full"
                      style={{ backgroundColor: validated ? "#059669" : "#c0c9c0" }}
                    >
                      <img src="/icons/concessao-status.svg" alt="" className="h-[19.25px] w-[20.17px]" />
                    </div>
                    <div className="flex flex-col gap-[4.5px] pb-[2px]">
                      <p
                        className="text-[12px] font-bold leading-4 tracking-[0.24px]"
                        style={{ color: validated ? "#064e3b" : "#414942" }}
                      >
                        {validated ? "VOUCHER AUTENTICADO • CONCEDIDO" : "AGUARDANDO VALIDAÇÃO"}
                      </p>
                      <p
                        className="text-[13px] font-semibold leading-[18px] tracking-[0.65px]"
                        style={{ color: validated ? "#065f46" : "#414942" }}
                      >
                        {validated
                          ? `CÓDIGO: ${validated.code}`
                          : "LEIA O QR CODE OU DIGITE O CÓDIGO À ESQUERDA"}
                      </p>
                    </div>
                  </div>
                  {validated && (
                    <div className="flex shrink-0 items-center gap-1.5 rounded-[2px] bg-[rgba(255,255,255,0.8)] py-1 pl-[10px] pr-8">
                      <img src="/icons/concessao-clock.svg" alt="" className="h-[14px] w-3" />
                      <p className="text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#064e3b]">
                        Registrado agora
                      </p>
                    </div>
                  )}
                </div>

                {/* Redemption result bento strip */}
                <div className="flex w-full items-start justify-center gap-2">
                  <div className="flex h-[118px] min-w-0 flex-1 flex-col gap-[2px] rounded-[4px] bg-[#f2f3ff] px-2 pt-2">
                    <span className="text-[11px] font-semibold uppercase leading-[14px] tracking-[0.44px] text-[#414942]">
                      Código Validado
                    </span>
                    <p className="text-base font-semibold leading-6 text-[#131b2e]">
                      {validated ? validated.code : "—"}
                    </p>
                  </div>
                  <div className="flex h-[118px] min-w-0 flex-1 flex-col gap-[2px] rounded-[4px] bg-[#f2f3ff] px-2 pt-2">
                    <span className="text-[11px] font-semibold uppercase leading-[14px] tracking-[0.44px] text-[#414942]">
                      Brinde Vinculado
                      <br />
                    </span>
                    <p className="text-base font-semibold leading-6 text-[#131b2e]">
                      {validated ? validated.prizeId.slice(0, 8) + "..." : "—"}
                    </p>
                  </div>
                  <div className="relative h-[118px] min-w-0 flex-1 rounded-[4px] bg-[#f2f3ff]">
                    <span className="absolute left-2 right-2 top-2 whitespace-nowrap text-[11px] font-semibold uppercase leading-[14px] tracking-[0.44px] text-[#414942]">
                      Situação
                    </span>
                    <p
                      className="absolute left-2 top-[38px] text-base leading-6"
                      style={{
                        fontWeight: 700,
                        color: validated ? "#002f19" : "#c0c9c0",
                      }}
                    >
                      {validated ? "Resgatado" : "Aguardando"}
                    </p>
                    <p className="absolute left-2 top-[61.5px] whitespace-nowrap text-[12px] font-medium leading-4 tracking-[0.12px] text-[#065f46]">
                      {validated ? "Baixa atômica no estoque" : "—"}
                    </p>
                  </div>
                </div>

                {/* Mandatory Confirmation Checklist */}
                <div className="flex w-full flex-col gap-2 rounded-[4px] bg-[#faf8ff] p-4">
                  <label className="flex w-full cursor-pointer items-start gap-2">
                    <input
                      type="checkbox"
                      checked={checkDoc}
                      onChange={(event) => setCheckDoc(event.target.checked)}
                      className="mt-1 size-[15.6px] shrink-0 appearance-none rounded-[2.5px] border border-[#c0c9c0] bg-white checked:border-[#002f19] checked:bg-[#002f19]"
                    />
                    <div>
                      <p className="text-[12px] font-semibold leading-4 tracking-[0.24px] text-[#131b2e]">
                        Documento de identificação com foto conferido
                      </p>
                      <p className="text-[12px] leading-4 tracking-[0.12px] text-[#414942]">
                        Conferi que o portador do voucher corresponde ao turista do cadastro.
                      </p>
                    </div>
                  </label>
                  <label className="flex w-full cursor-pointer items-start gap-2">
                    <input
                      type="checkbox"
                      checked={checkKit}
                      onChange={(event) => setCheckKit(event.target.checked)}
                      className="mt-1 size-[13.1px] shrink-0 appearance-none rounded-[2.5px] border border-[#c0c9c0] bg-white checked:border-[#002f19] checked:bg-[#002f19]"
                    />
                    <div>
                      <p className="text-[12px] font-semibold leading-4 tracking-[0.24px] text-[#131b2e]">
                        Itens físicos do brinde verificados e lacrados
                      </p>
                      <p className="text-[12px] leading-4 tracking-[0.12px] text-[#414942]">
                        Conferidos em perfeito estado antes da entrega.
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Redemptions / Audit Log of Current Shift */}
        <div className="mt-8 flex w-full flex-col rounded-lg bg-white p-4 shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05)]">
          <div className="flex w-full items-center justify-between pb-2">
            <div className="flex items-center gap-2">
              <img src="/icons/concessao-history.svg" alt="" className="size-[16.5px]" />
              <h2 className="text-base font-semibold leading-6 text-[#131b2e]">
                Histórico de Concessões desta Sessão
              </h2>
            </div>
            <div className="flex items-center gap-2">
              {/* O backend grava a auditoria fiscal; a listagem por operador
              ainda não está exposta na API — o histórico começa vazio a cada sessão. */}
              <span className="text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#414942]">
                Registros locais da sessão • Auditoria fiscal no serviço gamification
              </span>
            </div>
          </div>

          <div className="w-full">
            {/* Table header */}
            <div className="flex w-full items-start rounded-t-[2px] bg-[#f2f3ff]">
              {TABLE_COLS.map((col) => (
                <div
                  key={col.label[0]}
                  style={{ width: col.w }}
                  className={`flex flex-col items-start px-2 ${
                    col.label.length > 1 ? "py-[10px]" : "py-[17px]"
                  } ${col.align === "right" ? "items-end" : ""}`}
                >
                  <div
                    className={`text-[11px] font-bold uppercase leading-[14px] tracking-[0.55px] text-[#414942] ${
                      col.align === "right" ? "text-right" : ""
                    }`}
                  >
                    <Lines lines={col.label} />
                  </div>
                </div>
              ))}
            </div>
            {/* Table body */}
            <div className="flex w-full flex-col">
              {history.length === 0 ? (
                <div className="w-full border-t border-[#f2f3ff] py-8 text-center text-[13px] text-[#414942]">
                  Nenhum resgate efetuado nesta sessão de concessão.
                </div>
              ) : (
                history.map((row) => (
                  <div
                    key={`${row.code}-${row.time}`}
                    className="flex w-full items-start border-t border-[#f2f3ff] pt-px"
                  >
                    <div style={{ width: TABLE_COLS[0].w }} className="px-2 py-[21px]">
                      <p className="whitespace-nowrap text-[13px] font-medium leading-[18px] tracking-[0.26px] text-[#414942]">
                        {row.time}
                      </p>
                    </div>
                    <div style={{ width: TABLE_COLS[1].w }} className="px-2 py-[13px]">
                      <p className="whitespace-nowrap text-[13px] font-semibold leading-[18px] tracking-[0.26px] text-[#002f19]">
                        <Lines lines={[row.code]} />
                      </p>
                    </div>
                    <div style={{ width: TABLE_COLS[2].w }} className="px-2 py-[12px]">
                      <p className="text-[12px] font-semibold leading-4 tracking-[0.24px] text-[#131b2e]">
                        <Lines lines={[row.prizeId]} />
                      </p>
                    </div>
                    <div style={{ width: TABLE_COLS[3].w }} className="px-2 py-[19.5px]">
                      <p className="whitespace-nowrap text-[12px] leading-4 tracking-[0.12px] text-[#414942]">
                        <Lines lines={[row.status]} />
                      </p>
                    </div>
                    <div style={{ width: TABLE_COLS[4].w }} className="px-2 py-[20px]">
                      <div className="inline-flex items-center gap-1 rounded-[2px] bg-[#eaedff] py-[2px] pl-2 pr-[19.66px]">
                        <img src="/icons/concessao-gift.svg" alt="" className="h-[11.08px] w-[11.67px] shrink-0" />
                        <span className="whitespace-nowrap text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#131b2e]">
                          {row.result}
                        </span>
                      </div>
                    </div>
                    <div style={{ width: TABLE_COLS[5].w }} className="px-2 py-[19.5px]">
                      <p className="whitespace-nowrap text-[12px] leading-4 tracking-[0.12px] text-[#414942]">
                        <Lines lines={[row.operator]} />
                      </p>
                    </div>
                    <div
                      style={{ width: TABLE_COLS[6].w }}
                      className="flex flex-col items-end px-2 py-[21px]"
                    >
                      <button
                        type="button"
                        aria-label="Ver comprovante"
                        className="flex items-center justify-center rounded-[2px] px-1 pb-2 pt-1"
                      >
                        <img src="/icons/concessao-receipt.svg" alt="" className="h-[15px] w-[13.5px]" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Success Toast — Operational Delivery Modal Confirmation State */}
      {toastVisible && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className="flex items-center gap-4 rounded-lg border border-[rgba(182,240,200,0.3)] bg-[#002f19] p-[17px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)]">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#b6f0c8]">
              <img src="/icons/concessao-toast-check.svg" alt="" className="h-[12px] w-[21.9px]" />
            </div>
            <div className="flex flex-col">
              <p className="whitespace-nowrap text-[14px] font-bold leading-5 tracking-[0.14px] text-white">
                Resgate Confirmado com Sucesso!
              </p>
              <p className="whitespace-nowrap text-[12px] leading-4 tracking-[0.12px] text-[#9ad3ad]">
                Baixa de 1 brinde registrada no estoque do serviço gamification.
              </p>
            </div>
            <button
              type="button"
              aria-label="Fechar aviso"
              onClick={() => setToastVisible(false)}
              className="shrink-0 pl-2 pb-[6px]"
            >
              <img src="/icons/concessao-toast-close.svg" alt="" className="size-[11.67px]" />
            </button>
          </div>
        </div>
      )}
    </RoleShell>
  );
}