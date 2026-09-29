import React from 'react';
import { X } from 'lucide-react';

interface MembershipModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: () => void;
}

export const MembershipModal: React.FC<MembershipModalProps> = ({ isOpen, onClose, onApply }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-[#14110E]/70 backdrop-blur-xs">
      <div 
        className="relative w-full max-w-2xl bg-[#FAF7F2] border border-[#D8D0C3] shadow-2xl overflow-hidden my-auto"
        role="dialog"
        aria-modal="true"
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E3DACB] bg-[#F4EFE6]/60">
          <div className="flex items-center gap-2 text-[10px] font-typewriter tracking-widest text-[#78716C] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#72272B]" />
            <span>EDITORIAL MONOGRAPH · MEMBERSHIP STANDARDS</span>
          </div>
          <button
            onClick={onClose}
            className="text-[#78716C] hover:text-[#1C1917] p-1 transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-10 max-h-[80vh] overflow-y-auto space-y-8">
          <div>
            <span className="text-[11px] font-typewriter uppercase tracking-widest text-[#72272B] block mb-2">
              CURATORIAL CRITERIA
            </span>
            <h3 className="text-3xl font-editorial font-light text-[#1C1917]">
              Membership at Sirf Coffee
            </h3>
            <p className="text-sm font-typewriter text-[#78716C] mt-2 leading-relaxed">
              We do not accept open public subscriptions. Every member is vetted, interviewed, and represented with absolute confidentiality.
            </p>
          </div>

          <div className="border-t border-[#E3DACB] pt-6 space-y-6 text-xs font-typewriter text-[#44403C] leading-relaxed">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div className="p-4 bg-white border border-[#E3DACB]">
                <div className="text-[10px] text-[#72272B] uppercase tracking-wider mb-1">01 / INTEGRITY</div>
                <div className="font-editorial text-lg text-[#1C1917] mb-2 font-normal">Authentic Intent</div>
                <p className="text-[11px] text-[#78716C]">Individuals who are genuinely prepared for an enduring, meaningful relationship.</p>
              </div>
              <div className="p-4 bg-white border border-[#E3DACB]">
                <div className="text-[10px] text-[#72272B] uppercase tracking-wider mb-1">02 / CULTURE</div>
                <div className="font-editorial text-lg text-[#1C1917] mb-2 font-normal">Roots & Horizons</div>
                <p className="text-[11px] text-[#78716C]">Comfortable navigating both global perspectives and shared Indian cultural values.</p>
              </div>
              <div className="p-4 bg-white border border-[#E3DACB]">
                <div className="text-[10px] text-[#72272B] uppercase tracking-wider mb-1">03 / DISCRETION</div>
                <div className="font-editorial text-lg text-[#1C1917] mb-2 font-normal">Zero Public Feeds</div>
                <p className="text-[11px] text-[#78716C]">No public directories, swiping cards, or indexed profiles. Introductions are 1:1.</p>
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <h4 className="text-base font-editorial text-[#1C1917] font-normal">
                Active Global Chapters
              </h4>
              <p className="text-[#57524C]">
                Our curators actively arrange dates in nine core metropolitan hubs:
              </p>
              <div className="flex flex-wrap gap-2 text-[11px] text-[#1C1917]">
                {['London', 'Mumbai', 'New York', 'San Francisco', 'Delhi NCR', 'Bengaluru', 'Dubai', 'Singapore', 'Toronto'].map(city => (
                  <span key={city} className="px-3 py-1 bg-white border border-[#D5CCC0]">
                    {city}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 bg-[#F2ECE0] border-l-2 border-[#72272B]">
              <div className="text-[10px] font-bold tracking-wider uppercase text-[#72272B] mb-1">The Date Arrangement</div>
              <p className="text-[11px] text-[#44403C]">
                When an introduction is confirmed, our team arranges the reservation at an understated, quiet venue suited for real conversation—often an intimate independent coffee room, quiet cocktail salon, or gallery garden.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-[#E3DACB]">
            <button
              onClick={onClose}
              className="text-xs font-typewriter tracking-wider uppercase text-[#78716C] hover:text-[#1C1917]"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onApply();
              }}
              className="px-6 py-2.5 text-xs font-typewriter tracking-widest uppercase text-[#FAF7F2] bg-[#1C1917] hover:bg-[#72272B] transition-colors"
            >
              Apply for Membership →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
