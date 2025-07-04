import { useMemo } from "react";
import { SERVICES } from "@/constants/services";
import { Service } from "@/types/service";

export function useServices(category?: string): Service[] {
  return useMemo(() => {
    if (!category) return SERVICES;
    return SERVICES.filter((service) => service.category === category);
  }, [category]);
}
