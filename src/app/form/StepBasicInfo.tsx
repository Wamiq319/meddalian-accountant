import Input from "@/components/Input";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiBriefcase,
  FiHome,
  FiInfo,
} from "react-icons/fi";
import { useState, useEffect } from "react";

interface Field {
  name: string;
  label: string;
  variant: "text" | "email" | "number" | "dropdown" | "textarea";
  required?: boolean;
  options?: string[];
  icon: React.ComponentType<{ className?: string }>;
  placeholder?: string;
}

interface StepBasicInfoProps {
  values: Record<string, string>;
  errors: Record<string, string>;
  onChange: (name: string, value: string) => void;
}

const BASIC_FIELDS: Field[] = [
  {
    name: "name",
    label: "Full Name",
    variant: "text",
    required: true,
    icon: FiUser,
    placeholder: "Enter your full name",
  },
  {
    name: "company",
    label: "Company Name",
    variant: "text",
    required: true,
    icon: FiHome,
    placeholder: "Enter your company name",
  },
  {
    name: "email",
    label: "Email Address",
    variant: "email",
    required: true,
    icon: FiMail,
    placeholder: "Enter your email address",
  },
  {
    name: "phone",
    label: "Phone Number",
    variant: "text",
    required: true,
    icon: FiPhone,
    placeholder: "Enter your phone number",
  },
  {
    name: "position",
    label: "Job Position",
    variant: "text",
    required: true,
    icon: FiBriefcase,
    placeholder: "Enter your job title",
  },
];

export default function StepBasicInfo({
  values,
  errors,
  onChange,
}: StepBasicInfoProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Autofill from sessionStorage if exists
    const sessionKey = "basicInfo";
    const sessionData = sessionStorage.getItem(sessionKey);
    if (sessionData) {
      try {
        const parsed = JSON.parse(sessionData);
        BASIC_FIELDS.forEach((field) => {
          if (parsed[field.name]) {
            onChange(field.name, parsed[field.name]);
          }
        });
      } catch {
        // ignore
      }
    }
    // eslint-disable-next-line
  }, []);

  // Group fields into pairs for two-column layout, keeping textareas in their own row
  const groupedFields = [];
  let currentGroup = [];

  for (let i = 0; i < BASIC_FIELDS.length; i++) {
    const field = BASIC_FIELDS[i];

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
      if (currentGroup.length === 2 || i === BASIC_FIELDS.length - 1) {
        groupedFields.push(currentGroup);
        currentGroup = [];
      }
    }
  }

  // Calculate progress only on client side
  const completedFields = mounted
    ? Object.keys(values).filter((key) => values[key]).length
    : 0;
  const progressPercentage = mounted
    ? Math.min((completedFields / BASIC_FIELDS.length) * 100, 100)
    : 0;

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
      {/* Information Panel */}
      <div className="w-full lg:w-1/3 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 p-4 lg:p-8 text-white rounded-xl lg:rounded-2xl shadow-xl">
        <div className="mb-6 lg:mb-8">
          <div className="w-12 h-12 lg:w-16 lg:h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 lg:mb-6">
            <FiUser className="w-6 h-6 lg:w-8 lg:h-8" />
          </div>
          <h2 className="text-xl lg:text-2xl font-bold mb-2 lg:mb-3">
            Basic Information
          </h2>
          <p className="text-blue-100 text-base lg:text-lg leading-relaxed">
            Tell us about yourself and your company to get started
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
              We use your basic information to personalize your service
              experience and ensure we can contact you regarding your request.
            </p>
          </div>

          <div className="bg-white/5 rounded-lg lg:rounded-xl p-3 lg:p-4 border border-white/10">
            <div className="text-center">
              <div className="text-lg lg:text-2xl font-bold text-blue-200 mb-1">
                Step 1 of 4
              </div>
              <div className="text-blue-100 text-xs lg:text-sm">
                Basic Information
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="w-full lg:w-2/3">
        <div className="mb-6 lg:mb-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2 lg:mb-3">
            Personal Information
          </h2>
          <p className="text-gray-600 text-base lg:text-lg">
            Please provide your contact details and company information to
            proceed.
          </p>
        </div>

        <div className="space-y-4 lg:space-y-6">
          {groupedFields.map((group, groupIndex) => (
            <div
              key={groupIndex}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6"
            >
              {group.map((field) => {
                const IconComponent = field.icon;
                const isTextarea = field.variant === "textarea";

                return (
                  <div
                    key={field.name}
                    className={`group ${isTextarea ? "md:col-span-2" : ""}`}
                  >
                    <div className="flex items-center gap-2 lg:gap-3 mb-1 lg:mb-2">
                      <div className="w-6 h-6 lg:w-8 lg:h-8 bg-gradient-to-br from-blue-100 to-[#e94e1b]/20 rounded-lg flex items-center justify-center group-hover:from-blue-200 group-hover:to-[#e94e1b]/30 transition-all duration-200">
                        <IconComponent className="w-3 h-3 lg:w-4 lg:h-4 text-blue-600" />
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
                      placeholder={field.placeholder}
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
              {mounted ? completedFields : 0} of {BASIC_FIELDS.length} fields
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

export type { Field };
