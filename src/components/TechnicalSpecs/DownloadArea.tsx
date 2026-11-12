import { Download } from "@/components/icons/Download";
import type { SpecsDownload } from "@/types";

/**
 * One row. 20px on the x axis and 21px on the y axis, off the spacing scale.
 * The file control is a link, not the pill button. It is icon plus label.
 */
export function DownloadArea({ label, fileLabel, href }: SpecsDownload) {
  return (
    <div className="flex w-full min-w-0 items-center justify-between gap-4 rounded-card bg-surface-hover px-5 py-download-y">
      <p className="text-body-bold text-text">{label}</p>
      <a
        href={href}
        download
        className="inline-flex shrink-0 items-center gap-2 text-label font-medium text-text outline-none focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-focus"
      >
        <Download />
        {fileLabel}
      </a>
    </div>
  );
}
