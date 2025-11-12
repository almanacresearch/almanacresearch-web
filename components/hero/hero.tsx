import { Button } from "../ui/button";
import { motion } from "motion/react";
import { SetStateAction, useState } from "react";
import { Input } from "../ui/input";

export function Hero() {
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

      const res = await fetch("/api/join-beta", {
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
      setTimeout(() => setShowPopup(false), 5000);
      setEmail("");
    } catch (error) {
      console.error("Error submitting email:", error);
      alert("Failed to submit email. Please try again after some time.");
    } finally {
      setIsLoading(false);
    }
  };

  // Generate animated background shapes
  const shapes = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: Math.random() * 120 + 60,
    initialX: Math.random() * 100,
    initialY: Math.random() * 100,
    duration: Math.random() * 25 + 15,
    delay: Math.random() * 5,
  }));

  return (
    <section className="relative bg-gradient-to-br from-stone-900 via-amber-950 to-stone-950 py-32 overflow-hidden">
      {/* Animated Background - Motion Graphics */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated Circles */}
        {shapes.slice(0, 6).map((shape) => (
          <motion.div
            key={`circle-${shape.id}`}
            className="absolute rounded-full bg-gradient-to-br from-amber-700/10 to-amber-800/10 backdrop-blur-sm"
            style={{
              width: shape.size,
              height: shape.size,
              left: `${shape.initialX}%`,
              top: `${shape.initialY}%`,
            }}
            animate={{
              x: [0, 80, -80, 0],
              y: [0, -80, 80, 0],
              scale: [1, 1.3, 0.9, 1],
              rotate: [0, 120, 240, 360],
            }}
            transition={{
              duration: shape.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: shape.delay,
            }}
          />
        ))}

        {/* Animated Rectangles */}
        {shapes.slice(6, 11).map((shape) => (
          <motion.div
            key={`rect-${shape.id}`}
            className="absolute bg-gradient-to-br from-yellow-700/8 to-amber-600/8 backdrop-blur-sm rounded-xl"
            style={{
              width: shape.size * 1.2,
              height: shape.size * 0.8,
              left: `${shape.initialX}%`,
              top: `${shape.initialY}%`,
            }}
            animate={{
              x: [0, -60, 60, 0],
              y: [0, 60, -60, 0],
              rotate: [0, 45, -45, 0],
              scale: [1, 0.85, 1.15, 1],
            }}
            transition={{
              duration: shape.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: shape.delay,
            }}
          />
        ))}

        {/* Floating Particles */}
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1.5 h-1.5 rounded-full bg-amber-400/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -600],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: Math.random() * 20 + 15,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 10,
            }}
          />
        ))}

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/20 via-transparent to-amber-900/10" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-1 pb-6">
              <p className="text-3xl lg:text-4xl font-bold text-stone-300">
                introducing
              </p>
              <h1 className="text-6xl lg:text-7xl font-bold text-stone-100">
                AlmanacAI
              </h1>
              <p className="text-lg lg:text-xl text-amber-50/80">
                <i>Powering your high-performance life.</i>
              </p>
            </div>

            <p className="text-lg lg:text-xl text-amber-50/80">
              Join the beta, launching - <b> March 1, 2026</b> — and get
              lifetime free access to AlmanacAI.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4 pt-4">
              <div className="flex flex-col sm:flex-row gap-3 items-center">
                <Input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e: {
                    target: { value: SetStateAction<string> };
                  }) => setEmail(e.target.value)}
                  className="h-14 px-6 rounded-4xl border-2 transition-all duration-300  lg:w-2/3"
                  style={{
                    backgroundColor: "rgba(227, 226, 226, 0.95)",
                    borderColor: "#A0725D",
                    color: "#57534e",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                  }}
                  required
                />
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="rounded-4xl px-10 h-14 whitespace-nowrap transition-all duration-300 border-2 border-amber-200/30 hover:scale-105"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(120, 78, 30, 0.9) 0%, rgba(139, 83, 36, 0.9) 50%, rgba(160, 103, 50, 0.9) 100%)",
                    boxShadow:
                      "0 6px 24px rgba(139, 83, 36, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                    color: "#FAF9F6",
                    opacity: isLoading ? 0.7 : 1,
                  }}
                >
                  {isLoading ? "Submitting..." : "Join the Beta"}
                </Button>
              </div>
            </form>
            <div className="text-center sm:text-left">
              <a
                href="#enterprise"
                className="inline-flex items-center transition-colors group"
                style={{ color: "#ac5d5dff" }}
              >
                <span className="hover:underline">
                  Enterprise? Register here →
                </span>
              </a>
            </div>
          </motion.div>
        </div>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-9 left-1/2 -translate-x-1/2 bg-amber-900/70 backdrop-blur-lg text-stone-100 border border-amber-200/30 shadow-2xl rounded-2xl px-6 py-3 text-center text-sm sm:text-base font-medium z-[999]"
          >
            <p
              className="text-base text-amber-50/80 mt-2"
              dangerouslySetInnerHTML={{ __html: popupMessage }}
            ></p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
