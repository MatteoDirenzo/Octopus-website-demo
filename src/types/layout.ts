/** One value per breakpoint. A missing breakpoint falls back to the smaller one. */
export type BreakpointValue<T> = {
  /** Value below 810. */
  mobile?: T;
  /** Value from 810. */
  tablet?: T;
  /** Value from 1200. */
  desktop?: T;
};

/** One breakpoint of `BlockSpacing`. Omitted sides are `0`. */
export type BlockSpacingSide = {
  /** Top step. */
  top?: number;
  /** Right step. */
  right?: number;
  /** Bottom step. */
  bottom?: number;
  /** Left step. */
  left?: number;
};

/**
 * Page padding for one block, in spacing-scale steps.
 * `20` is the same step as `pt-20`. A missing breakpoint copies the smaller one.
 * A missing side is `0`.
 */
export type BlockSpacing = {
  /** Steps below 810. */
  mobile?: BlockSpacingSide;
  /** Steps from 810. Omitted sides copy `mobile`. */
  tablet?: BlockSpacingSide;
  /** Steps from 1200. Omitted sides copy `tablet`. */
  desktop?: BlockSpacingSide;
};
