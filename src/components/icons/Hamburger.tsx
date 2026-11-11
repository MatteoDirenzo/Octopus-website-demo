import type { SVGProps } from "react";

export function Hamburger(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      width="16"
      height="16"
      fill="none"
      {...props}
    >
      <path
        d="M2.5 5.5h11M2.5 10.5h11"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}
