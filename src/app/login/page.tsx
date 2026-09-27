"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push("/dashboard");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f2f3ff] px-4 py-[64px]">
      <div className="flex w-full max-w-[576px] flex-col">
        {/* Institutional emblem */}
        <div className="flex flex-col items-center pb-6">
          <div className="relative flex size-20 items-center justify-center overflow-hidden rounded-lg bg-[#002f19] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]">
            <div
              aria-hidden
              className="absolute inset-0 opacity-90"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, rgb(13, 71, 43) 0%, rgb(0, 47, 25) 100%)",
              }}
            />
            <img
              src="/images/passanorte-logo-mono.png"
              alt="PassaNorte"
              className="relative size-full mix-blend-multiply"
            />
          </div>
          <div className="mt-4 flex items-center gap-1 rounded-xl bg-[#eaedff] px-3 py-1">
            <img src="/icons/login-badge-gov.svg" alt="" className="size-[12.5px]" />
            <span className="text-[11px] font-semibold uppercase leading-[14px] tracking-[0.55px] text-[#396285]">
              Prefeitura de Manaus • Manauscult
            </span>
          </div>
          <h1 className="mt-[5px] text-center text-2xl font-semibold leading-8 tracking-[-0.6px] text-[#131b2e]">
            Passa<span className="font-normal text-[#0d472b]">Norte</span>
          </h1>
          <p className="mt-1 text-center text-[12px] font-semibold uppercase leading-4 tracking-[1.2px] text-[#396285]">
            Gestão Pública de Turismo • Painel de Controle
          </p>
        </div>

        {/* Authentication card */}
        <form
          onSubmit={handleSubmit}
          className="mt-6 overflow-hidden rounded-lg bg-white shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)]"
        >
          {/* Authority top bar */}
          <div className="flex w-full items-center justify-between bg-[#002f19] px-6 py-2">
            <div className="flex items-center gap-2">
              <img src="/icons/login-shield.svg" alt="" className="h-[15px] w-3" />
              <span className="text-[11px] font-semibold leading-[14px] tracking-[0.275px] text-white">
                CANAL AUTENTICADO • REDE INTRANET / VPN
              </span>
            </div>
            <span className="rounded-[2px] bg-[rgba(13,71,43,0.6)] px-2 py-[2px] text-[13px] font-medium leading-[18px] tracking-[0.26px] text-[#b6f0c8]">
              SSL 256-BIT
            </span>
          </div>

          <div className="flex w-full flex-col items-start gap-4 p-8">
            {/* Header text */}
            <div className="flex w-full flex-col gap-1">
              <h2 className="text-xl font-semibold leading-7 tracking-[-0.2px] text-[#131b2e]">
                Acesso Restrito ao Sistema Administrativo
              </h2>
              <p className="text-[14px] leading-5 text-[#414942]">
                Ambiente exclusivo para servidores públicos municipais e
                operadores credenciados de postos turísticos.
              </p>
            </div>

            {/* LGPD callout */}
            <div className="flex w-full items-start gap-2 rounded-[4px] bg-[#eaedff] p-4">
              <img
                src="/icons/login-info.svg"
                alt=""
                className="h-[18.67px] w-[16.67px] shrink-0"
              />
              <p className="text-[12px] leading-[19.5px] tracking-[0.12px] text-[#414942]">
                <strong className="font-bold text-[#131b2e]">
                  Aviso Institucional:
                </strong>{" "}
                O uso deste terminal é monitorado e auditado conforme a LGPD
                (Lei 13.709/2018) e o Decreto Municipal de Segurança Digital.
                Credenciais intransferíveis concedidas pela CTI/Manauscult.
              </p>
            </div>

            {/* Matrícula field */}
            <div className="flex w-full flex-col gap-[6px] pt-1">
              <div className="flex w-full items-center justify-between">
                <label
                  htmlFor="matricula"
                  className="text-[12px] font-semibold leading-4 tracking-[0.24px] text-[#131b2e]"
                >
                  Matrícula Funcional / Usuário Gov
                </label>
                <span className="text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#396285]">
                  Obrigatório
                </span>
              </div>
              <div className="relative flex w-full">
                <input
                  id="matricula"
                  name="matricula"
                  type="text"
                  placeholder="Ex: 948.204-1A ou nome.sobrenome"
                  className="w-full rounded-[4px] bg-[#f2f3ff] pb-3 pl-10 pr-4 pt-[11px] text-[14px] text-[#131b2e] placeholder:text-[rgba(113,121,114,0.7)] focus:outline-2 focus:outline-[#0d472b]"
                />
                <img
                  src="/icons/login-badge-id.svg"
                  alt=""
                  className="absolute left-[13.67px] top-[11.67px] size-[16.67px]"
                />
              </div>
            </div>

            {/* Password field */}
            <div className="flex w-full flex-col gap-[6px]">
              <div className="flex w-full items-center justify-between">
                <label
                  htmlFor="senha"
                  className="text-[12px] font-semibold leading-4 tracking-[0.24px] text-[#131b2e]"
                >
                  Chave de Acesso / Senha
                </label>
                <span className="text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#396285]">
                  Mínimo 8 caracteres
                </span>
              </div>
              <div className="relative flex w-full">
                <input
                  id="senha"
                  name="senha"
                  type={showPassword ? "text" : "password"}
                  placeholder="Insira sua senha institucional"
                  className="w-full rounded-[4px] bg-[#f2f3ff] pb-3 pl-[40px] pr-11 pt-[11px] text-[14px] text-[#131b2e] placeholder:text-[rgba(113,121,114,0.7)] focus:outline-2 focus:outline-[#0d472b]"
                />
                <img
                  src="/icons/login-lock.svg"
                  alt=""
                  className="absolute left-[15.33px] top-[10.83px] h-[17.5px] w-[13.33px]"
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute right-[10px] top-[6px] rounded-[2px] p-1"
                >
                  <img
                    src="/icons/login-eye.svg"
                    alt=""
                    className="h-[12.5px] w-[18.33px]"
                  />
                </button>
              </div>
            </div>

            {/* Lotação selector */}
            <div className="flex w-full flex-col gap-[6px]">
              <label
                htmlFor="lotacao"
                className="text-[12px] font-semibold leading-4 tracking-[0.24px] text-[#131b2e]"
              >
                Lotação / Ponto de Operação
              </label>
              <div className="relative flex w-full">
                <select
                  id="lotacao"
                  name="lotacao"
                  defaultValue="sede"
                  className="w-full appearance-none rounded-[4px] bg-[#f2f3ff] py-[10px] pl-10 pr-9 text-[14px] leading-5 text-[#131b2e] focus:outline-2 focus:outline-[#0d472b]"
                >
                  <option value="sede">
                    Sede Manauscult • Diretoria de Planejamento e Inteligência
                  </option>
                </select>
                <img
                  src="/icons/login-building.svg"
                  alt=""
                  className="absolute left-[13.65px] top-[12.5px] h-[15px] w-[16.75px]"
                />
                <img
                  src="/icons/login-chevron-down.svg"
                  alt=""
                  className="absolute right-3 top-[10px] h-[6.17px] w-[10px]"
                />
              </div>
            </div>

            {/* Remember checkbox */}
            <label className="flex w-full items-center gap-2 pt-1">
              <input
                type="checkbox"
                className="size-4 shrink-0 appearance-none rounded-[2.5px] border border-[#767676] bg-white checked:border-[#0d472b] checked:bg-[#0d472b]"
              />
              <span className="text-[12px] leading-4 tracking-[0.12px] text-[#414942]">
                Lembrar credencial nesta estação de trabalho certificada
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-[4px] bg-[#0d472b] px-4 py-3 shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] hover:bg-[#002f19]"
            >
              <img src="/icons/login-arrow.svg" alt="" className="size-[15px]" />
              <span className="text-[14px] font-semibold leading-5 tracking-[0.14px] text-white">
                Entrar no Painel
              </span>
            </button>

            {/* Support */}
            <div className="flex w-full flex-col items-center gap-[5.5px] pt-5">
              <p className="text-[12px] leading-4 tracking-[0.12px] text-[#414942]">
                Esqueceu a chave de acesso ou necessita de nova credencial?
              </p>
              <a
                href="#"
                className="flex items-center gap-1 text-[12px] font-semibold leading-4 tracking-[0.24px] text-[#396285] underline decoration-[#c0c9c0] underline-offset-2"
              >
                <img
                  src="/icons/login-help.svg"
                  alt=""
                  className="h-[13.33px] w-[11.33px]"
                />
                Contatar Central de Suporte SEMAD / Manauscult
              </a>
            </div>
          </div>

          {/* Security stamp footer */}
          <div className="flex w-full items-center justify-between bg-[#eaedff] px-6 py-2">
            <span className="text-[11px] font-semibold leading-[14px] tracking-[0.275px] text-[#396285]">
              SISTEMA RESTRITO AO QUADRO DE SERVIDORES
            </span>
            <div className="flex items-center gap-1">
              <img
                src="/icons/login-lock-small.svg"
                alt=""
                className="h-[12.25px] w-[9.33px]"
              />
              <span className="text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#396285]">
                Cadastro público desabilitado
              </span>
            </div>
          </div>
        </form>

        {/* Civic footer */}
        <footer className="mt-8 flex flex-col items-center gap-1 text-center">
          <p className="text-[13px] font-medium leading-[18px] tracking-[0.26px] text-[#396285]">
            PassaNorte v2.4.0&ensp;•&ensp;SIIT-M • Sistema Integrado de
            Inteligência Turística&ensp;•&ensp;Módulo Servidor
          </p>
          <p className="pt-[2px] text-[12px] leading-4 tracking-[0.12px] text-[#414942]">
            Central de Atendimento TI:{" "}
            <span className="text-[#131b2e]">(92) 3215-0000</span> • Horário de
            Operação: 24h/CATs
          </p>
          <p className="pt-1 text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#717972]">
            © 2025 Fundação Municipal de Cultura, Turismo e Eventos •
            Prefeitura de Manaus
          </p>
        </footer>
      </div>
    </div>
  );
}