import Button from "@/components/Button";
import Input from "@/components/Input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  FiCheckCircle,
  FiMail,
  FiTrendingUp,
  FiClock,
  FiMessageSquare,
  FiHome,
  FiInfo,
} from "react-icons/fi";

export default function StepSuccess() {
  const router = useRouter();
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add newsletter signup logic here
    console.log("Newsletter signup:", newsletterEmail);
    setNewsletterSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-1 flex items-center justify-center p-2 sm:p-4">
        <div className="max-w-6xl w-full mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Main Content - Left/Right Layout */}
          <div className="p-3 sm:p-6">
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
              {/* Left Panel - Newsletter Signup + Go Home Button */}
              <div className="w-full lg:w-1/3 bg-gradient-to-br from-[#e94e1b] via-[#d13d0e] to-[#b8320a] p-4 lg:p-8 text-white rounded-xl lg:rounded-2xl shadow-xl flex flex-col justify-between">
                <div>
                  <div className="mb-6 lg:mb-8">
                    <div className="w-12 h-12 lg:w-16 lg:h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 lg:mb-6">
                      <FiMail className="w-6 h-6 lg:w-8 lg:h-8" />
                    </div>
                    <h2 className="text-xl lg:text-2xl font-bold mb-2 lg:mb-3">
                      Stay Updated
                    </h2>
                    <p className="text-orange-100 text-base lg:text-lg leading-relaxed">
                      Join our exclusive newsletter for monthly financial
                      insights, tax strategies, and business growth tips.
                    </p>
                  </div>
                  <div className="bg-white/10 rounded-lg lg:rounded-xl p-4 lg:p-6 backdrop-blur-sm mb-6">
                    <div className="flex items-center gap-2 lg:gap-3 mb-2 lg:mb-3">
                      <FiInfo className="w-4 h-4 lg:w-5 lg:h-5 text-orange-200" />
                      <h3 className="font-semibold text-base lg:text-lg">
                        Why subscribe?
                      </h3>
                    </div>
                    <p className="text-orange-100 text-xs lg:text-sm leading-relaxed">
                      Get exclusive access to expert financial advice,
                      tax-saving strategies, and market insights that can help
                      grow your business.
                    </p>
                  </div>
                </div>
                <Button
                  onClick={() => router.push("/")}
                  variant="outline"
                  className="w-full rounded-xl px-6 py-3 text-sm font-semibold shadow-lg mt-6 border-[#0072bc] text-[#0072bc] hover:bg-[#0072bc] hover:text-white"
                >
                  Go to Homepage
                </Button>
              </div>

              {/* Right Panel - Success Information + Newsletter Signup */}
              <div className="w-full lg:w-2/3 flex flex-col justify-between">
                <div>
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
                  <div className="bg-green-50 rounded-xl p-4 mb-4 max-w-xl">
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
                {/* Newsletter Signup in Right Panel */}
                <div className="mt-6">
                  {!newsletterSubmitted ? (
                    <form
                      onSubmit={handleNewsletterSubmit}
                      className="space-y-3 bg-white/10 rounded-xl p-4 lg:p-6 backdrop-blur-sm"
                    >
                      <Input
                        label="Subscribe to our Newsletter"
                        variant="email"
                        placeholder="Enter your email address"
                        value={newsletterEmail}
                        onChange={(e) => setNewsletterEmail(e.target.value)}
                        required
                        className="bg-white/20 border-white/30 text-white placeholder-white/70 focus:border-white focus:ring-white/20"
                      />
                      <Button
                        type="submit"
                        className="w-full bg-[#e94e1b] hover:bg-[#d13d0e] text-white border-none rounded-xl px-6 py-3 text-sm font-semibold shadow-lg"
                      >
                        Subscribe to Newsletter
                      </Button>
                    </form>
                  ) : (
                    <div className="bg-white/20 rounded-xl p-4 lg:p-6 border border-white/10 flex items-center gap-3">
                      <FiCheckCircle className="w-4 h-4 lg:w-5 lg:h-5 text-green-300" />
                      <span className="font-semibold text-base lg:text-lg text-white">
                        Successfully Subscribed! You&apos;ll receive our next
                        newsletter soon.
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
