import { DownloadArea, type SpecsDownload } from "./DownloadArea";
import { SpecsAccordions, type SpecsGroup } from "./SpecsAccordions";

export type { SpecsBody, SpecsGroup } from "./SpecsAccordions";
export type { SpecsDownload } from "./DownloadArea";

export type TechnicalSpecsProps = {
  groups: SpecsGroup[];
  /** Omit it when the product has no file. */
  download?: SpecsDownload;
};

/**
 * Specification groups and an optional download row.
 * The two cards stack with 16px between them.
 * An empty group list or a missing download is left out.
 */
export function TechnicalSpecs({ groups, download }: TechnicalSpecsProps) {
  return (
    <div className="flex w-full min-w-0 flex-col gap-4">
      {groups.length > 0 ? <SpecsAccordions groups={groups} /> : null}
      {download !== undefined ? <DownloadArea {...download} /> : null}
    </div>
  );
}
