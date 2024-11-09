import React from 'react';
import { GitBranch, Github, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const sections = [
    {
      title: 'Solutions',
      links: [
        { label: 'GitOps Transformation', href: '#solutions' },
        { label: 'Infrastructure Automation', href: '#technology' },
        { label: 'Platform Engineering', href: '#benefits' },
        { label: 'Cloud Native Architecture', href: '#technology' }
      ]
    },
    {
      title: 'Technologies',
      links: [
        { label: 'Platform Orchestration', href: '#technology' },
        { label: 'Continuous Delivery', href: '#technology' },
        { label: 'Infrastructure Management', href: '#technology' },
        { label: 'Event Streaming', href: '#technology' }
      ]
    }
  ];

  return (
    <footer 
      className="bg-slate-900 pt-20 pb-10 overflow-hidden"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div 
        className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5"
        aria-hidden="true"
      />
      <div 
        className="absolute top-0 left-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl"
        aria-hidden="true"
      />
      <div 
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl"
        aria-hidden="true"
      />

      <div className="container mx-auto px-6 relative">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <GitBranch 
                className="h-8 w-8 text-gold-400"
                aria-hidden="true"
              />
              <span className="text-2xl font-bold">GitOpsNow</span>
            </div>
            <p className="text-slate-400 mb-6 max-w-md">
              Next-level Platform Engineering powered by GitOps. 
              Transform your infrastructure with production-grade open source solutions.
            </p>
            <div 
              className="flex space-x-4"
              role="list"
              aria-label="Social links"
            >
              <a 
                href="https://github.com/gitopsnow" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
                role="listitem"
                aria-label="Visit our GitHub"
              >
                <Github 
                  className="h-5 w-5 text-gold-400"
                  aria-hidden="true"
                />
                <span className="text-slate-300">GitHub</span>
              </a>
              <a 
                href="mailto:goto@gitopsnow.com"
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
                role="listitem"
                aria-label="Send us an email"
              >
                <Mail 
                  className="h-5 w-5 text-gold-400"
                  aria-hidden="true"
                />
                <span className="text-slate-300">Email</span>
              </a>
            </div>
          </div>

          {/* Links Columns */}
          {sections.map((section) => (
            <div key={section.title}>
              <h3 
                className="font-semibold mb-6"
                id={`footer-${section.title.toLowerCase()}-heading`}
              >
                {section.title}
              </h3>
              <ul 
                className="space-y-4"
                role="list"
                aria-labelledby={`footer-${section.title.toLowerCase()}-heading`}
              >
                {section.links.map((link) => (
                  <li key={link.label} role="listitem">
                    <a
                      href={link.href}
                      className="text-slate-400 hover:text-gold-400 transition-colors"
                      aria-label={`Go to ${link.label}`}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div 
              className="text-slate-400 text-sm"
              role="contentinfo"
              aria-label="Copyright information"
            >
              © {currentYear} GitOpsNow. All rights reserved.
            </div>
            <nav 
              className="flex space-x-6 text-sm"
              role="navigation"
              aria-label="Legal links"
            >
              <a 
                href="#" 
                className="text-slate-400 hover:text-gold-400 transition-colors"
                aria-label="Read our Privacy Policy"
              >
                Privacy Policy
              </a>
              <a 
                href="#" 
                className="text-slate-400 hover:text-gold-400 transition-colors"
                aria-label="Read our Terms of Service"
              >
                Terms of Service
              </a>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}