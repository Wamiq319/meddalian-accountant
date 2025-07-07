import React from "react";
import { Service } from "@/types/service";
import {
  FiFileText,
  FiUser,
  FiCreditCard,
  FiDollarSign,
  FiInfo,
  FiShield,
  FiCheckCircle,
} from "react-icons/fi";
import Image from "next/image";

interface StepCheckoutProps {
  values: Record<string, string>;
  service: Service;
}

export default function StepCheckout({ values, service }: StepCheckoutProps) {
  // Group form data into pairs for two-column layout
  const formEntries = Object.entries(values);
  const groupedEntries = [];
  for (let i = 0; i < formEntries.length; i += 2) {
    groupedEntries.push(formEntries.slice(i, i + 2));
  }

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
      {/* Information Panel */}
      <div className="w-full lg:w-1/3 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 p-4 lg:p-8 text-white rounded-xl lg:rounded-2xl shadow-xl">
        <div className="mb-6 lg:mb-8">
          <div className="w-12 h-12 lg:w-16 lg:h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 lg:mb-6">
            <FiCheckCircle className="w-6 h-6 lg:w-8 lg:h-8" />
          </div>
          <h2 className="text-xl lg:text-2xl font-bold mb-2 lg:mb-3">
            Review & Confirm
          </h2>
          <p className="text-blue-100 text-base lg:text-lg leading-relaxed">
            Review your information and complete your order securely.
          </p>
        </div>

        <div className="space-y-4 lg:space-y-6">
          <div className="bg-white/10 rounded-lg lg:rounded-xl p-4 lg:p-6 backdrop-blur-sm">
            <div className="flex items-center gap-2 lg:gap-3 mb-2 lg:mb-3">
              <FiInfo className="w-4 h-4 lg:w-5 lg:h-5 text-blue-200" />
              <h3 className="font-semibold text-base lg:text-lg">
                Review Your Details
              </h3>
            </div>
            <p className="text-blue-100 text-xs lg:text-sm leading-relaxed">
              Please carefully review all the information you&apos;ve provided
              before proceeding with your order.
            </p>
          </div>

          <div className="bg-white/10 rounded-lg lg:rounded-xl p-4 lg:p-6 backdrop-blur-sm">
            <div className="flex items-center gap-2 lg:gap-3 mb-2 lg:mb-3">
              <FiShield className="w-4 h-4 lg:w-5 lg:h-5 text-blue-200" />
              <h3 className="font-semibold text-base lg:text-lg">
                Secure Payment
              </h3>
            </div>
            <p className="text-blue-100 text-xs lg:text-sm leading-relaxed">
              Your payment will be processed securely through our trusted
              payment partners.
            </p>
          </div>

          <div className="bg-white/5 rounded-lg lg:rounded-xl p-3 lg:p-4 border border-white/10">
            <div className="text-center">
              <div className="text-lg lg:text-2xl font-bold text-blue-200 mb-1">
                Step 3 of 4
              </div>
              <div className="text-blue-100 text-xs lg:text-sm">
                Review & Payment
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="w-full lg:w-2/3">
        <div className="mb-4 lg:mb-6">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2 lg:mb-3">
            Order Summary
          </h2>
          <p className="text-gray-600 text-base lg:text-lg">
            Review your service details and personal information before
            completing your order.
          </p>
        </div>

        {/* Service Summary */}
        <div className="bg-gray-50 rounded-xl p-3 lg:p-4 mb-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <FiFileText className="w-5 h-5 text-[#e94e1b]" />
            Service Details
          </h3>
          <div className="bg-white rounded-lg p-3 border border-gray-200">
            <div className="font-semibold text-lg text-gray-800 mb-2">
              {service.title}
            </div>
            <div className="text-gray-600 mb-3">{service.description}</div>
            <div className="text-2xl font-bold text-[#e94e1b] flex items-center gap-2">
              <FiDollarSign className="w-6 h-6" />${service.price}
            </div>
          </div>
        </div>

        {/* Form Data Review - Two columns */}
        <div className="bg-gray-50 rounded-xl p-3 lg:p-4 mb-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <FiUser className="w-5 h-5 text-[#e94e1b]" />
            Your Information
          </h3>
          <div className="bg-white rounded-lg p-3 border border-gray-200">
            <div className="space-y-3">
              {groupedEntries.map((group, groupIndex) => (
                <div
                  key={groupIndex}
                  className="grid grid-cols-1 md:grid-cols-2 gap-3"
                >
                  {group.map(([key, value]) => (
                    <div key={key} className="flex flex-col space-y-1">
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </span>
                      <span className="text-sm font-medium text-gray-900">
                        {key.toLowerCase().includes("amount") ||
                        key.toLowerCase().includes("revenue") ||
                        key.toLowerCase().includes("income") ||
                        key.toLowerCase().includes("turnover") ||
                        key.toLowerCase().includes("asset") ||
                        key.toLowerCase().includes("value")
                          ? `$${value}`
                          : (value as string)}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Payment Options */}
        <div className="bg-gray-50 rounded-xl p-3 lg:p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <FiCreditCard className="w-5 h-5 text-[#e94e1b]" />
            Payment Method
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <button
              type="button"
              className="flex items-center justify-center px-4 py-3 rounded-xl bg-white border border-gray-200 hover:border-blue-400 transition-colors duration-200 shadow-sm"
            >
              <Image
                src="/stripe.png"
                alt="Stripe"
                width={40}
                height={40}
                className="w-10 h-10 object-contain"
              />
            </button>
            <button
              type="button"
              className="flex items-center justify-center px-4 py-3 rounded-xl bg-white border border-gray-200 hover:border-blue-400 transition-colors duration-200 shadow-sm"
            >
              <Image
                src="/paypal.png"
                alt="PayPal"
                width={40}
                height={40}
                className="w-10 h-10 object-contain"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
