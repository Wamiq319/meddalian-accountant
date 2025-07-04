import { SERVICES, SERVICE_CATEGORIES } from "@/constants/services";
import ServiceCard from "@/components/ServiceCard";

const SERVICE_SECTIONS = [
  {
    title: "Taxation Services",
    items: [
      "Personal Income Tax",
      "Value Added Tax (VAT)",
      "Corporation Tax",
      "Capital Gains Tax",
      "Inheritance Tax",
      "Tax Preparation and Planning",
      "VAT Registration",
      "Self Assessment",
      "HMRC Problem Resolution",
    ],
  },
  {
    title: "Business Start-up & Planning",
    items: [
      "Business Start-ups Consultation",
      "Raising Finance and Business Plans",
      "Business Growth Strategies",
      "Strategic Business Planning",
      "Company Formation",
      "Construction Industry Scheme",
      "Offshore Incorporation",
      "Business Plan / Cash Flow Forecast",
    ],
  },
  {
    title: "Payroll Services",
    items: [
      "Payroll Processing",
      "PAYE Setup and Management",
      "Auto Enrolment Support",
      "RTI (Real Time Information) Filing",
    ],
  },
  {
    title: "Accounting & Advisory",
    items: [
      "Bookkeeping Services",
      "Business Advisory",
      "Personal Financial Planning",
      "QuickBooks / Sage Consulting",
    ],
  },
  {
    title: "Audits & Compliance",
    items: [
      "Statutory Bookkeeping",
      "Audit Preparation",
      "Compliance and Record Maintenance",
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Our Services</h1>
      <div className="space-y-10">
        {SERVICE_SECTIONS.map((section) => (
          <section key={section.title}>
            <h2 className="text-xl font-semibold mb-4 text-blue-700">
              {section.title}
            </h2>
            <ul className="list-disc list-inside space-y-2">
              {section.items.map((item) => (
                <li key={item} className="text-gray-800">
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
