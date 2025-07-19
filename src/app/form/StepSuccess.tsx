import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { FiCheckCircle, FiClock, FiHome } from "react-icons/fi";

export default function StepSuccess() {
  const router = useRouter();

  const handleGoHome = () => {
    // Clear all sessionStorage data
    sessionStorage.clear();
    router.push("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-1 flex items-center justify-center p-2 sm:p-4">
        <div className="max-w-6xl w-full mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Main Content - Left/Right Layout */}
          <div className="p-3 sm:p-6">
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
              {/* Left Panel - Go Home Button */}
              <div className="w-full lg:w-1/3 bg-gradient-to-br from-[#e94e1b] via-[#d13d0e] to-[#b8320a] p-4 lg:p-8 text-white rounded-xl lg:rounded-2xl shadow-xl flex flex-col justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 lg:w-20 lg:h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FiHome className="w-8 h-8 lg:w-10 lg:h-10" />
                  </div>
                  <h2 className="text-xl lg:text-2xl font-bold mb-3">
                    Thank You!
                  </h2>
                  <p className="text-orange-100 text-base lg:text-lg leading-relaxed mb-6">
                    Your order has been successfully placed. We&apos;ll be in
                    touch soon!
                  </p>
                  <Button
                    onClick={handleGoHome}
                    variant="outline"
                    className="w-full rounded-xl px-6 py-3 text-sm font-semibold shadow-lg border-white text-white hover:bg-white hover:text-[#e94e1b]"
                  >
                    Go to Homepage
                  </Button>
                </div>
              </div>

              {/* Right Panel - Success Information */}
              <div className="w-full lg:w-2/3">
                <div className="mb-6 lg:mb-8">
                  <div className="w-12 h-12 lg:w-16 lg:h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 lg:mb-6">
                    <FiCheckCircle className="w-6 h-6 lg:w-8 lg:h-8 text-green-600" />
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2 lg:mb-3">
                    Success!
                  </h2>
                  <p className="text-gray-600 text-base lg:text-lg mb-1">
                    Your request has been submitted successfully.
                  </p>
                  <p className="text-gray-500">
                    We will contact you soon with further details.
                  </p>
                </div>
                <div className="bg-green-50 rounded-xl p-4 max-w-xl">
                  <h3 className="font-semibold text-green-800 mb-1 flex items-center gap-2">
                    <FiClock className="w-4 h-4" />
                    What happens next?
                  </h3>
                  <ul className="text-sm text-green-700 space-y-1 text-left">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      We&apos;ll review your request within 24 hours
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      You&apos;ll receive a confirmation email
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Our team will reach out to discuss details
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
