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
