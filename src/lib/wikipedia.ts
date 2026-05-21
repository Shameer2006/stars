export interface WikiSummary {
  title: string;
  extract: string;
  extract_html: string;
  thumbnail?: {
    source: string;
    width: number;
    height: number;
  };
  originalimage?: {
    source: string;
    width: number;
    height: number;
  };
  description?: string;
  content_urls: {
    desktop: { page: string };
  };
}

export interface WikiFullContent {
  summary: WikiSummary;
  /** Sections of the Wikipedia article with title and HTML content */
  sections: { title: string; html: string }[];
}

export async function fetchStarWikiSummary(starName: string): Promise<WikiSummary | null> {
  if (!starName) return null;
  try {
    const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(starName)}`);
    if (!res.ok) {
      return null;
    }
    const data = await res.json();
    
    // We strictly require an extract for it to be considered a valid Wikipedia article
    if (data.type === 'disambiguation' || !data.extract) {
      return null;
    }

    return data as WikiSummary;
  } catch (error) {
    console.error('Failed to fetch Wikipedia data for star:', starName, error);
    return null;
  }
}

/**
 * Fetches the full mobile-html content for a star from Wikipedia.
 * Returns separate lead and remaining body sections for rich detail pages.
 */
export async function fetchStarWikiFullContent(starName: string): Promise<WikiFullContent | null> {
  if (!starName) return null;
  try {
    // First get the summary (for images, title, short extract)
    const summary = await fetchStarWikiSummary(starName);
    if (!summary) return null;

    // Then get the full article sections via the mobile-sections API
    const sectionsRes = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/mobile-sections/${encodeURIComponent(summary.title)}`,
      { next: { revalidate: 86400 } } // Cache for 24 hours
    );

    if (!sectionsRes.ok) {
      // Fallback: just return summary data with no extra sections
      return { summary, sections: [] };
    }

    const sectionsData = await sectionsRes.json();

    const sections: { title: string; html: string }[] = [];

    // Parse remaining sections (skip the lead — that's covered by the summary extract)
    if (sectionsData.remaining?.sections) {
      for (const section of sectionsData.remaining.sections) {
        // Only include top-level sections (toclevel 1) to keep content manageable
        // Skip sections like "References", "External links", "See also", "Notes", "Further reading"
        const skipSections = ['references', 'external links', 'see also', 'notes', 'further reading', 'citations', 'bibliography'];
        if (
          section.toclevel <= 2 &&
          section.text &&
          section.text.trim().length > 0 &&
          !skipSections.includes(section.line?.toLowerCase() || '')
        ) {
          sections.push({
            title: section.line || '',
            html: section.text,
          });
        }
      }
    }

    return { summary, sections };
  } catch (error) {
    console.error('Failed to fetch full Wikipedia content for star:', starName, error);
    return null;
  }
}
