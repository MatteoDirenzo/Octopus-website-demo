"use client";

import clsx from "clsx";
import { Children, useId, type CSSProperties, type ReactNode } from "react";
import { Button } from "@/components/Button";
import { Chevron } from "@/components/icons/Chevron";
import { slideKey, useCarousel } from "@/helpers/hooks/useCarousel";

export type CarouselMode = "contained" | "overflow";

export type CarouselVisible = {
  /** Full cards below 810. The overflow peek is not included. */
  mobile?: number;
  /** Full cards from 810. */
  tablet?: number;
  /** Full cards from 1200. */
  desktop?: number;
};

export type CarouselEndOffset = {
  /**
   * Spacing step below 810. The same number as the padding utility:
   * `4` matches `px-4`.
   */
  mobile?: number;
  /** Spacing step from 810. */
  tablet?: number;
  /** Spacing step from 1200. */
  desktop?: number;
};

/** How much of the next card stays in view, as a percentage of one card. */
export type CarouselPeek = {
  /** Percentage below 810. `50` shows half. Omitted shows two thirds. */
  mobile?: number;
  /** Percentage from 810. */
  tablet?: number;
  /** Percentage from 1200. */
  desktop?: number;
};

/**
 * Overflow start inset, in the same spacing steps as the padding utilities.
 * Omitted matches the header: 4, 8, and 32.
 */
export type CarouselInset = {
  /** Spacing step below 810. */
  mobile?: number;
  /** Spacing step from 810. */
  tablet?: number;
  /** Spacing step from 1200. */
  desktop?: number;
};

export type CarouselProps = {
  /** Section heading. The region is named by this. */
  title: string;
  /**
   * `contained` fills the parent, which owns the page inset.
   * `overflow` is full bleed and insets itself.
   */
  mode?: CarouselMode;
  /** Full cards in view at each breakpoint. */
  visible?: CarouselVisible;
  /**
   * Overflow only. End inset, in the same spacing steps as the start padding.
   * The last card stops that far from the right edge.
   */
  endOffset?: CarouselEndOffset;
  /**
   * Overflow only. How much of the next card stays in view at each breakpoint.
   * Omitted shows two thirds.
   */
  peek?: CarouselPeek;
  /**
   * Overflow only. Start inset for the title, the controls, and the track.
   * Omitted matches the header.
   */
  inset?: CarouselInset;
  /** Position dots. Off by default, so only the arrows show. */
  showDots?: boolean;
  /** Extra classes on the section. Used for the section's vertical padding. */
  className?: string;
  /** One slide each. */
  children: ReactNode;
};

function peekValue(value: number | undefined) {
  if (value == null) {
    return "calc(2 / 3)";
  }

  return String(value / 100);
}

/**
 * Horizontal scroller. Contained stays inside the parent's page inset.
 * Overflow adds that inset to the title, the controls, and the start of the
 * track, and lets the next card run off the right edge.
 * The title is an `h2` on the H3 scale. There is no `h3-l` token:
 * H3/L is `h2-s` (32px, 110%, 700).
 */
