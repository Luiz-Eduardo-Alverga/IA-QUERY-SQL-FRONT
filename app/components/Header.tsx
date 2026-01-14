'use client';

import Image from "next/image";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Table } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog";
import TablesDialogContent from "./TablesDialogContent";

export default function Header() {
  const {theme} = useTheme()
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return (
    <header className="dark:bg-surface-card bg-white border-b dark:border-surface-card h-16 fixed top-0 left-0 right-0 z-50 w-full">
      <div className="w-full h-full px-6 flex items-center justify-between">
        {/* Left: Logo & Title */}
        <div className="flex items-center gap-3">
          <div className=" bg-slate-900 dark:bg-white dark:text-slate-900 text-white w-9 h-9 rounded-lg flex items-center justify-center shadow-sm">
            {mounted && (
              theme === 'dark' ? (
                <Image src="/images/vectordark.png" alt="Logo" width={15} height={15}   />
              ) : (
                <Image src="/images/vectorlight.png" alt="Logo" width={15} height={15}   />
              )
            )}
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="text-sm font-bold dark:text-white text-text-primary-dark leading-tight">
              Arquiteto de Consultas
            </h1>
            <span className="text-xs text-gray-400 font-light">
              Simplificando o acesso a dados para o suporte Softcom
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {mounted && (
            theme === 'dark' ? (
              <Image src="/images/logotemadark.svg" alt="Softcom Logo" width={150} height={30} />
            ) : (
              <Image src="/images/logotemaclaro.svg" alt="Softcom Logo" width={150} height={30} />
            )
          )}

          <ThemeToggle />

          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-slate-100 text-slate-900 dark:bg-surface-primary dark:text-white hover:bg-slate-200 dark:hover:bg-surface-primary/80">
                <Table className="w-4 h-4" />
                <span className="text-xs">Tabelas Mapeadas</span>
              </Button>
            </DialogTrigger>

            <TablesDialogContent mounted={mounted} />
          </Dialog>
        </div>
        
      </div>
    </header>
  );
}

