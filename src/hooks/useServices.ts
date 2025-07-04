import { useMemo } from "react";
import { SERVICE_SECTIONS } from "@/constants/services";

export function useServiceSections(sectionId?: string) {
  return useMemo(() => {
    if (!sectionId) return SERVICE_SECTIONS;
    return SERVICE_SECTIONS.filter((section) => section.id === sectionId);
  }, [sectionId]);
}
