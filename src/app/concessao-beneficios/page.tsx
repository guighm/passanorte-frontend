"use client";

import { useState } from "react";
import { AppShell } from "../../components/layout/AppShell";

const TABLE_COLS = [
  { w: 73.3, label: ["HORÁRIO"] },
  { w: 98.02, label: ["CÓDIGO", "VOUCHER"] },
  { w: 148.06, label: ["VISITANTE / ORIGEM"] },
  { w: 160.23, label: ["ROTA CONCLUÍDA"] },
  { w: 199.11, label: ["BRINDE ENTREGUE"] },
  { w: 155.97, label: ["OPERADOR", "RESPONSÁVEL"] },
  { w: 109.31, label: ["COMPROVANTE"], align: "right" as const },
];

const REDEMPTIONS = [
  {
    time: "14:52:10",
    code: ["AMZ-7712-", "BB"],
    visitor: ["Mariana Dias de", "Oliveira"],
    origin: ["São Paulo/SP • Brasil"],
    route: ["Circuito Gastronômico", "Manaus"],
    reward: ["Kit Degustação Sabores", "da Floresta"],
    operator: ["Ana Beatriz Souza (CAT", "01)"],
  },
  {
    time: "14:38:44",
    code: ["AMZ-4019-", "XP"],
    visitor: ["Jean-Pierre Laurent"],
    origin: ["Lyon • França", "(Passaporte)"],
    route: ["Rota Arquitetura da Belle", "Époque"],
    reward: ["Kit Souvenir Amazônia", "Viva"],
    operator: ["Ana Beatriz Souza (CAT", "01)"],
  },
  {
    time: "14:15:02",
    code: ["AMZ-6590-", "LL"],
    visitor: ["Carlos Alberto", "Mendonça"],
    origin: ["Belo Horizonte/MG •", "Brasil"],
    route: ["Rota Rio Negro &", "Encontro das Águas"],
    reward: ["Medalha Oficial", "PassaNorte Colecionável"],
    operator: ["Ana Beatriz Souza (CAT", "01)"],
  },
  {
    time: "13:50:31",
    code: ["AMZ-3321-", "JK"],
    visitor: ["Helena Ramos", "Vasconcelos"],
    origin: ["Manaus/AM (Morador", "Residente)"],
    route: ["Desafio Manaus Meu", "Orgulho"],
    reward: ["Kit Souvenir Amazônia", "Viva"],
    operator: ["Carlos Eduardo (Sede", "Manauscult)"],
  },
  {
    time: "13:22:15",
    code: ["AMZ-1194-", "MC"],
    visitor: ["Takeshi Sato"],
    origin: ["Tóquio • Japão", "(Passaporte)"],
    route: ["Rota Histórica & Cultural", "de Manaus"],
    reward: ["Kit Souvenir Amazônia", "Viva"],
    operator: ["Ana Beatriz Souza (CAT", "01)"],
  },
];

