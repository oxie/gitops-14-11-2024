import React, { memo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { GitBranch, Cloud, Shield, Terminal, Blocks } from 'lucide-react';

const ServiceFeature = memo(function ServiceFeature({ feature }: { feature: string }) {
  return (
    <li className="flex items-center text-slate-400" role="listitem">
      <div 
        className="w-1.5 h-1.5 rounded-full bg-gold-500 mr-3" 
        aria-hidden="true"
      />
      {feature}
    </li>
  );
});

const ServiceCard = memo(function ServiceCard({ 
  service, 
  index,
  animationDuration 
}: { 
  service: typeof services[number];
  index: number;
  animationDuration: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: animationDuration, delay: index * 0.1 }}
      className="group relative z-10 h-full"
      role="article"
      aria-labelledby={`service-title-${index}`}
    >
      <div 
        className="absolute inset-0 bg-gradient-to-r from-gold-500/10 to-gold-600/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
        aria-hidden="true"
      />
      
      <div className="relative h-full p-4 sm:p-8 rounded-2xl bg-slate-800/50 backdrop-blur-sm border border-slate-700 hover:border-gold-500/50 transition-colors flex flex-col">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
          <div 
            className="p-3 rounded-xl bg-gradient-to-r from-gold-500/10 to-gold-600/10 w-fit"
            aria-hidden="true"
          >
            <div className="text-gold-400">{service.icon}</div>
          </div>
          <h3 
            id={`service-title-${index}`}
            className="text-xl sm:text-2xl font-bold text-white group-hover:text-gold-400 transition-colors duration-300"
          >
            {service.title}
          </h3>
        </div>
        
        <p className="text-sm sm:text-base text-slate-300 mb-6 flex-grow">
          {service.description}
        </p>
        
        <ul 
          className="space-y-2 sm:space-y-3"
          role="list"
          aria-label={`Features of ${service.title}`}
        >
          {service.features.map((feature) => (
            <ServiceFeature key={feature} feature={feature} />
          ))}
        </ul>

        {/* Enhanced hover effects */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500">
          {/* Gradient borders */}
          <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
          <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
          <div className="absolute inset-y-0 -left-px w-px bg-gradient-to-b from-transparent via-gold-500/30 to-transparent" />
          <div className="absolute inset-y-0 -right-px w-px bg-gradient-to-b from-transparent via-gold-500/30 to-transparent" />
          
          {/* Corner glows */}
          <div className="absolute -top-1 -left-1 w-2 h-2 bg-gold-400/20 rounded-full blur-sm" />
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-gold-400/20 rounded-full blur-sm" />
          <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-gold-400/20 rounded-full blur-sm" />
          <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-gold-400/20 rounded-full blur-sm" />
        </div>
      </div>
    </motion.div>
  );
});

const services = [
  {
    icon: <GitBranch className="h-6 w-6 sm:h-8 sm:w-8" aria-hidden="true" />,
    title: "GitOps Automation",
    description: "Automated deployments and infrastructure management through Git workflows",
    features: ["Version Control", "Automated Rollbacks", "Config Management"]
  },
  {
    icon: <Cloud className="h-6 w-6 sm:h-8 sm:w-8" aria-hidden="true" />,
    title: "Cloud Native",
    description: "Modern cloud infrastructure with scalability and reliability built-in",
    features: ["Multi-Cloud", "Auto-Scaling", "High Availability"]
  },
  {
    icon: <Shield className="h-6 w-6 sm:h-8 sm:w-8" aria-hidden="true" />,
    title: "Security First",
    description: "Enterprise-grade security with automated compliance and monitoring",
    features: ["Zero Trust", "Compliance Automation", "Threat Detection"]
  },
  {
    icon: <Terminal className="h-6 w-6 sm:h-8 sm:w-8" aria-hidden="true" />,
    title: "Infrastructure as Code",
    description: "Declarative infrastructure definitions with built-in validation",
    features: ["Version Control", "Drift Detection", "Automated Testing"]
  }
] as const;

const SectionTitle = memo(function SectionTitle() {
  return (
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
            <Blocks className="h-4 w-4 sm:h-6 sm:w-6 text-gold-400" />
          </div>
          <div className="section-title-text">GitOps/NOW Solutions</div>
        </div>
      </div>
      <p className="section-description">
        Transform your infrastructure with Open Source projects to production-grade solutions
      </p>
    </motion.div>
  );
});

function Services() {
  const shouldReduceMotion = useReducedMotion();
  const animationDuration = shouldReduceMotion ? 0 : 0.5;

  return (
    <section 
      id="solutions" 
      className="relative min-h-screen flex items-center py-20 overflow-visible"
      role="region"
      aria-label="Solutions Section"
    >
      {/* Background effects */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-slate-800" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-800 via-slate-800 to-slate-900" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative">
        <SectionTitle />

        <div 
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 mt-8 sm:mt-16"
          role="list"
          aria-label="Services offered"
        >
          {services.map((service, index) => (
            <ServiceCard 
              key={service.title}
              service={service}
              index={index}
              animationDuration={animationDuration}
            />
          ))}
        </div>
      </div>

      {/* Bottom gradient overlay */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none" 
        aria-hidden="true"
      />
    </section>
  );
}

export default memo(Services);