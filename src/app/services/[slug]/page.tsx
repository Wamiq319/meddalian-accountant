import { getServiceBySlug } from "@/constants/services";
import { notFound } from "next/navigation";
import BuyNowButton from "@/components/BuyNowButton";

interface ServiceDetailPageProps {
  params: {
    slug: string;
  };
}

export default function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const service = getServiceBySlug(params.slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Service Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {service.title}
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                {service.description}
              </p>
              <div className="flex items-center space-x-4">
                <span className="text-4xl font-bold text-blue-600">
                  ${service.price}
                </span>
                <span className="text-gray-500">/{service.duration}</span>
                {service.popular && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    Most Popular
                  </span>
                )}
              </div>
            </div>
            <div className="mt-6 lg:mt-0 lg:ml-8">
              <BuyNowButton
                serviceSlug={service.slug}
                price={service.price}
                className="w-full lg:w-auto"
              />
            </div>
          </div>
        </div>

        {/* Service Features */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            What's Included
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {service.features.map((feature, index) => (
              <div key={index} className="flex items-start">
                <svg
                  className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* TODO: Add testimonials section */}
        {/* TODO: Add FAQ section */}
        {/* TODO: Add related services */}
        {/* TODO: Add contact CTA */}
      </div>
    </div>
  );
}
