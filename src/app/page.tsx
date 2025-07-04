"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import Image from "next/image";
import {
  FaRegFileAlt,
  FaMoneyCheckAlt,
  FaPercent,
  FaLightbulb,
  FaChevronDown,
} from "react-icons/fa";

const SERVICE_SECTIONS = [
  {
    id: "taxation",
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
    id: "planning",
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
    id: "payroll",
    title: "Payroll Services",
    items: [
      "Payroll Processing",
      "PAYE Setup and Management",
      "Auto Enrolment Support",
      "RTI (Real Time Information) Filing",
    ],
  },
  {
    id: "audits",
    title: "Audits & Compliance",
    items: [
      "Statutory Bookkeeping",
      "Audit Preparation",
      "Compliance and Record Maintenance",
    ],
  },
];

const HERO_BUTTONS = [
  {
    id: "audits",
    label: "Audits",
    icon: <FaRegFileAlt className="w-5 h-5 mr-2" />,
  },
  {
    id: "payroll",
    label: "Payroll",
    icon: <FaMoneyCheckAlt className="w-5 h-5 mr-2" />,
  },
  {
    id: "taxation",
    label: "Taxation",
    icon: <FaPercent className="w-5 h-5 mr-2" />,
  },
  {
    id: "planning",
    label: "Planning",
    icon: <FaLightbulb className="w-5 h-5 mr-2" />,
  },
];

function scrollToSection(id: string) {
  if (typeof window !== "undefined") {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 w-full px-0">
        {/* Hero Section */}
        <section className="relative w-full rounded-none overflow-hidden mb-12 bg-gradient-to-br from-[#e94e1b]/10 via-white to-[#0072bc]/10 flex flex-col items-center justify-center py-12 px-4 text-center">
          <div className="flex flex-col items-center gap-4 w-full max-w-4xl mx-auto">
            <Image
              src="/logo.png"
              alt="Meddalian Logo"
              width={72}
              height={72}
              className="mb-2"
              priority
            />
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-2">
              Buy Professional Accounting Services
              <br />
              from Meddalian Accountants
            </h1>
            <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mb-6">
              Get expert help with tax, payroll, business planning, and more.
              Purchase services online with just a few clicks—fast, secure, and
              hassle-free.
            </p>
            <div className="flex flex-wrap justify-center gap-4 w-full mt-4">
              {HERO_BUTTONS.map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => scrollToSection(btn.id)}
                  className="flex items-center justify-center bg-white border-2 border-[#e94e1b] text-[#e94e1b] hover:bg-[#e94e1b] hover:text-white font-semibold rounded-full px-6 py-3 text-lg shadow transition-colors duration-200 min-w-[160px]"
                >
                  {btn.icon}
                  {btn.label}
                  <FaChevronDown className="ml-2 w-4 h-4" />
                </button>
              ))}
            </div>
          </div>
          <div className="absolute inset-0 pointer-events-none" aria-hidden>
            {/* Decorative background shapes */}
            <svg
              className="absolute top-0 left-0 w-40 h-40 opacity-10"
              viewBox="0 0 200 200"
              fill="none"
            >
              <circle cx="100" cy="100" r="100" fill="#e94e1b" />
            </svg>
            <svg
              className="absolute bottom-0 right-0 w-40 h-40 opacity-10"
              viewBox="0 0 200 200"
              fill="none"
            >
              <circle cx="100" cy="100" r="100" fill="#0072bc" />
            </svg>
          </div>
        </section>

        {/* Service Sections */}
        <div className="space-y-10 max-w-4xl mx-auto w-full px-4">
          {SERVICE_SECTIONS.map((section) => (
            <section key={section.title} id={section.id}>
              <h2 className="text-2xl font-semibold mb-4 text-blue-700">
                {section.title}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {section.items.map((item) => (
                  <div
                    key={item}
                    className="bg-white shadow rounded-lg p-6 flex flex-col justify-between"
                  >
                    <div>
                      <h3 className="text-lg font-bold mb-2 text-gray-900">
                        {item}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Professional service for {item.toLowerCase()}.
                      </p>
                    </div>
                    <Button className="w-full mt-2">Buy Now</Button>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
