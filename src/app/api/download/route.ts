import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const FALLBACK_DOWNLOAD = "https://github.com/56steve/clipz/releases/latest";

export async function GET() {
  try {
    const res = await fetch("https://api.github.com/repos/56steve/clipz/releases/latest", {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "Clipz-Website",
      },
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      return NextResponse.redirect(FALLBACK_DOWNLOAD);
    }

    const data = await res.json();
    const exeAsset = data.assets?.find(
      (asset: { name: string; browser_download_url: string }) =>
        asset.name.endsWith(".exe") || asset.name.endsWith(".msi")
    );

    if (exeAsset?.browser_download_url) {
      return NextResponse.redirect(exeAsset.browser_download_url);
    }

    return NextResponse.redirect(FALLBACK_DOWNLOAD);
  } catch {
    return NextResponse.redirect(FALLBACK_DOWNLOAD);
  }
}
