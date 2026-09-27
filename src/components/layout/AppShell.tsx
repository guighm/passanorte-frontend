import type { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

type AppShellProps = {
  breadcrumb?: string;
  children: ReactNode;
};

export function AppShell({ breadcrumb, children }: AppShellProps) {
  return (
    <div className="flex min-h-screen w-full bg-[#f7f8ff]">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header breadcrumb={breadcrumb} />
        <main className="flex min-w-0 flex-1 flex-col">
          <div className="flex w-full max-w-[1024px] flex-col self-center px-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}