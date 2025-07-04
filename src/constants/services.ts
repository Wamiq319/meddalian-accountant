import { Service } from "@/types/service";

export const SERVICES: Service[] = [
  {
    id: "1",
    slug: "basic-bookkeeping",
    title: "Basic Bookkeeping",
    description:
      "Essential bookkeeping services for small businesses including transaction recording, bank reconciliation, and basic financial reports.",
    shortDescription: "Essential bookkeeping for small businesses",
    price: 299,
    currency: "USD",
    features: [
      "Monthly transaction recording",
      "Bank reconciliation",
      "Basic financial reports",
      "Quarterly reviews",
      "Email support",
    ],
    category: "bookkeeping",
    duration: "Monthly",
    popular: true,
  },
  {
    id: "2",
    slug: "advanced-accounting",
    title: "Advanced Accounting",
    description:
      "Comprehensive accounting services including full financial management, tax preparation, and strategic financial planning.",
    shortDescription: "Comprehensive accounting and tax services",
    price: 599,
    currency: "USD",
    features: [
      "Full bookkeeping services",
      "Tax preparation and filing",
      "Financial statement preparation",
      "Budget planning",
      "Quarterly tax estimates",
      "Priority support",
    ],
    category: "accounting",
    duration: "Monthly",
    popular: true,
  },
  {
    id: "3",
    slug: "tax-preparation",
    title: "Tax Preparation",
    description:
      "Professional tax preparation services for individuals and businesses, ensuring maximum deductions and compliance.",
    shortDescription: "Professional tax preparation and filing",
    price: 399,
    currency: "USD",
    features: [
      "Personal tax return preparation",
      "Business tax return preparation",
      "Tax planning consultation",
      "IRS correspondence handling",
      "Electronic filing",
      "Tax audit support",
    ],
    category: "tax",
    duration: "Per Return",
  },
  {
    id: "4",
    slug: "financial-consulting",
    title: "Financial Consulting",
    description:
      "Strategic financial consulting to help your business grow, optimize operations, and make informed financial decisions.",
    shortDescription: "Strategic financial consulting and planning",
    price: 150,
    currency: "USD",
    features: [
      "Financial analysis and planning",
      "Cash flow management",
      "Business growth strategies",
      "Cost reduction analysis",
      "Investment advice",
      "Monthly consultation calls",
    ],
    category: "consulting",
    duration: "Per Hour",
  },
  {
    id: "5",
    slug: "payroll-services",
    title: "Payroll Services",
    description:
      "Complete payroll processing including tax calculations, direct deposits, and compliance with labor laws.",
    shortDescription: "Complete payroll processing and management",
    price: 199,
    currency: "USD",
    features: [
      "Payroll processing",
      "Tax calculations and filing",
      "Direct deposit setup",
      "Payroll reports",
      "Employee portal access",
      "Compliance monitoring",
    ],
    category: "accounting",
    duration: "Monthly",
  },
  {
    id: "6",
    slug: "audit-support",
    title: "Audit Support",
    description:
      "Professional support during tax audits, including document preparation and representation.",
    shortDescription: "Professional audit support and representation",
    price: 250,
    currency: "USD",
    features: [
      "Audit document preparation",
      "IRS communication handling",
      "Audit representation",
      "Document organization",
      "Response drafting",
      "Follow-up support",
    ],
    category: "tax",
    duration: "Per Hour",
  },
];

export const SERVICE_CATEGORIES = [
  {
    id: "bookkeeping",
    name: "Bookkeeping",
    description: "Essential financial record keeping services",
  },
  {
    id: "accounting",
    name: "Accounting",
    description: "Comprehensive financial management services",
  },
  {
    id: "tax",
    name: "Tax Services",
    description: "Tax preparation and compliance services",
  },
  {
    id: "consulting",
    name: "Consulting",
    description: "Strategic financial consulting services",
  },
];

export const getServiceBySlug = (slug: string): Service | undefined => {
  return SERVICES.find((service) => service.slug === slug);
};

export const getServicesByCategory = (category: string): Service[] => {
  return SERVICES.filter((service) => service.category === category);
};

export const getPopularServices = (): Service[] => {
  return SERVICES.filter((service) => service.popular);
};
