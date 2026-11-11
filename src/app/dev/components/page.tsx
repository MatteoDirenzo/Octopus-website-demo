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
import airFryer from "@/assets/images/products/air-fryer.webp";
import cable from "@/assets/images/products/cable.webp";
import hairDryer from "@/assets/images/products/hair-dryer.webp";
import blender from "@/assets/images/products/mixer.webp";
import indoorCamera from "@/assets/images/products/security-cam.webp";
import securityCamera from "@/assets/images/security-camera.webp";
import { Banner } from "@/components/Banner";
import { BentoBox } from "@/components/BentoBox";
import { Button } from "@/components/Button";
import { Carousel } from "@/components/Carousel";
import { CardLarge } from "@/components/CardLarge";
import { CardMedium } from "@/components/CardMedium";
import { CardSmall } from "@/components/CardSmall";
import { ColourSelector } from "@/components/ColourSelector";
import { ExploreCategory } from "@/components/ExploreCategory";
import { FeatureSelector } from "@/components/FeatureSelector";
import { Heading } from "@/components/Heading";
import { ProductCard } from "@/components/ProductCard";
import { ProductInfo } from "@/components/ProductInfo";
import {
  TechnicalSpecs,
  type SpecsGroup,
} from "@/components/TechnicalSpecs";
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
const CABLE = asset(cable, "Coiled USB-C cable");

const COLOURS = [
  { id: "black", label: "Black", hex: "#1b1b1b" },
  { id: "white", label: "White", hex: "#ffffff" },
];

const FEATURES = [
  { id: "20000", label: "20,000 mhA" },
  { id: "10000", label: "10,000 mhA" },
];

const SPECS_GROUPS: SpecsGroup[] = [
  {
    id: "technical",
    title: "Technical specifications",
    body: {
      kind: "list",
      items: [
        "Power:",
        "Voltage:",
        "Frequency:",
        "Input:",
        "Output:",
        "Battery:",
        "Rated capacity:",
        "Motor:",
        "Capacity:",
        "Temperature range:",
        "Operating temperature:",
        "Weatherproof rating:",
      ],
    },
  },
  {
    id: "performance",
    title: "Performance & display",
    body: {
      kind: "list",
      items: ["Resolution:", "Speed & Heat settings:"],
    },
  },
  {
    id: "movement",
    title: "Movement & control",
    body: { kind: "text", text: "Pan and tilt:" },
  },
  {
    id: "connectivity",
    title: "Connectivity",
    body: {
      kind: "list",
      items: [
        "Wi-Fi:",
        "Data transfer:",
        "Connector type:",
        "Compatibility:",
        "Memory card support:",
      ],
    },
  },
  {
    id: "dimensions",
    title: "Dimensions & weight",
    body: {
      kind: "list",
      items: ["Dimensions:", "Weight:", "Cable length:"],
    },
  },
  {
    id: "product",
    title: "Product information",
    body: { kind: "text", text: "Model:" },
  },
  {
    id: "in-the-box",
    title: "In the box",
    body: { kind: "text", text: "-" },
  },
];

const BLENDER_COPY = {
  title: "Octopus Blender Pro",
  description:
    "Crushes ice and frozen fruit to silky-smooth in seconds. 1500W motor, 7 preset programs, pulse for manual control. Cleans itself in one touch.",
};

