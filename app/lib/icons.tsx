export function QuoteIcon({
  color = "currentColor",
  size = 48,
}: {
  color?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 28C12 24 14 20 20 16L18.5 14C11 18 8 23 8 30C8 35 11 38 15 38C18.5 38 21 35.5 21 32.5C21 29.5 18.5 27 15.5 27C14 27 12.8 27.5 12 28Z"
        fill={color}
      />
      <path
        d="M32 28C32 24 34 20 40 16L38.5 14C31 18 28 23 28 30C28 35 31 38 35 38C38.5 38 41 35.5 41 32.5C41 29.5 38.5 27 35.5 27C34 27 32.8 27.5 32 28Z"
        fill={color}
      />
    </svg>
  );
}

export function AlignLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <rect x="2" y="3" width="12" height="1.5" rx="0.75" />
      <rect x="2" y="7.25" width="8" height="1.5" rx="0.75" />
      <rect x="2" y="11.5" width="10" height="1.5" rx="0.75" />
    </svg>
  );
}

export function AlignCenterIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <rect x="2" y="3" width="12" height="1.5" rx="0.75" />
      <rect x="4" y="7.25" width="8" height="1.5" rx="0.75" />
      <rect x="3" y="11.5" width="10" height="1.5" rx="0.75" />
    </svg>
  );
}

export function AlignRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <rect x="2" y="3" width="12" height="1.5" rx="0.75" />
      <rect x="6" y="7.25" width="8" height="1.5" rx="0.75" />
      <rect x="4" y="11.5" width="10" height="1.5" rx="0.75" />
    </svg>
  );
}

export function DownloadIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v8.5M4.5 7.5 8 11l3.5-3.5" />
      <path d="M3 12.5v1h10v-1" />
    </svg>
  );
}

export function ChevronDownIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 4.5 6 7.5 9 4.5" />
    </svg>
  );
}
