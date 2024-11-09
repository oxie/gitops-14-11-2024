import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GitBranch } from 'lucide-react';

const stats = [
  { 
    value: "10x", 
    label: "Deployment Velocity", 
    trend: "Industry Leading" 
  },
  { 
    value: "99.99%", 
    label: "Infrastructure Reliability", 
    trend: "GitOps Powered" 
  },
  { 
    value: "Zero", 
    label: "Configuration Drift", 
    trend: "Automated Reconciliation" 
  }
] as const;

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function Hero() {
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible(v => !v);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  const handleGetStarted = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      const headerOffset = 80;
      const elementPosition = contactSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section 
      id="home"
      className="relative min-h-[calc(100vh-80px)] flex items-center justify-center py-20 sm:py-32"
      aria-label="Hero Section"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800" />
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0" 
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(250, 189, 0, 0.15) 1px, transparent 0)`,
            backgroundSize: '48px 48px'
          }}
        />
      </div>

      {/* Animated Gradient Orb */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-radial from-gold-500/20 via-gold-500/5 to-transparent rounded-full blur-3xl animate-pulse-slow pointer-events-none"
      />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight mb-6 sm:mb-8"
            >
              <motion.span 
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.8, delay: 0.4 }}
                className="block"
              >
                Transform Your
              </motion.span>
              <motion.span 
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.8, delay: 0.5 }}
                className="relative inline-block"
              >
                <span className="relative z-10 gradient-text">
                  Infrastructure
                </span>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="absolute inset-x-0 bottom-2 h-3 bg-gold-500/20 -rotate-2 origin-left"
                />
              </motion.span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-8 sm:mb-12 px-4"
            >
              Level up your infrastructure with GitOps methodology and Platform Engineering.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex justify-center gap-4 mb-16 sm:mb-20"
            >
              <button
                onClick={handleGetStarted}
                className="relative z-20 inline-flex items-center space-x-3 bg-gold-500 hover:bg-gold-600 text-slate-900 px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 focus:ring-offset-slate-900 cursor-pointer select-none active:scale-95"
                aria-label="Scroll to contact section"
              >
                <GitBranch className="h-5 w-5" aria-hidden="true" />
                <span className="font-semibold">Get Started</span>
              </button>
            </motion.div>

            <motion.div
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
              className="grid grid-cols-3 gap-4 sm:gap-8 max-w-3xl mx-auto"
            >
              {stats.map((stat) => (
                <motion.div
                  key={stat.value}
                  variants={fadeInUp}
                  className="text-center p-2"
                >
                  <div className="text-2xl sm:text-3xl font-bold text-gold-400 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-300 mb-1">{stat.label}</div>
                  <div className="text-xs text-gold-500">{stat.trend}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom gradient overlay */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-800 to-transparent pointer-events-none"
        aria-hidden="true"
      />
    </section>
  );
}