import React, { useState } from 'react';
import { MapPin, Navigation, Car, Bus, Clock, Phone, ExternalLink, ShieldCheck, Check, Copy } from 'lucide-react';

export const LocationMapSection: React.FC = () => {
  const [copiedCoords, setCopiedCoords] = useState(false);
  const [mapZoom, setMapZoom] = useState(15);
  const [mapType, setMapType] = useState<'standard' | 'satelit'>('standard');

  const lat = 43.8328;
  const lng = 18.2865;

  const handleCopyCoords = () => {
    navigator.clipboard.writeText(`${lat}, ${lng}`);
    setCopiedCoords(true);
    setTimeout(() => setCopiedCoords(false), 2000);
  };

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  const appleMapsUrl = `https://maps.apple.com/?q=Dzamija+Vreoca&ll=${lat},${lng}`;

  // Interactive OpenStreetMap embedded frame
  const osmEmbedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=18.2700%2C43.8240%2C18.3030%2C43.8410&layer=mapnik&marker=${lat}%2C${lng}`;

  return (
    <section id="lokacija" className="py-20 sm:py-28 bg-white border-t border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-800 text-xs font-semibold mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>Lokacija i posjeta</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 font-serif">
            Gdje se nalazimo u Vreocima
          </h2>
          <p className="mt-3 text-base sm:text-lg text-stone-600">
            Džamija džemata Vreoca smještena je u mirnom predgrađu Ilidže, lako dostupna automobilom i javnim gradskim prevozom.
          </p>
        </div>

        {/* Grid: Map + Location Info Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Interactive Map Container */}
          <div className="lg:col-span-7 bg-stone-100 rounded-3xl overflow-hidden border border-stone-200 shadow-xs relative flex flex-col min-h-[420px] sm:min-h-[480px]">
            {/* Embedded Responsive Interactive Map */}
            <iframe
              title="Karta lokacije Džamije Vreoca"
              src={osmEmbedUrl}
              className="w-full h-full min-h-[420px] border-0"
              loading="lazy"
            />

            {/* Floating Map Pin Badge */}
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-stone-200 shadow-md flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#1e4734] flex items-center justify-center text-white shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-stone-900 font-serif">Džamija Džemat Vreoca</div>
                <div className="text-[11px] text-stone-500">Vreoca bb, 71210 Ilidža</div>
              </div>
            </div>

            {/* Quick Map Action Links */}
            <div className="absolute bottom-4 right-4 flex items-center gap-2">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="bg-white/95 hover:bg-white text-stone-800 text-xs font-semibold px-3.5 py-2 rounded-xl border border-stone-200 shadow-sm flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <span>Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href={appleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="bg-white/95 hover:bg-white text-stone-800 text-xs font-semibold px-3.5 py-2 rounded-xl border border-stone-200 shadow-sm flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <span>Apple Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Location Info & Arrival Guides */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            {/* Address & GPS Card */}
            <div className="bg-stone-50/80 rounded-3xl p-6 sm:p-7 border border-stone-200/80 shadow-2xs">
              <h3 className="text-lg font-bold text-stone-900 font-serif mb-4 flex items-center gap-2">
                <Navigation className="w-5 h-5 text-emerald-800" />
                Adresa i GPS koordinate
              </h3>

              <div className="space-y-3 text-sm text-stone-600">
                <div className="flex items-start justify-between pb-3 border-b border-stone-200/60">
                  <span className="font-medium text-stone-500">Adresa:</span>
                  <span className="font-semibold text-stone-900 text-right">
                    Vreoca bb, Ilidža, Sarajevo
                  </span>
                </div>

                <div className="flex items-start justify-between pb-3 border-b border-stone-200/60">
                  <span className="font-medium text-stone-500">Općina:</span>
                  <span className="font-semibold text-stone-900 text-right">
                    Ilidža (Kanton Sarajevo)
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-medium text-stone-500">Koordinate:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-stone-900 bg-white px-2 py-1 rounded border border-stone-200">
                      43.8328° N, 18.2865° E
                    </span>
                    <button
                      onClick={handleCopyCoords}
                      className="p-1.5 text-stone-500 hover:text-stone-900 rounded bg-white hover:bg-stone-100 border border-stone-200 transition-colors cursor-pointer"
                      title="Kopiraj koordinate"
                    >
                      {copiedCoords ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Arrival Instructions */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/80 shadow-2xs space-y-4">
              <h3 className="text-base font-bold text-stone-900 font-serif">
                Kako doći do džamije
              </h3>

              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                  <Car className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wide">Automobilom</h4>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    Iz pravca centra Ilidže vozite magistralnim putem M17 prema Blažuju. Skretanje za Vreoca je jasno označeno. Džamija posjeduje osiguran besplatan parking za preko 50 vozila.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 pt-3 border-t border-stone-100">
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                  <Bus className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wide">Javnim prevozom</h4>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    Tramvajskom linijom br. 3 do terminala Ilidža, a zatim redovnim autobuskim linijama za Vreoca / Hrasnicu ili Blažuj. Autobusko stajalište je na 3 minute hoda od džamije.
                  </p>
                </div>
              </div>
            </div>

            {/* Mosque facilities highlights */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-stone-50 rounded-2xl p-3 text-center border border-stone-200/70">
                <span className="block text-xs font-bold text-stone-900">Abdesthana</span>
                <span className="text-[11px] text-stone-500">M/Ž topla voda</span>
              </div>
              <div className="bg-stone-50 rounded-2xl p-3 text-center border border-stone-200/70">
                <span className="block text-xs font-bold text-stone-900">Pristup</span>
                <span className="text-[11px] text-stone-500">Rampa za invalide</span>
              </div>
              <div className="bg-stone-50 rounded-2xl p-3 text-center border border-stone-200/70">
                <span className="block text-xs font-bold text-stone-900">Kapacitet</span>
                <span className="text-[11px] text-stone-500">500+ klanjača</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
