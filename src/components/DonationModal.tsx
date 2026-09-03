import React, { useState } from 'react';
import { X, Heart, CreditCard, Building2, ShieldCheck, Check, Copy, Download, Lock, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { IslamskaZajednicaLogo } from './IslamskaZajednicaLogo';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPurpose?: string;
}

export const DonationModal: React.FC<DonationModalProps> = ({
  isOpen,
  onClose,
  defaultPurpose = 'Održavanje džamije i režijski troškovi',
}) => {
  const [method, setMethod] = useState<'kartica' | 'uplatnica'>('kartica');
  const [amount, setAmount] = useState<number>(50);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [frequency, setFrequency] = useState<'once' | 'monthly'>('once');
  const [purpose, setPurpose] = useState<string>(defaultPurpose);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Card form state
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [receiptData, setReceiptData] = useState<any>(null);

  if (!isOpen) return null;

  const presetAmounts = [20, 50, 100, 250, 500];

  const handleSelectPreset = (val: number) => {
    setAmount(val);
    setCustomAmount('');
  };

  const handleCustomChange = (val: string) => {
    setCustomAmount(val);
    const num = parseFloat(val);
    if (!isNaN(num) && num > 0) {
      setAmount(num);
    }
  };

  const handleCopy = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleCardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate secure payment gateway transaction (Monri / Stripe)
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setReceiptData({
        txnId: `VRE-${Math.floor(100000 + Math.random() * 900000)}`,
        date: new Date().toLocaleDateString('bs-BA', { day: 'numeric', month: 'long', year: 'numeric' }),
        amount: `${amount} KM`,
        donor: donorName || 'Anonimni donator',
        purpose: purpose,
      });
    }, 1500);
  };

  const handleDownloadReceipt = () => {
    if (!receiptData) return;
    const content = `POTVRDA O DONACIJI - DŽEMAT VREOCA
Islamska zajednica u Bosni i Hercegovini
Medžlis IZ Sarajevo - Džemat Vreoca

Broj transakcije: ${receiptData.txnId}
Datum: ${receiptData.date}
Donator: ${receiptData.donor}
Iznos: ${receiptData.amount}
Svrha donacije: ${receiptData.purpose}
Status: USPJEŠNO PROCESIRANO

Molimo Uzvišenog Allaha da vaš prilog ukabuli i nagradi višestruko!
Mahsuz selam,
Odbor Džemata Vreoca`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Priznanica_${receiptData.txnId}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-stone-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-6">
        {/* Header */}
        <div className="px-6 sm:px-8 py-5 bg-stone-50 border-b border-stone-200/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <IslamskaZajednicaLogo size={28} />
            <div>
              <h3 className="text-base font-bold text-stone-900 font-serif">
                Podrži rad Džemata Vreoca
              </h3>
              <p className="text-xs text-stone-500">
                Siguran sistem za donacije i uplate za džamiju
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-900 rounded-full hover:bg-stone-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
          {isSuccess ? (
            /* Success Receipt View */
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-stone-900 font-serif mb-2">
                Hvala vam na donaciji!
              </h3>
              <p className="text-sm text-stone-600 max-w-md mx-auto mb-6">
                Vaša donacija od <strong className="text-stone-900">{receiptData?.amount}</strong> za svrhu "{receiptData?.purpose}" je uspješno zabilježena.
                Neka Uzvišeni Allah ukabuli vaš dobrovoljni prilog.
              </p>

              {/* Receipt Summary Card */}
              <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200 text-left text-xs space-y-2 mb-6 max-w-md mx-auto">
                <div className="flex justify-between">
                  <span className="text-stone-500">Broj transakcije:</span>
                  <span className="font-mono font-bold text-stone-900">{receiptData?.txnId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Datum:</span>
                  <span className="font-medium text-stone-800">{receiptData?.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Donator:</span>
                  <span className="font-medium text-stone-800">{receiptData?.donor}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Primalac:</span>
                  <span className="font-medium text-stone-800">Džemat Vreoca (IZ u BiH)</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={handleDownloadReceipt}
                  className="inline-flex items-center gap-2 bg-[#1e4734] hover:bg-[#163627] text-white px-5 py-2.5 rounded-full text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  Preuzmi digitalnu potvrdu
                </button>
                <button
                  onClick={() => {
                    setIsSuccess(false);
                    onClose();
                  }}
                  className="px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-full transition-colors cursor-pointer"
                >
                  Zatvori
                </button>
              </div>
            </div>
          ) : (
            /* Donation Form */
            <div>
              {/* Payment Method Switcher */}
              <div className="grid grid-cols-2 gap-3 p-1.5 bg-stone-100 rounded-2xl mb-6">
                <button
                  type="button"
                  onClick={() => setMethod('kartica')}
                  className={`flex items-center justify-center gap-2 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    method === 'kartica'
                      ? 'bg-white text-stone-900 shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-emerald-800" />
                  <span>Sigurno online plaćanje</span>
                </button>

                <button
                  type="button"
                  onClick={() => setMethod('uplatnica')}
                  className={`flex items-center justify-center gap-2 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    method === 'uplatnica'
                      ? 'bg-white text-stone-900 shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <Building2 className="w-4 h-4 text-emerald-800" />
                  <span>Bankovna uplatnica / Ček</span>
                </button>
              </div>

              {/* Purpose Selector */}
              <div className="mb-6">
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                  Svrha donacije
                </label>
                <select
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                >
                  <option value="Održavanje džamije i režijski troškovi">
                    Održavanje džamije i režijski troškovi
                  </option>
                  <option value="Fond za mektebsku nastavu i opremu za djecu">
                    Fond za mektebsku nastavu i opremu za djecu
                  </option>
                  <option value="Humanitarni fond džemata za socijalne slučajeve">
                    Humanitarni fond džemata za socijalne slučajeve
                  </option>
                  <option value="Uređenje harema, česme i musafirhane">
                    Uređenje harema, česme i musafirhane
                  </option>
                  <option value="Generalni vakufski fond">Generalni vakufski fond</option>
                </select>
              </div>

              {/* TAB 1: Online Card Payment Flow */}
              {method === 'kartica' && (
                <form onSubmit={handleCardSubmit} className="space-y-6">
                  {/* Amount Selection */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2.5">
                      Odaberite iznos donacije
                    </label>
                    <div className="grid grid-cols-5 gap-2 mb-3">
                      {presetAmounts.map((val) => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => handleSelectPreset(val)}
                          className={`py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                            amount === val && !customAmount
                              ? 'bg-[#1e4734] text-white shadow-xs'
                              : 'bg-stone-50 hover:bg-stone-100 text-stone-800 border border-stone-200'
                          }`}
                        >
                          {val} KM
                        </button>
                      ))}
                    </div>

                    {/* Custom Amount Input */}
                    <div className="relative">
                      <input
                        type="number"
                        placeholder="Ili unesite proizvoljan iznos u KM..."
                        value={customAmount}
                        onChange={(e) => handleCustomChange(e.target.value)}
                        className="w-full pl-4 pr-12 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                        min="1"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-500">
                        KM / BAM
                      </span>
                    </div>
                  </div>

                  {/* Donor Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                        Ime i prezime donatora
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="npr. Mehmed Mehmedović"
                        value={donorName}
                        onChange={(e) => setDonorName(e.target.value)}
                        className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                        Email (za prijem potvrde)
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="donator@primjer.ba"
                        value={donorEmail}
                        onChange={(e) => setDonorEmail(e.target.value)}
                        className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
                      />
                    </div>
                  </div>

                  {/* Card Credentials Simulation */}
                  <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
                    <div className="flex items-center justify-between text-xs text-stone-500 pb-2 border-b border-stone-200/60">
                      <span className="flex items-center gap-1.5 font-semibold text-stone-700">
                        <Lock className="w-3.5 h-3.5 text-emerald-700" />
                        Sigurno 256-bitno SSL enkriptovano plaćanje
                      </span>
                      <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-800">
                        Visa / Mastercard
                      </span>
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-stone-600 mb-1">
                        Broj kartice
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="4111 •••• •••• 4242"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        maxLength={19}
                        className="w-full px-3.5 py-2 bg-white border border-stone-200 rounded-xl font-mono text-sm tracking-wider focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-medium text-stone-600 mb-1">
                          Istek (MM/GG)
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="08/28"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          maxLength={5}
                          className="w-full px-3.5 py-2 bg-white border border-stone-200 rounded-xl font-mono text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-medium text-stone-600 mb-1">
                          CVV / Sigurnosni kod
                        </label>
                        <input
                          type="password"
                          required
                          placeholder="•••"
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          maxLength={4}
                          className="w-full px-3.5 py-2 bg-white border border-stone-200 rounded-xl font-mono text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full flex items-center justify-center gap-2 bg-[#1e4734] hover:bg-[#163627] text-white py-3.5 rounded-full text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-98 cursor-pointer disabled:opacity-75"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sigurno procesiranje donacije...</span>
                      </>
                    ) : (
                      <>
                        <Heart className="w-4 h-4 fill-current text-emerald-200" />
                        <span>Doniraj {amount} KM za Džemat Vreoca</span>
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* TAB 2: Bank Slip / Cheque / Virman Flow */}
              {method === 'uplatnica' && (
                <div className="space-y-6">
                  {/* Visual BiH Bank Payment Slip (Nalog za plaćanje) */}
                  <div className="bg-[#fefced] border-2 border-stone-300 rounded-2xl p-5 text-xs text-stone-800 font-mono shadow-xs relative">
                    <div className="flex items-center justify-between pb-3 border-b border-stone-300 text-[11px] uppercase font-bold text-stone-700">
                      <span>NALOG ZA UPLATU / UPLATNICA</span>
                      <span className="text-emerald-900">BOSNA I HERCEGOVINA</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-3">
                      <div>
                        <span className="text-[10px] text-stone-500 uppercase block">Uplatilac:</span>
                        <div className="bg-white/80 p-2 rounded border border-stone-200 font-sans text-xs">
                          {donorName || 'Ime i prezime donatora'} <br />
                          Vreoca / Sarajevo / Dijaspora
                        </div>
                      </div>

                      <div>
                        <span className="text-[10px] text-stone-500 uppercase block">Iznos:</span>
                        <div className="bg-white/80 p-2 rounded border border-stone-200 font-mono font-bold text-sm text-stone-900">
                          {amount} KM (ili valuta po želji)
                        </div>
                      </div>
                    </div>

                    <div className="py-2">
                      <span className="text-[10px] text-stone-500 uppercase block">Svrha doznake:</span>
                      <div className="bg-white/80 p-2 rounded border border-stone-200 font-sans text-xs font-semibold">
                        Donacija za Džemat Vreoca ({purpose})
                      </div>
                    </div>

                    <div className="py-2">
                      <span className="text-[10px] text-stone-500 uppercase block">Primalac:</span>
                      <div className="bg-white/80 p-2 rounded border border-stone-200 font-sans text-xs">
                        Medžlis Islamske zajednice Sarajevo - Džemat Vreoca
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div>
                        <span className="text-[10px] text-stone-500 uppercase block">
                          Transakcijski račun (BBI Banka):
                        </span>
                        <div className="bg-white/80 p-2 rounded border border-stone-200 font-mono font-bold text-xs">
                          141-310-53200000-00
                        </div>
                      </div>
                      <div>
                        <span className="text-[10px] text-stone-500 uppercase block">
                          Poziv na broj:
                        </span>
                        <div className="bg-white/80 p-2 rounded border border-stone-200 font-mono font-bold text-xs">
                          2026-VREOCA
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Fast Copy Cards for Mobile/E-Banking */}
                  <div className="space-y-2.5">
                    {/* IBAN */}
                    <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-stone-500 block">
                          IBAN za uplate iz inostranstva (Dijaspora):
                        </span>
                        <span className="font-mono text-xs sm:text-sm font-bold text-stone-900">
                          BA39 1413 1053 2000 0000
                        </span>
                      </div>
                      <button
                        onClick={() => handleCopy('BA391413105320000000', 'iban')}
                        className="p-2 text-stone-600 hover:text-stone-950 bg-white border border-stone-200 rounded-lg text-xs flex items-center gap-1 cursor-pointer"
                      >
                        {copiedField === 'iban' ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-700 font-semibold">Kopirano</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Kopiraj</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* SWIFT / BIC */}
                    <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-stone-500 block">
                          SWIFT / BIC kod:
                        </span>
                        <span className="font-mono text-xs sm:text-sm font-bold text-stone-900">
                          BBIBBA22
                        </span>
                      </div>
                      <button
                        onClick={() => handleCopy('BBIBBA22', 'swift')}
                        className="p-2 text-stone-600 hover:text-stone-950 bg-white border border-stone-200 rounded-lg text-xs flex items-center gap-1 cursor-pointer"
                      >
                        {copiedField === 'swift' ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-700 font-semibold">Kopirano</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Kopiraj</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200/80 text-xs text-emerald-950 leading-relaxed">
                    <strong>Napomena za dijasporu:</strong> Uplate putem bankovnog virmana ili čeka možete izvršiti iz bilo koje zemlje svijeta uz navođenje gore navedenog IBAN i SWIFT koda.
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
