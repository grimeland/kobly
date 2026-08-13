import { newLeadEmail, newLeadSubject } from "./new-lead";

export type EmailTemplate = {
  id: string;
  /** Navn i forhåndsvisningen. */
  name: string;
  /** Hvem e-posten går til og når den utløses. */
  context: string;
  subject: string;
  render: (baseUrl: string) => string;
};

export const EMAIL_TEMPLATES: EmailTemplate[] = [
  {
    id: "new-lead",
    name: "Ny flytteforespørsel",
    context: "Til byrå · når en forespørsel matches til dem",
    subject: newLeadSubject,
    render: newLeadEmail,
  },
];

export function getEmailTemplate(id: string): EmailTemplate | undefined {
  return EMAIL_TEMPLATES.find((t) => t.id === id);
}
