import { getEmailTemplate } from "@/lib/emails";

/** Serverer den ferdige HTML-templaten, slik den skal leveres videre. */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const template = getEmailTemplate(id);
  if (!template) {
    return new Response("Ukjent e-postmal", { status: 404 });
  }

  // Bilder må ligge på en absolutt URL i en ekte e-post.
  const base =
    new URL(request.url).searchParams.get("base") ?? "https://kobly.vercel.app";

  return new Response(template.render(base), {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
