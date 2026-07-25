import { apiClient } from './apiClient';
import type { BadgeTone } from '../components/Badge';

export type MarcaStatus = 'Ativa' | 'Inativa';

const MARCA_STATUS_TONE: Record<MarcaStatus, BadgeTone> = {
  Ativa: 'success',
  Inativa: 'neutral',
};

export function marcaStatusTone(status: MarcaStatus): BadgeTone {
  return MARCA_STATUS_TONE[status];
}

export type Marca = {
  id: number;
  nome: string;
  status: MarcaStatus;
  contato_nome: string | null;
  contato_email: string | null;
  contato_telefone: string | null;
  cnpj: string | null;
};

export type MarcaFormValues = {
  nome: string;
  contato_nome: string;
  contato_email: string;
  contato_telefone: string;
  cnpj: string;
};

type MarcaResponse = { data: Marca };
type PageMeta = { current_page: number; last_page: number; total: number };
type MarcasListResponse = { data: Marca[]; meta?: PageMeta };

export type ListMarcasParams = {
  status?: MarcaStatus;
  page?: number;
};

export async function listMarcas(params?: ListMarcasParams): Promise<Marca[]> {
  const response = await apiClient.get<MarcasListResponse>('/marcas', { params });
  return response.data.data;
}

export async function listMarcasPage(
  params?: ListMarcasParams,
): Promise<{ data: Marca[]; meta?: PageMeta }> {
  const response = await apiClient.get<MarcasListResponse>('/marcas', { params });
  return response.data;
}

export async function getMarca(id: string | number): Promise<Marca> {
  const response = await apiClient.get<MarcaResponse>(`/marcas/${id}`);
  return response.data.data;
}

export async function createMarca(values: Partial<MarcaFormValues>): Promise<Marca> {
  const response = await apiClient.post<MarcaResponse>('/marcas', values);
  return response.data.data;
}

export async function updateMarca(
  id: string | number,
  values: Partial<MarcaFormValues>,
): Promise<Marca> {
  const response = await apiClient.patch<MarcaResponse>(`/marcas/${id}`, values);
  return response.data.data;
}
