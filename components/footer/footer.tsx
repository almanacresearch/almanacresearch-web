import { FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { colors } from "@/lib/constants/theme";

export function Footer() {
  return (
    <footer className="bg-amber-900 text-white py-10 px-8 mt-auto">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center sm:items-start text-center sm:text-left gap-4">
        <div>
          <h4 className="font-bold text-lg">ALMANAC RESEARCH</h4>
          <p className="text-sm" style={{ color: colors.background.offWhite }}>
            © 2025 Almanac Research. All rights reserved.
          </p>
        </div>

        <div className="flex flex-col items-end sm:items-end text-sm">
          <div className="flex flex-wrap justify-center sm:justify-end  gap-4 mb-3">
            <a href="/privacy-policy" className="hover:underline">
              Privacy Policy
            </a>
            <a href="/terms-of-service" className="hover:underline">
              Terms
            </a>
            <a href="/about#contact" className="hover:underline">
              Contact
            </a>
          </div>
          <div className="flex justify-center sm:justify-end gap-5 w-full">
            <a
              href="https://www.linkedin.com/company/almanacresearch/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition"
            >
              <FaLinkedin size={20} />
            </a>
            <a
              href="https://x.com/almanacAIhq"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition"
            >
              <FaXTwitter size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
