import { apiClient } from './apiClient';
import type { AuthUser } from './auth';

export type UpdateProfileValues = {
  name: string;
  current_password?: string;
  password?: string;
  password_confirmation?: string;
};

type MeResponse = { data: AuthUser };

export async function updateProfile(values: UpdateProfileValues): Promise<AuthUser> {
  const response = await apiClient.patch<MeResponse>('/me', values);
  return response.data.data;
}
