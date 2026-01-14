'use client';

import { useQuery } from '@tanstack/react-query';
import { getTables } from '@/services/get-tables';
import { Table } from "lucide-react";
import { DialogTitle, DialogContent} from '@/components/ui/dialog';
import Image from "next/image";
import { useTheme } from 'next-themes';

interface TableDialogContentProps {
  mounted: boolean;
}

export default function TablesDialogContent({ mounted }: TableDialogContentProps) {
  const {theme} = useTheme()
  const { data,  error } = useQuery({
    queryKey: ['tables'],
    queryFn: getTables,
  });

  if (error) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center py-12">
          <div className="text-sm text-red-500">Erro ao carregar tabelas</div>
        </div>
      </div>
    );
  }

  const tables = data?.tables || [];
  const count = data?.count || 0;

  return (
    <DialogContent className='dark:bg-[#1B2538] bg-white dark:border-[#1B2538] border-gray-200 sm:max-w-[500px] max-h-[90vh] overflow-auto'>
      <div className="w-full max-w-[500px]">
        {/* Header */}
        <DialogTitle className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2.5">
            <Table className="w-6 h-6 text-[#111827] dark:text-white" />
            <span className="text-xl font-bold text-[#111827] dark:text-white">
              Tabelas Mapeadas
            </span>
          </div>
        </DialogTitle>

        {/* Subtitle */}
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-5 pb-4 border-b border-gray-200 dark:border-gray-700">
          Lista de tabelas disponíveis para geração de consultas SQL
        </div>

        {/* Table List */}
        <div className="max-h-[400px] overflow-y-auto pr-2 mb-5">
          {tables.length === 0 ? (
            <div className="text-center py-8 text-sm text-gray-500 dark:text-gray-400">
              Nenhuma tabela encontrada
            </div>
          ) : (
            tables.map((table) => (
              <div
                key={table.name}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 mb-3 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50"
              >
                <span className="font-bold text-sm block mb-1 text-[#111827] dark:text-white">
                  {table.name}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {table.description}
                </span>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="mt-5 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center text-sm">
          <div className="text-gray-500 dark:text-gray-400">
            Total de tabelas: <b className="text-[#111827] dark:text-white">{count}</b>
          </div>
          
          {mounted && (
            theme === 'dark' ? (
              <Image src="/images/logotemadark.svg" alt="Softcom Logo" width={150} height={30} />
            ) : (
              <Image src="/images/logotemaclaro.svg" alt="Softcom Logo" width={150} height={30} />
            )
          )}
        </div>
      </div>
    </DialogContent>
  );
}
