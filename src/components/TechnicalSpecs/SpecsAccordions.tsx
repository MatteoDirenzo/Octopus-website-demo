"use client";

import clsx from "clsx";
import { useId, useState } from "react";
import { Chevron } from "@/components/icons/Chevron";
import type { SpecsBody, SpecsGroup } from "@/types";

type SpecsAccordionsProps = {
  groups: SpecsGroup[];
};

/**
 * One card of specification groups. The card is 20px on all sides.
 * Each group is 16px on the y axis only, except the first has no top and the
 * last has no bottom, with 8px between its header and its body.
 * Groups start open and close on their own. The chevron points right when
 * closed and turns down when open.
 * The list uses space-y. A flex list would drop the disc markers.
 */
export function SpecsAccordions({ groups }: SpecsAccordionsProps) {
  return (
    <div className="w-full min-w-0 rounded-card bg-surface-hover p-5">
      {groups.map((group) => (
        <SpecsAccordionItem key={group.id} group={group} />
      ))}
    </div>
  );
}

function SpecsAccordionItem({ group }: { group: SpecsGroup }) {
  const headerId = useId();
  const panelId = useId();
  const [open, setOpen] = useState(true);

  return (
    <div className="py-4 first:pt-0 last:pb-0">
      <h3>
        <button
          id={headerId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((current) => !current)}
          className="flex w-full items-center justify-between text-left text-body-bold text-text outline-none focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-focus"
        >
          {group.title}
          <Chevron className={clsx("shrink-0", open && "rotate-90")} />
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={headerId}
        hidden={!open}
        className="mt-2"
      >
        <SpecsBodyView body={group.body} />
      </div>
    </div>
  );
}

function SpecsBodyView({ body }: { body: SpecsBody }) {
  if (body.kind === "list") {
    return (
      <ul className="list-disc space-y-2 ps-5 text-body text-text">
        {body.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }

  return <p className="text-body text-text">{body.text}</p>;
}
