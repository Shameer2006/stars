import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const starName = req.nextUrl.searchParams.get('name');
  if (!starName) return NextResponse.json(null, { status: 400 });

  try {
    const res = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(starName)}`,
      { next: { revalidate: 86400 } }
    );
    if (!res.ok) return NextResponse.json(null, { status: 404 });

    const data = await res.json();
    if (data.type === 'disambiguation' || !data.extract) {
      return NextResponse.json(null, { status: 404 });
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(null, { status: 500 });
  }
}
