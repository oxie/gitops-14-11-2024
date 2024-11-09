import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

interface CategoryGroupProps {
  title: string;
  description: string;
  icon: typeof Terminal;
  items: readonly string[];
}

// Optimized variants using hardware-accelerated properties
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.015, // Reduced stagger time
      delayChildren: 0.05    // Reduced delay
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0,
    transform: 'translate3d(-5px, 0, 0)' // Using translate3d for GPU acceleration
  },
  visible: { 
    opacity: 1,
    transform: 'translate3d(0, 0, 0)',
    transition: {
      type: "tween",      // Changed to tween for better performance
      duration: 0.2,      // Reduced duration
      ease: "easeOut"     // Simple easing function
    }
  }
};

const CategoryGroup = memo(function CategoryGroup({ 
  title, 
  description,
  icon: Icon, 
  items 
}: CategoryGroupProps) {
  return (
    <div className="group h-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.3 }}
        className="relative h-full flex flex-col rounded-lg border border-slate-700/50 overflow-hidden transition-all duration-300 will-change-transform"
      >
        {/* Backdrop layers */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-slate-800/70 backdrop-blur-xl transition-colors duration-300" />
          <div className="absolute inset-0 bg-gradient-to-b from-gold-500/[0.02] via-transparent to-gold-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Header */}
          <div className="p-6 border-b border-slate-700/50 bg-slate-900/40">
            <div className="flex flex-col gap-3">
              {/* Title and Icon Row */}
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-gold-500/10 to-gold-600/5 transition-colors duration-300">
                  <Icon className="h-5 w-5 text-gold-400 flex-shrink-0 transform-gpu transition-transform duration-300 group-hover:scale-110" />
                </div>
                <h3 className="text-lg font-bold text-white transition-colors duration-300 group-hover:text-gold-400">
                  {title}
                </h3>
              </div>

              {/* Separator */}
              <div className="h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />

              {/* Description */}
              <p className="text-sm text-slate-200 leading-relaxed">
                {description}
              </p>
            </div>
          </div>

          {/* Terminal Content */}
          <div className="flex-1 p-5 font-mono text-[13px] bg-slate-900/40">
            {/* Terminal Header */}
            <div className="flex items-center space-x-1.5 mb-3 text-[11px] sm:text-xs bg-slate-800/80 px-3 py-1.5 rounded-md">
              <span className="text-slate-400">root@GitOps/NOW/</span>
              <span className="text-gold-400 font-semibold">{title.toUpperCase().replace(/\s+/g, '-')}</span>
              <span className="text-slate-400">/</span>
            </div>
            
            {/* Items List with optimized animations */}
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 transform-gpu"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10%", amount: 0.2 }}
            >
              {items.map((item, idx) => (
                <motion.div 
                  key={idx}
                  variants={itemVariants}
                  className="group/item flex items-center space-x-2 pl-2 py-1 rounded-md transition-colors duration-200 hover:bg-slate-800/70 transform-gpu"
                  style={{ willChange: 'transform, opacity' }}
                >
                  <span className="text-slate-400 text-xs sm:text-sm font-light tracking-tight transition-colors duration-200 group-hover/item:text-gold-500">
                    {idx === items.length - 1 ? '└──' : '├──'}
                  </span>
                  <span className="text-white text-xs sm:text-sm tracking-tight leading-none transition-colors duration-200 group-hover/item:text-gold-400 truncate font-medium">
                    {item}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Optimized hover effects */}
        <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          {/* Gradient borders */}
          <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
          <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
          <div className="absolute inset-y-0 -left-px w-px bg-gradient-to-b from-transparent via-gold-500/30 to-transparent" />
          <div className="absolute inset-y-0 -right-px w-px bg-gradient-to-b from-transparent via-gold-500/30 to-transparent" />
          
          {/* Corner glows with reduced blur */}
          <div className="absolute -top-1 -left-1 w-2 h-2 bg-gold-400/20 rounded-full blur-[1px] transform-gpu" />
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-gold-400/20 rounded-full blur-[1px] transform-gpu" />
          <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-gold-400/20 rounded-full blur-[1px] transform-gpu" />
          <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-gold-400/20 rounded-full blur-[1px] transform-gpu" />
        </div>

        {/* Optimized box shadow */}
        <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_15px_rgba(250,189,0,0.1)]" />
      </motion.div>
    </div>
  );
});

export default CategoryGroup;