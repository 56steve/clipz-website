import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Clipz privacy policy. Local-first architecture, zero telemetry, local encryption.",
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="container-page pb-24 pt-36 sm:pt-44">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-semibold tracking-tight text-text sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 font-mono text-[0.75rem] text-faint">
            Last updated: August 26, 2026
          </p>

          <div className="mt-10 space-y-10 text-[1.025rem] leading-relaxed text-muted">
            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-text">Core Commitment</h2>
              <p>
                Clipz is a local-first clipboard manager. Your clipboard content, search index, clip history, and application settings never leave your device. We do not collect, transmit, store, or sell any personal data.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-text">Data Storage and Security</h2>
              <p>
                All copied text, images, and clips are stored strictly on your local file system within an SQLite database.
              </p>
              <ul className="list-disc space-y-2 pl-6 text-sm">
                <li>
                  <strong className="text-text">Local Database:</strong> SQLite FTS5 stores history locally in your user profile directory.
                </li>
                <li>
                  <strong className="text-text">Encryption:</strong> Sensitive clips marked as private are encrypted on disk using Windows Data Protection API (DPAPI), bound exclusively to your Windows user account.
                </li>
                <li>
                  <strong className="text-text">No External Servers:</strong> Clipz operates without remote database synchronization or cloud backup servers.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-text">Telemetry and Analytics</h2>
              <p>
                Clipz contains zero analytics software, zero tracking scripts, and zero crash-reporting telemetry SDKs. The application makes no background network requests during standard operation.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-text">Third-Party Services</h2>
              <p>
                The Clipz desktop application does not integrate with third-party tracking services or data brokers. If you visit this website, web hosting logs (such as IP addresses and user agents) may be processed by our static site host solely for network delivery and security enforcement.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-text">Open Source Transparency</h2>
              <p>
                Clipz is open source under the MIT license. You can inspect the complete source code, audit database routines, and verify network behavior on our GitHub repository.
              </p>
            </section>

            <section className="space-y-3 border-t border-[var(--border)] pt-8">
              <h2 className="text-xl font-semibold text-text">Contact</h2>
              <p>
                If you have technical questions regarding data security in Clipz, open an issue on the GitHub repository at github.com/56steve/clipz.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
