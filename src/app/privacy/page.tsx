import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  alternates: { canonical: "/privacy" },
  description: "Clipz privacy policy. Local-first architecture, no telemetry in the app, local encryption, and what this website uses.",
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
          <p className="mt-4 font-mono text-[0.78rem] text-faint">
            Last updated: November 19, 2026
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
                  <strong className="text-text">Encryption:</strong> Sensitive clips are encrypted on disk. On Windows this uses the Data Protection API (DPAPI), bound to your Windows user account. On macOS it uses AES-256-GCM with a key file readable only by your user account.
                </li>
                <li>
                  <strong className="text-text">No External Servers:</strong> Clipz operates without remote database synchronization or cloud backup servers.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-text">Telemetry and Analytics</h2>
              <p>
                The Clipz desktop application contains zero analytics software, zero tracking scripts, and zero crash-reporting telemetry SDKs. The application makes no background network requests during standard operation.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-text">This Website</h2>
              <p>
                The desktop app and this website are separate. The website is not part of the app and does not receive any of your clipboard data. When you visit it:
              </p>
              <ul className="list-disc space-y-2 pl-6 text-sm">
                <li>
                  <strong className="text-text">Hosting logs:</strong> our host, Vercel, processes standard web logs such as IP addresses and user agents for network delivery and security.
                </li>
                <li>
                  <strong className="text-text">Page analytics:</strong> we use Vercel Web Analytics to count page views in aggregate. It does not use cookies to identify you.
                </li>
                <li>
                  <strong className="text-text">Microsoft Store badge:</strong> the &quot;Get it from Microsoft&quot; badge is loaded from get.microsoft.com, so Microsoft receives standard request data such as your IP address and browser details when it loads, under Microsoft&apos;s privacy statement.
                </li>
                <li>
                  <strong className="text-text">Chat widget:</strong> a support chat widget from OyeChats is loaded from cdn.oyechats.com. If you use it, the messages you send, and technical data such as your IP address, are processed by that provider under its own privacy policy. Do not type passwords or other sensitive information into it.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-text">Third-Party Services</h2>
              <p>
                The Clipz desktop application does not integrate with third-party tracking services or data brokers. The only third-party services involved with this website are the ones listed above.
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
