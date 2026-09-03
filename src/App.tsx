/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { VaktijaSection } from './components/VaktijaSection';
import { HutbeSection } from './components/HutbeSection';
import { AboutSection } from './components/AboutSection';
import { MektebSection } from './components/MektebSection';
import { ActivitiesSection } from './components/ActivitiesSection';
import { LocationMapSection } from './components/LocationMapSection';
import { Footer } from './components/Footer';
import { DonationModal } from './components/DonationModal';

export default function App() {
  const [isDonationOpen, setIsDonationOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('pocetna');

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] text-stone-900 font-sans selection:bg-[#1e4734] selection:text-white">
      {/* Top Floating Glassmorphic Header */}
      <Navbar
        onOpenDonation={() => setIsDonationOpen(true)}
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />

      {/* Main Content Sections */}
      <main>
        {/* Recreated Hero Section matching the user image reference */}
        <HeroSection
          onOpenDonation={() => setIsDonationOpen(true)}
          onExploreAbout={() => scrollToSection('o-nama')}
          onOpenVaktija={() => scrollToSection('vaktija')}
        />

        {/* Vaktija Section with modern Apple-like cards */}
        <VaktijaSection />

        {/* Hutbe Archive */}
        <HutbeSection />

        {/* About Džemat Vreoca */}
        <AboutSection onOpenDonation={() => setIsDonationOpen(true)} />

        {/* Mekteb & Youth Education */}
        <MektebSection />

        {/* Community Activities */}
        <ActivitiesSection onOpenDonation={() => setIsDonationOpen(true)} />

        {/* Location & Interactive Map */}
        <LocationMapSection />
      </main>

      {/* Footer & Contact */}
      <Footer
        onOpenDonation={() => setIsDonationOpen(true)}
        onNavigate={scrollToSection}
      />

      {/* Secure Donation Modal (Online cards + Bank Virman / Cheque) */}
      <DonationModal
        isOpen={isDonationOpen}
        onClose={() => setIsDonationOpen(false)}
      />
    </div>
  );
}

