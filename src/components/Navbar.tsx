import React, { useState, useEffect } from 'react';
import { IslamskaZajednicaLogo } from './IslamskaZajednicaLogo';
import { Menu, X, ChevronDown, Heart } from 'lucide-react';

interface NavbarProps {
  onOpenDonation: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenDonation,
  activeSection,
  onNavigate,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dzematDropdownOpen, setDzematDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'pocetna', label: 'Početna' },
    { id: 'o-nama', label: 'Džemat', hasDropdown: true },
    { id: 'vaktija', label: 'Vaktija' },
    { id: 'hutbe', label: 'Hutbe' },
    { id: 'aktivnosti', label: 'Aktivnosti' },
    { id: 'kontakt', label: 'Kontakt' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#fafaf9]/90 backdrop-blur-md border-b border-stone-200/60 shadow-xs py-3'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand with Official Islamic Community Logo */}
          <button
            onClick={() => onNavigate('pocetna')}
            className="flex items-center group cursor-pointer text-left select-none"
            id="brand-logo-btn"
          >
            <IslamskaZajednicaLogo size={42} showText={true} showDzematBadge={true} />
          </button>


          {/* Desktop Navigation Links matching reference screenshot */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              if (item.hasDropdown) {
                return (
                  <div
                    key={item.id}
                    className="relative"
                    onMouseEnter={() => setDzematDropdownOpen(true)}
                    onMouseLeave={() => setDzematDropdownOpen(false)}
                  >
                    <button
                      onClick={() => onNavigate('o-nama')}
                      className={`inline-flex items-center gap-1 text-sm font-medium transition-colors cursor-pointer ${
                        activeSection === 'o-nama' || activeSection === 'mekteb'
                          ? 'text-[#1b3d2f] font-semibold'
                          : 'text-stone-700 hover:text-stone-950'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown className="w-3.5 h-3.5 opacity-70" />
                    </button>

                    {dzematDropdownOpen && (
                      <div className="absolute top-full left-0 mt-2 w-48 bg-white/95 backdrop-blur-md rounded-xl border border-stone-200/80 shadow-lg p-1.5 animate-in fade-in slide-in-from-top-2 duration-150">
                        <button
                          onClick={() => {
                            onNavigate('o-nama');
                            setDzematDropdownOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-xs font-medium text-stone-700 hover:bg-stone-100/80 hover:text-[#1b3d2f] rounded-lg transition-colors cursor-pointer"
                        >
                          O nama & Historijat
                        </button>
                        <button
                          onClick={() => {
                            onNavigate('mekteb');
                            setDzematDropdownOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-xs font-medium text-stone-700 hover:bg-stone-100/80 hover:text-[#1b3d2f] rounded-lg transition-colors cursor-pointer"
                        >
                          Mektebska nastava
                        </button>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => onNavigate(item.id)}
                  className={`relative py-1 text-sm font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'text-[#1b3d2f] font-semibold'
                      : 'text-stone-700 hover:text-stone-950'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#1b3d2f] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action: Doniraj Button matching reference screenshot */}
          <div className="flex items-center gap-3">
            <button
              id="header-donate-btn"
              onClick={onOpenDonation}
              className="bg-[#1b3d2f] hover:bg-[#142e23] text-white px-5 sm:px-6 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium shadow-2xs hover:shadow-sm transition-all active:scale-95 cursor-pointer"
            >
              Doniraj
            </button>

            {/* Mobile hamburger menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-stone-700 hover:text-stone-950 hover:bg-stone-100/70 rounded-xl transition-colors cursor-pointer"
              aria-label="Otvori navigaciju"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-stone-200 px-5 pt-3 pb-6 mt-3 shadow-lg animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? 'bg-emerald-50 text-[#1b3d2f] font-semibold'
                    : 'text-stone-700 hover:bg-stone-50'
                }`}
              >
                {item.label}
              </button>
            ))}

            <div className="pt-3 mt-2 border-t border-stone-100 flex items-center justify-between">
              <button
                onClick={() => {
                  onOpenDonation();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 bg-[#1b3d2f] text-white py-3 rounded-xl text-sm font-medium shadow-sm"
              >
                <Heart className="w-4 h-4 fill-current text-emerald-200" />
                Doniraj za Džemat Vreoca
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

