export function Logo({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="HORMUZ Fertilizer Monitor"
    >
      <rect width="32" height="32" rx="6" fill="hsl(var(--primary))" />
      {/* Stylized "H" with break — represents the disrupted strait */}
      <path
        d="M9 8V24M23 8V24M9 16H14M18 16H23"
        stroke="hsl(var(--primary-foreground))"
        strokeWidth="2.5"
        strokeLinecap="square"
      />
      {/* Tiny gap dot */}
      <circle cx="16" cy="16" r="1.2" fill="hsl(var(--primary-foreground))" />
    </svg>
  );
}
