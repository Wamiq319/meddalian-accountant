import { Service } from "@/types/service";

export const SERVICES: Service[] = [
  // Audits & Compliance - ACCOUNTING SERVICES
  {
    id: "audit-1",
    sectionId: "audits",
    subcategory: "Accounting Services",
    title: "Annual Accounts Preparation",
    description:
      "Comprehensive annual accounts preparation for compliance and business insight.",
    price: 299,
    features: [
      "Full statutory accounts",
      "HMRC and Companies House filing",
      "Year-end tax review",
    ],
    formFields: [
      {
        name: "accountingPeriod",
        label: "Accounting Period",
        variant: "text",
        required: true,
      },
      {
        name: "companyType",
        label: "Company Type",
        variant: "dropdown",
        options: ["Limited Company", "LLP", "PLC", "Other"],
        required: true,
      },
    ],
  },
  {
    id: "audit-2",
    sectionId: "audits",
    subcategory: "Accounting Services",
    title: "Audit and Assurance",
    description:
      "Independent audit and assurance services to build trust and transparency.",
    price: 499,
    features: [
      "Detailed audit report",
      "Risk assessment",
      "Regulatory compliance",
    ],
    formFields: [
      {
        name: "auditType",
        label: "Type of Audit",
        variant: "dropdown",
        options: ["Statutory", "Internal", "External", "Other"],
        required: true,
      },
      { name: "regulatoryBody", label: "Regulatory Body", variant: "text" },
    ],
  },
  {
    id: "audit-3",
    sectionId: "audits",
    subcategory: "Accounting Services",
    title: "Company Formations and Secretarial",
    description:
      "Company formation and secretarial services for new and existing businesses.",
    price: 180,
    features: [
      "Company registration",
      "Secretarial compliance",
      "Annual returns",
    ],
    formFields: [
      {
        name: "formationType",
        label: "Type of Formation",
        variant: "dropdown",
        options: ["Limited Company", "LLP", "PLC", "Other"],
      },
      {
        name: "existingCompany",
        label: "Is this for an existing company?",
        variant: "dropdown",
        options: ["Yes", "No"],
      },
    ],
  },
  {
    id: "audit-4",
    sectionId: "audits",
    subcategory: "Accounting Services",
    title: "Management Accounts and Information",
    description:
      "Preparation and analysis of management accounts and business information.",
    price: 220,
    features: [
      "Monthly/quarterly management accounts",
      "Performance analysis",
      "Custom business reports",
    ],
    formFields: [
      {
        name: "reportFrequency",
        label: "Report Frequency",
        variant: "dropdown",
        options: ["Monthly", "Quarterly", "Annually"],
      },
      {
        name: "customReports",
        label: "Need Custom Reports?",
        variant: "dropdown",
        options: ["Yes", "No"],
      },
    ],
  },
  {
    id: "audit-5",
    sectionId: "audits",
    subcategory: "Accounting Services",
    title: "Bookkeeping/Payroll",
    description:
      "Bookkeeping and payroll services for businesses of all sizes.",
    price: 120,
    features: [
      "Accurate bookkeeping",
      "Payroll processing",
      "HMRC submissions",
    ],
    formFields: [
      { name: "numEmployees", label: "Number of Employees", variant: "number" },
      {
        name: "payrollFrequency",
        label: "Payroll Frequency",
        variant: "dropdown",
        options: ["Weekly", "Monthly", "Quarterly"],
      },
    ],
  },
  // Audits & Compliance - ADDED VALUE SERVICES
  {
    id: "audit-6",
    sectionId: "audits",
    subcategory: "Accounting Services",
    title: "Information Technology and Accounting Software",
    description:
      "Advice and support for IT systems and accounting software integration.",
    price: 150,
    features: ["Software selection", "System setup", "Ongoing support"],
    formFields: [
      { name: "softwareType", label: "Type of Software", variant: "text" },
      {
        name: "integrationNeeded",
        label: "Integration Needed?",
        variant: "dropdown",
        options: ["Yes", "No"],
      },
    ],
  },
  {
    id: "audit-7",
    sectionId: "audits",
    subcategory: "Added Value Services",
    title: "Management Systems",
    description:
      "Implementation and review of management systems for business efficiency.",
    price: 200,
    features: [
      "System design",
      "Process improvement",
      "Performance monitoring",
    ],
    formFields: [
      {
        name: "systemType",
        label: "Type of Management System",
        variant: "text",
      },
    ],
  },
  {
    id: "audit-8",
    sectionId: "audits",
    subcategory: "Added Value Services",
    title: "Raising Finance and Business Plans",
    description:
      "Support with raising finance and preparing business plans for growth.",
    price: 250,
    features: [
      "Business plan creation",
      "Finance sourcing advice",
      "Investor presentations",
    ],
    formFields: [
      { name: "financeAmount", label: "Amount to Raise", variant: "number" },
    ],
  },
  {
    id: "audit-9",
    sectionId: "audits",
    subcategory: "Added Value Services",
    title: "Business Growth",
    description: "Strategies and support for sustainable business growth.",
    price: 220,
    features: ["Growth strategy", "Market analysis", "Performance tracking"],
    formFields: [],
  },
  {
    id: "audit-10",
    sectionId: "audits",
    subcategory: "Added Value Services",
    title: "Strategic Planning",
    description:
      "Strategic planning services to help your business achieve its goals.",
    price: 210,
    features: ["Goal setting", "Action plans", "Progress reviews"],
    formFields: [],
  },
  {
    id: "audit-11",
    sectionId: "audits",
    subcategory: "Added Value Services",
    title: "Business Valuations",
    description:
      "Professional business valuation services for various purposes.",
    price: 300,
    features: ["Valuation reports", "Due diligence", "Market comparisons"],
    formFields: [
      {
        name: "valuationPurpose",
        label: "Purpose of Valuation",
        variant: "text",
      },
    ],
  },
  {
    id: "audit-12",
    sectionId: "audits",
    subcategory: "Added Value Services",
    title: "Translation & Interpretation",
    description:
      "Translation and interpretation services for business and financial documents.",
    price: 100,
    features: [
      "Document translation",
      "Interpretation services",
      "Certified translations",
    ],
    formFields: [
      { name: "language", label: "Language Needed", variant: "text" },
    ],
  },
  // Payroll Services
  {
    id: "payroll-1",
    sectionId: "payroll",
    subcategory: "PAYE and NI",
    title: "Payroll and compliance",
    description:
      "Payroll processing and compliance with PAYE and NI regulations.",
    price: 120,
    features: ["Payroll and compliance"],
    formFields: [
      { name: "payrollPeriod", label: "Payroll Period", variant: "text" },
    ],
  },
  {
    id: "payroll-2",
    sectionId: "payroll",
    subcategory: "PAYE and NI",
    title: "End of year returns and P11D's",
    description:
      "Preparation and filing of end of year payroll returns and P11D forms.",
    price: 80,
    features: ["End of year returns and P11D's"],
    formFields: [{ name: "taxYear", label: "Tax Year", variant: "text" }],
  },
  {
    id: "payroll-3",
    sectionId: "payroll",
    subcategory: "PAYE and NI",
    title: "Employment status disputes and IR35",
    description:
      "Advice and support for employment status disputes and IR35 compliance.",
    price: 150,
    features: ["Employment status disputes and IR35"],
    formFields: [
      { name: "disputeType", label: "Type of Dispute", variant: "text" },
    ],
  },
  // Taxation Services
  // TAXATION, Sole Traders and Partnerships
  {
    id: "tax-1",
    sectionId: "taxation",
    subcategory: "TAXATION, Sole Traders and Partnerships",
    title: "Self Assessment",
    description:
      "Self assessment for sole traders and partnerships, including HMRC enquiries and investigations.",
    price: 120,
    features: ["Self assessment", "HMRC enquiries and investigations"],
    formFields: [
      {
        name: "selfAssessmentType",
        label: "Type of Self Assessment",
        variant: "dropdown",
        options: ["Individual", "Partnership"],
      },
    ],
  },
  {
    id: "tax-2",
    sectionId: "taxation",
    subcategory: "TAXATION, Sole Traders and Partnerships",
    title: "Tax Planning & Trusts",
    description:
      "Tax planning, trusts, estates, inheritance tax, and Construction Industry Scheme support.",
    price: 140,
    features: [
      "Tax planning",
      "Trusts, estates and inheritance tax",
      "Construction Industry Scheme",
    ],
    formFields: [
      { name: "planningArea", label: "Area of Planning", variant: "text" },
    ],
  },
  {
    id: "tax-3",
    sectionId: "taxation",
    subcategory: "TAXATION, Sole Traders and Partnerships",
    title: "Tax Disputes & Investigations",
    description:
      "Support for contentious tax dispute work and tax investigations.",
    price: 160,
    features: ["Contentious tax dispute work", "Tax investigation"],
    formFields: [
      { name: "disputeDetails", label: "Dispute Details", variant: "textarea" },
    ],
  },
  // CORPORATION TAX
  {
    id: "tax-4",
    sectionId: "taxation",
    subcategory: "CORPORATION TAX",
    title: "CTSA - Self Assessment",
    description:
      "Corporation Tax Self Assessment and HMRC enquiries/investigations.",
    price: 180,
    features: ["CTSA - Self assessment", "HMRC enquiries and investigations"],
    formFields: [{ name: "ctsaType", label: "CTSA Type", variant: "text" }],
  },
  {
    id: "tax-5",
    sectionId: "taxation",
    subcategory: "CORPORATION TAX",
    title: "Corporation Tax Planning",
    description: "Corporation tax planning for businesses.",
    price: 150,
    features: ["Tax planning"],
    formFields: [
      {
        name: "planningObjective",
        label: "Planning Objective",
        variant: "text",
      },
    ],
  },
  {
    id: "tax-6",
    sectionId: "taxation",
    subcategory: "CORPORATION TAX",
    title: "Tax Investigation Fees Insurance",
    description: "Insurance for tax investigation fees for corporations.",
    price: 100,
    features: ["Tax investigation fees insurance"],
    formFields: [],
  },
  // VAT
  {
    id: "tax-7",
    sectionId: "taxation",
    subcategory: "VAT",
    title: "VAT Registration",
    description: "VAT registration services for businesses.",
    price: 90,
    features: ["Registration"],
    formFields: [
      {
        name: "vatScheme",
        label: "VAT Scheme",
        variant: "dropdown",
        options: ["Standard", "Flat Rate", "Annual", "Other"],
      },
    ],
  },
  {
    id: "tax-8",
    sectionId: "taxation",
    subcategory: "VAT",
    title: "VAT Returns",
    description: "Preparation and filing of VAT returns.",
    price: 110,
    features: ["VAT Returns"],
    formFields: [
      {
        name: "returnPeriod",
        label: "Return Period",
        variant: "dropdown",
        options: ["Monthly", "Quarterly", "Annually"],
      },
    ],
  },
  {
    id: "tax-9",
    sectionId: "taxation",
    subcategory: "VAT",
    title: "VAT Planning & Disputes",
    description: "VAT planning and dispute resolution services.",
    price: 130,
    features: ["Planning and disputes"],
    formFields: [
      { name: "disputeNature", label: "Nature of Dispute", variant: "text" },
    ],
  },
  // Business Start-up & Planning
  // BUSINESS START-UPS
  {
    id: "plan-1",
    sectionId: "planning",
    subcategory: "BUSINESS START-UPS",
    title: "General Issues",
    description:
      "Advice on general business start-up issues, company formation, and Construction Industry Scheme.",
    price: 120,
    features: [
      "General Issues",
      "Company formation",
      "Construction Industry Scheme",
    ],
    formFields: [
      { name: "issueType", label: "Type of Issue", variant: "text" },
    ],
  },
  {
    id: "plan-2",
    sectionId: "planning",
    subcategory: "BUSINESS START-UPS",
    title: "Raising Finance and Business Plans",
    description:
      "Support with raising finance and preparing business plans for start-ups.",
    price: 150,
    features: ["Raising finance and business plans"],
    formFields: [
      { name: "financeSource", label: "Source of Finance", variant: "text" },
    ],
  },
  {
    id: "plan-3",
    sectionId: "planning",
    subcategory: "BUSINESS START-UPS",
    title: "Business Growth, Strategic & Tax Planning",
    description:
      "Business growth, strategic planning, and tax planning for new businesses.",
    price: 140,
    features: ["Business growth", "Strategic planning", "Tax planning"],
    formFields: [{ name: "growthGoal", label: "Growth Goal", variant: "text" }],
  },
  // General Services
  {
    id: "plan-4",
    sectionId: "planning",
    subcategory: "General Services",
    title: "Offshore Incorporation",
    description: "Expert advice and setup for offshore company incorporation.",
    price: 400,
    features: ["Offshore incorporation"],
    formFields: [
      { name: "jurisdiction", label: "Jurisdiction", variant: "text" },
    ],
  },
];

export function getServiceById(id: string) {
  return SERVICES.find((service) => service.id === id);
}
