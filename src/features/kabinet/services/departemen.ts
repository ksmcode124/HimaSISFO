import { api } from "@/lib/services/api";
import { DepartemenResponse } from "@/lib/types/interface";

export const getDepartemenDetail = async (id: string): Promise<DepartemenResponse> => {
  const { data } = await api.get(`/api/display/departemen/${id}`);
  return data;
};