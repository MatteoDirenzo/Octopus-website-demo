import type { Metadata } from "next";
import type { StaticImageData } from "next/image";
import type { ReactNode } from "react";
import bannerGirl from "@/assets/images/banner-girl.webp";
import bannerRed from "@/assets/images/banner-red-desktop.webp";
import heroAccessories from "@/assets/images/hero-accessories-desktop.webp";
import heroCategory from "@/assets/images/hero-category.webp";
import heroHaircare from "@/assets/images/hero-haircare-desktop.webp";
import heroHome from "@/assets/images/hero-home-desktop.webp";
import heroKitchen from "@/assets/images/hero-kitchen-dekstop.webp";
import securityCamera from "@/assets/images/security-camera.webp";
import airFryer from "@/assets/images/products/air-fryer.webp";
import hairDryer from "@/assets/images/products/hair-dryer.webp";
import blender from "@/assets/images/products/mixer.webp";
import indoorCamera from "@/assets/images/products/security-cam.webp";
import { Banner } from "@/components/Banner";
import { Button } from "@/components/Button";
import { CardLarge } from "@/components/CardLarge";
import { CardMedium } from "@/components/CardMedium";
import { CardSmall } from "@/components/CardSmall";
import { Heading } from "@/components/Heading";
import { ProductCard } from "@/components/ProductCard";
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

function asset(file: StaticImageData, alt: string) {
  return {
    src: file.src,
    alt,
    width: file.width,
    height: file.height,
  };
}

const KITCHEN = asset(
  heroKitchen,
  "Person using a blender on a kitchen counter",
);
const HAIRCARE = asset(heroHaircare, "Woman drying her hair");
const HOME = asset(heroHome, "Hand pressing a video doorbell");
const ACCESSORIES = asset(
  heroAccessories,
  "Person placing a power bank into a bag",
);
const CAMERA = asset(securityCamera, "White indoor security camera");
const AIR_FRYER = asset(airFryer, "Black air fryer");
const BLENDER = asset(blender, "Personal blender");
const HAIR_DRYER = asset(hairDryer, "Grey hair dryer");
const INDOOR_CAMERA = asset(indoorCamera, "White indoor security camera");

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
          image={KITCHEN}
          cta={{ label: "Label", href: "/dev/components" }}
        />
        <CardLarge
          variant="vertical"
          title="Vertical"
          description="Description"
          image={HAIRCARE}
          cta={{ label: "Label", href: "/dev/components" }}
        />
      </section>
      <section aria-labelledby="card-medium" className="flex flex-col gap-8">
        <h2 id="card-medium">Card medium</h2>
        <CardMedium
          variant="vertical"
          title="Vertical"
          description="Description"
          image={HOME}
          cta={{ label: "Label", href: "/dev/components" }}
        />
        <CardMedium
          variant="horizontal"
          title="Horizontal"
          description="Description"
          image={ACCESSORIES}
          cta={{ label: "Label", href: "/dev/components" }}
        />
      </section>
      <section aria-labelledby="card-small" className="flex flex-col gap-8">
        <h2 id="card-small">Card small</h2>
        <CardSmall
          title="Small"
          description="Description"
          image={CAMERA}
          cta={{ label: "Label", href: "/dev/components" }}
        />
      </section>
      <section aria-labelledby="product-card" className="flex flex-col gap-8">
        <h2 id="product-card">Product card</h2>
        <div className="grid gap-8 tablet:grid-cols-2">
          <div className="flex min-w-0 flex-col gap-2">
            <p className="text-label">Title and description</p>
            <ProductCard
              title="Title"
              description="Description"
              image={AIR_FRYER}
              href="/dev/components"
            />
          </div>
          <div className="flex min-w-0 flex-col gap-2">
            <p className="text-label">Title only</p>
            <ProductCard
              title="Title"
              image={BLENDER}
              href="/dev/components"
            />
          </div>
          <div className="flex min-w-0 flex-col gap-2">
            <p className="text-label">Description only</p>
            <ProductCard
              description="Description"
              image={HAIR_DRYER}
              href="/dev/components"
            />
          </div>
          <div className="flex min-w-0 flex-col gap-2">
            <p className="text-label">Image only</p>
            <ProductCard image={INDOOR_CAMERA} href="/dev/components" />
          </div>
        </div>
      </section>
      <section aria-labelledby="banner" className="flex flex-col gap-8">
        <h2 id="banner">Banner</h2>
        <Banner
          title="Octopus Ionic Hair Dryer"
          subtitle="Dry your hair faster and with less frizz with this powerful ionic hair dryer"
          image={asset(bannerGirl, "Woman drying her hair")}
          cta={{ label: "Learn more", href: "/dev/components" }}
        />
        <Banner
          variant="secondary"
          title="Secondary"
          subtitle="Subtitle"
          image={asset(bannerRed, "Kettle, blender, and air fryer on a red set")}
          cta={{ label: "Learn more", href: "/dev/components" }}
        />
        <Banner image={asset(heroCategory, "Woman drying her hair")}>
          <p className="text-h2-s text-text tablet:text-h2-m desktop:text-h2-l">
            Custom
          </p>
        </Banner>
      </section>
    </main>
  );
}
