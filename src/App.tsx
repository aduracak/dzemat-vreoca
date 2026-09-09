/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { VaktijaSection } from './components/VaktijaSection';
import { PitanjaOdgovoriSection } from './components/PitanjaOdgovoriSection';
import { HutbeSection } from './components/HutbeSection';
import { AboutSection } from './components/AboutSection';
import { RijecVakifaSection } from './components/RijecVakifaSection';
import { MektebSection } from './components/MektebSection';
import { ActivitiesSection } from './components/ActivitiesSection';
import { LocationMapSection } from './components/LocationMapSection';
import { NewsletterSection } from './components/NewsletterSection';
import { Footer } from './components/Footer';
import { DonationModal } from './components/DonationModal';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { isUserAdminLoggedIn } from './services/supabaseService';

export default function App() {
  const [isDonationOpen, setIsDonationOpen] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [activeSection, setActiveSection] = useState('pocetna');

  useEffect(() => {
    setIsAdminLoggedIn(isUserAdminLoggedIn());

    // Provjeri hash rutu #admin za brzi pristup
    if (window.location.hash === '#admin') {
      if (isUserAdminLoggedIn()) {
        setIsAdminLoggedIn(true);
      } else {
        setIsAdminLoginOpen(true);
      }
    }
  }, []);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Ako je imam prijavljen, prikazujemo Admin Dashboard
  if (isAdminLoggedIn) {
    return (
      <AdminDashboard
        onClose={() => setIsAdminLoggedIn(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#fafaf9] text-stone-900 font-sans selection:bg-[#1b3d2f] selection:text-white">
      {/* Top Floating Glassmorphic Header */}
      <Navbar
        onOpenDonation={() => setIsDonationOpen(true)}
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />

      {/* Main Content Sections */}
      <main>
        {/* Recreated Hero Section matching reference */}
        <HeroSection
          onOpenDonation={() => setIsDonationOpen(true)}
          onExploreAbout={() => scrollToSection('o-nama')}
          onOpenVaktija={() => scrollToSection('vaktija')}
        />

        {/* Vaktija Section with vaktija.ba API */}
        <VaktijaSection />

        {/* Pitanja i Odgovori Imama (Q&A) */}
        <PitanjaOdgovoriSection />

        {/* Tekstualna Arhiva Hutbi */}
        <HutbeSection />

        {/* About Džemat Vreoca */}
        <AboutSection onOpenDonation={() => setIsDonationOpen(true)} />

        {/* Riječ Vakifa • Historijat i nastanak džamije */}
        <RijecVakifaSection />

        {/* Mekteb & Youth Education */}
        <MektebSection />

        {/* Community Activities */}
        <ActivitiesSection onOpenDonation={() => setIsDonationOpen(true)} />

        {/* Newsletter & Obavijesti Džemata */}
        <NewsletterSection />

        {/* Location & Interactive Map */}
        <LocationMapSection />
      </main>

      {/* Footer & Contact */}
      <Footer
        onOpenDonation={() => setIsDonationOpen(true)}
        onNavigate={scrollToSection}
        onOpenAdminLogin={() => setIsAdminLoginOpen(true)}
      />

      {/* Secure Donation Modal (Status: U pripremi) */}
      <DonationModal
        isOpen={isDonationOpen}
        onClose={() => setIsDonationOpen(false)}
      />

      {/* Admin Login Modal for Imam */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onSuccess={() => setIsAdminLoggedIn(true)}
      />
    </div>
  );
}
