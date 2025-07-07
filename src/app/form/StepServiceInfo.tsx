import Input from "@/components/Input";
import { ServiceFormField } from "@/types/service";
import { FiFileText, FiInfo, FiCheckCircle } from "react-icons/fi";
import { useState, useEffect } from "react";

interface StepServiceInfoProps {
  fields: ServiceFormField[];
  values: Record<string, string>;
  errors: Record<string, string>;
  onChange: (name: string, value: string) => void;
  serviceId: string; // Add serviceId prop
}

export default function StepServiceInfo({
  fields,
  values,
  errors,
  onChange,
  serviceId, // Add serviceId parameter
}: StepServiceInfoProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Autofill from sessionStorage if exists
    const sessionKey = `serviceInfo_${serviceId}`;
    const sessionData = sessionStorage.getItem(sessionKey);
    if (sessionData) {
      try {
        const parsed = JSON.parse(sessionData);
        fields.forEach((field) => {
          if (parsed[field.name]) {
            onChange(field.name, parsed[field.name]);
          }
        });
      } catch (e) {
        // ignore
      }
    }
    // eslint-disable-next-line
  }, [serviceId]);

  if (!fields || fields.length === 0)
    return (
      <div className="text-center py-8 lg:py-12">
        <div className="text-gray-500 text-base lg:text-lg">
          No additional information required for this service.
        </div>
      </div>
    );

  // Group fields into pairs for two-column layout, keeping textareas in their own row
  const groupedFields = [];
  let currentGroup = [];

  for (let i = 0; i < fields.length; i++) {
    const field = fields[i];

    if (field.variant === "textarea") {
      // If we have a current group, add it to groupedFields
      if (currentGroup.length > 0) {
        groupedFields.push(currentGroup);
        currentGroup = [];
      }
      // Add textarea in its own group
      groupedFields.push([field]);
    } else {
      currentGroup.push(field);
      // If we have 2 fields or this is the last field, add the group
      if (currentGroup.length === 2 || i === fields.length - 1) {
        groupedFields.push(currentGroup);
        currentGroup = [];
      }
    }
  }

  // Calculate progress only on client side
  const completedFields = mounted
    ? fields.filter((field) => values[field.name]).length
    : 0;
  const progressPercentage = mounted
    ? Math.min((completedFields / fields.length) * 100, 100)
    : 0;

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
      {/* Information Panel */}
      <div className="w-full lg:w-1/3 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 p-4 lg:p-8 text-white rounded-xl lg:rounded-2xl shadow-xl">
        <div className="mb-6 lg:mb-8">
          <div className="w-12 h-12 lg:w-16 lg:h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 lg:mb-6">
            <FiFileText className="w-6 h-6 lg:w-8 lg:h-8" />
          </div>
          <h2 className="text-xl lg:text-2xl font-bold mb-2 lg:mb-3">
            Service Requirements
          </h2>
          <p className="text-blue-100 text-base lg:text-lg leading-relaxed">
            Provide specific details about your service needs to help us deliver
            the best solution.
          </p>
        </div>

        <div className="space-y-4 lg:space-y-6">
          <div className="bg-white/10 rounded-lg lg:rounded-xl p-4 lg:p-6 backdrop-blur-sm">
            <div className="flex items-center gap-2 lg:gap-3 mb-2 lg:mb-3">
              <FiInfo className="w-4 h-4 lg:w-5 lg:h-5 text-blue-200" />
              <h3 className="font-semibold text-base lg:text-lg">
                Why we need this?
              </h3>
            </div>
            <p className="text-blue-100 text-xs lg:text-sm leading-relaxed">
              Detailed information helps us understand your specific
              requirements and provide tailored solutions that meet your exact
              needs.
            </p>
          </div>

          <div className="bg-white/5 rounded-lg lg:rounded-xl p-3 lg:p-4 border border-white/10">
            <div className="text-center">
              <div className="text-lg lg:text-2xl font-bold text-blue-200 mb-1">
                Step 2 of 4
              </div>
              <div className="text-blue-100 text-xs lg:text-sm">
                Service Requirements
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="w-full lg:w-2/3">
        <div className="mb-6 lg:mb-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2 lg:mb-3">
            Service Details
          </h2>
          <p className="text-gray-600 text-base lg:text-lg">
            Please provide additional details about your service requirements to
            help us deliver the best solution.
          </p>
        </div>

        <div className="space-y-4 lg:space-y-6">
          {groupedFields.map((group, groupIndex) => (
            <div
              key={groupIndex}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6"
            >
              {group.map((field) => {
                const isTextarea = field.variant === "textarea";

                return (
                  <div
                    key={field.name}
                    className={`group ${isTextarea ? "md:col-span-2" : ""}`}
                  >
                    <div className="flex items-center gap-2 lg:gap-3 mb-1 lg:mb-2">
                      <div className="w-6 h-6 lg:w-8 lg:h-8 bg-gradient-to-br from-blue-100 to-[#e94e1b]/20 rounded-lg flex items-center justify-center group-hover:from-blue-200 group-hover:to-[#e94e1b]/30 transition-all duration-200">
                        <FiCheckCircle className="w-3 h-3 lg:w-4 lg:h-4 text-blue-600" />
                      </div>
                      <div>
                        <label className="text-xs lg:text-sm font-semibold text-gray-700">
                          {field.label}
                          {field.required && (
                            <span className="text-[#e94e1b] ml-1">*</span>
                          )}
                        </label>
                      </div>
                    </div>
                    <Input
                      label=""
                      variant={field.variant}
                      required={field.required}
                      options={field.options}
                      value={values[field.name] || ""}
                      error={errors[field.name]}
                      onChange={(e) => onChange(field.name, e.target.value)}
                    />
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Progress indicator */}
        <div className="mt-6 lg:mt-8 p-3 lg:p-4 bg-gradient-to-r from-blue-50 to-[#e94e1b]/5 rounded-lg lg:rounded-xl border border-blue-200">
          <div className="flex items-center justify-between text-xs lg:text-sm">
            <span className="text-blue-700 font-medium">Form Progress</span>
            <span className="text-[#e94e1b] font-medium">
              {mounted ? completedFields : 0} of {fields.length} fields
              completed
            </span>
          </div>
          <div className="mt-2 w-full bg-blue-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-[#e94e1b] h-2 rounded-full transition-all duration-300"
              style={{
                width: `${progressPercentage}%`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
