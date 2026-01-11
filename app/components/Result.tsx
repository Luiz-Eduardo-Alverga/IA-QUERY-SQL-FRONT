'use client';

import { useState } from 'react';

interface QueryResult {
  success: boolean;
  sql: string;
  explanation: string;
  confidence: number;
  generatedIn: string;
}

interface ResultProps {
  result: QueryResult | null;
  isLoading?: boolean;
  error?: string | null;
}

function formatSQL(sql: string) {
  return sql
    .replace(/\b(SELECT)\b/gi, '$1\n ')
    .replace(/\b(FROM|WHERE|INNER JOIN|LEFT JOIN|RIGHT JOIN|JOIN|GROUP BY|ORDER BY|HAVING|LIMIT)\b/gi, '\n$1')
    .replace(/,(?=(?:[^']*'[^']*')*[^']*$)/g, ',\n ') 
    .replace(/\b(AND|OR|ON)\b/gi, '\n  $1')
    .trim();
}

// Função para fazer syntax highlighting do SQL
function highlightSQL(sql: string) {
  const formatted = formatSQL(sql);
  
  const keywords = /\b(SELECT|FROM|WHERE|JOIN|INNER|LEFT|RIGHT|ON|AND|OR|ORDER BY|GROUP BY|HAVING|LIMIT|AS|DISTINCT|COUNT|SUM|AVG|MAX|MIN|IN|BETWEEN|IS|NULL|NOT|DESC|ASC)\b/gi;
  const functions = /\b(DATE_SUB|CURDATE|NOW|DATE_FORMAT|CONCAT|COALESCE|IFNULL|CAST)\b/gi;
  const strings = /'[^']*'/g;
  const tableAliases = /\b([a-z]\d?)\./gi; // Captura alias como p.nome, e.fantasia

  return formatted
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") // Escape de HTML
    .replace(strings, (match) => `<span class="text-amber-600 dark:text-emerald-400">${match}</span>`)
    .replace(keywords, (match) => `<span class="text-blue-600 dark:text-sky-400 font-bold">${match.toUpperCase()}</span>`)
    .replace(functions, (match) => `<span class="text-purple-600 dark:text-purple-400">${match.toUpperCase()}</span>`)
    .replace(tableAliases, (match) => `<span class="text-white ">${match}</span>`);
}
export default function Result({ result, isLoading, error }: ResultProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (result?.sql) {
      try {
        await navigator.clipboard.writeText(result.sql);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Erro ao copiar:', err);
      }
    }
  };

  if (isLoading) {
    return (
      <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.06)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.3)] border border-gray-200 dark:border-gray-700 overflow-hidden mb-12">
        <div className="px-8 py-6 border-b border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Resultado</h3>
        </div>
        <div className="px-8 py-12">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-red-50 dark:bg-red-900/20 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-red-200 dark:border-red-800 overflow-hidden mb-12">
        <div className="px-8 py-6">
          <h3 className="text-lg font-bold text-red-800 dark:text-red-400 mb-2">
            Erro ao processar consulta
          </h3>
          <p className="text-red-600 dark:text-red-300">{error}</p>
        </div>
      </section>
    );
  }

  if (!result) {
    return null;
  }

  return (
    <section className="bg-white dark:bg-[#1B2538] rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.06)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.3)] border border-gray-200 dark:border-[#1B2538] overflow-hidden mb-12">
      {/* Card Header */}
      <div className="px-8 py-6 dark:bg-[#13182A]  border-b border-gray-200 dark:border-[#1B2538]">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Resultado</h3>
      </div>

      {/* Explanation */}
      <div className="px-8 py-6">
        <div className="flex items-center gap-2 mb-3">
          <i className="fa-regular fa-lightbulb text-yellow-500 text-sm"></i>
          <span className="text-xs font-bold text-gray-400 dark:text-gray-500 tracking-wider uppercase">
            Explicação
          </span>
        </div>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
          {result.explanation}
        </p>
      </div>

      {/* Generated SQL */}
      <div className="px-8 pb-6">
        <div className="flex items-center gap-2 mb-3">
          <i className="fa-solid fa-code text-blue-500 text-sm"></i>
          <span className="text-xs font-bold text-gray-400 dark:text-gray-500 tracking-wider uppercase">
            SQL Gerado
          </span>
        </div>

        <div className="bg-[#F8FAFC] dark:bg-gray-900 border border-gray-200 dark:border-[#1B2538] rounded-lg overflow-hidden">
          {/* Code Header */}
          <div className="flex items-center justify-between px-4 py-2 bg-[#F1F5F9] dark:bg-[#0E1727]">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">SQL Query</span>
            <button
              onClick={handleCopy}
              className={`flex items-center gap-1.5 text-xs font-medium border px-2 py-1.5 rounded shadow-sm transition-all ${
                copied
                  ? 'text-green-600 border-green-200 bg-green-50 dark:text-[#059669] dark:border-green-800 dark:bg-[#D1FAE5]'
                  : 'text-gray-900 hover:text-gray-800 dark:text-white dark:hover:text-gray-200 bg-white hover:bg-gray-50 dark:bg-transparent dark:hover:bg-gray-700 border-gray-200 dark:border-[#1B2538]'
              }`}
            >
              {copied ? (
                <>
                  <i className="fa-solid fa-check"></i>
                  Copiado!
                </>
              ) : (
                <>
                  <i className="fa-regular fa-copy"></i>
                  Copiar
                </>
              )}
            </button>
          </div>

          {/* Code Content */}
          <div className="p-5 overflow-x-auto">
            <pre className="font-mono text-sm leading-6 text-gray-800 dark:text-gray-200 dark:bg-[#0F172A]">
              <code
                dangerouslySetInnerHTML={{
                  __html: highlightSQL(result.sql),
                }}
              />
            </pre>
          </div>
        </div>
      </div>

      {/* Footer Stats */}
      <div className="px-8 py-4 bg-gray-50 dark:bg-[#0E1727] border-t border-gray-100 dark:border-gray-700 flex items-center gap-6 flex-wrap">
        <div className="flex items-center gap-2">
          <i className="fa-solid fa-arrow-trend-up text-gray-400 dark:text-gray-500 text-xs"></i>
          <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">Confiança:</span>
          <span className="inline-flex items-center px-2 py-0.5 rounded-sm text-xs font-bold bg-green-100 dark:bg-[#D1FAE5] text-green-700 dark:text-[#059669] border border-green-200 dark:border-green-800">
            {(result.confidence * 100).toFixed(0)}%
          </span>
        </div>
        <div className="flex items-center gap-2">
          <i className="fa-regular fa-clock text-gray-400 dark:text-gray-500 text-xs"></i>
          <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">Tempo:</span>
          <span className="inline-flex items-center px-2 py-0.5 rounded-sm text-xs font-bold bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300  ">
            {result.generatedIn}
          </span>
        </div>
      </div>
    </section>
  );
}
