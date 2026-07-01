// The nine hero KPIs — single source of truth for the dashboard mockup and the Tape.
export const KPIS = [
  { label: "Cash Collected", value: "$570,133", dir: "up", change: "2.6%", anchor: true, prefix: "$", target: 570133 },
  { label: "Closes", value: "77", dir: "down", change: "8.5%", target: 77 },
  { label: "Close Rate", value: "20.2%", dir: "down", change: "37.7%", target: 20.2, decimals: 1, suffix: "%" },
  { label: "Shows", value: "381", dir: "down", change: "74.0%", target: 381 },
  { label: "Show Rate", value: "55.5%", dir: "up", change: "116.3%", target: 55.5, decimals: 1, suffix: "%" },
  { label: "Calls", value: "695", dir: "down", change: "18.6%", target: 695 },
  { label: "Cash / Show", value: "$1,496", dir: "down", change: "41.0%", prefix: "$", target: 1496 },
  { label: "Qualified", value: "74.8%", dir: "down", change: "40.0%", target: 74.8, decimals: 1, suffix: "%" },
  { label: "Sales Cycle", value: "5.5d", dir: "up", change: "329.6%", target: 5.5, decimals: 1, suffix: "d" },
];
