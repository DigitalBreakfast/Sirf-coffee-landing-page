import React, { useState, useEffect } from 'react';
import { FilmPhotograph } from './components/FilmPhotograph';
import { ApplyModal } from './components/ApplyModal';
import { MembershipModal } from './components/MembershipModal';
import { AboutModal } from './components/AboutModal';
import { typewriterAudio } from './utils/audio';
import { Volume2, VolumeX, ArrowRight } from 'lucide-react';
import heroImage from './assets/images/hero_sirf_coffee.jpg';
import introImage from './assets/images/intro_sirf_coffee.jpg';
import finalVideo from './assets/videos/final_love_story.mp4';

export default function App() {
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [isMembershipOpen, setIsMembershipOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    typewriterAudio.enabled = next;
    if (next) {
      typewriterAudio.playCarriageReturn();
    }
  };

  const handleOpenApply = () => {
    if (soundEnabled) typewriterAudio.playCarriageReturn();
    setIsApplyOpen(true);
  };

  const scrollToSection = (id: string) => {
    if (soundEnabled) typewriterAudio.playKeyClick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F5F0] text-[#1C1917] selection:bg-[#72272B]/15 selection:text-[#1C1917] relative">
      {/* Subtle Analog Grain Underlay across the entire document */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.035] z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ========================================================
          NAVIGATION: Minimal, Ivory / Transparent, Understated
          ======================================================== */}
      <header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled 
            ? 'bg-[#F8F5F0]/92 backdrop-blur-xs border-b border-[#E5DFC5]' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 sm:px-10 h-20 flex items-center justify-between">
          {/* Brand Wordmark (Single text element in high-character display / typewriter) */}
          <a 
            href="#" 
            className="font-typewriter text-base sm:text-lg tracking-[0.25em] uppercase text-[#1C1917] hover:text-[#72272B] transition-colors"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            SIRF COFFEE
          </a>

          {/* Navigation Links (Unboxed text with quiet tracking) */}
          <nav className="hidden md:flex items-center gap-10 text-xs font-typewriter tracking-widest uppercase text-[#57524C]">
            <button 
              onClick={() => setIsMembershipOpen(true)}
              className="hover:text-[#1C1917] transition-colors cursor-pointer"
            >
              How We Work
            </button>
            <button 
              onClick={() => setIsMembershipOpen(true)}
              className="hover:text-[#1C1917] transition-colors cursor-pointer"
            >
              Membership
            </button>
            <button 
              onClick={() => setIsAboutOpen(true)}
              className="hover:text-[#1C1917] transition-colors cursor-pointer"
            >
              About
            </button>
          </nav>

          {/* Right Action Zone: Sound Toggle & Understated Apply Button */}
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={toggleSound}
              className="text-[#78716C] hover:text-[#1C1917] transition-colors p-1"
              title={soundEnabled ? "Mute typewriter sound" : "Enable tactile typewriter sound"}
              aria-label={soundEnabled ? "Mute typewriter sound" : "Enable tactile typewriter sound"}
            >
              {soundEnabled ? (
                <span className="flex items-center gap-1 text-[10px] font-typewriter tracking-wider text-[#72272B]">
                  <Volume2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">TYPEWRITER ON</span>
                </span>
              ) : (
                <VolumeX className="w-3.5 h-3.5" />
              )}
            </button>

            {/* Zero-Pill Apply Button: Understated, clean borderless/straight-edge editorial button */}
            <button
              onClick={handleOpenApply}
              className="px-4 sm:px-5 py-2 text-xs font-typewriter tracking-widest uppercase text-[#FAF7F2] bg-[#1C1917] hover:bg-[#72272B] transition-all duration-200"
            >
              Apply
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 pt-20">
        
        {/* ========================================================
            HERO: Dominated by Large Vintage Photograph
            Copy sits naturally within negative space.
            ======================================================== */}
        <section className="relative px-6 sm:px-10 pt-6 pb-20 sm:pb-28 max-w-6xl mx-auto">
          {/* Large Hero 35mm Frame with integrated negative space typesetting */}
          <div className="relative">
            <FilmPhotograph
              scene="hero"
              src={heroImage}
              aspectRatio="16:9"
              frameNumber="24"
              className="w-full shadow-md"
            />
          </div>

          {/* Hero Typography: Carefully typeset onto a personal editorial page */}
          <div className="mt-10 sm:mt-14 max-w-3xl">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-editorial font-light text-[#1C1917] tracking-tight leading-[1.08] mb-6 text-balance">
              Dating. <br />
              <span className="italic font-normal">But for the Exceptional.</span>
            </h1>

            <div className="space-y-2 mb-8 max-w-xl text-base sm:text-lg font-typewriter text-[#44403C] leading-relaxed">
              <p className="font-editorial text-xl sm:text-2xl text-[#2B2623] italic">
                “A more thoughtful way to meet someone.”
              </p>
              <p className="text-sm sm:text-base text-[#57524C]">
                Human-led matchmaking for accomplished, progressive Indians around the world.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2">
              <button
                onClick={handleOpenApply}
                className="group inline-flex items-center gap-3 px-6 py-3.5 bg-[#1C1917] text-[#FAF7F2] text-xs font-typewriter tracking-widest uppercase hover:bg-[#72272B] transition-colors"
              >
                <span>Apply to Sirf Coffee</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>

              <span className="text-[11px] font-typewriter text-[#78716C] tracking-wide sm:ml-4">
                Invitation & application by quiet review only.
              </span>
            </div>
          </div>
        </section>

        {/* Thin hairline divider */}
        <div className="max-w-6xl mx-auto px-6 sm:px-10">
          <hr className="border-t border-[#E3DACB]" />
        </div>

        {/* ========================================================
            SECTION 02: A LITTLE INTRODUCTION
            Clean typewriter-style editorial section.
            No scrapbook background. Generous negative space.
            ======================================================== */}
        <section id="introduction" className="py-24 sm:py-32 px-6 sm:px-10 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Narrative Column */}
            <div className="lg:col-span-7 space-y-8">
              <h2 className="text-3xl sm:text-5xl font-editorial font-light text-[#1C1917] leading-tight">
                A little introduction.
              </h2>

              <div className="space-y-5 text-base sm:text-lg font-editorial text-[#38332E] leading-relaxed">
                <p>
                  You’re not here to swipe through people.
                </p>
                <p>
                  You’re here because you’re open to meeting someone who might actually fit into your life.
                </p>
                <p className="font-typewriter text-xs sm:text-sm text-[#57524C] pt-1">
                  At Sirf Coffee, we take the time to understand you first.
                </p>
              </div>

              {/* Typographic List */}
              <div className="py-6 border-y border-[#E3DACB] my-8">
                <div className="text-[10px] font-typewriter tracking-widest text-[#78716C] uppercase mb-4">
                  WHAT WE EXPLORE BEFORE ANY INTRODUCTION
                </div>
                <ul className="space-y-3 font-typewriter text-xs sm:text-sm tracking-wider text-[#1C1917]">
                  <li className="flex items-center gap-3">
                    <span className="text-[#72272B] font-bold">—</span>
                    <span>YOUR STORY</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-[#72272B] font-bold">—</span>
                    <span>YOUR VALUES</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-[#72272B] font-bold">—</span>
                    <span>THE LIFE YOU’RE BUILDING</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-[#72272B] font-bold">—</span>
                    <span>WHAT YOU’RE LOOKING FOR</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-6">
                <p className="font-editorial text-xl sm:text-2xl italic text-[#1C1917] leading-snug">
                  “When we think someone is worth meeting, <br />
                  we make the introduction.”
                </p>

                <div className="text-xs sm:text-sm font-typewriter text-[#57524C] leading-relaxed pl-4 border-l-2 border-[#72272B]">
                  <p>No algorithms.</p>
                  <p>No endless choices.</p>
                  <p className="text-[#1C1917] font-bold mt-2">
                    Just two people who might be right for each other.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: One small, exquisite vintage photograph */}
            <div className="lg:col-span-5 lg:pt-4">
              <FilmPhotograph
                scene="intro"
                src={introImage}
                aspectRatio="4:3"
                frameNumber="12"
                className="w-full shadow-xs"
              />
              
              <div className="mt-6 p-5 bg-[#F2EDE4]/70 border border-[#E3DACB] text-[11px] font-typewriter text-[#57524C] leading-relaxed">
                <span className="block text-[9px] uppercase tracking-widest text-[#72272B] mb-1 font-bold">
                  CURATORIAL NOTE
                </span>
                We spend hours in personal dialogue with every client—learning not just their career and pedigree, but their humor, vulnerability, and domestic rhythm.
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            SECTION 04: QUIET EDITORIAL STATEMENT
            Spacious, one beautiful vintage photograph.
            ======================================================== */}
        <section className="py-16 sm:py-24 px-6 sm:px-10 bg-[#F2EDE4]/50 border-y border-[#E3DACB]">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-sm sm:text-base font-typewriter text-[#57524C] leading-relaxed">
              Algorithms optimize for screen time and engagement loops. <br className="hidden sm:inline" />
              Human curators optimize for two people having breakfast together ten years from now.
            </p>
          </div>
        </section>

        {/* ========================================================
            SECTION 05: FINAL CTA
            Large vintage photograph: the final frame of a love story.
            ======================================================== */}
        <section className="py-24 sm:py-36 px-6 sm:px-10 max-w-6xl mx-auto">
          <div className="relative">
            {/* The Final Frame Photograph / Video */}
            <FilmPhotograph
              scene="final"
              videoSrc={finalVideo}
              aspectRatio="16:9"
              frameNumber="36"
              className="w-full shadow-lg"
            />
          </div>

          <div className="mt-12 sm:mt-16 max-w-3xl space-y-6">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-editorial font-light text-[#1C1917] leading-[1.1] text-balance">
              Maybe it’s time someone introduced you properly.
            </h2>

            <p className="text-base sm:text-lg font-typewriter text-[#57524C] max-w-xl leading-relaxed">
              A thoughtful introduction could be the beginning of something unexpected.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <button
                onClick={handleOpenApply}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-[#1C1917] text-[#FAF7F2] text-xs font-typewriter tracking-widest uppercase hover:bg-[#72272B] transition-all duration-200"
              >
                <span>Apply to Sirf Coffee</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => setIsMembershipOpen(true)}
                className="px-5 py-4 text-xs font-typewriter tracking-widest uppercase text-[#57524C] hover:text-[#1C1917] transition-colors"
              >
                Read Membership Standards →
              </button>
            </div>
          </div>
        </section>

        {/* ========================================================
            FOOTER: Page-like margins, thin rules, quiet details
            ======================================================== */}
        <footer className="border-t border-[#E3DACB] bg-[#F2EDE4]/40 px-6 sm:px-10 py-16 text-xs font-typewriter text-[#78716C]">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
            
            {/* Col 1: Wordmark & Discretion Guarantee */}
            <div className="md:col-span-5 space-y-3">
              <div className="text-sm font-typewriter uppercase tracking-[0.25em] text-[#1C1917]">
                SIRF COFFEE
              </div>
              <p className="text-[11px] leading-relaxed max-w-sm text-[#57524C]">
                A bespoke human-led matchmaking service for accomplished, progressive Indians around the world.
              </p>
              <p className="text-[10px] text-[#8C8174]">
                Operating since 2011 · Strictly confidential · Zero public databases
              </p>
            </div>

            {/* Col 2: Global Chapters */}
            <div className="md:col-span-4 space-y-2">
              <div className="text-[10px] tracking-widest uppercase text-[#1C1917] font-bold">
                GLOBAL CHAPTERS
              </div>
              <p className="text-[11px] leading-relaxed text-[#57524C]">
                London · Mumbai · New York · San Francisco · Delhi NCR · Bengaluru · Dubai · Singapore · Toronto
              </p>
            </div>

            {/* Col 3: Actions & Correspondence */}
            <div className="md:col-span-3 space-y-3">
              <div className="text-[10px] tracking-widest uppercase text-[#1C1917] font-bold">
                CORRESPONDENCE
              </div>
              <ul className="space-y-1.5 text-[11px]">
                <li>
                  <button 
                    onClick={handleOpenApply}
                    className="hover:text-[#72272B] transition-colors text-left"
                  >
                    Dispatch Application
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setIsMembershipOpen(true)}
                    className="hover:text-[#72272B] transition-colors text-left"
                  >
                    Membership & Standards
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setIsAboutOpen(true)}
                    className="hover:text-[#72272B] transition-colors text-left"
                  >
                    Founding Ethos
                  </button>
                </li>
              </ul>
            </div>

          </div>

          <div className="max-w-6xl mx-auto pt-10 mt-10 border-t border-[#E3DACB] flex flex-col sm:flex-row items-center justify-between text-[10px] text-[#A8A29E] gap-4">
            <div>
              © 2011–2026 SIRF COFFEE LTD. ALL RIGHTS RESERVED.
            </div>
            <div className="flex items-center gap-4">
              <span>DISCREET</span>
              <span>·</span>
              <span>PERSONAL</span>
              <span>·</span>
              <span>CURATED</span>
            </div>
          </div>
        </footer>

      </main>

      {/* Interactive Modals */}
      <ApplyModal isOpen={isApplyOpen} onClose={() => setIsApplyOpen(false)} />
      <MembershipModal 
        isOpen={isMembershipOpen} 
        onClose={() => setIsMembershipOpen(false)} 
        onApply={() => {
          setIsMembershipOpen(false);
          setIsApplyOpen(true);
        }}
      />
      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
        onApply={() => {
          setIsAboutOpen(false);
          setIsApplyOpen(true);
        }}
      />
    </div>
  );
}
