import { api } from "@/lib/axios";

interface Table {
  name: string;
  description: string;
}

interface TablesResponse {
  success: boolean;
  tables: Table[];
  count: number;
}

export async function getTables() {
  const response = await api.get<TablesResponse>('/schema/tables');
  
  return response.data;
}