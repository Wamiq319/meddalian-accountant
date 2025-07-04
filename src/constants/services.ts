import { Service } from "@/types/service";

export const SERVICE_SECTIONS = [
  {
    id: "taxation",
    title: "Taxation Services",
    items: [
      // TAXATION, Sole Traders and Partnerships
      "Self assessment",
      "Tax planning",
      "HMRC enquiries and investigations",
      "Trusts, estates and inheritance tax",
      "Contentious tax dispute work",
      "Tax investigation",
      "Construction Industry Scheme",
      // CORPORATION TAX
      "CTSA - Self assessment",
      "Tax planning (Corporation)",
      "HMRC enquiries and investigations (Corporation)",
      "Tax investigation fees insurance",
      // VAT
      "Registration (VAT)",
      "VAT Returns",
      "Planning and disputes (VAT)",
    ],
  },
  {
    id: "planning",
    title: "Business Start-up & Planning",
    items: [
      // BUSINESS START-UPS
      "General Issues",
      "Raising finance and business plans",
      "Business growth",
      "Strategic planning",
      "Tax planning",
      "Company formation",
      "Construction Industry Scheme",
      // GENERAL SERVICES
      "Offshore incorporation",
    ],
  },
  {
    id: "payroll",
    title: "Payroll Services",
    items: [
      "PAYE and NI",
      "Payroll and compliance",
      "End of year returns and P11D's",
      "Employment status disputes and IR35",
    ],
  },
  {
    id: "audits",
    title: "Audits & Compliance",
    items: [
      // Accounting Services
      "Annual accounts preparation",
      "Audit and assurance",
      "Company formations and secretarial",
      "Management accounts and information",
      "BookkeepingPayroll",
      // Added Value Services
      "Information technology and accounting software",
      "Management systems",
      "Raising finance and business plans",
      "Business growth",
      "Strategic planning",
      "Business valuations",
      "Translation & Interpretation",
    ],
  },
];

export function getSectionById(id: string) {
  return SERVICE_SECTIONS.find((section) => section.id === id);
}
