export function RedUnderline({ className = "" }) {
  return (
    <svg
      viewBox="0 0 120 12"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`redpen redpen--underline ${className}`}
    >
      <path d="M2 8 C 20 4, 38 10, 58 7 S 98 4, 118 8" strokeWidth="3" />
    </svg>
  );
}

export function RedDoubleUnderline({ className = "" }) {
  return (
    <svg
      viewBox="0 0 120 16"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`redpen redpen--double ${className}`}
    >
      <path d="M2 5 C 24 2, 60 8, 118 4" strokeWidth="2.5" />
      <path d="M4 12 C 30 9, 70 14, 116 10" strokeWidth="2.5" />
    </svg>
  );
}

export function RedCircle({ className = "" }) {
  return (
    <svg viewBox="0 0 160 60" aria-hidden="true" className={`redpen redpen--circle ${className}`}>
      <path
        d="M84 6 C 130 4, 154 16, 152 31 C 150 47, 110 57, 72 54 C 34 51, 8 42, 10 28 C 12 13, 46 5, 96 9"
        strokeWidth="3"
      />
    </svg>
  );
}
