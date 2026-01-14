'use client';

import { useMutation } from '@tanstack/react-query';
import Title from './Title';
import SearchInput from './SearchInput';
import Result from './Result';
import { getQuery } from '@/services/get-query';

export default function Body() {
  const {mutateAsync, data, isPending,  error} = useMutation({
    mutationFn: getQuery,
  })

  const handleSearch = (searchQuery: string) => {
    mutateAsync(searchQuery);
  };

  return (
    <main className="flex-1 overflow-y-auto bg-[#F9FAFB] dark:bg-[#0F172A] mt-16">
      <div className="max-w-4xl mx-auto px-6 py-12 flex flex-col gap-8">
        <Title />
        <SearchInput onSubmit={handleSearch} isLoading={isPending} />
        <Result
          result={data || null}
          isLoading={isPending}
          error={error ? 'Erro ao processar a consulta. Tente novamente.' : null}
        />
      </div>
    </main>
  );
}

