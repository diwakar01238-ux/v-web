

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/videos/hero-bg.mp4"
        autoPlay
        loop
        muted
        playsInline
      ></video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Hero Content */}
      <div className="relative z-10 text-center text-white px-4">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold leading-tight"
        >
          Find Trusted Hospitals & Doctors
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-4 text-lg max-w-xl mx-auto"
        >
          Compare hospitals, connect with specialists, and book appointments
          effortlessly – across the globe.
        </motion.p>

        {/* Feature Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto"
        >
          {[
            {
              icon: "⏰",
              title: "24/7 Support",
              desc: "Always available for patients.",
            },
            {
              icon: "🏥",
              title: "Best Facilities",
              desc: "World-class hospitals & equipment.",
            },
            {
              icon: "⚕️",
              title: "One-Stop Care",
              desc: "Consult, book & treat in one place.",
            },
            {
              icon: "🌍",
              title: "Global Reach",
              desc: "Trusted doctors in 10+ countries.",
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{
                scale: 1.08,
                y: -5,
                boxShadow: "0px 12px 28px rgba(0, 128, 128, 0.4)",
              }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 flex flex-col items-center text-center shadow-lg cursor-pointer"
            >
              <span className="text-4xl">{feature.icon}</span>
              <h3 className="mt-3 font-semibold text-lg">{feature.title}</h3>
              <p className="text-sm mt-2">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Countries Belt */}
        <div className="mt-12 w-full overflow-hidden">
          <h2 className="text-2xl font-semibold mb-4">
            Our Medical Destinations
          </h2>
          <motion.div
            className="flex gap-6 justify-start whitespace-nowrap"
            animate={{ x: ["0%", "-100%"] }}
            transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
          >
            {[
              { country: "India", flag: "🇮🇳" },
              { country: "Germany", flag: "🇩🇪" },
              { country: "USA", flag: "🇺🇸" },
              { country: "UK", flag: "🇬🇧" },
              { country: "Singapore", flag: "🇸🇬" },
              { country: "UAE", flag: "🇦🇪" },
              { country: "Turkey", flag: "🇹🇷" },
              { country: "Thailand", flag: "🇹🇭" },
              { country: "Spain", flag: "🇪🇸" },
              { country: "France", flag: "🇫🇷" },
            ].map((dest, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.2, y: -4 }}
                transition={{ type: "spring", stiffness: 200, damping: 12 }}
                className="bg-white/10 px-4 py-2 mx-2 rounded-lg inline-flex items-center gap-2 backdrop-blur-md cursor-pointer"
              >
                <span className="text-xl">{dest.flag}</span>
                <span>{dest.country}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
