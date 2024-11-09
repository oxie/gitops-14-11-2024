import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';
import CategoryGroup from './tools/CategoryGroup';
import { toolCategories } from './tools/ToolCategories';

function Tools() {
  return (
    <section 
      id="technology" 
      className="py-32 relative overflow-visible"
      role="region"
      aria-labelledby="tools-title"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800/95 to-slate-900" />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(250, 189, 0, 0.07) 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}
        />
      </div>
      
      {/* Animated Gradient Orb */}
      <div className="absolute -top-64 left-1/4 w-[800px] h-[800px] bg-gradient-radial from-gold-500/20 via-gold-500/5 to-transparent rounded-full blur-3xl animate-pulse-slow" />

      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="section-title">
            <div className="section-title-wrapper group">
              <div className="section-title-icon">
                <Terminal className="h-6 w-6 text-gold-400" />
              </div>
              <h2 
                id="tools-title"
                className="section-title-text"
              >
                Technology Stack
              </h2>
            </div>
          </div>
          <p className="section-description">
            Production-grade open source solutions powered by battle-tested tools
          </p>
        </motion.div>

        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          role="list"
          aria-label="Technology categories"
        >
          {toolCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeOut"
              }}
              className="h-full"
            >
              <CategoryGroup
                title={category.title}
                description={category.description}
                icon={category.icon}
                items={category.items}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none" />
    </section>
  );
}

export default memo(Tools);