import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Banner } from "@/components/Banner";
import { Button } from "@/components/Button";
import { CardLarge } from "@/components/CardLarge";
import { CardMedium } from "@/components/CardMedium";
import { CardSmall } from "@/components/CardSmall";
import { Heading } from "@/components/Heading";
import { Chevron } from "@/components/icons/Chevron";

export const metadata: Metadata = {
  title: "Components",
  description: "Shared component variants for visual checks.",
  openGraph: {
    title: "Components",
    description: "Shared component variants for visual checks.",
    type: "website",
  },
};

type Variant = "primary" | "secondary" | "ghost";
type Tone = "light" | "dark";

type Specimen = {
  title: string;
  variant: Variant;
  tone?: Tone;
  onDark?: boolean;
};

const SPECIMENS: Specimen[] = [
  { title: "Primary", variant: "primary" },
  { title: "Secondary", variant: "secondary" },
  { title: "Ghost", variant: "ghost" },
  { title: "Ghost dark", variant: "ghost", tone: "dark", onDark: true },
];

const CARD_IMAGE = {
  src: "/images/placeholders/category-kitchen.png",
  alt: "Placeholder",
  width: 800,
  height: 800,
};

const BANNER_IMAGE = {
  src: CARD_IMAGE.src,
  alt: CARD_IMAGE.alt,
};

function Sample({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-start gap-2">
      <p className="text-label">{label}</p>
      {children}
    </div>
  );
}

function ButtonSpecimen({
  title,
  variant,
  tone = "light",
  onDark = false,
}: Specimen) {
  const headingId = title.toLowerCase().replace(/ /g, "-");

  return (
    <section
      aria-labelledby={headingId}
      className={
        onDark ? "flex flex-col gap-4 bg-foreground p-4" : "flex flex-col gap-4"
      }
    >
      <h2 id={headingId} className={onDark ? "text-text-inverse" : undefined}>
        {title}
      </h2>
      <div className="flex flex-wrap items-end gap-6">
        <Sample label="Text">
          <Button variant={variant} tone={tone}>
            Label
          </Button>
        </Sample>
        <Sample label="Icon">
          <Button
            variant={variant}
            tone={tone}
            iconOnly
            aria-label={`${title} icon`}
          >
            <Chevron />
          </Button>
        </Sample>
        <Sample label="Text disabled">
          <Button variant={variant} tone={tone} disabled>
            Label
          </Button>
        </Sample>
        <Sample label="Icon disabled">
          <Button
            variant={variant}
            tone={tone}
            iconOnly
            disabled
            aria-label={`${title} icon disabled`}
          >
            <Chevron />
          </Button>
        </Sample>
      </div>
    </section>
  );
}

/**
 * Dev gallery. Not a content page, so it does not go through the section registry.
 */
export default function ComponentsPage() {
  return (
    <main className="flex flex-col gap-8 p-8">
      <Heading
        title="Primary"
        subtitle="Subtitle"
        button={{ label: "Label", href: "/dev/components" }}
      />
      <Heading
        variant="secondary"
        title="Secondary"
        subtitle="Subtitle"
        button={{ label: "Label" }}
      />
      <h2>Button</h2>
      <p className="text-label">
        Hover, focus, and press the enabled controls. Disabled stays muted.
      </p>
      {SPECIMENS.map((specimen) => (
        <ButtonSpecimen key={specimen.title} {...specimen} />
      ))}
      <section aria-labelledby="link" className="flex flex-col gap-4">
        <h2 id="link">Link</h2>
        <Sample label="Text">
          <Button href="/dev/components">Label</Button>
        </Sample>
      </section>
      <section aria-labelledby="card-large" className="flex flex-col gap-8">
        <h2 id="card-large">Card large</h2>
        <CardLarge
          variant="horizontal"
          title="Horizontal"
          description="Description"
          image={CARD_IMAGE}
          cta={{ label: "Label", href: "/dev/components" }}
        />
        <CardLarge
          variant="vertical"
          title="Vertical"
          description="Description"
          image={CARD_IMAGE}
          cta={{ label: "Label", href: "/dev/components" }}
        />
      </section>
      <section aria-labelledby="card-medium" className="flex flex-col gap-8">
        <h2 id="card-medium">Card medium</h2>
        <CardMedium
          variant="vertical"
          title="Vertical"
          description="Description"
          image={CARD_IMAGE}
          cta={{ label: "Label", href: "/dev/components" }}
        />
        <CardMedium
          variant="horizontal"
          title="Horizontal"
          description="Description"
          image={CARD_IMAGE}
          cta={{ label: "Label", href: "/dev/components" }}
        />
      </section>
      <section aria-labelledby="card-small" className="flex flex-col gap-8">
        <h2 id="card-small">Card small</h2>
        <CardSmall
          title="Small"
          description="Description"
          image={CARD_IMAGE}
          cta={{ label: "Label", href: "/dev/components" }}
        />
      </section>
      <section aria-labelledby="banner" className="flex flex-col gap-8">
        <h2 id="banner">Banner</h2>
        <Banner
          title="Octopus Ionic Hair Dryer"
          subtitle="Dry your hair faster and with less frizz with this powerful ionic hair dryer"
          image={BANNER_IMAGE}
          cta={{ label: "Learn more", href: "/dev/components" }}
        />
        <Banner
          variant="secondary"
          title="Secondary"
          subtitle="Subtitle"
          image={BANNER_IMAGE}
          cta={{ label: "Learn more", href: "/dev/components" }}
        />
        <Banner image={BANNER_IMAGE}>
          <p className="text-h2-s text-text tablet:text-h2-m desktop:text-h2-l">
            Custom
          </p>
        </Banner>
      </section>
    </main>
  );
}
