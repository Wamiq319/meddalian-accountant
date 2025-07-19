"use client";
import { useState, use, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
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
  FiRefreshCw,
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
  const searchParams = useSearchParams();
  const service = SERVICES.find((s) => s.id === serviceId);

  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  const sendOrderEmailWithPayment = useCallback(
    async (sessionId: string) => {
      try {
        if (!service) return;

        // Get data from sessionStorage using the correct keys
        const basicInfoKey = "basicInfo";
        const serviceInfoKey = `serviceInfo_${service.id}`;

        const basicInfoData = sessionStorage.getItem(basicInfoKey);
        const serviceInfoData = sessionStorage.getItem(serviceInfoKey);

        // Combine data from both sessionStorage keys
        const combinedData = { ...formData };

        if (basicInfoData) {
          try {
            const parsedBasicInfo = JSON.parse(basicInfoData);
            Object.assign(combinedData, parsedBasicInfo);
          } catch (error) {
            console.error("Error parsing basic info session data:", error);
          }
        }

        if (serviceInfoData) {
          try {
            const parsedServiceInfo = JSON.parse(serviceInfoData);
            Object.assign(combinedData, parsedServiceInfo);
          } catch (error) {
            console.error("Error parsing service info session data:", error);
          }
        }

        // Prepare customer info from form data
        const customerInfo = {
          name: combinedData.name || "",
          company: combinedData.company || "",
          email: combinedData.email || "",
          phone: combinedData.phone || "",
          position: combinedData.position || "",
        };

        // Prepare service details (all form fields except basic info)
        const serviceDetails = { ...combinedData };
        delete serviceDetails.name;
        delete serviceDetails.company;
        delete serviceDetails.email;
        delete serviceDetails.phone;
        delete serviceDetails.position;

        // Send order email with payment details
        const response = await fetch("/api/send-order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customerInfo,
            service,
            serviceDetails,
            sessionId,
          }),
        });

        if (!response.ok) {
          console.error("Failed to send order email");
        }
      } catch (error) {
        console.error("Error sending order email:", error);
      }
    },
    [service, formData]
  );

  // Load existing session data when component mounts
  useEffect(() => {
    if (service) {
      // Load basic info from global session
      const basicInfoKey = "basicInfo";
      const basicInfoData = sessionStorage.getItem(basicInfoKey);
      if (basicInfoData) {
        try {
          const parsedBasicInfo = JSON.parse(basicInfoData);
          setFormData((prev) => ({ ...prev, ...parsedBasicInfo }));
        } catch (error) {
          console.error("Error parsing basic info session data:", error);
        }
      }

      // Load service-specific info
      const serviceInfoKey = `serviceInfo_${service.id}`;
      const serviceInfoData = sessionStorage.getItem(serviceInfoKey);
      if (serviceInfoData) {
        try {
          const parsedServiceInfo = JSON.parse(serviceInfoData);
          setFormData((prev) => ({ ...prev, ...parsedServiceInfo }));
        } catch (error) {
          console.error("Error parsing service info session data:", error);
        }
      }
    }
  }, [service]);

  // Check for successful payment
  useEffect(() => {
    const success = searchParams.get("success");
    const sessionId = searchParams.get("session_id");

    if (success === "true" && sessionId) {
      // Payment was successful, move to success step
      setStep(3);

      // Send order email with payment details
      sendOrderEmailWithPayment(sessionId);
    }
  }, [searchParams, formData, service, sendOrderEmailWithPayment]);

  if (!service) {
    return (
      <div className="text-center text-red-500 py-12">Service not found.</div>
    );
  }

  function handleChange(name: string, value: string) {
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);

    // Determine which sessionStorage to update based on field type
    const basicInfoFields = ["name", "company", "email", "phone", "position"];

    if (basicInfoFields.includes(name)) {
      // Save to global basic info session
      const sessionKey = "basicInfo";
      const existingData = sessionStorage.getItem(sessionKey);
      const parsedData = existingData ? JSON.parse(existingData) : {};
      parsedData[name] = value;
      sessionStorage.setItem(sessionKey, JSON.stringify(parsedData));
    } else if (service) {
      // Save to service-specific session
      const sessionKey = `serviceInfo_${service.id}`;
      const existingData = sessionStorage.getItem(sessionKey);
      const parsedData = existingData ? JSON.parse(existingData) : {};
      parsedData[name] = value;
      sessionStorage.setItem(sessionKey, JSON.stringify(parsedData));
    }
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
      // Save basic info to global sessionStorage
      const sessionKey = "basicInfo";
      const step1Data: Record<string, string> = {};
      ["name", "company", "email", "phone", "position"].forEach((key) => {
        if (formData[key]) step1Data[key] = formData[key];
      });
      sessionStorage.setItem(sessionKey, JSON.stringify(step1Data));
      setStep((s) => s + 1);
      return;
    }

    if (step === 1) {
      // Save service-specific info to sessionStorage
      const sessionKey = `serviceInfo_${service!.id}`;
      const step2Data: Record<string, string> = {};
      service!.formFields.forEach((field) => {
        if (formData[field.name]) step2Data[field.name] = formData[field.name];
      });
      sessionStorage.setItem(sessionKey, JSON.stringify(step2Data));

      // Validate service-specific fields
      if (!validate(service!.formFields)) return;
    }

    setStep((s) => s + 1);
  }

  function handleBack() {
    setStep((s) => s - 1);
  }

  function resetForm() {
    setFormData({});
    setStep(0);
    setErrors({});
    setSubmitError(null);
    // Clear all sessionStorage related to the form
    sessionStorage.removeItem("basicInfo");
    if (service) {
      sessionStorage.removeItem(`serviceInfo_${service.id}`);
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
                  serviceId={service.id} // Pass serviceId
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
              <div>
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
                    type="button"
                    onClick={resetForm}
                    className="px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-red-500 text-white font-medium hover:bg-red-600 transition-colors duration-200 flex items-center gap-2 text-sm sm:text-base"
                  >
                    <FiRefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />
                    Start Over
                  </button>
                </div>
              </div>
            )}

            {step === 3 && <StepSuccess />}
          </div>
        </div>
      </main>
    </div>
  );
}
