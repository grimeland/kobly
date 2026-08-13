"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type PreviewItem = {
  id: string;
  name: string;
  context: string;
  subject: string;
  html: string;
};

const WIDTHS = {
  mobil: 375,
  full: 640,
} as const;

type WidthKey = keyof typeof WIDTHS;

export function EmailPreviewClient({ items }: { items: PreviewItem[] }) {
  const [width, setWidth] = useState<WidthKey>("full");

  return (
    <div className="min-h-screen bg-surface-soft">
      <header className="sticky top-0 z-10 border-b border-line bg-surface-soft/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <div>
            <h1 className="text-lg font-semibold text-ink">
              Kobly e-postmaler
            </h1>
            <p className="mt-0.5 text-sm text-ink-muted">
              Intern forhåndsvisning · ikke lenket fra navigasjonen
            </p>
          </div>
          <div className="inline-flex shrink-0 rounded-full bg-ink/5 p-1">
            {(Object.keys(WIDTHS) as WidthKey[]).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setWidth(key)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                  width === key
                    ? "bg-surface text-ink shadow-sm"
                    : "text-ink-muted hover:text-ink",
                )}
              >
                {key === "mobil" ? "Mobil 375 px" : "Full 640 px"}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10 sm:px-10 sm:py-14">
        <div className="flex flex-col gap-14">
          {items.map((item) => (
            <section key={item.id}>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h2 className="text-base font-semibold text-ink">
                  {item.name}
                </h2>
                <p className="text-sm text-ink-muted">{item.context}</p>
              </div>
              <p className="mt-3 text-sm text-ink">
                <span className="text-ink-muted">Emne: </span>
                {item.subject}
              </p>
              <a
                href={`/email-preview/${item.id}/raw`}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-block text-sm text-ink-muted underline underline-offset-2 hover:text-ink"
              >
                Åpne HTML-filen
              </a>
              <div className="mt-5 overflow-x-auto rounded-[14px] border border-line bg-bg p-4 sm:p-6">
                <EmailFrame
                  html={item.html}
                  width={WIDTHS[width]}
                  title={item.name}
                />
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}

function EmailFrame({
  html,
  width,
  title,
}: {
  html: string;
  width: number;
  title: string;
}) {
  const ref = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(600);

  // Innholdet i en srcDoc-iframe er ikke nødvendigvis lastet når load-eventet
  // først fyrer, så vi måler gjentatte ganger til høyden har stabilisert seg.
  useEffect(() => {
    let frames = 0;
    const timer = setInterval(() => {
      const doc = ref.current?.contentDocument;
      if (!doc) return;
      // Litt slingringsmonn, ellers dukker det opp en scrollbar på noen av malene.
      const measured =
        Math.max(
          doc.body?.scrollHeight ?? 0,
          doc.documentElement?.scrollHeight ?? 0,
        ) + 4;
      if (measured > 4) setHeight(measured);
      if (++frames > 20) clearInterval(timer);
    }, 150);
    return () => clearInterval(timer);
  }, [html, width]);

  return (
    <iframe
      ref={ref}
      title={`${title} — e-postforhåndsvisning`}
      srcDoc={html}
      scrolling="no"
      style={{ width, height }}
      className="mx-auto block max-w-full overflow-hidden rounded-[10px] bg-white"
    />
  );
}
