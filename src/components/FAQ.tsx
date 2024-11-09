import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Terminal, HelpCircle } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How does GitOps improve deployment reliability?",
      answer: "GitOps uses Git as the single source of truth for declarative infrastructure and applications. This ensures consistent, repeatable deployments with automated drift detection and reconciliation, resulting in 99.99% deployment reliability."
    },
    {
      question: "What security measures are implemented?",
      answer: "We implement a comprehensive security framework including zero-trust architecture, automated RBAC, encrypted GitOps workflows, and continuous security scanning. All changes are version-controlled and audit-logged."
    },
    {
      question: "How long does implementation typically take?",
      answer: "Implementation timeline varies based on your infrastructure complexity. Typically, initial setup takes 2-4 weeks, with full transformation completed within 2-3 months, ensuring minimal disruption to operations."
    },
    {
      question: "What cloud platforms do you support?",
      answer: "We support all major cloud providers (AWS, Azure, GCP) and can implement hybrid or multi-cloud solutions. Our platform-agnostic approach ensures consistent operations across any infrastructure."
    }
  ];

  return (
    <section 
      id="faq" 
      className="py-32 relative"
      role="region"
      aria-labelledby="faq-title"
    >
      {/* Top gradient overlay for smooth transition */}
      <div 
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-slate-900" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900" />
      </div>

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(250, 189, 0, 0.1) 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }}
        aria-hidden="true"
      />

      {/* Animated orbs */}
      <div 
        className="absolute top-0 left-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl"
        aria-hidden="true"
      />
      <div 
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl"
        aria-hidden="true"
      />

      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="section-title">
            <div className="section-title-wrapper group">
              <div 
                className="section-title-icon"
                aria-hidden="true"
              >
                <HelpCircle className="h-6 w-6 text-gold-400" />
              </div>
              <h2 
                id="faq-title" 
                className="section-title-text"
              >
                Frequently Asked Questions
              </h2>
            </div>
          </div>
          <p className="section-description">
            Get answers to common questions about our GitOps solutions and implementation process
          </p>
        </motion.div>

        <div 
          className="max-w-3xl mx-auto space-y-4 mt-16"
          role="list"
          aria-label="FAQ items"
        >
          {faqs.map((faq, index) => (
            <motion.div 
              key={index} 
              className="glass-card rounded-lg overflow-hidden relative z-10"
              initial={false}
              role="listitem"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:text-gold-400 transition-colors"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
                id={`faq-question-${index}`}
              >
                <div className="flex items-center space-x-4">
                  <Terminal 
                    className="h-5 w-5 text-gold-400"
                    aria-hidden="true"
                  />
                  <span className="font-semibold text-lg">{faq.question}</span>
                </div>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  aria-hidden="true"
                >
                  <ChevronDown className="h-5 w-5 text-gold-400" />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    id={`faq-answer-${index}`}
                    role="region"
                    aria-labelledby={`faq-question-${index}`}
                  >
                    <div className="px-6 pb-4">
                      <div 
                        className="h-px w-full bg-slate-700/50 mb-4"
                        aria-hidden="true"
                      />
                      <div className="text-slate-300 leading-relaxed pl-9">
                        {faq.answer}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom gradient overlay for smooth transition */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none"
        aria-hidden="true"
      />
    </section>
  );
}