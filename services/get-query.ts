import { api } from "@/lib/axios";

interface QueryResponse {
    success: boolean;
    sql: string;
    explanation: string;
    confidence: number;
    generatedIn: string;
  }

export async function getQuery(question: string) {
  const response = await api.post<QueryResponse>('/query', { question });

  return response.data;
}