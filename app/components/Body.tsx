'use client';

import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import Title from './Title';
import SearchInput from './SearchInput';
import Result from './Result';

interface QueryResponse {
  success: boolean;
  sql: string;
  explanation: string;
  confidence: number;
  generatedIn: string;
}

export default function Body() {
  const mutation = useMutation({
    mutationFn: async (userQuery: string): Promise<QueryResponse> => {
      const response = await axios.post<QueryResponse>(
        'http://localhost:3001/api/query',
        { question: userQuery }
      );
      return response.data;
    },
  });

  const handleSearch = (searchQuery: string) => {
    mutation.mutate(searchQuery);
  };

  return (
    <main className="flex-1 overflow-y-auto bg-[#F9FAFB] dark:bg-[#0F172A] mt-16">
      <div className="max-w-4xl mx-auto px-6 py-12 flex flex-col gap-8">
        <Title />
        <SearchInput onSubmit={handleSearch} isLoading={mutation.isPending} />
        <Result
          result={mutation.data || null}
          isLoading={mutation.isPending}
          error={mutation.error ? 'Erro ao processar a consulta. Tente novamente.' : null}
        />
      </div>
    </main>
  );
}

