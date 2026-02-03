import { api } from "@/lib/services/api";
import { KabinetResponse } from "@/lib/types/interface";

export const getKabinetDisplay = async (id: string): Promise<KabinetResponse> => {
  const { data } = await api.get(`/api/display/kabinet/${id}`);
  return data;
};