const PATHS = {
  bolt: <path d="M11 2 4 12h5l-1 8 7-10h-5l1-8z" />,
  "bar-chart": <path d="M4 17V9m6 8V4m6 13v-6" />,
  trophy: (
    <path d="M7 4h10v5a5 5 0 0 1-10 0V4zM7 5H4a3 3 0 0 0 3 4m10-4h3a3 3 0 0 1-3 4M12 14v4m-4 2h8" />
  ),
  "credit-card": (
    <path d="M3 6.5A1.5 1.5 0 0 1 4.5 5h15A1.5 1.5 0 0 1 21 6.5v11a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5v-11zM3 10h18" />
  ),
  calendar: (
    <path d="M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zM4 9.5h16M8 3v4m8-4v4" />
  ),
  check: <path d="M4 12.5 9.5 18 20 6.5" />,
  "arrow-right": <path d="M5 12h14M13 6l6 6-6 6" />,
  "arrow-down": <path d="M12 5v14m-6-8 6 6 6-6" />,
  refresh: (
    <path d="M20 11a8 8 0 0 0-14.5-3.5M4 13a8 8 0 0 0 14.5 3.5M5.5 4v4h4m9 12v-4h-4" />
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  play: <path d="M8 5.5v13l11-6.5-11-6.5z" fill="currentColor" stroke="none" />,
  "chevron-down": <path d="M6 9.5l6 6 6-6" />,
  "warning-triangle": (
    <path d="M12 3.5 22 20H2L12 3.5zM12 10v4.5m0 2.75v.25" />
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  lock: (
    <path d="M6 11h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1zm2 0V8a4 4 0 0 1 8 0v3" />
  ),
};

export function Icon({ name, size = 18, className = "", ...rest }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...rest}
    >
      {PATHS[name]}
    </svg>
  );
}

export function DeltaChip({ dir, value }) {
  return (
    <span className={`delta delta--${dir}`}>
      <svg viewBox="0 0 12 10" width="8" height="7" aria-hidden="true" className={dir === "down" ? "delta__tri delta__tri--down" : "delta__tri"}>
        <path d="M6 1l5 8H1z" fill="currentColor" />
      </svg>
      <span className="delta__sign" aria-hidden="true">{dir === "up" ? "+" : "-"}</span>
      {value}
    </span>
  );
}
