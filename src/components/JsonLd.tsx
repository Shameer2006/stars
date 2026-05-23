/**
 * Injects JSON-LD structured data into the page for Google rich results.
 * Usage: <JsonLd data={{ '@context': 'https://schema.org', ... }} />
 */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
