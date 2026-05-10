import { NextResponse } from "next/server";
import { getGitHubStats, MOCK_GITHUB_STATS } from "../../../lib/github";

/**
 * GET /api/github?username=...
 * Fetches and caches GitHub statistics
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username") || "harshverma-25";

  try {
    const stats = await getGitHubStats(username);

    if (!stats) {
      // Fallback to mock data if API fails or rate limit hit
      return NextResponse.json(MOCK_GITHUB_STATS, {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      });
    }

    return NextResponse.json(stats, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch GitHub data" },
      { status: 500 }
    );
  }
}
