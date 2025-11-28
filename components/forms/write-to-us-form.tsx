"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { colors, gradients } from "@/lib/constants/theme";

export function WriteToUsForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);

      const res = await fetch("/api/write-to-us", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setShowPopup(true);
      setPopupMessage(data.message || "Thank you for reaching out!");
      setTimeout(() => setShowPopup(false), 5000);
      setFormData({ name: "", email: "", message: "" });
    } catch (error: any) {
      console.error("Error submitting:", error);
      setShowPopup(true);
      setPopupMessage(error.message || "Failed to submit. Please try again.");
      setTimeout(() => setShowPopup(false), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block mb-2 text-lg" style={{ color: colors.stone[900] }}>
              Your Name
            </label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="h-12 px-5"
              style={{
                borderColor: colors.primary.gold,
                backgroundColor: "rgba(255, 255, 255, 0.5)",
              }}
              placeholder="Jane Doe"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-lg"
              style={{ color: colors.stone[900] }}
            >
              Your Email
            </label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="h-12 px-5"
              style={{
                borderColor: colors.primary.gold,
                backgroundColor: "rgba(255, 255, 255, 0.5)",
              }}
              placeholder="jane@company.com"
              required
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="message"
            className="block mb-2 text-lg"
            style={{ color: colors.stone[900] }}
          >
            Your Vision for AlmanacAI
          </label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={6}
            className="px-5 py-4 resize-none"
            style={{
              borderColor: colors.primary.gold,
              backgroundColor: "rgba(255, 255, 255, 0.5)",
            }}
            placeholder="What would make AlmanacAI indispensable for you? Share your expectations, frustrations with current tools, or wild ideas..."
            required
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="group px-8 py-4 rounded-lg h-auto transition-all duration-300 hover:scale-105 hover:shadow-2xl flex items-center gap-3 mx-auto"
          style={{
            background: gradients.primary,
            boxShadow: "0 10px 30px rgba(120, 82, 62, 0.4)",
            color: colors.background.white,
            opacity: isSubmitting ? 0.7 : 1,
          }}
        >
          <span className="text-lg">
            {isSubmitting ? "Sending..." : "Send Your Ideas"}
          </span>
        </Button>
      </form>

      {/* Success Popup */}
      {showPopup && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-9 left-1/2 -translate-x-1/2 backdrop-blur-lg shadow-2xl rounded-2xl px-6 py-4 text-center text-sm sm:text-base font-medium z-[999] max-w-md"
          style={{
            backgroundColor: `${colors.primary.darkBrown}B3`,
            color: colors.background.white,
            border: `1px solid rgba(196, 165, 123, 0.3)`,
          }}
        >
          <p className="text-base" style={{ color: "rgba(254, 243, 199, 0.8)" }}>{popupMessage}</p>
        </motion.div>
      )}
    </>
  );
}
