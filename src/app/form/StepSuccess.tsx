import Button from "@/components/Button";
import { useRouter } from "next/navigation";

export default function StepSuccess() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center py-4 text-center">
      <div className="mb-4">
        <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Success!</h2>
        <p className="text-base text-gray-600 mb-1">
          Your request has been submitted successfully.
        </p>
        <p className="text-gray-500">
          We will contact you soon with further details.
        </p>
      </div>

      <div className="bg-green-50 rounded-xl p-4 mb-4 max-w-md">
        <h3 className="font-semibold text-green-800 mb-1">
          What happens next?
        </h3>
        <ul className="text-sm text-green-700 space-y-1 text-left">
          <li className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            We'll review your request within 24 hours
          </li>
          <li className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            You'll receive a confirmation email
          </li>
          <li className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            Our team will reach out to discuss details
          </li>
        </ul>
      </div>

      <Button
        onClick={() => router.push("/")}
        className="px-8 py-3 rounded-full bg-[#e94e1b] text-white font-medium hover:bg-[#d13e0f] transition-colors duration-200 shadow-lg"
      >
        Go to Homepage
      </Button>
    </div>
  );
}
