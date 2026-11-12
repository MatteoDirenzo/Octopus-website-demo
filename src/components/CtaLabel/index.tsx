export type CtaLabelProps = {
  label: string;
  /** Screen-reader text after `label`. Omit to render only the label. */
  context?: string;
};

/**
 * Visible link label plus visually hidden context, so a generic label such as
 * `Learn more` still names its destination in the link text.
 */
export function CtaLabel({ label, context }: CtaLabelProps) {
  return (
    <>
      {label}
      {context ? (
        <>
          {" "}
          <span className="sr-only">{context}</span>
        </>
      ) : null}
    </>
  );
}
