import type { Metadata } from "next";
import { EMAIL_TEMPLATES } from "@/lib/emails";
import { EmailPreviewClient } from "./EmailPreviewClient";

export const metadata: Metadata = {
  title: "E-postmaler — Kobly (intern)",
  robots: { index: false, follow: false },
};

export default function EmailPreviewPage() {
  // Tom baseUrl gjør bildene relative, slik at de lastes fra samme origin i nettleseren.
  const items = EMAIL_TEMPLATES.map((t) => ({
    id: t.id,
    name: t.name,
    context: t.context,
    subject: t.subject,
    html: t.render(""),
  }));

  return <EmailPreviewClient items={items} />;
}
