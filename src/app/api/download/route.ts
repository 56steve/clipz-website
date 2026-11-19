import { NextResponse } from "next/server";
import { RELEASES_URL } from "@/lib/links";

export const dynamic = "force-dynamic";

type Platform = "windows" | "mac";

interface ReleaseAsset {
  name: string;
  browser_download_url: string;
}

interface Release {
  assets?: ReleaseAsset[];
}

const LATEST_RELEASE_API =
  "https://api.github.com/repos/56steve/clipz/releases/latest";

function parsePlatform(value: string | null): Platform {
  return value === "mac" ? "mac" : "windows";
}

/**
 * Picks the file a normal user wants for the platform:
 * - Windows: the NSIS installer first, then an .msi, then any other .exe.
 * - macOS: the .dmg disk image.
 * The release also ships a bare portable clipz.exe, which must not win over
 * the installer.
 */
function pickAsset(
  assets: ReleaseAsset[],
  platform: Platform
): ReleaseAsset | undefined {
  const byName = (test: (name: string) => boolean): ReleaseAsset | undefined =>
    assets.find((asset) => test(asset.name.toLowerCase()));

  if (platform === "mac") {
    return byName((name) => name.endsWith(".dmg"));
  }

  return (
    byName((name) => name.endsWith("-setup.exe")) ??
    byName((name) => name.endsWith(".msi")) ??
    byName((name) => name.endsWith(".exe"))
  );
}

export async function GET(request: Request): Promise<NextResponse> {
  const platform = parsePlatform(new URL(request.url).searchParams.get("platform"));

  try {
    const res = await fetch(LATEST_RELEASE_API, {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "Clipz-Website",
      },
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      return NextResponse.redirect(RELEASES_URL);
    }

    const release = (await res.json()) as Release;
    const asset = pickAsset(release.assets ?? [], platform);

    return NextResponse.redirect(asset?.browser_download_url ?? RELEASES_URL);
  } catch {
    return NextResponse.redirect(RELEASES_URL);
  }
}
