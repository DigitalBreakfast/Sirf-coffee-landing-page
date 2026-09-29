import React from 'react';

export type PhotoScene = 
  | 'hero' 
  | 'intro' 
  | 'step1' 
  | 'step2' 
  | 'step3' 
  | 'step4' 
  | 'statement' 
  | 'final';

interface FilmPhotographProps {
  scene: PhotoScene;
  src?: string;
  videoSrc?: string;
  aspectRatio?: '16:9' | '4:3' | '3:4' | '1:1';
  caption?: string;
  frameNumber?: string;
  className?: string;
  showEdgeNotches?: boolean;
}

export const FilmPhotograph: React.FC<FilmPhotographProps> = ({
  scene,
  src,
  videoSrc,
  aspectRatio = '16:9',
  caption,
  frameNumber = '24',
  className = '',
  showEdgeNotches = true,
}) => {
  const [imgError, setImgError] = React.useState(false);

  const aspectClass = {
    '16:9': 'aspect-[16/9]',
    '4:3': 'aspect-[4/3]',
    '3:4': 'aspect-[3/4]',
    '1:1': 'aspect-square',
  }[aspectRatio];

  return (
    <figure className={`relative group select-none ${className}`}>
      {/* 35mm Film Negative Carrier / Border Frame */}
      <div className="relative overflow-hidden bg-[#181513] p-[2px] sm:p-1 shadow-sm border border-[#2B2623]/30">
        
        {/* Subtle 35mm Edge Markings if requested */}
        {showEdgeNotches && (
          <div className="flex items-center justify-between px-2 py-1 text-[9px] font-typewriter tracking-widest text-[#8F8376]/70 uppercase border-b border-[#2C2723]">
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#72272B]/60" />
              KODAK PORTRA 400
            </span>
            <span className="tabular-nums">▶ {frameNumber}A</span>
            <span className="hidden sm:inline">SAFETY FILM 35mm</span>
          </div>
        )}

        {/* Visual Canvas Container with Grain & Tone */}
        <div className={`relative w-full ${aspectClass} overflow-hidden bg-[#241F1C]`}>
          {videoSrc ? (
            <video
              src={videoSrc}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.01]"
            />
          ) : src && !imgError ? (
            <img
              src={src}
              alt={caption || '35mm photograph'}
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.01]"
            />
          ) : (
            renderSceneVisual(scene)
          )}

          {/* Film Grain & Vignette Overlay */}
          <div 
            className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-40"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.45'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Subtle Warm 35mm Analog Wash */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#151210]/60 via-transparent to-[#332219]/20 mix-blend-multiply" />
          
          {/* Faded film frame edge vignette */}
          <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_40px_rgba(10,8,7,0.65)]" />

          {/* Quiet timestamp stamp in corner */}
          <div className="absolute bottom-2.5 right-3 pointer-events-none text-[10px] font-typewriter tracking-wider text-[#E8C288]/40 mix-blend-screen">
            ’26 09 · SIRF
          </div>
        </div>

        {/* Bottom film edge info */}
        {showEdgeNotches && (
          <div className="flex items-center justify-between px-2 py-0.5 text-[8px] font-typewriter tracking-widest text-[#73685C]/60 uppercase border-t border-[#2C2723]">
            <span>EXP {frameNumber}</span>
            <span className="text-[#8F8376]/50">ISO 400 · APERTURE f/1.8</span>
          </div>
        )}
      </div>

      {/* Editorial caption */}
      {caption && (
        <figcaption className="mt-2.5 text-[11px] font-typewriter tracking-wide text-[#78716C] flex items-center justify-between">
          <span>{caption}</span>
          <span className="text-[10px] text-[#A8A29E]">FIG. {frameNumber}</span>
        </figcaption>
      )}
    </figure>
  );
};

/**
 * High-fidelity, atmospheric photographic scenes rendered via layered SVG & lighting gradients.
 * Emulates authentic Kodak Portra 35mm film: warm tones, soft amber highlights, faded deep blacks,
 * natural progressive Indian subjects in candid, thoughtful moments.
 */
