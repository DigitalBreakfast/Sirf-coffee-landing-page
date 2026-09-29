import React, { useState } from 'react';
import { X, Check } from 'lucide-react';

interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApplyModal: React.FC<ApplyModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: 'London',
    age: '',
    occupation: '',
    education: '',
    roots: '',
    values: [] as string[],
    lookingFor: '',
    personalLetter: '',
  });

  if (!isOpen) return null;

  const valueOptions = [
    'Intellectual curiosity',
    'Grounded warmth & family',
    'Creative restlessness',
    'Global outlook, Indian roots',
    'Quiet ambition',
    'Emotional generosity',
    'Sense of humor & wit',
    'Calm resilience',
  ];

  const toggleValue = (val: string) => {
    setFormData(prev => {
      const exists = prev.values.includes(val);
      if (exists) {
        return { ...prev, values: prev.values.filter(v => v !== val) };
      }
      if (prev.values.length >= 4) return prev;
      return { ...prev, values: [...prev.values, val] };
    });
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 4) {
      setStep((step + 1) as 1 | 2 | 3 | 4);
    } else {
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-[#14110E]/70 backdrop-blur-xs">
      <div 
        className="relative w-full max-w-2xl bg-[#FAF7F2] border border-[#D8D0C3] shadow-2xl overflow-hidden my-auto"
        role="dialog"
        aria-modal="true"
      >
        {/* Subtle Archival Header Strip */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E3DACB] bg-[#F4EFE6]/60">
          <div className="flex items-center gap-2 text-[10px] font-typewriter tracking-widest text-[#78716C] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#72272B]" />
            <span>DISPATCH ARCHIVE · REF. 2026/APPLICATION</span>
          </div>
          <button
            onClick={onClose}
            className="text-[#78716C] hover:text-[#1C1917] p-1 transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          /* Confirmation: The Sealed Letter */
          <div className="p-8 sm:p-12 text-center">
            {/* Wax Seal Symbol */}
            <div className="w-14 h-14 mx-auto mb-6 rounded-full bg-[#72272B] text-[#FAF7F2] flex items-center justify-center shadow-md border-2 border-[#541A1D]">
              <span className="font-display italic text-2xl">SC</span>
            </div>

            <p className="text-[11px] font-typewriter tracking-widest uppercase text-[#78716C] mb-2">
              DISPATCH CONFIRMED · #SC-26-{Math.floor(1000 + Math.random() * 9000)}
            </p>

            <h3 className="text-3xl font-editorial font-light text-[#1C1917] mb-4">
              Thank you, {formData.fullName || 'friend'}.
            </h3>

            <div className="max-w-md mx-auto text-sm text-[#57524C] font-typewriter leading-relaxed space-y-3 mb-8 text-left border-y border-[#E3DACB] py-6 my-6">
              <p>Your correspondence has been received by our senior curators.</p>
              <p>We review every application individually and by hand. If we believe we can genuinely serve you in {formData.city || 'your city'}, our curator will reach out personally via confidential email within 48 hours to schedule your introductory conversation.</p>
              <p className="text-[#72272B] italic">“Some things are better introduced.”</p>
            </div>

            <button
              onClick={handleReset}
              className="inline-block px-6 py-2.5 text-xs font-typewriter tracking-widest uppercase text-[#FAF7F2] bg-[#1C1917] hover:bg-[#72272B] transition-colors"
            >
              Close Dispatch
            </button>
          </div>
        ) : (
          /* Step-by-Step Application Form */
          <div className="p-6 sm:p-10">
            {/* Step indicator */}
            <div className="flex items-center justify-between text-[11px] font-typewriter text-[#78716C] mb-6 pb-3 border-b border-[#E8E1D5]">
              <span>PART {step} OF 4</span>
              <span className="uppercase tracking-widest text-[#72272B]">
                {step === 1 && 'Personal Particulars'}
                {step === 2 && 'Vocation & Roots'}
                {step === 3 && 'Core Values & Chemistry'}
                {step === 4 && 'A Note to Curators'}
              </span>
            </div>

            <form onSubmit={handleNext}>
              {step === 1 && (
                <div className="space-y-5">
                  <div className="mb-4">
                    <h3 className="text-2xl font-editorial font-normal text-[#1C1917]">
                      Tell us a little about yourself.
                    </h3>
                    <p className="text-xs font-typewriter text-[#78716C] mt-1">
                      All details remain strictly confidential and human-reviewed.
                    </p>
                  </div>

                  <div>
                    <label className="block text-[11px] font-typewriter uppercase tracking-wider text-[#44403C] mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Maya Advani"
                      className="w-full px-3.5 py-2.5 bg-white border border-[#D5CCC0] text-sm text-[#1C1917] focus:outline-hidden focus:border-[#72272B] font-typewriter"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-typewriter uppercase tracking-wider text-[#44403C] mb-1.5">
                        Confidential Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        placeholder="maya@example.com"
                        className="w-full px-3.5 py-2.5 bg-white border border-[#D5CCC0] text-sm text-[#1C1917] focus:outline-hidden focus:border-[#72272B] font-typewriter"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-typewriter uppercase tracking-wider text-[#44403C] mb-1.5">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+44 7911 123456"
                        className="w-full px-3.5 py-2.5 bg-white border border-[#D5CCC0] text-sm text-[#1C1917] focus:outline-hidden focus:border-[#72272B] font-typewriter"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-typewriter uppercase tracking-wider text-[#44403C] mb-1.5">
                        Primary City *
                      </label>
                      <select
                        value={formData.city}
                        onChange={e => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-white border border-[#D5CCC0] text-sm text-[#1C1917] focus:outline-hidden focus:border-[#72272B] font-typewriter"
                      >
                        <option value="London">London, UK</option>
                        <option value="Mumbai">Mumbai, India</option>
                        <option value="New York">New York, USA</option>
                        <option value="San Francisco">San Francisco Bay Area</option>
                        <option value="Delhi NCR">Delhi NCR, India</option>
                        <option value="Bangalore">Bengaluru, India</option>
                        <option value="Dubai">Dubai, UAE</option>
                        <option value="Singapore">Singapore</option>
                        <option value="Toronto">Toronto, Canada</option>
                        <option value="Other">Other Global City</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-typewriter uppercase tracking-wider text-[#44403C] mb-1.5">
                        Age
                      </label>
                      <input
                        type="text"
                        value={formData.age}
                        onChange={e => setFormData({ ...formData, age: e.target.value })}
                        placeholder="e.g. 31"
                        className="w-full px-3.5 py-2.5 bg-white border border-[#D5CCC0] text-sm text-[#1C1917] focus:outline-hidden focus:border-[#72272B] font-typewriter"
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-5">
                  <div className="mb-4">
                    <h3 className="text-2xl font-editorial font-normal text-[#1C1917]">
                      Your world & life’s work.
                    </h3>
                    <p className="text-xs font-typewriter text-[#78716C] mt-1">
                      Our members are distinguished professionals, founders, clinicians, and thinkers.
                    </p>
                  </div>

                  <div>
                    <label className="block text-[11px] font-typewriter uppercase tracking-wider text-[#44403C] mb-1.5">
                      Vocation / Occupation *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.occupation}
                      onChange={e => setFormData({ ...formData, occupation: e.target.value })}
                      placeholder="e.g. Architect & Studio Director / Surgeon / Partner at Fund"
                      className="w-full px-3.5 py-2.5 bg-white border border-[#D5CCC0] text-sm text-[#1C1917] focus:outline-hidden focus:border-[#72272B] font-typewriter"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-typewriter uppercase tracking-wider text-[#44403C] mb-1.5">
                      Education / Academic Background
                    </label>
                    <input
                      type="text"
                      value={formData.education}
                      onChange={e => setFormData({ ...formData, education: e.target.value })}
                      placeholder="e.g. Oxford, Columbia, IIT, Cambridge"
                      className="w-full px-3.5 py-2.5 bg-white border border-[#D5CCC0] text-sm text-[#1C1917] focus:outline-hidden focus:border-[#72272B] font-typewriter"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-typewriter uppercase tracking-wider text-[#44403C] mb-1.5">
                      Cultural Roots & Heritage
                    </label>
                    <input
                      type="text"
                      value={formData.roots}
                      onChange={e => setFormData({ ...formData, roots: e.target.value })}
                      placeholder="e.g. Raised in Mumbai, now London; Sindhi roots; bilingual"
                      className="w-full px-3.5 py-2.5 bg-white border border-[#D5CCC0] text-sm text-[#1C1917] focus:outline-hidden focus:border-[#72272B] font-typewriter"
                    />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-5">
                  <div className="mb-4">
                    <h3 className="text-2xl font-editorial font-normal text-[#1C1917]">
                      Values & what matters.
                    </h3>
                    <p className="text-xs font-typewriter text-[#78716C] mt-1">
                      Select up to four qualities that define your relationship expectations.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {valueOptions.map(option => {
                      const selected = formData.values.includes(option);
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => toggleValue(option)}
                          className={`p-3 text-left border text-xs font-typewriter transition-all flex items-center justify-between ${
                            selected
                              ? 'border-[#72272B] bg-[#72272B]/10 text-[#72272B] font-bold'
                              : 'border-[#D8D0C3] bg-white text-[#44403C] hover:border-[#1C1917]'
                          }`}
                        >
                          <span>{option}</span>
                          {selected && <Check className="w-3.5 h-3.5 text-[#72272B]" />}
                        </button>
                      );
                    })}
                  </div>

                  <div className="pt-2">
                    <label className="block text-[11px] font-typewriter uppercase tracking-wider text-[#44403C] mb-1.5">
                      In your own words: what are you looking for in a partner?
                    </label>
                    <textarea
                      rows={3}
                      value={formData.lookingFor}
                      onChange={e => setFormData({ ...formData, lookingFor: e.target.value })}
                      placeholder="Someone who shares a quiet curiosity, enjoys long conversations over espresso, and values deep mutual respect..."
                      className="w-full px-3.5 py-2.5 bg-white border border-[#D5CCC0] text-xs text-[#1C1917] focus:outline-hidden focus:border-[#72272B] font-typewriter resize-none leading-relaxed"
                    />
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-5">
                  <div className="mb-4">
                    <h3 className="text-2xl font-editorial font-normal text-[#1C1917]">
                      A personal note to the curators.
                    </h3>
                    <p className="text-xs font-typewriter text-[#78716C] mt-1">
                      Think of this as a brief letter. What brought you to Sirf Coffee at this chapter of your life?
                    </p>
                  </div>

                  <div className="relative bg-[#FFFDF9] border border-[#D8D0C3] p-4 sm:p-5">
                    <div className="text-[10px] font-typewriter text-[#8C8174] mb-2 uppercase tracking-widest border-b border-[#EAE3D6] pb-1">
                      MEMORANDUM · PERSONAL CORRESPONDENCE
                    </div>
                    <textarea
                      rows={5}
                      value={formData.personalLetter}
                      onChange={e => setFormData({ ...formData, personalLetter: e.target.value })}
                      placeholder="Dear Sirf Coffee team, I find that standard dating apps no longer reflect how I wish to meet someone..."
                      className="w-full bg-transparent border-none text-xs text-[#1C1917] focus:outline-hidden font-typewriter resize-none leading-relaxed"
                    />
                  </div>

                  <div className="text-[11px] font-typewriter text-[#78716C] bg-[#F2EDE4] p-3 border-l-2 border-[#72272B]">
                    DISCRETION GUARANTEE: Your identity and photographs are never uploaded to a public database. Introductions occur only with mutual, private consent.
                  </div>
                </div>
              )}

              {/* Form Navigation Controls */}
              <div className="flex items-center justify-between pt-6 mt-6 border-t border-[#E3DACB]">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep((step - 1) as 1 | 2 | 3 | 4)}
                    className="text-xs font-typewriter tracking-wider uppercase text-[#78716C] hover:text-[#1C1917] transition-colors"
                  >
                    ← Previous
                  </button>
                ) : (
                  <span />
                )}

                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-typewriter tracking-widest uppercase text-[#FAF7F2] bg-[#1C1917] hover:bg-[#72272B] transition-colors"
                >
                  {step === 4 ? 'Dispatch Application →' : 'Continue →'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
