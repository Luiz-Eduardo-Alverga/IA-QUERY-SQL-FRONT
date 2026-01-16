'use client';

import { useQuery } from '@tanstack/react-query';
import { getTables } from '@/services/get-tables';
import { Table } from "lucide-react";
import { DialogTitle, DialogContent} from '@/components/ui/dialog';
import Image from "next/image";
import { useTheme } from 'next-themes';
import { Skeleton } from '@/components/ui/skeleton';

interface TableDialogContentProps {
  mounted: boolean;
  isTablesDialogOpen: boolean;
  setIsTablesDialogOpen?: (isTablesDialogOpen: boolean) => void;
}

export default function TablesDialogContent({ mounted, isTablesDialogOpen }: TableDialogContentProps) {
  const {theme} = useTheme()
  const { data, isLoading } = useQuery({
    queryKey: ['tables'],
    queryFn: getTables,
    enabled: isTablesDialogOpen,
  });

  

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

        {isLoading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <Skeleton
              key={index}
              className="w-full h-16 mb-3"
            />
          ))  
        ): (
          <div className="max-h-[400px] overflow-y-auto pr-2 mb-5">
          {tables && tables.length === 0 ? (
            <div className="text-center py-8 text-sm text-gray-500 dark:text-gray-400">
             Erro ao buscar tabelas
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
        )}
        
        {/* Footer */}
        <div className="mt-5 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center text-sm">
          <div className="text-gray-500 dark:text-gray-400">

            {isLoading ? 
                <Skeleton className="w-16 h-4" /> 
            :
                <span className="text-[#111827] dark:text-white">Total de tabelas: : <b>{count}</b></span>
            }
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