function renderSceneVisual(scene: PhotoScene) {
  switch (scene) {
    case 'hero':
      // Intimate cafe terrace morning: couple sharing quiet conversation over coffee
      return (
        <div className="absolute inset-0 w-full h-full bg-[#201A16] flex items-center justify-center overflow-hidden">
          <svg className="w-full h-full object-cover" viewBox="0 0 1200 675" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="sunbeam" cx="35%" cy="30%" r="65%">
                <stop offset="0%" stopColor="#DFB277" stopOpacity="0.45" />
                <stop offset="50%" stopColor="#A87547" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#1C1613" stopOpacity="0.8" />
              </radialGradient>
              <linearGradient id="warmTable" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#533726" />
                <stop offset="100%" stopColor="#251610" />
              </linearGradient>
              <linearGradient id="skinWarmth" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C48E66" />
                <stop offset="100%" stopColor="#6C452C" />
              </linearGradient>
            </defs>

            {/* Background: Sunlit bistro terrace window & aged stone arches */}
            <rect width="1200" height="675" fill="#231B17" />
            <rect width="1200" height="675" fill="url(#sunbeam)" />

            {/* Soft architectural window frames in bokeh */}
            <path d="M120 40H380V520H120Z" fill="#181310" opacity="0.6" />
            <path d="M140 60H360V240H140Z" fill="#88644A" opacity="0.15" />
            <path d="M140 260H360V500H140Z" fill="#88644A" opacity="0.12" />
            <circle cx="260" cy="180" r="140" fill="#E8B87A" opacity="0.12" />

            {/* Distant cafe greenery softly blurred */}
            <circle cx="50" cy="380" r="160" fill="#242B1F" opacity="0.35" />
            <circle cx="160" cy="420" r="110" fill="#2B3222" opacity="0.25" />

            {/* Warm dark mahogany cafe table */}
            <ellipse cx="680" cy="620" rx="460" ry="190" fill="url(#warmTable)" opacity="0.95" />
            <ellipse cx="680" cy="610" rx="430" ry="160" fill="#3D291D" opacity="0.4" />

            {/* Ceramic espresso cups & water glass with morning reflection */}
            <ellipse cx="620" cy="545" rx="36" ry="14" fill="#C2BAAA" opacity="0.3" />
            <path d="M595 520H645L638 548H602L595 520Z" fill="#D6CEBE" />
            <ellipse cx="620" cy="520" rx="25" ry="10" fill="#261A14" />
            <ellipse cx="620" cy="520" rx="21" ry="8" fill="#150E0B" />
            {/* Gentle steam wisps */}
            <path d="M618 510C615 490 626 480 622 460" stroke="#E5DEC9" strokeWidth="2" strokeLinecap="round" opacity="0.25" />

            {/* Second espresso cup */}
            <ellipse cx="740" cy="535" rx="32" ry="12" fill="#C2BAAA" opacity="0.25" />
            <path d="M718 512H762L756 538H724L718 512Z" fill="#D6CEBE" />
            <ellipse cx="740" cy="512" rx="22" ry="9" fill="#1C120D" />

            {/* Candid couple silhouette with rich tonal modeling */}
            {/* Man (right): Leaning slightly forward, natural linen jacket */}
            <g opacity="0.92">
              {/* Torso & Shoulder */}
              <path d="M790 380C830 365 890 375 930 420L970 675H750L790 380Z" fill="#1C1613" />
              <path d="M820 400L860 480L810 540" stroke="#3A2D25" strokeWidth="2" opacity="0.5" />
              {/* Collar detail */}
              <path d="M835 370L860 430L875 390" fill="#EAE3D6" opacity="0.85" />
              {/* Neck & Profile silhouette */}
              <path d="M825 320C825 295 845 280 870 280C895 280 910 298 910 325C910 355 895 385 865 385C840 385 825 350 825 320Z" fill="url(#skinWarmth)" />
              {/* Hair (soft matte charcoal) */}
              <path d="M850 270C885 265 925 285 925 320C925 330 920 340 915 345C910 330 905 305 885 290C870 280 855 280 850 270Z" fill="#140F0D" />
              {/* Arm resting naturally on cafe table */}
              <path d="M780 470L710 525L730 550L800 500Z" fill="#2E231C" />
            </g>

            {/* Woman (left): Thoughtful, natural posture, soft warm lighting catchlight */}
            <g opacity="0.94">
              {/* Torso & dress with subtle drape */}
              <path d="M540 395C500 375 440 390 400 440L350 675H580L540 395Z" fill="#2C231F" />
              {/* Delicate neckline */}
              <path d="M495 400C480 435 520 445 530 410" fill="#D39F79" />
              {/* Neck & gentle smile profile */}
              <path d="M475 320C475 285 500 270 525 270C550 270 565 290 565 325C565 360 545 385 520 385C490 385 475 350 475 320Z" fill="url(#skinWarmth)" />
              {/* Flowing dark hair with warm amber rim light */}
              <path d="M465 290C470 260 515 255 540 260C570 268 580 300 580 350C580 410 550 460 520 460C505 460 500 420 505 380C495 385 475 375 470 340C465 320 460 305 465 290Z" fill="#120D0B" />
              <path d="M545 262C570 272 578 300 578 335" stroke="#E8B87A" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
              {/* Hand holding stem or cup gently */}
              <path d="M570 515C590 520 610 535 605 550C595 555 570 540 555 530Z" fill="#B8855F" />
            </g>

            {/* Bokeh orbs mimicking f/1.8 shallow depth of field */}
            <circle cx="890" cy="180" r="50" fill="#DFB277" opacity="0.12" />
            <circle cx="980" cy="220" r="75" fill="#E8C288" opacity="0.08" />
            <circle cx="280" cy="460" r="90" fill="#DFB277" opacity="0.07" />
            <circle cx="1060" cy="480" r="110" fill="#A87547" opacity="0.1" />
          </svg>
        </div>
      );

    case 'intro':
      // The open personal correspondence: an old fountain pen, warm wood desk, open letter, cup of filter coffee
      return (
        <div className="absolute inset-0 w-full h-full bg-[#1F1916] flex items-center justify-center overflow-hidden">
          <svg className="w-full h-full object-cover" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="800" height="600" fill="#231B17" />
            {/* Diagonal natural window shaft */}
            <path d="M0 0L500 0L800 450L300 600Z" fill="#755238" opacity="0.15" />
            {/* Deep teakwood tabletop texture lines */}
            <line x1="0" y1="180" x2="800" y2="180" stroke="#33251E" strokeWidth="1" opacity="0.4" />
            <line x1="0" y1="360" x2="800" y2="360" stroke="#33251E" strokeWidth="1" opacity="0.4" />
            
            {/* The Love Letter Paper Sheet with gentle shadow */}
            <g transform="rotate(-3 400 300)">
              <rect x="220" y="100" width="340" height="420" fill="#0C0908" opacity="0.3" rx="1" />
              <rect x="215" y="95" width="340" height="420" fill="#FAF6EE" rx="1" />
              
              {/* Subtle letterhead */}
              <text x="250" y="145" fontFamily="'Courier Prime', monospace" fontSize="9" letterSpacing="0.25em" fill="#8C8174">SIRF COFFEE · DISPATCH</text>
              <line x1="250" y1="155" x2="515" y2="155" stroke="#E0D7C8" strokeWidth="0.8" />

              {/* Typewriter typed text lines */}
              <line x1="250" y1="190" x2="480" y2="190" stroke="#2B2623" strokeWidth="2" strokeDasharray="3 2" opacity="0.8" />
              <line x1="250" y1="210" x2="505" y2="210" stroke="#2B2623" strokeWidth="2" strokeDasharray="4 2" opacity="0.8" />
              <line x1="250" y1="230" x2="430" y2="230" stroke="#2B2623" strokeWidth="2" strokeDasharray="3 3" opacity="0.8" />
              
              <line x1="250" y1="270" x2="495" y2="270" stroke="#2B2623" strokeWidth="2" strokeDasharray="4 2" opacity="0.8" />
              <line x1="250" y1="290" x2="470" y2="290" stroke="#2B2623" strokeWidth="2" strokeDasharray="3 2" opacity="0.8" />
              <line x1="250" y1="310" x2="510" y2="310" stroke="#2B2623" strokeWidth="2" strokeDasharray="5 2" opacity="0.8" />
              <line x1="250" y1="330" x2="380" y2="330" stroke="#2B2623" strokeWidth="2" strokeDasharray="3 3" opacity="0.8" />

              {/* Red editorial ink checkmark */}
              <path d="M490 380L498 392L520 370" stroke="#72272B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.85" />
            </g>

            {/* Vintage brass/lacquer fountain pen resting beside paper */}
            <g transform="rotate(28 620 350)">
              <rect x="580" y="160" width="14" height="280" rx="7" fill="#151210" />
              <rect x="582" y="240" width="10" height="6" fill="#C99F5D" />
              <path d="M580 430L587 470L594 430Z" fill="#C99F5D" />
              <line x1="587" y1="430" x2="587" y2="455" stroke="#151210" strokeWidth="0.8" />
            </g>

            {/* Indian brass davara/tumbler filter coffee cup */}
            <g transform="translate(110, 360)">
              <ellipse cx="60" cy="110" rx="55" ry="24" fill="#8E6533" opacity="0.3" />
              <ellipse cx="60" cy="90" rx="50" ry="20" fill="#B38644" />
              <ellipse cx="60" cy="88" rx="42" ry="16" fill="#422513" />
              <path d="M25 40H95L85 85H35L25 40Z" fill="#C49B55" />
              <ellipse cx="60" cy="40" rx="35" ry="12" fill="#5A351D" />
              <ellipse cx="60" cy="40" rx="30" ry="10" fill="#28150B" />
            </g>
          </svg>
        </div>
      );

    case 'step1':
      // 01 APPLY: Vintage Remington typewriter carriage with freshly inserted parchment
      return (
        <div className="absolute inset-0 w-full h-full bg-[#1C1715] flex items-center justify-center overflow-hidden">
          <svg className="w-full h-full object-cover" viewBox="0 0 600 800" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="600" height="800" fill="#1C1715" />
            {/* Warm light casting down */}
            <circle cx="300" cy="200" r="350" fill="#755038" opacity="0.2" />

            {/* Typewriter Platen Roller */}
            <rect x="80" y="320" width="440" height="70" rx="6" fill="#0F0C0B" />
            <rect x="70" y="345" width="20" height="20" rx="4" fill="#3D3630" />
            <rect x="510" y="345" width="20" height="20" rx="4" fill="#3D3630" />

            {/* Cream archival paper rolled up into carriage */}
            <path d="M140 120H460V340H140Z" fill="#F8F3E9" />
            <path d="M140 120H460V135H140Z" fill="#EAE2D2" />
            
            {/* Paper ruler marks */}
            <line x1="160" y1="150" x2="440" y2="150" stroke="#B3A897" strokeWidth="0.8" />
            <text x="160" y="180" fontFamily="'Courier Prime', monospace" fontSize="11" fill="#1F1B18">MEMORANDUM · CHAPTER 01</text>
            <text x="160" y="210" fontFamily="'Courier Prime', monospace" fontSize="13" fontWeight="bold" fill="#1F1B18">THE PARTICULARS</text>
            
            {/* Typed questions */}
            <text x="160" y="245" fontFamily="'Courier Prime', monospace" fontSize="10" fill="#5E564F">Tell us a little about yourself—</text>
            <text x="160" y="265" fontFamily="'Courier Prime', monospace" fontSize="10" fill="#5E564F">where you are based, what stirs your</text>
            <text x="160" y="285" fontFamily="'Courier Prime', monospace" fontSize="10" fill="#5E564F">curiosity, and how you spend your days.</text>

            {/* Type guide & steel ribbon vibrator */}
            <path d="M280 340L295 305H305L320 340H280Z" fill="#4A423B" />
            <rect x="298" y="300" width="4" height="20" fill="#72272B" />

            {/* Typewriter key silhouette in foreground bokeh */}
            <circle cx="180" cy="540" r="32" fill="#120E0D" stroke="#3D342C" strokeWidth="3" />
            <text x="175" y="546" fontFamily="'Courier Prime', monospace" fontSize="16" fill="#D9D0C3">A</text>
            <circle cx="270" cy="540" r="32" fill="#120E0D" stroke="#3D342C" strokeWidth="3" />
            <text x="264" y="546" fontFamily="'Courier Prime', monospace" fontSize="16" fill="#D9D0C3">S</text>
            <circle cx="360" cy="540" r="32" fill="#120E0D" stroke="#3D342C" strokeWidth="3" />
            <text x="354" y="546" fontFamily="'Courier Prime', monospace" fontSize="16" fill="#D9D0C3">D</text>
            <circle cx="450" cy="540" r="32" fill="#120E0D" stroke="#3D342C" strokeWidth="3" />
            <text x="444" y="546" fontFamily="'Courier Prime', monospace" fontSize="16" fill="#D9D0C3">F</text>
          </svg>
        </div>
      );

    case 'step2':
      // 02 WE GET TO KNOW YOU: Two coffee cups, open consultation notebook in warm sunlight
      return (
        <div className="absolute inset-0 w-full h-full bg-[#1D1714] flex items-center justify-center overflow-hidden">
          <svg className="w-full h-full object-cover" viewBox="0 0 600 800" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="600" height="800" fill="#201815" />
            {/* Natural morning light beam */}
            <path d="M100 0L450 0L600 500L250 800Z" fill="#A87547" opacity="0.16" />

            {/* Curator's black cloth notebook */}
            <g transform="rotate(4 300 420)">
              <rect x="140" y="240" width="320" height="420" rx="8" fill="#14110F" />
              <rect x="155" y="245" width="290" height="410" fill="#FAF6EE" />
              <line x1="180" y1="300" x2="415" y2="300" stroke="#72272B" strokeWidth="1" />
              <text x="180" y="290" fontFamily="'Courier Prime', monospace" fontSize="9" letterSpacing="0.2em" fill="#72272B">CURATOR'S CONFIDENTIAL JOURNAL</text>
              
              {/* Handwritten-feel notation lines */}
              <text x="180" y="340" fontFamily="'Newsreader', serif" fontStyle="italic" fontSize="13" fill="#26211D">“Values anchored in family,</text>
              <text x="180" y="365" fontFamily="'Newsreader', serif" fontStyle="italic" fontSize="13" fill="#26211D">curious about art, architecture,</text>
              <text x="180" y="390" fontFamily="'Newsreader', serif" fontStyle="italic" fontSize="13" fill="#26211D">grounded ambition.”</text>
              
              <line x1="180" y1="440" x2="380" y2="440" stroke="#DCD3C3" strokeWidth="1" strokeDasharray="3 3" />
              <text x="180" y="470" fontFamily="'Courier Prime', monospace" fontSize="10" fill="#78716C">LOCATION: BOMBAY / LONDON</text>
              <text x="180" y="490" fontFamily="'Courier Prime', monospace" fontSize="10" fill="#78716C">VETTING: COMPLETE</text>
            </g>

            {/* Dark roast pour-over carafe */}
            <ellipse cx="460" cy="180" rx="45" ry="18" fill="#0D0A09" opacity="0.4" />
            <path d="M430 110L490 110L505 180L415 180Z" fill="#3D291D" opacity="0.8" />
            <ellipse cx="460" cy="180" rx="45" ry="16" fill="#1C110B" />
          </svg>
        </div>
      );

    case 'step3':
      // 03 WE INTRODUCE YOU: An evening streetlamp casting light on a quiet cobblestone alley, two silhouettes meeting
      return (
        <div className="absolute inset-0 w-full h-full bg-[#181310] flex items-center justify-center overflow-hidden">
          <svg className="w-full h-full object-cover" viewBox="0 0 600 800" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="600" height="800" fill="#161210" />
            {/* Glowing gaslight streetlight at dusk */}
            <circle cx="300" cy="200" r="180" fill="#E8B87A" opacity="0.22" />
            <circle cx="300" cy="200" r="70" fill="#FCE5B8" opacity="0.35" />
            
            {/* Streetlamp iron fixture */}
            <path d="M295 100H305V200H295Z" fill="#2C241E" />
            <path d="M280 180L300 150L320 180H280Z" fill="#1E1713" />

            {/* Heritage architectural facades in deep silhouette (Colaba / Mayfair) */}
            <path d="M0 240L180 280V800H0Z" fill="#1A1411" />
            <path d="M600 220L420 270V800H600Z" fill="#1A1411" />
            {/* Warm glowing arched window */}
            <path d="M40 380C40 340 70 330 90 330C110 330 140 340 140 380V450H40Z" fill="#754E2D" opacity="0.3" />

            {/* Cobblestone reflections */}
            <ellipse cx="300" cy="620" rx="140" ry="25" fill="#543A26" opacity="0.25" />

            {/* Two figures meeting under the lamp: understated, cinematic */}
            {/* Figure 1 */}
            <path d="M255 510C260 480 250 450 250 430C250 415 260 405 270 405C280 405 285 415 285 430C285 450 275 480 280 510L288 640H248L255 510Z" fill="#0C0A09" />
            {/* Figure 2 */}
            <path d="M320 515C325 485 315 455 315 435C315 420 325 410 335 410C345 410 350 420 350 435C350 455 340 485 345 515L352 640H312L320 515Z" fill="#0C0A09" />
            
            {/* Soft mist & film glow */}
            <rect x="0" y="600" width="600" height="200" fill="url(#sunbeam)" opacity="0.1" />
          </svg>
        </div>
      );

    case 'step4':
      // 04 YOU DECIDE: A cozy, candlelit cafe table: two hands near coffee cups, quiet laughter
      return (
        <div className="absolute inset-0 w-full h-full bg-[#1E1714] flex items-center justify-center overflow-hidden">
          <svg className="w-full h-full object-cover" viewBox="0 0 600 800" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="600" height="800" fill="#1C1613" />
            {/* Candle flame glow */}
            <circle cx="300" cy="400" r="140" fill="#E8B87A" opacity="0.25" />
            <circle cx="300" cy="400" r="40" fill="#FCE5B8" opacity="0.4" />
            
            {/* Candle holder */}
            <ellipse cx="300" cy="440" rx="20" ry="8" fill="#573F28" />
            <rect x="297" y="415" width="6" height="25" fill="#FAF6EE" />
            {/* Flame */}
            <path d="M300 400C295 408 297 414 300 415C303 414 305 408 300 400Z" fill="#DF8A3E" />

            {/* Dark aged oak table */}
            <ellipse cx="300" cy="580" rx="280" ry="140" fill="#2E2018" />

            {/* Two handcrafted ceramic cups */}
            <ellipse cx="190" cy="530" rx="30" ry="12" fill="#5C4533" opacity="0.5" />
            <ellipse cx="190" cy="520" rx="24" ry="9" fill="#D3C9B8" />
            <ellipse cx="190" cy="520" rx="18" ry="7" fill="#1B100B" />

            <ellipse cx="410" cy="530" rx="30" ry="12" fill="#5C4533" opacity="0.5" />
            <ellipse cx="410" cy="520" rx="24" ry="9" fill="#D3C9B8" />
            <ellipse cx="410" cy="520" rx="18" ry="7" fill="#1B100B" />

            {/* Two people across the table in soft focus */}
            <circle cx="160" cy="310" r="60" fill="#15100E" opacity="0.85" />
            <path d="M100 370C100 340 220 340 220 370L240 600H80L100 370Z" fill="#15100E" opacity="0.85" />

            <circle cx="440" cy="300" r="60" fill="#15100E" opacity="0.85" />
            <path d="M380 360C380 330 500 330 500 360L520 600H360L380 360Z" fill="#15100E" opacity="0.85" />
          </svg>
        </div>
      );

    case 'statement':
      // SECTION 04: Human connection statement — quiet intimate twilight portrait overlooking Marine Drive / London skyline
      return (
        <div className="absolute inset-0 w-full h-full bg-[#181412] flex items-center justify-center overflow-hidden">
          <svg className="w-full h-full object-cover" viewBox="0 0 1200 600" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="1200" height="600" fill="#161210" />
            {/* Twilight sky gradient: muted deep plum to warm dusk amber */}
            <linearGradient id="twilightSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#251C21" />
              <stop offset="45%" stopColor="#4A2F2D" />
              <stop offset="75%" stopColor="#8C5C3E" />
              <stop offset="100%" stopColor="#C9915D" />
            </linearGradient>
            <rect width="1200" height="420" fill="url(#twilightSky)" opacity="0.65" />

            {/* Gentle sea / river horizon */}
            <rect x="0" y="420" width="1200" height="180" fill="#17120F" />
            <line x1="0" y1="420" x2="1200" y2="420" stroke="#C9915D" strokeWidth="0.8" opacity="0.3" />

            {/* Distant city lights twinkle */}
            <circle cx="210" cy="415" r="2" fill="#FFE2B8" opacity="0.6" />
            <circle cx="340" cy="412" r="1.5" fill="#FFE2B8" opacity="0.4" />
            <circle cx="780" cy="416" r="2" fill="#FFE2B8" opacity="0.5" />
            <circle cx="890" cy="414" r="2.5" fill="#FFE2B8" opacity="0.7" />
            <circle cx="950" cy="417" r="1.5" fill="#FFE2B8" opacity="0.4" />

            {/* Promenade railing in foreground */}
            <line x1="0" y1="490" x2="1200" y2="490" stroke="#2B221C" strokeWidth="3" />
            <line x1="0" y1="530" x2="1200" y2="530" stroke="#2B221C" strokeWidth="2" />

            {/* Intimate couple standing side by side looking out together */}
            <g transform="translate(600, 260)">
              {/* Silhouette Woman */}
              <ellipse cx="-45" cy="50" rx="16" ry="19" fill="#100C0A" />
              <path d="M-60 45C-62 25 -40 22 -32 30C-28 35 -30 55 -35 70C-40 68 -55 70 -60 45Z" fill="#0A0807" />
              <path d="M-65 70C-75 100 -55 130 -40 180L-30 280H-65L-75 70Z" fill="#100C0A" />

              {/* Silhouette Man (tall, gentle stance beside her) */}
              <ellipse cx="15" cy="40" rx="18" ry="21" fill="#100C0A" />
              <path d="M-5 60C-5 58 35 55 40 60C45 90 40 140 45 280H-5L-5 60Z" fill="#100C0A" />

              {/* Hands close, touching on promenade stone */}
              <ellipse cx="-12" cy="225" rx="8" ry="5" fill="#2E221B" />
            </g>
          </svg>
        </div>
      );

    case 'final':
      // SECTION 05: The Final Frame of a Love Story: An intimate evening balcony, soft warm interior glow, warm Kodak tone
      return (
        <div className="absolute inset-0 w-full h-full bg-[#181310] flex items-center justify-center overflow-hidden">
          <svg className="w-full h-full object-cover" viewBox="0 0 1200 675" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="1200" height="675" fill="#16110E" />

            {/* Interior warm lamp through vintage French window */}
            <radialGradient id="balconyGlow" cx="20%" cy="40%" r="50%">
              <stop offset="0%" stopColor="#DF9E56" stopOpacity="0.5" />
              <stop offset="60%" stopColor="#6E4426" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#16110E" stopOpacity="0.9" />
            </radialGradient>
            <rect width="1200" height="675" fill="url(#balconyGlow)" />

            {/* French door frame lines */}
            <rect x="80" y="40" width="280" height="580" fill="none" stroke="#2E231C" strokeWidth="8" />
            <line x1="80" y1="230" x2="360" y2="230" stroke="#2E231C" strokeWidth="4" />
            <line x1="80" y1="420" x2="360" y2="420" stroke="#2E231C" strokeWidth="4" />

            {/* Balcony wrought iron curves */}
            <line x1="0" y1="520" x2="1200" y2="520" stroke="#281F19" strokeWidth="5" />
            <line x1="0" y1="560" x2="1200" y2="560" stroke="#281F19" strokeWidth="3" />
            {Array.from({ length: 18 }).map((_, i) => (
              <line key={i} x1={70 * i} y1="520" x2={70 * i} y2="675" stroke="#281F19" strokeWidth="2" opacity="0.6" />
            ))}

            {/* Deep dusk sky beyond */}
            <ellipse cx="850" cy="300" rx="350" ry="180" fill="#2E1B24" opacity="0.3" />

            {/* Couple in gentle, quiet embrace in the balcony doorway */}
            <g transform="translate(680, 240)">
              {/* Couple silhouette */}
              <ellipse cx="-20" cy="30" rx="20" ry="22" fill="#120D0B" />
              <ellipse cx="25" cy="45" rx="18" ry="20" fill="#120D0B" />
              <path d="M-45 55C-50 90 -40 180 -30 380H50C50 200 45 70 35 60C20 60 -10 50 -45 55Z" fill="#100C0A" />
              
              {/* Warm rim light on hair & shoulder from interior lamp */}
              <path d="M-40 40C-42 20 -25 15 -18 20" stroke="#E5B275" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
              <path d="M-45 75C-48 100 -42 140 -40 180" stroke="#DF9E56" strokeWidth="1.8" strokeLinecap="round" opacity="0.3" />
            </g>
          </svg>
        </div>
      );
  }
}
