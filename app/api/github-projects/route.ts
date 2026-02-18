// app/api/github-projects/route.ts
import { NextResponse } from "next/server";
import { getAllProjects } from "@/lib/github";

export const revalidate = 3600;

export async function GET() {
  try {
    const projects = await getAllProjects();
    return NextResponse.json(
      {
        projects,
        cachedAt: new Date().toISOString(),
        count: projects.length,
      },
      {
        headers: {
          "Cache-Control":
            "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      },
    );
  } catch (error) {
    console.error("❌ Error fetching GitHub projects:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch projects from GitHub",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
