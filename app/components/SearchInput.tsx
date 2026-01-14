/* eslint-disable react-hooks/incompatible-library */
'use client';

import { useEffect, KeyboardEvent } from 'react';
import { useForm } from 'react-hook-form';

interface SearchFormData {
  query: string;
}

interface SearchInputProps {
  onSubmit: (query: string) => void;
  isLoading?: boolean;
}

export default function SearchInput({ onSubmit, isLoading }: SearchInputProps) {
  const { register, handleSubmit, reset , watch, setFocus} = useForm<SearchFormData>();

  const queryValue =  watch('query');

  useEffect(() => {
    setFocus('query');
  }, [setFocus]);

  const onFormSubmit = (data: SearchFormData) => {
    if (data.query.trim()) {
      onSubmit(data.query);
      reset();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Impede a quebra de linha padrão
      if (!isLoading && queryValue && queryValue.trim() !== '') {
        handleSubmit(onFormSubmit)(); // Dispara o envio do formulário
      }
    }
  };

  return (
    <section className="w-full">
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <div className="bg-white dark:bg-[#1B2538] rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.2)] border border-gray-200 dark:border-[#1B2538] p-1 relative group focus-within:ring-2 focus-within:ring-blue-100 dark:focus-within:ring-blue-900 focus-within:border-blue-300 dark:focus-within:border-blue-600 transition-all duration-200">
          <textarea
            {...register('query')}
            onKeyDown={handleKeyDown}
            className="w-full h-32 p-5 pr-16 resize-none outline-none text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 bg-transparent rounded-xl text-base leading-relaxed"
            placeholder="Ex: Me traga todos os usuários ativos..."
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !queryValue || queryValue.trim() === ''}
            className="absolute bottom-4 right-4 bg-slate-900 dark:bg-accent-yellow hover:bg-slate-800 dark:hover:bg-slate-700 text-white w-10 h-10 rounded-lg flex items-center justify-center transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <i className="fa-solid fa-spinner fa-spin text-sm"></i>
            ) : (
              <i className="fa-solid fa-paper-plane text-sm"></i>
            )}
          </button>
        </div>
      </form>
    </section>
  );
}

