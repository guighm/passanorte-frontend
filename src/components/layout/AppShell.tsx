"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

type AppShellProps = {
  breadcrumb?: string;
  children: ReactNode;
};

export function AppShell({ breadcrumb, children }: AppShellProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Fecha com Escape e trava o scroll do body enquanto o drawer está aberto (< lg).
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDrawerOpen(false);
    };
    if (drawerOpen) {
      document.addEventListener("keydown", onKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  return (
    <div className="flex min-h-screen w-full bg-[#f7f8ff]">
      <Sidebar open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      {drawerOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          aria-hidden="true"
          onClick={() => setDrawerOpen(false)}
        />
      )}
      <div className="flex min-w-0 flex-1 flex-col">
        <Header
          breadcrumb={breadcrumb}
          onMenuClick={() => setDrawerOpen(true)}
        />
        <main className="flex min-w-0 flex-1 flex-col">
          <div className="flex w-full max-w-[1400px] flex-col self-center px-4 md:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}