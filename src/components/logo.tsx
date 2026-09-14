const brandStops = (
  <>
    <stop offset="0%" stopColor="#0078D4" />
    <stop offset="55%" stopColor="#3155E7" />
    <stop offset="100%" stopColor="#7B3FF2" />
  </>
);

export function WordmarkLogo({ className = "h-7 w-auto" }: { className?: string }) {
  return (
    <svg
      viewBox="0 60 1200 160"
      className={className}
      role="img"
      aria-label="UNRESOLVED"
    >
      <defs>
        <linearGradient id="brand-gradient-wordmark" x1="0%" y1="0%" x2="100%" y2="100%">
          {brandStops}
        </linearGradient>
      </defs>
      <text
        x="145"
        y="185"
        textLength="555"
        lengthAdjust="spacingAndGlyphs"
        fontFamily="var(--font-inter), Arial, Helvetica, sans-serif"
        fontSize="112"
        fontWeight="700"
        fill="currentColor"
      >
        UNRESO
      </text>
      <line
        x1="718"
        y1="105"
        x2="758"
        y2="185"
        stroke="url(#brand-gradient-wordmark)"
        strokeWidth="18"
        strokeLinecap="round"
      />
      <text
        x="775"
        y="185"
        textLength="270"
        lengthAdjust="spacingAndGlyphs"
        fontFamily="var(--font-inter), Arial, Helvetica, sans-serif"
        fontSize="112"
        fontWeight="700"
        fill="currentColor"
      >
        VED
      </text>
    </svg>
  );
}

export function FullLogo({ className = "h-auto w-full max-w-md" }: { className?: string }) {
  return (
    <svg
      viewBox="0 40 1200 340"
      className={className}
      role="img"
      aria-label="UNRESOLVED — Infrastructure, Cloud, AI, DevOps"
    >
      <defs>
        <linearGradient id="brand-gradient-full" x1="0%" y1="0%" x2="100%" y2="100%">
          {brandStops}
        </linearGradient>
      </defs>

      <text
        x="145"
        y="185"
        textLength="555"
        lengthAdjust="spacingAndGlyphs"
        fontFamily="var(--font-inter), Arial, Helvetica, sans-serif"
        fontSize="112"
        fontWeight="700"
        fill="currentColor"
      >
        UNRESO
      </text>
      <line
        x1="718"
        y1="105"
        x2="758"
        y2="185"
        stroke="url(#brand-gradient-full)"
        strokeWidth="18"
        strokeLinecap="round"
      />
      <text
        x="775"
        y="185"
        textLength="270"
        lengthAdjust="spacingAndGlyphs"
        fontFamily="var(--font-inter), Arial, Helvetica, sans-serif"
        fontSize="112"
        fontWeight="700"
        fill="currentColor"
      >
        VED
      </text>

      <text
        x="600"
        y="240"
        textAnchor="middle"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="19"
        letterSpacing="7"
        fill="currentColor"
        opacity="0.75"
      >
        INFRASTRUCTURE
        <tspan fill="url(#brand-gradient-full)"> • </tspan>
        CLOUD
        <tspan fill="url(#brand-gradient-full)"> • </tspan>
        AI
        <tspan fill="url(#brand-gradient-full)"> • </tspan>
        DEVOPS
      </text>

      <g transform="translate(250 280)" fill="none" stroke="url(#brand-gradient-full)" strokeWidth="4">
        <rect x="0" y="0" width="55" height="18" rx="4" />
        <line x1="8" y1="9" x2="25" y2="9" />
        <circle cx="42" cy="6" r="2" />
        <circle cx="49" cy="6" r="2" />
        <rect x="0" y="21" width="55" height="18" rx="4" />
        <line x1="8" y1="30" x2="25" y2="30" />
        <circle cx="42" cy="27" r="2" />
        <circle cx="49" cy="27" r="2" />
        <rect x="0" y="42" width="55" height="18" rx="4" />
        <line x1="8" y1="51" x2="25" y2="51" />
        <circle cx="42" cy="48" r="2" />
        <circle cx="49" cy="48" r="2" />
      </g>
      <text x="278" y="365" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontSize="17" letterSpacing="4" fill="currentColor">
        INFRASTRUCTURE
      </text>

      <line x1="450" y1="280" x2="450" y2="370" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" />

      <g
        transform="translate(540 282)"
        fill="none"
        stroke="url(#brand-gradient-full)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M15 42 C7 42 2 36 2 29 C2 22 8 16 15 16 C17 8 24 3 32 3 C42 3 50 10 51 20 C59 20 65 26 65 34 C65 39 61 42 56 42 Z" />
      </g>
      <text x="572" y="365" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontSize="17" letterSpacing="4" fill="currentColor">
        CLOUD
      </text>

      <line x1="690" y1="280" x2="690" y2="370" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" />

      <g
        transform="translate(770 282)"
        fill="none"
        stroke="url(#brand-gradient-full)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="
            M30 8
            C23 2 13 6 13 14
            C5 14 2 21 5 27
            C0 34 5 42 13 42
            C13 50 22 54 29 49

            M30 8
            C37 2 47 6 47 14
            C55 14 58 21 55 27
            C60 34 55 42 47 42
            C47 50 38 54 31 49
          "
        />
        <line x1="30" y1="8" x2="30" y2="50" />
        <path d="M13 18 L22 18 L22 26" />
        <path d="M13 35 L22 35 L22 42" />
        <path d="M47 18 L38 18 L38 26" />
        <path d="M47 35 L38 35 L38 42" />
        <circle cx="22" cy="18" r="1.8" fill="url(#brand-gradient-full)" />
        <circle cx="22" cy="35" r="1.8" fill="url(#brand-gradient-full)" />
        <circle cx="38" cy="18" r="1.8" fill="url(#brand-gradient-full)" />
        <circle cx="38" cy="35" r="1.8" fill="url(#brand-gradient-full)" />
      </g>
      <text x="800" y="365" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontSize="17" letterSpacing="4" fill="currentColor">
        AI
      </text>

      <line x1="900" y1="280" x2="900" y2="370" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" />

      <g
        transform="translate(980 290)"
        fill="none"
        stroke="url(#brand-gradient-full)"
        strokeWidth="5"
        strokeLinecap="round"
      >
        <path
          d="
            M0 25
            C0 8 22 3 35 15
            L62 40
            C75 52 97 47 97 30
            C97 13 75 8 62 20
            L35 45
            C22 57 0 52 0 35
          "
        />
      </g>
      <text x="1028" y="365" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontSize="17" letterSpacing="4" fill="currentColor">
        DEVOPS
      </text>
    </svg>
  );
}
