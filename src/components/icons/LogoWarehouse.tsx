import type { SVGProps } from "react";

/**
 * The Warehouse logo with no background, for use on a red surface.
 * The wordmark is live text in system sans fonts, not outlines.
 * The viewBox is cropped to the artwork, measured with Helvetica Neue.
 * The text starts at -0.5 so its first glyph, not its side bearing,
 * touches the left edge.
 */
export function LogoWarehouse(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 574.5 120"
      width="230"
      height="48"
      {...props}
    >
      <text
        x="-0.5"
        y="87"
        fontFamily="-apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Arial, sans-serif"
        fontSize="70"
        fill="var(--color-text-inverse)"
      >
        <tspan fontWeight="400" letterSpacing="-0.5">
          the
        </tspan>
        <tspan fontWeight="700" letterSpacing="-2.5" dx="6">
          warehouse
        </tspan>
      </text>
      <g transform="translate(454.5, 0)">
        <rect width="120" height="120" rx="22" fill="var(--color-text-inverse)" />
        <polygon points="8.5,90 33.5,90 75.5,30 50.5,30" fill="var(--color-brand)" />
        <polygon points="44.5,90 69.5,90 111.5,30 86.5,30" fill="var(--color-brand)" />
      </g>
    </svg>
  );
}
