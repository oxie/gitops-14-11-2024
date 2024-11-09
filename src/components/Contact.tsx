import React from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

export default function Contact() {
  return (
    <section 
      id="contact" 
      className="py-32 relative"
      role="region"
      aria-labelledby="contact-title"
    >
      {/* Background effects */}
      <div 
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-slate-900" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900" />
      </div>

      <div 
        className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 pointer-events-none"
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

      <div className="container mx-auto px-6 relative z-10">
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
                <Mail className="h-6 w-6 text-gold-400" />
              </div>
              <h2 
                id="contact-title"
                className="section-title-text"
              >
                Ready to Level Up Your GitOps?
              </h2>
            </div>
          </div>
          <p className="section-description">
            Want to take your CD process to the next level with FluxCD and GitOps? Let's talk about how we can transform your infrastructure with production-grade open source solutions.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-12"
          >
            <a
              href="mailto:goto@gitopsnow.com"
              className="relative z-20 inline-flex items-center space-x-3 bg-gold-500 hover:bg-gold-600 text-slate-900 px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 focus:ring-offset-slate-900 cursor-pointer select-none active:scale-95 group"
              aria-label="Contact us via email"
            >
              <Mail 
                className="h-5 w-5 transition-transform group-hover:scale-110" 
                aria-hidden="true"
              />
              <span className="font-semibold">Contact Us</span>
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gradient overlay */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none"
        aria-hidden="true"
      />
    </section>
  );
}