const CAROUSEL_SLIDES = [
  HAIR_DRYER,
  BLENDER,
  AIR_FRYER,
  INDOOR_CAMERA,
  CABLE,
  HAIR_DRYER,
  BLENDER,
];

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
          <div className="flex min-w-0 flex-col gap-2">
            <p className="text-label">Image, no link</p>
            <ProductCard image={INDOOR_CAMERA} title="Title" />
          </div>
        </div>
      </section>
      <section aria-labelledby="product-info" className="flex flex-col gap-8">
        <h2 id="product-info">Product info</h2>
        <div className="grid gap-8 tablet:grid-cols-2">
          <div className="flex min-w-0 flex-col gap-2">
            <p className="text-label">Colour</p>
            <ProductInfo
              {...BLENDER_COPY}
              selectionLabel="Colour - Black"
              action={{ label: "Where to buy", href: "/dev/components" }}
            >
              <ColourSelector label="Colour" options={COLOURS} value="black" />
            </ProductInfo>
          </div>
          <div className="flex min-w-0 flex-col gap-2">
            <p className="text-label">Feature</p>
            <ProductInfo
              {...BLENDER_COPY}
              selectionLabel="Battery - 20,000 mhA"
              action={{ label: "Where to buy", href: "/dev/components" }}
            >
              <FeatureSelector
                label="Battery"
                options={FEATURES}
                value="20000"
              />
            </ProductInfo>
          </div>
        </div>
        <div className="flex min-w-0 flex-col gap-2">
          <p className="text-label">Colour selector</p>
          <ColourSelector label="Colour" options={COLOURS} value="black" />
        </div>
        <div className="flex min-w-0 flex-col gap-2">
          <p className="text-label">Feature selector</p>
          <FeatureSelector label="Feature" options={FEATURES} value="20000" />
        </div>
      </section>
      <section
        aria-labelledby="explore-category"
        className="flex flex-col gap-8"
      >
        <h2 id="explore-category">Explore category</h2>
        <ExploreCategory
          title="Explore all categories"
          cards={[
            {
              image: BLENDER,
              href: "/category/kitchen",
              label: "Kitchen",
            },
            {
              image: INDOOR_CAMERA,
              href: "/category/home-security",
              label: "Home Security",
            },
            {
              image: HAIR_DRYER,
              href: "/category/hair-care",
              label: "Hair Care",
            },
            {
              image: CABLE,
              href: "/category/accessories",
              label: "Accessories",
            },
          ]}
        />
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
      <section aria-labelledby="bento-box" className="flex flex-col gap-8">
        <h2 id="bento-box">Bento box</h2>
        <BentoBox
          rows={[
            [
              {
                title: "Title feature 1",
                description: "Description feature 1",
                image: KITCHEN,
              },
            ],
            [
              {
                title: "Title feature F2",
                description: "Description feature F2",
                image: HAIRCARE,
              },
              {
                title: "Title feature F3",
                description: "Description feature F3",
                image: HOME,
              },
            ],
            [
              {
                title: "Title feature F4",
                description: "Description feature F4",
              },
            ],
          ]}
        />
      </section>
      <section aria-labelledby="technical-specs" className="flex flex-col gap-4">
        <h2 id="technical-specs">Technical specs</h2>
        <TechnicalSpecs
          groups={SPECS_GROUPS}
          download={{
            label: "Downloads",
            fileLabel: "User manual",
            href: "/manuals/user-manual.pdf",
          }}
        />
      </section>
      <section aria-labelledby="carousel" className="-mx-8 flex flex-col gap-16">
        <h2 id="carousel" className="px-8">
          Carousel
        </h2>
        <div className="px-4 tablet:px-8 desktop:px-32">
          <p className="mb-4 text-label">Contained</p>
          <Carousel title="Best sellers" showDots>
            {CAROUSEL_SLIDES.map((image, index) => (
              <ProductCard
                key={`${image.alt}-${index}`}
                title="Title"
                description="Description"
                image={image}
                href="/dev/components"
              />
            ))}
          </Carousel>
        </div>
        <div>
          <p className="mb-4 px-4 text-label tablet:px-8 desktop:px-32">
            Overflow
          </p>
          <Carousel
            title="Best sellers"
            mode="overflow"
            endOffset={{ mobile: 4, tablet: 8, desktop: 32 }}
          >
            {CAROUSEL_SLIDES.map((image, index) => (
              <ProductCard
                key={`${image.alt}-overflow-${index}`}
                title="Title"
                description="Description"
                image={image}
                href="/dev/components"
              />
            ))}
          </Carousel>
        </div>
      </section>
    </main>
  );
}
