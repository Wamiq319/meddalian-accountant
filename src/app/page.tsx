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
import { useServices } from "@/hooks/useServices";
import { Service } from "@/types/service";

const SECTIONS = [
  {
    id: "audits",
    label: "Audits & Compliance",
    icon: <FaRegFileAlt className="w-5 h-5 mr-2" />,
  },
  {
    id: "payroll",
    label: "Payroll Services",
    icon: <FaMoneyCheckAlt className="w-5 h-5 mr-2" />,
  },
  {
    id: "taxation",
    label: "Taxation Services",
    icon: <FaPercent className="w-5 h-5 mr-2" />,
  },
  {
    id: "planning",
    label: "Business Start-up & Planning",
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
              {SECTIONS.map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => scrollToSection(btn.id)}
                  className="flex items-center justify-center bg-white border-2 border-[#e94e1b] text-[#e94e1b] hover:bg-[#e94e1b] hover:text-white font-semibold rounded-full px-6 py-3 text-lg shadow transition-colors duration-200 min-w-[160px]"
                >
                  {btn.icon}
                  {btn.label}
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
        <div className="space-y-6 w-full px-14">
          {SECTIONS.map((section) => {
            const services = useServices(section.id as Service["sectionId"]);
            // Group services by subcategory if present
            const subcategories = Array.from(
              new Set(services.map((s) => s.subcategory).filter(Boolean))
            );
            // If there are subcategories, render by group
            if (subcategories.length > 0) {
              return (
                <section key={section.id} id={section.id}>
                  <div className="flex flex-col items-center mb-4">
                    <div className="flex items-center justify-center text-blue-700 text-3xl mb-2">
                      {section.icon}
                    </div>
                    <h2 className="text-3xl font-bold text-blue-700 text-center">
                      {section.label}
                    </h2>
                  </div>
                  {subcategories.map((subcat) => (
                    <div key={subcat} className="mb-2 mt-6">
                      <h3 className="text-xl font-semibold text-[#e94e1b] mb-2">
                        {subcat}
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3">
                        {services
                          .filter((s) => s.subcategory === subcat)
                          .map((service) => (
                            <div
                              key={service.id}
                              className="bg-white shadow rounded-lg p-4 flex flex-col justify-between min-h-0"
                            >
                              <div>
                                <h4 className="text-lg font-bold mb-2 text-gray-900">
                                  {service.title}
                                </h4>
                                <p className="text-gray-600 mb-2">
                                  {service.description}
                                </p>
                                <ul className="list-disc list-inside text-gray-700 mb-2">
                                  {service.features.map((feature, idx) => (
                                    <li key={idx}>{feature}</li>
                                  ))}
                                </ul>
                                <div className="text-xl font-bold text-[#e94e1b] mb-2">
                                  ${service.price}
                                </div>
                              </div>
                              <Button
                                className="w-full mt-1"
                                onClick={() =>
                                  (window.location.href = `/form/${service.id}`)
                                }
                              >
                                Book Now
                              </Button>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </section>
              );
            }
            // If no subcategories, render as a flat list
            return (
              <section key={section.id} id={section.id}>
                <div className="flex flex-col items-center mb-4">
                  <div className="flex items-center justify-center text-blue-700 text-3xl mb-2">
                    {section.icon}
                  </div>
                  <h2 className="text-3xl font-bold text-blue-700 text-center">
                    {section.label}
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      className="bg-white shadow rounded-lg p-4 flex flex-col justify-between min-h-0"
                    >
                      <div>
                        <h3 className="text-lg font-bold mb-2 text-gray-900">
                          {service.title}
                        </h3>
                        <p className="text-gray-600 mb-2">
                          {service.description}
                        </p>
                        <ul className="list-disc list-inside text-gray-700 mb-2">
                          {service.features.map((feature, idx) => (
                            <li key={idx}>{feature}</li>
                          ))}
                        </ul>
                        <div className="text-xl font-bold text-[#e94e1b] mb-2">
                          ${service.price}
                        </div>
                      </div>
                      <Button
                        className="w-full mt-1"
                        onClick={() =>
                          (window.location.href = `/form/${service.id}`)
                        }
                      >
                        Book Now
                      </Button>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
        {/* Free Consultation Section */}
        <section className="w-full bg-blue-50 py-12 mt-10 flex flex-col items-center justify-center text-center rounded-lg shadow-inner">
          <h2 className="text-3xl font-bold text-blue-700 mb-4">
            Book a Free Consultation Call
          </h2>
          <p className="text-lg text-gray-700 mb-6 max-w-xl">
            Not sure which service is right for you? Schedule a free,
            no-obligation consultation call with one of our expert accountants.
            We'll help you find the best solution for your business or personal
            needs.
          </p>
          <a
            href="/consultation"
            className="inline-block bg-[#e94e1b] text-white font-semibold rounded-full px-8 py-4 text-lg shadow hover:bg-[#c43d13] transition-colors duration-200"
          >
            Schedule Free Consultation
          </a>
        </section>
      </main>
      <Footer />
    </div>
  );
}