const ROUTE_STOPS = [
  { icon: "/icons/concessao-stop-theater.svg", w: 16.5, h: 15, label: "Teatro AM" },
  { icon: "/icons/concessao-stop-market.svg", w: 15.07, h: 13.5, label: "Mercado AL" },
  { icon: "/icons/concessao-stop-palacete.svg", w: 15, h: 15, label: "Palacete Prov." },
  { icon: "/icons/concessao-stop-church.svg", w: 15, h: 15.75, label: "Igreja Matriz" },
  { icon: "/icons/concessao-stop-porto.svg", w: 16.5, h: 9, label: "Porto Manaus" },
];

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
  const [voucher, setVoucher] = useState("AMZ-9184-KT");
  const [checkDoc, setCheckDoc] = useState(true);
  const [checkKit, setCheckKit] = useState(true);
  const [toastVisible, setToastVisible] = useState(false);

  return (
    <AppShell breadcrumb="Concessão de Benefícios">
      <div className="flex w-full flex-col pb-8">
        {/* Operational Sub-Header / CAT Terminal Banner */}
        <div className="flex w-full items-center justify-between rounded-lg bg-[#f2f3ff] p-4 shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05)]">
          <div className="flex items-center gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-[#002f19] shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05)]">
              <img
                src="/icons/concessao-terminal.svg"
                alt=""
                className="size-[21.67px]"
              />
            </div>
            <div className="flex flex-col items-start">
              <div className="flex w-full items-center gap-2">
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
                CAT 01 — Centro Histórico (Largo de São Sebastião)
              </h1>
              <div className="flex h-8 items-center gap-1">
                <img
                  src="/icons/concessao-operator.svg"
                  alt=""
                  className="size-[12.5px] shrink-0"
                />
                <p className="whitespace-nowrap text-[12px] leading-4 tracking-[0.12px] text-[#414942]">
                  Atendente
                  <br />
                  Operador:
                </p>
                <p className="ml-[89px] whitespace-nowrap text-[12px] font-bold leading-4 tracking-[0.12px] text-[#131b2e]">
                  Ana Beatriz
                  <br />
                  Souza
                </p>
                <p className="ml-[73px] whitespace-nowrap text-[12px] leading-4 tracking-[0.12px] text-[#414942]">
                  (Agente Receptiva Manauscult • Matrícula:
                  <br />
                  PMM-884.19)
                </p>
              </div>
            </div>
          </div>

          {/* Quick stats of shift */}
          <div className="flex shrink-0 items-center gap-4">
            <div className="flex flex-col items-end rounded-[4px] bg-white px-4 py-2 shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05)]">
              <span className="text-[11px] font-semibold uppercase leading-[14px] tracking-[0.44px] text-[#414942]">
                Resgates no Turno
              </span>
              <span className="text-[20px] font-bold leading-7 tracking-[-0.2px] text-[#002f19]">
                18
              </span>
            </div>
            <div className="flex h-[58px] w-[165px] flex-col items-end justify-between rounded-[4px] bg-white px-4 py-2 shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05)]">
              <span className="whitespace-nowrap text-[11px] font-semibold uppercase leading-[14px] tracking-[0.44px] text-[#414942]">
                Kit Amazônia Viva
              </span>
              <div className="flex items-baseline gap-[3px]">
                <span className="text-[20px] font-bold leading-7 tracking-[-0.2px] text-[#396285]">
                  42
                </span>
                <span className="text-[12px] leading-4 tracking-[0.12px] text-[#414942]">
                  unid.
                </span>
              </div>
            </div>
            <button
              type="button"
              className="flex flex-col items-center justify-center rounded-[4px] bg-[#eaedff] px-[10px] pb-4 pt-[10px]"
            >
              <img
                src="/icons/concessao-sync.svg"
                alt=""
                className="size-[13.33px]"
              />
            </button>
          </div>
        </div>

        {/* Main Split Operation Zone */}
        <div className="mt-6 grid w-full grid-cols-12 gap-6">
          {/* Left Column: Scanner & Input */}
          <div className="col-span-5 flex flex-col gap-4">
            {/* Camera Viewport Card */}
            <div className="relative h-[420px] w-full rounded-lg bg-white shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05)]">
              <div className="absolute left-4 right-4 top-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src="/icons/concessao-scanner.svg"
                    alt=""
                    className="size-[18.33px]"
                  />
                  <h2 className="text-base leading-6 text-[#131b2e]">
                    <span className="font-semibold">Leitor Óptico</span>{" "}
                    <span className="font-normal">do Visitante</span>
                  </h2>
                </div>
                <div className="rounded-xl bg-[rgba(182,240,200,0.4)] px-2 py-[2px]">
                  <span className="text-[11px] font-medium leading-[14px] tracking-[0.44px] text-[#0d472b]">
                    Auto-Focus Ativo
                  </span>
                </div>
              </div>
              <p className="absolute left-4 right-4 top-12 text-[12px] leading-4 tracking-[0.12px] text-[#414942]">
                Aponte a câmera para o QR Code gerado no aplicativo PassaNorte
                do turista ao concluir o roteiro municipal.
              </p>

              {/* Simulated Camera Viewport */}
              <div className="absolute left-4 right-4 top-[88px] flex aspect-[4/3] items-center justify-center overflow-clip rounded-[4px]">
                <div aria-hidden className="pointer-events-none absolute inset-0 bg-[#002f19]" />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-30 blur-[0.5px]"
                >
                  <img
                    src="/images/concessao-camera-backdrop.png"
                    alt=""
                    className="absolute left-[-18.81%] top-0 h-full w-[137.63%] max-w-none"
                  />
                </div>
                {/* Scanner Target Mask */}
                <div className="relative flex size-60 shrink-0 flex-col items-center justify-between rounded-lg p-3">
                  <div className="flex w-full items-start justify-between">
                    <div className="size-7 rounded-tl-[4px] border-l-4 border-t-4 border-solid border-[#b6f0c8]" />
                    <div className="size-7 rounded-tr-[4px] border-r-4 border-t-4 border-solid border-[#b6f0c8]" />
                  </div>
                  <div className="relative flex w-full flex-col items-center justify-center">
                    <img
                      src="/icons/concessao-qr.svg"
                      alt=""
                      className="size-[45px]"
                    />
                    <style>{`@keyframes concessao-scan { 0% { top: 8px; } 50% { top: 36px; } 100% { top: 8px; } }`}</style>
                    <div
                      className="absolute left-2 right-2 h-[2px] bg-[#b6f0c8] shadow-[0px_0px_12px_0px_#9ad3ad]"
                      style={{
                        top: 29,
                        animation: "concessao-scan 2.4s ease-in-out infinite",
                      }}
                    />
                  </div>
                  <div className="flex w-full items-start justify-between">
                    <div className="size-7 rounded-bl-[4px] border-b-4 border-l-4 border-solid border-[#b6f0c8]" />
                    <div className="size-7 rounded-br-[4px] border-b-4 border-r-4 border-solid border-[#b6f0c8]" />
                  </div>
                </div>
                {/* Bottom Camera Overlay Bar */}
                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between rounded-[4px] bg-[rgba(0,47,25,0.8)] px-3 py-1.5 backdrop-blur-[2px]">
                  <div className="flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-[#34d399]" />
                    <span className="text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#eef0ff]">
                      Câmera Traseira (HD)
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#b6f0c8]">
                    60 FPS • Lendo...
                  </span>
                </div>
                <div className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0px_2px_4px_0px_rgba(0,0,0,0.05)]" />
              </div>

              {/* Camera Controls */}
              <div className="absolute left-4 right-4 top-[358px] flex items-center justify-between pt-1">
                <button
                  type="button"
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-[4px] bg-[#eaedff] px-3 py-2"
                >
                  <img
                    src="/icons/concessao-lens.svg"
                    alt=""
                    className="h-[13.5px] w-[15px]"
                  />
                  <span className="text-[12px] font-semibold leading-4 tracking-[0.24px] text-[#131b2e]">
                    Alternar Lente
                  </span>
                </button>
                <button
                  type="button"
                  className="ml-4 flex flex-1 items-center justify-center gap-1.5 rounded-[4px] bg-[#002f19] px-3 py-2 shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05)]"
                >
                  <img
                    src="/icons/concessao-scan.svg"
                    alt=""
                    className="size-[13.5px]"
                  />
                  <span className="text-[12px] font-semibold leading-4 tracking-[0.24px] text-white">
                    Simular Leitura
                  </span>
                </button>
              </div>
            </div>

            {/* Manual Code Entry Module */}
            <div className="flex w-full flex-col gap-2 rounded-lg bg-white p-4 shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05)]">
              <div className="flex w-full items-center gap-2">
                <img
                  src="/icons/concessao-entry.svg"
                  alt=""
                  className="h-[18.33px] w-[13.33px]"
                />
                <h3 className="text-base font-semibold leading-6 text-[#131b2e]">
                  Entrada Manual do Voucher
                </h3>
              </div>
              <p className="text-[12px] leading-4 tracking-[0.12px] text-[#414942]">
                Caso o smartphone do visitante apresente reflexo ou falha na
                tela, informe o código alfanumérico emitido no app:
              </p>
              <form
                className="flex w-full items-start gap-2"
                onSubmit={(event) => event.preventDefault()}
              >
                <div className="relative min-w-0 flex-1">
                  <input
                    type="text"
                    value={voucher}
                    onChange={(event) => setVoucher(event.target.value)}
                    className="h-11 w-full rounded-[4px] bg-[#faf8ff] px-3 py-[14px] text-[13px] font-medium uppercase leading-[normal] tracking-[1.3px] text-[#131b2e] shadow-[inset_0px_2px_4px_0px_rgba(0,0,0,0.05)] focus:outline-2 focus:outline-[#0d472b]"
                  />
                  <button
                    type="button"
                    aria-label="Limpar código"
                    onClick={() => setVoucher("")}
                    className="absolute right-[10px] top-[10px] p-[6px] pb-1.5"
                  >
                    <img
                      src="/icons/concessao-clear.svg"
                      alt=""
                      className="size-[10.5px]"
                    />
                  </button>
                </div>
                <button
                  type="submit"
                  className="flex h-11 shrink-0 items-center justify-center gap-2 rounded-[4px] bg-[#0d472b] px-4 pt-[11.5px] pb-[12.5px] shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05)]"
                >
                  <img
                    src="/icons/concessao-validate.svg"
                    alt=""
                    className="size-[15px]"
                  />
                  <span className="whitespace-nowrap text-[14px] font-semibold leading-5 tracking-[0.14px] text-white">
                    Validar Código
                  </span>
                </button>
              </form>
            </div>

            {/* Quick Guidance Notes */}
            <div className="flex w-full items-start gap-2 rounded-lg bg-[#f2f3ff] p-4">
              <img
                src="/icons/concessao-guidance.svg"
                alt=""
                className="h-[20.33px] w-[14.67px] shrink-0"
              />
              <div className="flex flex-col gap-1">
                <p className="text-[12px] font-semibold leading-4 tracking-[0.24px] text-[#131b2e]">
                  Diretriz PMM / Portaria Manauscult nº 14/2024
                </p>
                <p className="text-[12px] leading-4 tracking-[0.12px] text-[#414942]">
                  A entrega física do Kit Souvenir requer obrigatoriamente a
                  conferência de documento original com foto (RG, CNH ou
                  Passaporte) para evitar duplo resgate municipal.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Verification & Redemption Execution Panel */}
          <div className="col-span-7 flex flex-col justify-center self-start">
            <div className="relative w-full overflow-clip rounded-lg bg-white px-6 pb-6 shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]">
              <div className="flex w-full flex-col items-center gap-4 pb-6">
                {/* Status Chip Header */}
                <div className="-mx-6 flex w-[calc(100%+48px)] items-center justify-between bg-[#ecfdf5] px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#059669]">
                      <img
                        src="/icons/concessao-status.svg"
                        alt=""
                        className="h-[19.25px] w-[20.17px]"
                      />
                    </div>
                    <div className="flex flex-col gap-[4.5px] pb-[2px]">
                      <p className="text-[12px] font-bold leading-4 tracking-[0.24px] text-[#064e3b]">
                        VOUCHER AUTENTICADO • APTO PARA
                        <br />
                        CONCESSÃO
                      </p>
                      <p className="text-[13px] font-semibold leading-[18px] tracking-[0.65px] text-[#065f46]">
                        CÓDIGO: AMZ-9184-KT • ROTA CONCLUÍDA
                      </p>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-1.5 rounded-[2px] bg-[rgba(255,255,255,0.8)] py-1 pl-[10px] pr-8">
                    <img
                      src="/icons/concessao-clock.svg"
                      alt=""
                      className="h-[14px] w-3"
                    />
                    <p className="text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#064e3b]">
                      Expira em: 47h
                      <br />
                      12m
                    </p>
                  </div>
                </div>

                {/* Tourist Credentials Bento Strip */}
                <div className="flex w-full items-start justify-center gap-2">
                  <div className="flex h-[118px] min-w-0 flex-1 flex-col gap-[2px] rounded-[4px] bg-[#f2f3ff] px-2 pt-2">
                    <span className="text-[11px] font-semibold uppercase leading-[14px] tracking-[0.44px] text-[#414942]">
                      Turista Registrado
                    </span>
                    <p className="text-base font-semibold leading-6 text-[#131b2e]">
                      Lucas M. Ferreira
                    </p>
                    <p className="whitespace-nowrap text-[12px] leading-4 tracking-[0.12px] text-[#396285]">
                      Curitiba / PR • Brasil
                    </p>
                  </div>
                  <div className="flex h-[118px] min-w-0 flex-1 flex-col gap-[2px] rounded-[4px] bg-[#f2f3ff] px-2 pt-2">
                    <span className="text-[11px] font-semibold uppercase leading-[14px] tracking-[0.44px] text-[#414942]">
                      Documento
                      <br />
                      Declarado
                    </span>
                    <p className="text-base font-semibold leading-6 text-[#131b2e]">
                      CPF ***.482.919-
                      <br />
                      **
                    </p>
                    <p className="whitespace-nowrap text-[12px] leading-4 tracking-[0.12px] text-[#414942]">
                      Doc: CNH Paraná
                    </p>
                  </div>
                  <div className="relative h-[118px] min-w-0 flex-1 rounded-[4px] bg-[#f2f3ff]">
                    <span className="absolute left-2 right-2 top-2 whitespace-nowrap text-[11px] font-semibold uppercase leading-[14px] tracking-[0.44px] text-[#414942]">
                      Origem da Pontuação
                    </span>
                    <p className="absolute left-2 right-2 top-6 text-base font-bold leading-6 text-[#002f19]">
                      1.250 Pts
                    </p>
                    <p className="absolute left-2 top-[61.5px] whitespace-nowrap text-[12px] font-medium leading-4 tracking-[0.12px] text-[#065f46]">
                      100% de Presença
                    </p>
                    <p className="absolute left-2 top-[85.5px] whitespace-nowrap text-[12px] font-medium leading-4 tracking-[0.12px] text-[#065f46]">
                      Validada
                    </p>
                  </div>
                </div>

                {/* Mission / Route Journey Visual Proof */}
                <div className="flex w-full flex-col gap-2 rounded-[4px] bg-[#f2f3ff] p-4">
                  <div className="flex w-full items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <img
                        src="/icons/concessao-route.svg"
                        alt=""
                        className="size-[13.5px]"
                      />
                      <p className="text-[12px] font-semibold leading-4 tracking-[0.24px] text-[#131b2e]">
                        Rota Histórica &amp; Cultural de Manaus (5/5 Concluído)
                      </p>
                    </div>
                    <div className="rounded-[2px] bg-[#b6f0c8] px-2 py-[2px]">
                      <span className="text-[11px] font-bold leading-[14px] tracking-[0.44px] text-[#195033]">
                        Auditado
                      </span>
                    </div>
                  </div>
                  <div className="flex w-full items-start justify-center gap-1.5 pt-1">
                    {ROUTE_STOPS.map((stop) => (
                      <div
                        key={stop.label}
                        className="flex w-[91px] shrink-0 flex-col items-center rounded-[2px] bg-white p-1.5"
                      >
                        <img
                          src={stop.icon}
                          alt=""
                          style={{ width: stop.w, height: stop.h }}
                        />
                        <p className="w-full truncate text-center text-[10px] leading-[15px] text-[#131b2e]">
                          {stop.label}
                        </p>
                        <img
                          src="/icons/concessao-check.svg"
                          alt=""
                          className="h-[7px] w-[9.5px]"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Associated Reward Package Breakdown */}
                <div className="flex w-full flex-col rounded-lg bg-gradient-to-r from-[#f2f3ff] to-white p-4">
                  <div className="flex w-full items-center gap-4">
                    <div className="relative size-24 shrink-0 overflow-clip rounded-[4px] bg-[#002f19] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
                      <img
                        src="/images/concessao-kit-souvenir.png"
                        alt="Kit Souvenir Amazônia Viva"
                        className="absolute left-[-41.76%] top-0 h-full w-[183.51%] max-w-none"
                      />
                      <div className="absolute bottom-1 right-1 rounded-[2px] bg-[#002f19] px-1">
                        <span className="text-[10px] leading-[15px] text-white">
                          KIT #04
                        </span>
                      </div>
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col items-start">
                      <div className="flex w-full items-center justify-between">
                        <span className="text-[11px] font-semibold uppercase leading-[14px] tracking-[0.275px] text-[#396285]">
                          Brinde Conquistado
                        </span>
                        <span className="text-[11px] font-medium leading-[14px] tracking-[0.44px] text-[#414942]">
                          SKU: BRN-AMZ-2024
                        </span>
                      </div>
                      <h3 className="w-full text-[20px] font-bold leading-[25px] tracking-[-0.2px] text-[#131b2e]">
                        Kit Souvenir Amazônia Viva
                      </h3>
                      <p className="w-full pt-1 text-[12px] leading-4 tracking-[0.12px] text-[#414942]">
                        1x Ecobag de Fibra de Juta Sustentável • 1x Garrafa
                        Térmica Ecológica 500ml • 1x Pin Esmaltado Cúpula do
                        Teatro Amazonas
                      </p>
                      <div className="flex w-full items-center gap-4 pt-4">
                        <img
                          src="/icons/concessao-stock.svg"
                          alt=""
                          className="h-[13.33px] w-[13.03px] shrink-0"
                        />
                        <p className="text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#131b2e]">
                          Estoque Físico no
                          <br />
                          CAT Largo:
                        </p>
                        <p className="text-[11px] font-bold leading-[14px] tracking-[0.44px] text-[#002f19]">
                          42
                          <br />
                          unidades
                        </p>
                        <p className="text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#414942]">
                          (Estoque Central
                          <br />
                          Manauscult: 310 un.)
                        </p>
                      </div>
                    </div>
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
                        Conferi que o portador do voucher corresponde aos dados
                        de Lucas M. Ferreira.
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
                        Itens físicos do kit verificados e lacrados
                      </p>
                      <p className="text-[12px] leading-4 tracking-[0.12px] text-[#414942]">
                        Ecobag de fibra de juta, garrafa térmica e pin oficial
                        devidamente conferidos em perfeito estado.
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Terminal Actions */}
              <div className="flex w-full items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setToastVisible(true)}
                  className="flex min-h-12 min-w-0 flex-1 items-center justify-center gap-2 rounded-[4px] bg-[#002f19] py-2 pr-[12.5px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]"
                >
                  <img
                    src="/icons/concessao-confirm.svg"
                    alt=""
                    className="h-[18.33px] w-[16.5px] shrink-0"
                  />
                  <span className="text-center text-base font-semibold leading-6 text-white">
                    Confirmar Concessão e Dar Baixa no Estoque
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setToastVisible(false)}
                  className="flex h-12 shrink-0 items-center justify-center rounded-[4px] bg-[#eaedff] px-4 pt-[13.5px] pb-[14.5px]"
                >
                  <span className="whitespace-nowrap text-[14px] font-semibold leading-5 tracking-[0.14px] text-[#414942]">
                    Cancelar / Estornar
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Redemptions / Audit Log of Current Shift */}
        <div className="mt-8 flex w-full flex-col rounded-lg bg-white p-4 shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05)]">
          <div className="flex w-full items-center justify-between pb-2">
            <div className="flex items-center gap-2">
              <img
                src="/icons/concessao-history.svg"
                alt=""
                className="size-[16.5px]"
              />
              <h2 className="text-base font-semibold leading-6 text-[#131b2e]">
                Histórico Recente de Concessões deste Turno
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#414942]">
                Exibindo os últimos 5 resgates • Log Auditoria ManausGov
              </span>
              <button
                type="button"
                className="flex items-center gap-1"
              >
                <img
                  src="/icons/concessao-export.svg"
                  alt=""
                  className="size-[10.67px]"
                />
                <span className="text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#002f19]">
                  Exportar Relatório do Turno
                </span>
              </button>
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
              {REDEMPTIONS.map((row, rowIndex) => (
                <div
                  key={row.code.join("")}
                  className={`flex w-full items-start border-t border-[#f2f3ff] pt-px ${
                    rowIndex === REDEMPTIONS.length - 1 ? "" : "-mb-px"
                  }`}
                >
                  <div style={{ width: TABLE_COLS[0].w }} className="px-2 py-[21px]">
                    <p className="whitespace-nowrap text-[13px] font-medium leading-[18px] tracking-[0.26px] text-[#414942]">
                      {row.time}
                    </p>
                  </div>
                  <div style={{ width: TABLE_COLS[1].w }} className="px-2 py-[13px]">
                    <p className="whitespace-nowrap text-[13px] font-semibold leading-[18px] tracking-[0.26px] text-[#002f19]">
                      <Lines lines={row.code} />
                    </p>
                  </div>
                  <div style={{ width: TABLE_COLS[2].w }} className="px-2 py-[12px]">
                    <p className="text-[12px] font-semibold leading-4 tracking-[0.24px] text-[#131b2e]">
                      <Lines lines={row.visitor} />
                    </p>
                    <p className="whitespace-nowrap text-[12px] leading-4 tracking-[0.12px] text-[#414942]">
                      <Lines lines={row.origin} />
                    </p>
                  </div>
                  <div style={{ width: TABLE_COLS[3].w }} className="px-2 py-[19.5px]">
                    <p className="whitespace-nowrap text-[12px] leading-4 tracking-[0.12px] text-[#414942]">
                      <Lines lines={row.route} />
                    </p>
                  </div>
                  <div style={{ width: TABLE_COLS[4].w }} className="px-2 py-[20px]">
                    <div className="inline-flex items-center gap-1 rounded-[2px] bg-[#eaedff] py-[2px] pl-2 pr-[19.66px]">
                      <img
                        src="/icons/concessao-gift.svg"
                        alt=""
                        className="h-[11.08px] w-[11.67px] shrink-0"
                      />
                      <span className="whitespace-nowrap text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#131b2e]">
                        <Lines lines={row.reward} />
                      </span>
                    </div>
                  </div>
                  <div style={{ width: TABLE_COLS[5].w }} className="px-2 py-[19.5px]">
                    <p className="whitespace-nowrap text-[12px] leading-4 tracking-[0.12px] text-[#414942]">
                      <Lines lines={row.operator} />
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
                      <img
                        src="/icons/concessao-receipt.svg"
                        alt=""
                        className="h-[15px] w-[13.5px]"
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Success Toast — Operational Delivery Modal Confirmation State */}
      {toastVisible && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className="flex items-center gap-4 rounded-lg border border-[rgba(182,240,200,0.3)] bg-[#002f19] p-[17px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)]">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#b6f0c8]">
              <img
                src="/icons/concessao-toast-check.svg"
                alt=""
                className="h-[12px] w-[21.9px]"
              />
            </div>
            <div className="flex flex-col">
              <p className="whitespace-nowrap text-[14px] font-bold leading-5 tracking-[0.14px] text-white">
                Resgate Confirmado com Sucesso!
              </p>
              <p className="whitespace-nowrap text-[12px] leading-4 tracking-[0.12px] text-[#9ad3ad]">
                Baixa de 1 Kit Amazônia Viva registrada. Comprovante fiscal
                municipal gerado.
              </p>
            </div>
            <button
              type="button"
              aria-label="Fechar aviso"
              onClick={() => setToastVisible(false)}
              className="shrink-0 pl-2 pb-[6px]"
            >
              <img
                src="/icons/concessao-toast-close.svg"
                alt=""
                className="size-[11.67px]"
              />
            </button>
          </div>
        </div>
      )}
    </AppShell>
  );
}