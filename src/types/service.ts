export interface Service {
  id: string;
  sectionId: "audits" | "payroll" | "taxation" | "planning";
  title: string;
  description: string;
  price: number;
  features: string[];
  image?: string;
  subcategory?: string;
  formFields: ServiceFormField[];
}

export interface ServiceFormField {
  name: string;
  label: string;
  variant: "text" | "email" | "number" | "dropdown" | "textarea";
  required?: boolean;
  options?: string[];
}
