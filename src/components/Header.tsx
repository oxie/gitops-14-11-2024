import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight, GitBranch, Mail } from 'lucide-react';
import { useThrottledCallback } from '../hooks/useThrottledCallback';

const MENU_ITEMS = [
  { label: 'HOME', sectionId: 'home' },
  { label: 'SOLUTIONS', sectionId: 'solutions' },
  { label: 'TECHNOLOGY', sectionId: 'technology' },
  { label: 'BENEFITS', sectionId: 'benefits' },
  { label: 'FAQ', sectionId: 'faq' },
  { label: 'CONTACT', sectionId: 'contact', isButton: true }
] as const;

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [cursorVisible, setCursorVisible] = useState(true);
  const lastScrollPosition = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible(v => !v);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  const handleScroll = useThrottledCallback(() => {
    setIsScrolled(window.scrollY > 20);

    const sections = MENU_ITEMS.map(item => {
      const element = document.getElementById(item.sectionId);
      if (!element) return null;
      const rect = element.getBoundingClientRect();
      return {
        id: item.sectionId,
        top: rect.top + window.scrollY - 100,
        bottom: rect.bottom + window.scrollY
      };
    }).filter(Boolean);

    const scrollPosition = window.scrollY;

    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      if (section && section.top <= scrollPosition) {
        setActiveSection(section.id);
        break;
      }
    }
  }, 100);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleItemClick = useCallback((e: React.MouseEvent, item: typeof MENU_ITEMS[number]) => {
    e.preventDefault();
    
    const section = document.getElementById(item.sectionId);
    if (section) {
      const headerOffset = 80;
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      setIsMobileMenuOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      lastScrollPosition.current = window.scrollY;
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'py-2 bg-slate-900/90 backdrop-blur-md' : 'py-4 bg-transparent'
      }`}
      role="banner"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <nav className="flex items-center justify-between relative" role="navigation" aria-label="Main navigation">
          {/* Logo */}
          <a 
            href="#home"
            onClick={(e) => handleItemClick(e, MENU_ITEMS[0])}
            className="group relative z-[60]"
            aria-label="GitOpsNow Home"
          >
            <div className="absolute inset-0 bg-gold-500/20 blur-lg rounded-lg group-hover:bg-gold-500/30 transition-colors" aria-hidden="true" />
            <div className="relative bg-slate-800/90 rounded-lg px-4 py-2 border border-gold-500/30 group-hover:border-gold-500/50 transition-colors">
              <div className="flex items-center space-x-3">
                <GitBranch className="h-5 w-5 text-gold-400" aria-hidden="true" />
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center font-mono text-sm"
                >
                  <span className="text-gold-400">GitOps</span>
                  <span className="text-slate-300 mx-1.5">/</span>
                  <span className="text-gold-400">NOW</span>
                  <span className="text-slate-300 mx-1.5">/</span>
                  <span 
                    className={`inline-block w-2 h-4 bg-gold-400 ml-1 transition-opacity duration-200 ${
                      cursorVisible ? 'opacity-100' : 'opacity-0'
                    }`}
                    aria-hidden="true"
                  />
                </motion.div>
              </div>
            </div>
          </a>

          {/* Desktop Menu */}
          <div 
            className="hidden md:flex items-center space-x-8"
            role="menubar"
            aria-label="Desktop navigation"
          >
            {MENU_ITEMS.map((item) => (
              <a
                key={item.label}
                href={`#${item.sectionId}`}
                onClick={(e) => handleItemClick(e, item)}
                className={`
                  group flex items-center text-sm transition-all duration-200 font-mono
                  ${item.isButton 
                    ? 'bg-gold-500 px-6 py-2 rounded-lg text-slate-900 hover:scale-105' 
                    : 'text-slate-300 hover:text-gold-400'}
                  relative
                `}
                role={item.isButton ? 'button' : 'menuitem'}
                aria-current={activeSection === item.sectionId ? 'page' : undefined}
              >
                {!item.isButton && (
                  <>
                    <span className="absolute left-0 -ml-4 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      $
                    </span>
                    <ChevronRight 
                      className={`h-4 w-4 mr-1 transition-all duration-200 ${
                        activeSection === item.sectionId 
                          ? 'text-gold-400' 
                          : 'text-slate-500 group-hover:text-gold-400 group-hover:translate-x-1'
                      }`}
                    />
                  </>
                )}
                <span className={activeSection === item.sectionId && !item.isButton ? 'text-gold-400' : ''}>
                  {item.label}
                </span>
                {item.isButton && (
                  <span className={`ml-1 ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}>
                    _
                  </span>
                )}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-800/50 transition-colors relative z-[60]"
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-controls="mobile-menu"
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-6 w-6" aria-hidden="true" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-6 w-6" aria-hidden="true" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[50] md:hidden"
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                height: '100vh',
                backgroundColor: 'rgb(15 23 42 / 0.95)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <div className="h-full pt-24 px-4 overflow-y-auto">
                <div className="flex flex-col space-y-2">
                  {MENU_ITEMS.map((item) => (
                    <a
                      key={item.label}
                      href={`#${item.sectionId}`}
                      onClick={(e) => handleItemClick(e, item)}
                      className={`
                        flex items-center w-full px-4 py-4 rounded-lg font-mono transition-all
                        ${item.isButton 
                          ? 'bg-gold-500 text-slate-900 mt-4 font-semibold' 
                          : activeSection === item.sectionId
                            ? 'text-gold-400 bg-slate-800/50'
                            : 'text-slate-300 hover:text-gold-400 hover:bg-slate-800/50'
                        }
                      `}
                      role={item.isButton ? 'button' : 'menuitem'}
                      aria-current={activeSection === item.sectionId ? 'page' : undefined}
                    >
                      {!item.isButton && (
                        <span className="text-slate-500 mr-2">$</span>
                      )}
                      {item.isButton ? (
                        <Mail className="h-4 w-4 mr-2" />
                      ) : (
                        <ChevronRight 
                          className={`h-4 w-4 mr-2 ${
                            activeSection === item.sectionId ? 'text-gold-400' : 'text-slate-500'
                          }`}
                        />
                      )}
                      <span>{item.label}</span>
                      {item.isButton && (
                        <span className={`ml-1 ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}>
                          _
                        </span>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}