export function Carousel({
  title,
  mode = "contained",
  visible,
  endOffset,
  peek,
  inset,
  showDots = false,
  className,
  children,
}: CarouselProps) {
  const titleId = useId();
  const slides = Children.toArray(children);
  const overflow = mode === "overflow";
  const endMobile = endOffset?.mobile ?? 0;
  const endTablet = endOffset?.tablet ?? endMobile;
  const endDesktop = endOffset?.desktop ?? endTablet;
  const {
    scrollerRef,
    atStart,
    atEnd,
    activeIndex,
    scrollToIndex,
    scrollByCard,
  } = useCarousel();

  const style = {
    "--carousel-mobile": visible?.mobile ?? 1,
    "--carousel-tablet": visible?.tablet ?? 2,
    "--carousel-desktop": visible?.desktop ?? 5,
    "--carousel-end-mobile": endMobile,
    "--carousel-end-tablet": endTablet,
    "--carousel-end-desktop": endDesktop,
    "--carousel-peek-mobile": peekValue(peek?.mobile),
    "--carousel-peek-tablet": peekValue(peek?.tablet),
    "--carousel-peek-desktop": peekValue(peek?.desktop),
    "--carousel-inset-mobile": inset?.mobile ?? 4,
    "--carousel-inset-tablet": inset?.tablet ?? 8,
    "--carousel-inset-desktop": inset?.desktop ?? 32,
  } as CSSProperties;

  return (
    <section
      aria-labelledby={titleId}
      aria-roledescription="carousel"
      className={clsx(
        "w-full min-w-0 overflow-x-clip",
        "[--carousel-cards:var(--carousel-mobile)]",
        "tablet:[--carousel-cards:var(--carousel-tablet)]",
        "desktop:[--carousel-cards:var(--carousel-desktop)]",
        "[--carousel-peek:var(--carousel-peek-mobile)]",
        "tablet:[--carousel-peek:var(--carousel-peek-tablet)]",
        "desktop:[--carousel-peek:var(--carousel-peek-desktop)]",
        "[--carousel-end:--spacing(var(--carousel-end-mobile))]",
        "tablet:[--carousel-end:--spacing(var(--carousel-end-tablet))]",
        "desktop:[--carousel-end:--spacing(var(--carousel-end-desktop))]",
        "[--carousel-inset:--spacing(var(--carousel-inset-mobile))]",
        "tablet:[--carousel-inset:--spacing(var(--carousel-inset-tablet))]",
        "desktop:[--carousel-inset:--spacing(var(--carousel-inset-desktop))]",
        className,
      )}
      style={style}
    >
      <h2
        id={titleId}
        className={clsx(
          "text-h3-s text-text tablet:text-h3-m desktop:text-h2-s",
          overflow && "px-(--carousel-inset)",
        )}
      >
        {title}
      </h2>
      <ul
        ref={scrollerRef}
        className={clsx(
          /*
           * `overflow-x-auto` alone computes `overflow-y` to `auto`, which adds
           * a couple of pixels of vertical scroll. Hide that axis.
           */
          "mt-10 flex items-start gap-4 overflow-x-auto overflow-y-hidden overscroll-x-contain scroll-smooth snap-x snap-mandatory",
          "tablet:mt-8 motion-reduce:scroll-auto",
          /*
           * `scrollbar-none` covers Firefox. WebKit still needs the pseudo-element.
           * Overflow insets the track with the title. Scroll padding matches it,
           * so a snapped card lines up with the title.
           */
          "scrollbar-none [&::-webkit-scrollbar]:hidden",
          overflow &&
            "ps-(--carousel-inset) pe-(--carousel-end) scroll-ps-(--carousel-inset)",
        )}
      >
        {slides.map((slide, index) => (
          <li
            key={slideKey(slide, index)}
            className={clsx(
              "min-w-0 shrink-0 snap-start",
              /*
               * `gap-4` is `--spacing(4)`. The basis uses that same gap.
               * Contained fits exactly `n` cards.
               * Overflow fits `n` cards, `n` gaps, and `--carousel-peek` of the next card.
               * End padding shrinks the content box, so the basis adds `--carousel-end` back.
               * That padding is only reached on the last card.
               */
              overflow
                ? "basis-[calc((100%+var(--carousel-end)-var(--carousel-cards)*var(--spacing)*4)/(var(--carousel-cards)+var(--carousel-peek)))]"
                : "basis-[calc((100%-(var(--carousel-cards)-1)*var(--spacing)*4)/(var(--carousel-cards)))]",
            )}
          >
            {slide}
          </li>
        ))}
      </ul>
      <div
        className={clsx(
          "mt-10 grid grid-cols-[1fr_auto_1fr] items-center tablet:mt-8",
          overflow && "px-(--carousel-inset)",
        )}
      >
        {showDots ? (
          <div
            role="group"
            aria-label="Slides"
            className="col-start-2 flex flex-wrap justify-center"
          >
            {slides.map((slide, index) => (
              <button
                key={slideKey(slide, index)}
                type="button"
                aria-label={`Show item ${index + 1}`}
                aria-current={index === activeIndex ? "true" : undefined}
                className="inline-flex size-6 items-center justify-center rounded-full outline-none focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-focus"
                onClick={() => scrollToIndex(index)}
              >
                <span
                  aria-hidden="true"
                  className={clsx(
                    "size-2 rounded-full",
                    index === activeIndex ? "bg-text" : "bg-text-muted",
                  )}
                />
              </button>
            ))}
          </div>
        ) : null}
        <div className="col-start-3 flex shrink-0 justify-end gap-2">
          <Button
            variant="secondary"
            iconOnly
            aria-label="Previous"
            disabled={atStart}
            onClick={() => scrollByCard(-1)}
          >
            <Chevron className="rotate-180" />
          </Button>
          <Button
            variant="secondary"
            iconOnly
            aria-label="Next"
            disabled={atEnd}
            onClick={() => scrollByCard(1)}
          >
            <Chevron />
          </Button>
        </div>
      </div>
    </section>
  );
}
