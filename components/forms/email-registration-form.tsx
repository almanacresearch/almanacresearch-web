"use client";

import { useState, SetStateAction } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { colors, gradients } from "@/lib/constants/theme";

export function EmailRegistrationForm() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = form.email.value.trim();

    if (!email) {
      alert("Please enter a valid email address.");
      return;
    }

    try {
      setIsLoading(true);

      const res = await fetch("/api/register-prelaunch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(err || "Something went wrong");
      }

      const data = await res.json();

      setShowPopup(true);
      setPopupMessage(data.message || "Thank you for registering.");
      setEmail("");

      // Redirect to About page Help Us Build section after 2 seconds
      setTimeout(() => {
        window.location.href = "/about#help-us-build";
      }, 2000);
    } catch (error) {
      console.error("Error submitting email:", error);
      alert("Failed to submit email. Please try again after some time.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4 pt-4">
        <div className="flex flex-col sm:flex-row gap-3 items-center">
          <Input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e: { target: { value: SetStateAction<string> } }) =>
              setEmail(e.target.value)
            }
            className="w-full sm:flex-1 h-14 px-6 rounded-4xl border-2 transition-all duration-300 outline-none focus:ring-2 focus:ring-offset-2"
            style={{
              backgroundColor: "rgba(245, 245, 244, 0.95)",
              borderColor: colors.primary.lightBrown,
              color: colors.stone[900],
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            }}
            required
          />
          <Button
            type="submit"
            disabled={isLoading}
            className="rounded-4xl px-10 h-14 whitespace-nowrap transition-all duration-300 border-2 border-stone-200/30 hover:scale-105"
            style={{
              background: gradients.primary,
              boxShadow:
                "0 6px 24px rgba(120, 82, 62, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
              color: colors.background.white,
              opacity: isLoading ? 0.7 : 1,
            }}
          >
            {isLoading ? "Submitting..." : "Register"}
          </Button>
        </div>
      </form>

      <div className="mt-4">
        <a
          href="/enterprise"
          className="inline-flex items-center transition-colors group"
          style={{ color: "#ac5d5dff" }}
        >
          <span className="hover:underline">Enterprise? Register here →</span>
        </a>
      </div>

      {showPopup && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-9 left-1/2 -translate-x-1/2 backdrop-blur-lg shadow-2xl rounded-2xl px-6 py-3 text-center text-sm sm:text-base font-medium z-[999]"
          style={{
            backgroundColor: `${colors.primary.darkBrown}B3`,
            color: colors.background.white,
            border: `1px solid rgba(196, 165, 123, 0.3)`,
          }}
        >
          <p
            className="text-base mt-2"
            style={{ color: "rgba(254, 243, 199, 0.8)" }}
            dangerouslySetInnerHTML={{ __html: popupMessage }}
          ></p>
        </motion.div>
      )}
    </>
  );
}
