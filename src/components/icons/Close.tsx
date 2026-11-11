import type { SVGProps } from "react";

export function Close(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      width="16"
      height="16"
      fill="none"
      {...props}
    >
      <path d="M4 4 12 12M12 4 4 12" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
