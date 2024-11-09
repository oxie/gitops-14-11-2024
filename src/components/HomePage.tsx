import React, { Suspense, memo } from 'react';
import Hero from './Hero';
import LoadingSpinner from './LoadingSpinner';
import Services from './Services';
import Tools from './Tools';
import Benefits from './Benefits';
import FAQ from './FAQ';
import Contact from './Contact';
import Footer from './Footer';

function HomePage() {
  return (
    <main className="relative">
      <Hero />
      <Suspense fallback={<LoadingSpinner />}>
        <Services />
        <Tools />
        <Benefits />
        <FAQ />
        <Contact />
        <Footer />
      </Suspense>
    </main>
  );
}

export default memo(HomePage);