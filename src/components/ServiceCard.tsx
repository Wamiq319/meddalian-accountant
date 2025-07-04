import Link from "next/link";
import { Service } from "@/types/service";

interface ServiceCardProps {
  service: Service;
  showBuyButton?: boolean;
}

export default function ServiceCard({
  service,
  showBuyButton = true,
}: ServiceCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="p-6">
        {/* Popular Badge */}
        {service.popular && (
          <div className="mb-3">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              Most Popular
            </span>
          </div>
        )}

        {/* Service Title */}
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {service.title}
        </h3>

        {/* Price */}
        <div className="mb-4">
          <span className="text-3xl font-bold text-blue-600">
            ${service.price}
          </span>
          <span className="text-gray-500 ml-1">/{service.duration}</span>
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-4">{service.shortDescription}</p>

        {/* Features */}
        <ul className="space-y-2 mb-6">
          {service.features.slice(0, 4).map((feature, index) => (
            <li key={index} className="flex items-center text-sm text-gray-600">
              <svg
                className="h-4 w-4 text-green-500 mr-2 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              {feature}
            </li>
          ))}
          {service.features.length > 4 && (
            <li className="text-sm text-gray-500">
              +{service.features.length - 4} more features
            </li>
          )}
        </ul>

        {/* Action Buttons */}
        <div className="space-y-2">
          {showBuyButton ? (
            <Link
              href={`/checkout?service=${service.slug}`}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 block text-center"
            >
              Get Started
            </Link>
          ) : (
            <Link
              href={`/services/${service.slug}`}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-md transition-colors duration-200 block text-center"
            >
              Learn More
            </Link>
          )}

          <Link
            href={`/services/${service.slug}`}
            className="w-full text-blue-600 hover:text-blue-700 font-medium py-2 px-4 rounded-md transition-colors duration-200 block text-center"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
