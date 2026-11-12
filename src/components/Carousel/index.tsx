"use client";

import clsx from "clsx";
import { Children, useEffect, useId, useRef, type ReactNode } from "react";
import { Button } from "@/components/Button";
import { Chevron } from "@/components/icons/Chevron";
import { carouselStyle } from "@/helpers/components/carousel";
import { slideKey, useCarousel } from "@/helpers/hooks/useCarousel";
import type {
  CarouselEndOffset,
  CarouselInset,
  CarouselLabels,
  CarouselMode,
  CarouselPeek,
  CarouselVisible,
} from "@/types";

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
  /** Accessible names of the controls, from `site.carousel`. */
  labels: CarouselLabels;
  /** Extra classes on the section. Used for the section's vertical padding. */
  className?: string;
  /** One slide each. */
  children: ReactNode;
};

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
  labels,
  className,
  children,
}: CarouselProps) {
  const titleId = useId();
  const previousRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const slides = Children.toArray(children);
  const overflow = mode === "overflow";
  const {
    scrollerRef,
    atStart,
    atEnd,
    activeIndex,
    scrollToIndex,
    scrollByCard,
  } = useCarousel();

  /*
   * The arrow that reaches an end becomes disabled, which drops focus to the
   * page. The click records the other arrow, and focus moves there once it is
   * enabled. With two positions that is only after the scroll has started.
   */
  const focusTarget = useRef<"previous" | "next" | null>(null);

  useEffect(() => {
    if (focusTarget.current === "previous" && !atStart) {
      previousRef.current?.focus();
      focusTarget.current = null;
    } else if (focusTarget.current === "next" && !atEnd) {
      nextRef.current?.focus();
      focusTarget.current = null;
    }
  }, [atStart, atEnd]);

  const style = carouselStyle({ visible, endOffset, peek, inset });

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
           * `relative` makes the track the containing block of absolute
           * descendants such as `sr-only` text. Without it they escape the
           * clip and widen the page.
           */
          "relative mt-10 flex items-start gap-4 overflow-x-auto overflow-y-hidden overscroll-x-contain scroll-smooth snap-x snap-mandatory",
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
            aria-label={labels.dots}
            className="col-start-2 flex flex-wrap justify-center"
          >
            {slides.map((slide, index) => (
              <button
                key={slideKey(slide, index)}
                type="button"
                aria-label={labels.showItem.replace("{n}", String(index + 1))}
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
            ref={previousRef}
            variant="secondary"
            iconOnly
            aria-label={labels.previous}
            disabled={atStart}
            onClick={() => {
              if (scrollByCard(-1)) {
                focusTarget.current = "next";
              }
            }}
          >
            <Chevron className="rotate-180" />
          </Button>
          <Button
            ref={nextRef}
            variant="secondary"
            iconOnly
            aria-label={labels.next}
            disabled={atEnd}
            onClick={() => {
              if (scrollByCard(1)) {
                focusTarget.current = "previous";
              }
            }}
          >
            <Chevron />
          </Button>
        </div>
      </div>
    </section>
  );
}
