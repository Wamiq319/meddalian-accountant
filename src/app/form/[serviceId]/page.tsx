"use client";
import { useState, use } from "react";
import { SERVICES } from "@/constants/services";

import StepBasicInfo from "../StepBasicInfo";
import StepServiceInfo from "../StepServiceInfo";
import StepCheckout from "../StepCheckout";
import StepSuccess from "../StepSuccess";
import {
  FiUser,
  FiFileText,
  FiCreditCard,
  FiCheckCircle,
  FiArrowRight,
  FiArrowLeft,
} from "react-icons/fi";
import React from "react";

const STEPS = [
  {
    label: "Basic Info",
    icon: FiUser,
    description: "Tell us about yourself and your company",
  },
  {
    label: "Service Info",
    icon: FiFileText,
    description: "Provide details about your service requirements",
  },
  {
    label: "Checkout",
    icon: FiCreditCard,
    description: "Review and complete your order",
  },
  {
    label: "Success",
    icon: FiCheckCircle,
    description: "Your request has been submitted successfully",
  },
];

export default function ServiceFormPage({
  params,
}: {
  params: Promise<{ serviceId: string }>;
}) {
  const { serviceId } = use(params);
  const service = SERVICES.find((s) => s.id === serviceId);

  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  if (!service) {
    return (
      <div className="text-center text-red-500 py-12">Service not found.</div>
    );
  }

  function handleChange(name: string, value: string) {
    setFormData((prev: Record<string, string>) => ({ ...prev, [name]: value }));
  }

  function validate(
    fields: Array<{ name: string; label: string; required?: boolean }>
  ) {
    const newErrors: Record<string, string> = {};
    fields.forEach((f) => {
      if (f.required && !formData[f.name]) {
        newErrors[f.name] = `${f.label} is required`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleNext() {
    if (step === 0) {
      // For step 0, we don't need validation as StepBasicInfo handles its own fields
      setStep((s) => s + 1);
      return;
    }

    if (step === 1) {
      // Validate service-specific fields
      if (!validate(service!.formFields)) return;
    }

    setStep((s) => s + 1);
  }

  function handleBack() {
    setStep((s) => s - 1);
  }

  function handleSubmit() {
    try {
      console.log("Form submitted:", formData);
      setSubmitError(null);
      setStep(3);
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-1 flex items-center justify-center p-2 sm:p-4">
        <div className="max-w-6xl w-full mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header with Step Indicator */}
          <div className="bg-white border-b border-gray-200 p-3 sm:p-4">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h1 className="text-lg sm:text-2xl font-bold text-gray-800">
                {service.title} Service
              </h1>
              <div className="text-xs sm:text-sm text-gray-500">
                Step {step + 1} of {STEPS.length}
              </div>
            </div>

            {/* Modern Step Indicator */}
            <div className="flex items-center justify-between gap-x-0 sm:gap-x-2 md:gap-x-6 w-full">
              {STEPS.map((s, i) => {
                const IconComponent = s.icon;
                return (
                  <React.Fragment key={i}>
                    <div className="flex flex-col items-center min-w-[48px] sm:min-w-[56px]">
                      <div
                        className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm sm:text-lg font-semibold transition-all duration-300 ${
                          i === step
                            ? "bg-[#e94e1b] text-white shadow-lg"
                            : i < step
                            ? "bg-green-500 text-white"
                            : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        {i < step ? (
                          <FiCheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                        ) : (
                          <IconComponent className="w-3 h-3 sm:w-4 sm:h-4" />
                        )}
                      </div>
                      <div className="mt-1 text-center">
                        <div
                          className={`text-xs font-medium hidden sm:block ${
                            i === step ? "text-[#e94e1b]" : "text-gray-500"
                          }`}
                        >
                          {s.label}
                        </div>
                      </div>
                    </div>
                    {i < STEPS.length - 1 && (
                      <div
                        className={`flex-1 h-0.5 mx-1 sm:mx-2 md:mx-3 transition-all duration-300 ${
                          i < step ? "bg-green-500" : "bg-gray-200"
                        }`}
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Main Content */}
          <div className="p-3 sm:p-6">
            {step === 0 && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleNext();
                }}
              >
                <StepBasicInfo
                  values={formData}
                  errors={errors}
                  onChange={handleChange}
                />
                <div className="flex justify-end mt-4 sm:mt-6">
                  <button
                    type="submit"
                    className="px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-[#e94e1b] text-white font-medium hover:bg-[#c43d13] transition-colors duration-200 flex items-center gap-2 shadow-lg text-sm sm:text-base"
                  >
                    Next Step
                    <FiArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </form>
            )}

            {step === 1 && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleNext();
                }}
              >
                <StepServiceInfo
                  fields={service.formFields}
                  values={formData}
                  errors={errors}
                  onChange={handleChange}
                />
                <div className="flex justify-between mt-4 sm:mt-6">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition-colors duration-200 flex items-center gap-2 text-sm sm:text-base"
                  >
                    <FiArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                    Previous
                  </button>
                  <button
                    type="submit"
                    className="px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-[#e94e1b] text-white font-medium hover:bg-[#c43d13] transition-colors duration-200 flex items-center gap-2 shadow-lg text-sm sm:text-base"
                  >
                    Next Step
                    <FiArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </form>
            )}

            {step === 2 && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              >
                <StepCheckout values={formData} service={service} />
                {submitError && (
                  <div className="text-red-500 text-center mt-4 p-3 bg-red-50 rounded-lg">
                    {submitError}
                  </div>
                )}
                <div className="flex justify-between mt-4 sm:mt-6">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition-colors duration-200 flex items-center gap-2 text-sm sm:text-base"
                  >
                    <FiArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                    Previous
                  </button>
                  <button
                    type="submit"
                    className="px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-[#e94e1b] text-white font-medium hover:bg-[#c43d13] transition-colors duration-200 flex items-center gap-2 shadow-lg text-sm sm:text-base"
                  >
                    <FiCheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                    Submit Order
                  </button>
                </div>
              </form>
            )}

            {step === 3 && <StepSuccess />}
          </div>
        </div>
      </main>
    </div>
  );
}
