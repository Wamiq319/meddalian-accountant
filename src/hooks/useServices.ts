import { useMemo } from "react";
import { SERVICES } from "@/constants/services";
import { Service } from "@/types/service";

export function useServices(sectionId?: Service["sectionId"]) {
  return useMemo(() => {
    if (!sectionId) return SERVICES;
    return SERVICES.filter((service) => service.sectionId === sectionId);
  }, [sectionId]);
}
